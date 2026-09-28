import { goto } from '$app/navigation';
import { resolve } from '$app/paths';
import type { FormattedStation } from '$core/dto/jcdecaux';
import { VelociteSortField } from '$core/enum/VelociteSortField';
import { StationColorStatus, getStationColorStatus } from '../sort-config';
import { countFilters, numberFilters, statusFilters } from './filters';
import type { DivIcon, LayerGroup } from 'leaflet';

type CountFilter = (typeof countFilters)[number];
type NumberFilter = (typeof numberFilters)[number];
type StatusFilter = (typeof statusFilters)[number];

export function getCountValue(station: FormattedStation, field: CountFilter): number | undefined {
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

export function getNumberValue(station: FormattedStation, field: NumberFilter): number {
	return field === VelociteSortField.NUMBER ? station.number : station.totalStands.capacity;
}

export function getStatusValue(station: FormattedStation, field: StatusFilter): boolean {
	switch (field) {
		case VelociteSortField.BONUS:
			return station.bonus;
		case VelociteSortField.BANKING:
			return station.banking;
		case VelociteSortField.OPEN:
			return station.status === 'OPEN';
		case VelociteSortField.CONNECTED:
			return station.connected;
		default:
			return false;
	}
}

export function getStatusIcon(field: StatusFilter, active: boolean): string {
	if (field === VelociteSortField.BONUS) return active ? '★' : '✕';
	if (field === VelociteSortField.BANKING) return active ? '💳' : '✕';
	if (field === VelociteSortField.OPEN) return active ? '✓' : '✕';
	return active ? '📶' : '✕';
}

export function getCountColorClass(value: number, selectedFilter: VelociteSortField): string {
	switch (getStationColorStatus(value, selectedFilter)) {
		case StationColorStatus.Danger:
			return 'velocite-map-marker--danger';
		case StationColorStatus.Warning:
			return 'velocite-map-marker--warning';
		case StationColorStatus.Success:
		default:
			return 'velocite-map-marker--success';
	}
}

export function markerTemplate(
	content: string | number,
	variantClass: string = 'velocite-map-marker--neutral'
): string {
	return `<div class="velocite-map-marker ${variantClass}"><span>${content}</span></div>`;
}

export function createUserLocationIcon(leaflet: typeof import('leaflet')): DivIcon {
	return leaflet.divIcon({
		html: `<div class="user-location-marker-container">
			<div class="user-location-marker__halo"></div>
			<div class="user-location-marker__dot"></div>
		</div>`,
		className: 'velocite-map-div-icon',
		iconSize: [36, 36],
		iconAnchor: [18, 18]
	});
}

export function buildMarkerHtml(
	station: FormattedStation,
	selectedFilter: VelociteSortField
): string {
	if (countFilters.includes(selectedFilter)) {
		const value = getCountValue(station, selectedFilter as CountFilter) || 0;
		return markerTemplate(value, getCountColorClass(value, selectedFilter));
	}

	if (numberFilters.includes(selectedFilter)) {
		const value = getNumberValue(station, selectedFilter as NumberFilter);
		return markerTemplate(value, 'velocite-map-marker--neutral');
	}

	if (!statusFilters.includes(selectedFilter)) {
		return markerTemplate(station.number, 'velocite-map-marker--neutral');
	}

	const active = getStatusValue(station, selectedFilter as StatusFilter);
	const icon = getStatusIcon(selectedFilter as StatusFilter, active);
	const stateClass = active ? 'velocite-map-marker--status-on' : 'velocite-map-marker--status-off';

	return markerTemplate(`<span class="velocite-map-marker__icon">${icon}</span>`, stateClass);
}

export const MIN_MARKER_ZOOM = 13;

export function renderStationMarkers(
	leaflet: typeof import('leaflet'),
	markersLayer: LayerGroup,
	stations: FormattedStation[],
	selectedFilter: VelociteSortField,
	currentZoom: number = MIN_MARKER_ZOOM
): void {
	markersLayer.clearLayers();

	if (currentZoom < MIN_MARKER_ZOOM) return;

	for (const station of stations) {
		const icon: DivIcon = leaflet.divIcon({
			html: buildMarkerHtml(station, selectedFilter),
			className: 'velocite-map-div-icon',
			iconSize: [42, 42],
			iconAnchor: [21, 21]
		});

		const marker = leaflet
			.marker([station.position.latitude, station.position.longitude], {
				icon,
				keyboard: false
			})
			.bindTooltip(`${station.formattedName}`, {
				direction: 'top',
				offset: [0, -18]
			})
			.on('click', () => {
				void goto(resolve(`/velocite/${station.number}`));
			});

		marker.addTo(markersLayer);
	}
}
