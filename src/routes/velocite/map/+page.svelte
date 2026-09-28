<script lang="ts">
	import { VelociteSortField } from '$core/enum/VelociteSortField';
	import type { FormattedStation } from '$core/dto/jcdecaux';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import 'leaflet/dist/leaflet.css';
	import './markers.css';

	import type { LayerGroup, Map as LeafletMap, Marker } from 'leaflet';
	import FilterBar from './FilterBar.svelte';
	import FilterDrawer from './FilterDrawer.svelte';
	import { LocateButton, RefreshDropdown } from '../shared/ui/tool-bar';
	import { defaultRefreshInterval, refreshIntervals } from '../shared/core/settings';
	import { createUserLocationIcon, renderStationMarkers } from './markers';

	interface Props {
		data: {
			stations: FormattedStation[];
		};
	}

	let { data }: Props = $props();

	let fetchedStations = $state<FormattedStation[] | null>(null);
	let stations = $derived<FormattedStation[]>(fetchedStations ?? data.stations);
	let selectedFilter = $state<VelociteSortField>(VelociteSortField.TOTAL_BIKES);
	let drawerOpen = $state(false);
	let refreshInterval = $state(defaultRefreshInterval);

	let userLocation = $state<{ lat: number; lng: number } | null>(null);
	let userMarker = $state<Marker | null>(null);
	let permissionDenied = $state(false);
	let isLocating = $state(false);
	let hasLocation = $derived(userLocation !== null);

	const BESANCON_CENTER: [number, number] = [47.2378, 6.024];
	const DEFAULT_ZOOM = 14.5;

	let mapElement = $state<HTMLDivElement | null>(null);
	let map = $state<LeafletMap | null>(null);
	let markersLayer = $state<LayerGroup | null>(null);
	let leaflet = $state<typeof import('leaflet') | null>(null);

	async function refreshStations() {
		const res = await fetch('/api/jcdecaux/stations');
		if (res.ok) {
			fetchedStations = await res.json();
		}
	}

	function updateMarkers() {
		if (!leaflet || !map || !markersLayer) return;
		renderStationMarkers(leaflet, markersLayer, stations, selectedFilter, map.getZoom());
	}

	function selectFilter(field: VelociteSortField) {
		selectedFilter = field;
		drawerOpen = false;
	}

	function locateUser() {
		if (!browser || !('geolocation' in navigator)) {
			alert("La géolocalisation n'est pas supportée par votre navigateur.");
			return;
		}

		isLocating = true;

		navigator.geolocation.getCurrentPosition(
			(pos) => {
				isLocating = false;
				permissionDenied = false;

				const lat = pos.coords.latitude;
				const lng = pos.coords.longitude;
				userLocation = { lat, lng };

				if (!leaflet || !map) return;

				if (!userMarker) {
					const icon = createUserLocationIcon(leaflet);
					userMarker = leaflet
						.marker([lat, lng], {
							icon,
							keyboard: false,
							zIndexOffset: 1000
						})
						.addTo(map);
				} else {
					userMarker.setLatLng([lat, lng]);
				}

				map.flyTo([lat, lng], 16, {
					duration: 0.5,
					easeLinearity: 0.25
				});
			},
			(err) => {
				isLocating = false;
				if (err.code === err.PERMISSION_DENIED) {
					permissionDenied = true;
				}
			},
			{
				enableHighAccuracy: true,
				timeout: 10000,
				maximumAge: 10000
			}
		);
	}

	onMount(() => {
		const storedInterval = localStorage.getItem('velocite-refresh-interval');
		if (storedInterval !== null) {
			const parsed = Number(storedInterval);
			if (refreshIntervals.includes(parsed)) refreshInterval = parsed;
		}

		if (browser && 'permissions' in navigator) {
			void navigator.permissions
				?.query({ name: 'geolocation' })
				.then((permissionStatus) => {
					permissionDenied = permissionStatus.state === 'denied';
					permissionStatus.onchange = () => {
						permissionDenied = permissionStatus.state === 'denied';
					};
				})
				.catch(() => {
					// Inactive ou non supporté
				});
		}

		let destroyed = false;

		void (async () => {
			if (!mapElement || destroyed) return;

			leaflet = await import('leaflet');
			if (destroyed || !mapElement) return;

			map = leaflet.map(mapElement, {
				center: BESANCON_CENTER,
				zoom: DEFAULT_ZOOM,
				zoomControl: true,
				minZoom: 12,
				maxZoom: 19
			});

			leaflet
				.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
					attribution: '&copy; OpenStreetMap contributors'
				})
				.addTo(map);

			markersLayer = leaflet.layerGroup().addTo(map);

			map.on('zoomend', () => {
				updateMarkers();
			});

			updateMarkers();
		})();

		return () => {
			destroyed = true;
			userMarker?.remove();
			userMarker = null;
			map?.remove();
			map = null;
			markersLayer = null;
		};
	});

	$effect(() => {
		if (!browser) return;
		localStorage.setItem('velocite-refresh-interval', String(refreshInterval));
	});

	$effect(() => {
		if (refreshInterval === 0) return;
		const id = setInterval(refreshStations, refreshInterval);
		return () => clearInterval(id);
	});

	$effect(() => {
		void selectedFilter;
		void stations;
		updateMarkers();
	});
</script>

<svelte:head>
	<title>Plan des station Vélocité</title>
</svelte:head>

<main class="relative mx-auto flex min-h-[calc(100dvh-78px)] flex-col">
	<div bind:this={mapElement} class="z-0 h-[calc(100dvh-78px)] w-full overflow-hidden"></div>

	<div
		class="fixed top-17 right-2 z-20 flex flex-col gap-1 rounded-xl border bg-background/20 p-2 shadow-xl backdrop-blur md:top-19 lg:top-21 dark:bg-background/80"
	>
		<RefreshDropdown bind:interval={refreshInterval} />
		<LocateButton {permissionDenied} {hasLocation} loading={isLocating} onclick={locateUser} />
	</div>

	<FilterBar bind:selectedFilter bind:drawerOpen onSelectFilter={selectFilter} />

	<FilterDrawer bind:selectedFilter bind:open={drawerOpen} onSelectFilter={selectFilter} />
</main>

<style>
	/*:global(.leaflet-top.leaflet-left) {
		top: 160px;
	}*/
</style>
