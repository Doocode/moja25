<script lang="ts">
	import { VelociteSortField } from '$core/enum/VelociteSortField';
	import type { FormattedStation } from '$core/dto/jcdecaux';
	import { onMount } from 'svelte';
	import 'leaflet/dist/leaflet.css';
	import './markers.css';

	import type { LayerGroup, Map as LeafletMap } from 'leaflet';
	import QuickFilters from './QuickFilters.svelte';
	import FilterDrawer from './FilterDrawer.svelte';
	import { renderStationMarkers } from './markers';

	interface Props {
		data: {
			stations: FormattedStation[];
		};
	}

	let { data }: Props = $props();

	let selectedFilter = $state<VelociteSortField>(VelociteSortField.TOTAL_BIKES);
	let drawerOpen = $state(false);

	const stations = $derived(data.stations);

	let mapElement = $state<HTMLDivElement | null>(null);
	let map = $state<LeafletMap | null>(null);
	let markersLayer = $state<LayerGroup | null>(null);
	let leaflet = $state<typeof import('leaflet') | null>(null);

	function updateMarkers() {
		if (!leaflet || !map || !markersLayer) return;
		renderStationMarkers(leaflet, markersLayer, stations, selectedFilter, map.getZoom());
	}

	function initializeBounds() {
		if (!leaflet || !map || stations.length === 0) return;

		const bounds = leaflet.latLngBounds(
			stations.map(
				(station) => [station.position.latitude, station.position.longitude] as [number, number]
			)
		);

		if (bounds.isValid()) {
			map.fitBounds(bounds.pad(0.2));
		}
	}

	function selectFilter(field: VelociteSortField) {
		selectedFilter = field;
		drawerOpen = false;
	}

	onMount(() => {
		let destroyed = false;

		void (async () => {
			if (!mapElement || destroyed) return;

			leaflet = await import('leaflet');
			if (destroyed || !mapElement) return;

			map = leaflet.map(mapElement, {
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

			initializeBounds();
			updateMarkers();
		})();

		return () => {
			destroyed = true;
			map?.remove();
			map = null;
			markersLayer = null;
		};
	});

	$effect(() => {
		void selectedFilter;
		void stations;
		updateMarkers();
	});
</script>

<svelte:head>
	<title>Carte Vélocité</title>
</svelte:head>

<main class="relative mx-auto flex min-h-[calc(100dvh-78px)] flex-col">
	<div bind:this={mapElement} class="z-0 h-[calc(100dvh-78px)] w-full overflow-hidden"></div>

	<QuickFilters bind:selectedFilter bind:drawerOpen onSelectFilter={selectFilter} />

	<FilterDrawer bind:selectedFilter bind:open={drawerOpen} onSelectFilter={selectFilter} />
</main>
