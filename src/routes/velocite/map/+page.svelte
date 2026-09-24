<script lang="ts">
	import { countFilters, numberFilters, statusFilters } from './filters';
	import { StationColorStatus, getStationColorStatus } from '../sort-config';
	import { VelociteSortField } from '$core/enum/VelociteSortField';
	import type { FormattedStation } from '$core/dto/jcdecaux';
	import { onMount } from 'svelte';
	import 'leaflet/dist/leaflet.css';

	import type { DivIcon, LayerGroup, Map as LeafletMap } from 'leaflet';
	import QuickFilters from './QuickFilters.svelte';
	import FilterDrawer from './FilterDrawer.svelte';

	interface Props {
		data: {
			stations: FormattedStation[];
		};
	}

	let { data }: Props = $props();

	type CountFilter = (typeof countFilters)[number];
	type NumberFilter = (typeof numberFilters)[number];
	type StatusFilter = (typeof statusFilters)[number];

	let selectedFilter = $state<VelociteSortField>(VelociteSortField.TOTAL_BIKES);
	let drawerOpen = $state(false);

	const stations = $derived(data.stations);

	let mapElement = $state<HTMLDivElement | null>(null);
	let map = $state<LeafletMap | null>(null);
	let markersLayer = $state<LayerGroup | null>(null);
	let leaflet = $state<typeof import('leaflet') | null>(null);

	let isCountFilterSelected = $derived(countFilters.includes(selectedFilter));
	let isNumberFilterSelected = $derived(numberFilters.includes(selectedFilter));
	let isStatusFilterSelected = $derived(statusFilters.includes(selectedFilter));

	function getCountValue(station: FormattedStation, field: CountFilter) {
		switch (field) {
			case VelociteSortField.TOTAL_BIKES:
				return station.mainStands.availabilities.bikes;
			case VelociteSortField.MECHANICAL_BIKES:
				return station.mainStands.availabilities.mechanicalBikes;
			case VelociteSortField.ELECTRICAL_BIKES:
				return station.mainStands.availabilities.electricalBikes;
			case VelociteSortField.AVAILABLE_STANDS:
				return station.mainStands.availabilities.stands;
			case VelociteSortField.UNAVAILABLE_STANDS:
				return station.unavailableStands;
		}
	}

	function getNumberValue(station: FormattedStation, field: NumberFilter) {
		return field === VelociteSortField.NUMBER ? station.number : station.totalStands.capacity;
	}

	function getStatusValue(station: FormattedStation, field: StatusFilter) {
		switch (field) {
			case VelociteSortField.BONUS:
				return station.bonus;
			case VelociteSortField.BANKING:
				return station.banking;
			case VelociteSortField.OPEN:
				return station.status === 'OPEN';
			case VelociteSortField.CONNECTED:
				return station.connected;
		}
	}

	function getStatusIcon(field: StatusFilter, active: boolean) {
		if (field === VelociteSortField.BONUS) return active ? '★' : '☆';
		if (field === VelociteSortField.BANKING) return active ? '💳' : '✕';
		if (field === VelociteSortField.OPEN) return active ? '✓' : '✕';
		return active ? '📶' : '✕';
	}

	function getCountColorClass(value: number) {
		switch (getStationColorStatus(value, selectedFilter)) {
			case StationColorStatus.Danger:
				return 'velocite-map-marker--danger';
			case StationColorStatus.Warning:
				return 'velocite-map-marker--warning';
			case StationColorStatus.Success:
				return 'velocite-map-marker--success';
		}
	}

	function buildMarkerHtml(station: FormattedStation) {
		if (isCountFilterSelected) {
			const value = getCountValue(station, selectedFilter) || 0;
			return `<div class="velocite-map-marker ${getCountColorClass(value)}"><span>${value}</span></div>`;
		}

		if (isNumberFilterSelected) {
			const value = getNumberValue(station, selectedFilter);
			return `<div class="velocite-map-marker velocite-map-marker--neutral"><span>${value}</span></div>`;
		}

		if (!isStatusFilterSelected) {
			return `<div class="velocite-map-marker velocite-map-marker--neutral"><span>${station.number}</span></div>`;
		}

		const active = getStatusValue(station, selectedFilter);
		const icon = getStatusIcon(selectedFilter, active);
		const stateClass = active
			? 'velocite-map-marker--status-on'
			: 'velocite-map-marker--status-off';

		return `<div class="velocite-map-marker ${stateClass}"><span class="velocite-map-marker__icon">${icon}</span></div>`;
	}

	function renderMarkers() {
		if (!leaflet || !map || !markersLayer) return;

		markersLayer.clearLayers();

		for (const station of stations) {
			const icon: DivIcon = leaflet.divIcon({
				html: buildMarkerHtml(station),
				className: 'velocite-map-div-icon',
				iconSize: [42, 42],
				iconAnchor: [21, 21]
			});

			const marker = leaflet
				.marker([station.position.latitude, station.position.longitude], { icon, keyboard: false })
				.bindTooltip(`${station.formattedName}`, {
					direction: 'top',
					offset: [0, -18]
				});

			marker.addTo(markersLayer);
		}
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

			initializeBounds();
			renderMarkers();
		})();

		return () => {
			destroyed = true;
			map?.remove();
			map = null;
			markersLayer = null;
		};
	});

	$effect(() => {
		selectedFilter;
		stations;
		renderMarkers();
	});
</script>

<svelte:head>
	<title>Carte Vélocité</title>
</svelte:head>

<main class="relative mx-auto flex min-h-[calc(100dvh-68px)] flex-col">
	<div bind:this={mapElement} class="z-0 h-[calc(100dvh-68px)] w-full overflow-hidden"></div>

	<QuickFilters bind:selectedFilter bind:drawerOpen onSelectFilter={selectFilter} />

	<FilterDrawer bind:selectedFilter bind:open={drawerOpen} onSelectFilter={selectFilter} />
</main>

<style>
	:global(.velocite-map-div-icon) {
		background: transparent;
		border: none;
	}

	:global(.velocite-map-marker) {
		display: flex;
		height: 42px;
		width: 42px;
		align-items: center;
		justify-content: center;
		border-radius: 999px;
		border: 2px solid rgb(255 255 255 / 0.95);
		font-size: 0.95rem;
		font-weight: 700;
		line-height: 1;
		box-shadow: 0 6px 16px rgb(0 0 0 / 0.25);
	}

	:global(.velocite-map-marker--danger) {
		background: #dc2626;
		color: #fff;
	}

	:global(.velocite-map-marker--warning) {
		background: #f59e0b;
		color: #111827;
	}

	:global(.velocite-map-marker--success) {
		background: #16a34a;
		color: #fff;
	}

	:global(.velocite-map-marker--neutral) {
		background: #475569;
		color: #fff;
	}

	:global(.velocite-map-marker--status-on) {
		background: #0ea5e9;
		color: #fff;
	}

	:global(.velocite-map-marker--status-off) {
		background: #9f1239;
		color: #fff;
	}

	:global(.velocite-map-marker__icon) {
		font-size: 1.05rem;
	}
</style>
