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
			return 'velocite-map-marker--success';
	}
}

export function buildMarkerHtml(
	station: FormattedStation,
	selectedFilter: VelociteSortField
): string {
	if (countFilters.includes(selectedFilter)) {
		const value = getCountValue(station, selectedFilter as CountFilter) || 0;
		return `<div class="velocite-map-marker ${getCountColorClass(value, selectedFilter)}"><span>${value}</span></div>`;
	}

	if (numberFilters.includes(selectedFilter)) {
		const value = getNumberValue(station, selectedFilter as NumberFilter);
		return `<div class="velocite-map-marker velocite-map-marker--neutral"><span>${value}</span></div>`;
	}

	if (!statusFilters.includes(selectedFilter)) {
		return `<div class="velocite-map-marker velocite-map-marker--neutral"><span>${station.number}</span></div>`;
	}

	const active = getStatusValue(station, selectedFilter as StatusFilter);
	const icon = getStatusIcon(selectedFilter as StatusFilter, active);
	const stateClass = active ? 'velocite-map-marker--status-on' : 'velocite-map-marker--status-off';

	return `<div class="velocite-map-marker ${stateClass}"><span class="velocite-map-marker__icon">${icon}</span></div>`;
}

export function renderStationMarkers(
	leaflet: typeof import('leaflet'),
	markersLayer: LayerGroup,
	stations: FormattedStation[],
	selectedFilter: VelociteSortField
): void {
	markersLayer.clearLayers();

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
			});

		marker.addTo(markersLayer);
	}
}
