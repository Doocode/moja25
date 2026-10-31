import { goto } from '$app/navigation';
import { resolve } from '$app/paths';
import type { FormattedStation } from '$core/dto/jcdecaux';
import { VelociteSortField } from '$core/enum/VelociteSortField';
import { StationColorStatus, getStationColorStatus } from '../shared/core/sort-config';
import { countFilters, numberFilters, statusFilters } from './filters';
import { getAlertState, getDisplayedFilter } from './alternation';
import type { DivIcon, LayerGroup, Marker } from 'leaflet';

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
	if (field === VelociteSortField.BANKING) return active ? 'CB' : '✕';
	if (field === VelociteSortField.OPEN) return active ? '✓' : '✕';
	return active ? '✓' : '✕';
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

export function compactMarkerTemplate(
	variantClass: string = 'velocite-map-marker--neutral',
	size: number = 25
): string {
	return `<div class="velocite-map-marker-compact ${variantClass}" style="--marker-size:${size}px"></div>`;
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

export function getStationVariantClass(
	station: FormattedStation,
	selectedFilter: VelociteSortField
): string {
	if (countFilters.includes(selectedFilter)) {
		const value = getCountValue(station, selectedFilter as CountFilter) || 0;
		return getCountColorClass(value, selectedFilter);
	}

	if (numberFilters.includes(selectedFilter)) {
		return 'velocite-map-marker--neutral';
	}

	if (!statusFilters.includes(selectedFilter)) {
		return 'velocite-map-marker--neutral';
	}

	const active = getStatusValue(station, selectedFilter as StatusFilter);
	return active ? 'velocite-map-marker--status-on' : 'velocite-map-marker--status-off';
}

export function buildCompactMarkerHtml(
	station: FormattedStation,
	selectedFilter: VelociteSortField,
	size?: number
): string {
	const variantClass = getStationVariantClass(station, selectedFilter);
	return compactMarkerTemplate(variantClass, size);
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

export const COMPACT_MARKER_ZOOM_THRESHOLD = 14.5;
export const MIN_MARKER_ZOOM = 10;
export const COMPACT_MARKER_MAX_SIZE = 25;
export const COMPACT_MARKER_MIN_SIZE = 6;

// Compact marker size shrinks linearly as the zoom goes from the threshold down to the minimum zoom.
export function getCompactMarkerSize(zoom: number): number {
	const ratio = Math.min(
		1,
		Math.max(0, (zoom - MIN_MARKER_ZOOM) / (COMPACT_MARKER_ZOOM_THRESHOLD - MIN_MARKER_ZOOM))
	);
	return Math.round(
		COMPACT_MARKER_MIN_SIZE + ratio * (COMPACT_MARKER_MAX_SIZE - COMPACT_MARKER_MIN_SIZE)
	);
}

// Creates the icon for a station, in compact (low zoom) or full version.
function createStationIcon(
	leaflet: typeof import('leaflet'),
	station: FormattedStation,
	displayedFilter: VelociteSortField,
	isCompact: boolean,
	compactSize: number
): DivIcon {
	const html = isCompact
		? buildCompactMarkerHtml(station, displayedFilter, compactSize)
		: buildMarkerHtml(station, displayedFilter);
	const size = isCompact ? compactSize : 42;

	return leaflet.divIcon({
		html,
		className: 'velocite-map-div-icon',
		iconSize: [size, size],
		iconAnchor: [size / 2, size / 2],
		popupAnchor: [0, -size / 2]
	});
}

const POPUP_ICONS = {
	mechanical:
		'<circle cx="18.5" cy="17.5" r="3.5"/><circle cx="5.5" cy="17.5" r="3.5"/><circle cx="15" cy="5" r="1"/><path d="M12 17.5V14l-3-3 4-3 2 3h2"/>',
	electrical:
		'<path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/>',
	stands: '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M9 17V7h4a3 3 0 0 1 0 6H9"/>'
} as const;

function escapeHtml(text: string): string {
	return text
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;');
}

function popupRow(kind: keyof typeof POPUP_ICONS, label: string, value: number): string {
	const empty = value <= 0 ? ' velocite-popup__row--empty' : '';
	return `<div class="velocite-popup__row${empty}">
		<span class="velocite-popup__icon velocite-popup__icon--${kind}">
			<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${POPUP_ICONS[kind]}</svg>
		</span>
		<span class="velocite-popup__label">${label}</span>
		<strong class="velocite-popup__value">${value}</strong>
	</div>`;
}

export function buildStationPopup(station: FormattedStation, href: string): HTMLElement {
	const { availabilities } = station.totalStands;
	const container = document.createElement('div');
	container.className = 'velocite-popup';
	container.innerHTML = `
		<h3 class="velocite-popup__title">${escapeHtml(station.formattedName)}</h3>
		${popupRow('mechanical', 'Vélos mécaniques', availabilities.mechanicalBikes)}
		${popupRow('electrical', 'Vélos électriques', availabilities.electricalBikes)}
		${popupRow('stands', 'Places disponibles', availabilities.stands)}
		<a class="velocite-popup__link" href="${escapeHtml(href)}">Ouvrir la station</a>`;

	// Client-side navigation instead of a full page load
	container.querySelector('a')?.addEventListener('click', (event) => {
		event.preventDefault();
		void goto(href);
	});

	return container;
}

/**
 * Redraws all markers (list, layer, or zoom changed).
 * Returns the map of station [number -> marker], to update icons without redrawing everything.
 */
export function renderStationMarkers(
	leaflet: typeof import('leaflet'),
	markersLayer: LayerGroup,
	stations: FormattedStation[],
	selectedFilter: VelociteSortField,
	currentZoom: number,
	blink: boolean
): Map<number, Marker> {
	markersLayer.clearLayers();
	const markers = new Map<number, Marker>();

	if (currentZoom < MIN_MARKER_ZOOM) return markers;

	const isCompact = currentZoom < COMPACT_MARKER_ZOOM_THRESHOLD;
	// The tooltip offset follows the size of the marker
	const compactSize = getCompactMarkerSize(currentZoom);
	const tooltipOffset: [number, number] = isCompact
		? [0, -Math.round(compactSize / 2) - 3]
		: [0, -18];

	for (const station of stations) {
		const displayedFilter = getDisplayedFilter(station, selectedFilter, blink);
		const marker = leaflet
			.marker([station.position.latitude, station.position.longitude], {
				icon: createStationIcon(leaflet, station, displayedFilter, isCompact, compactSize),
				keyboard: false
			})
			.bindTooltip(station.formattedName, { direction: 'top', offset: tooltipOffset })
			.bindPopup(
				buildStationPopup(station, resolve('/velocite/stations/[id]', { id: `${station.number}` })),
				{ closeButton: true, minWidth: 220 }
			);

		marker.addTo(markersLayer);
		markers.set(station.number, marker);
	}

	return markers;
}

/**
 * Called every second to update the icons of stations that need to blink.
 * Only updates the markers of stations that need to blink.
 */
export function blinkStationMarkers(
	leaflet: typeof import('leaflet'),
	stations: FormattedStation[],
	markers: Map<number, Marker>,
	selectedFilter: VelociteSortField,
	currentZoom: number,
	blink: boolean
): void {
	if (currentZoom < MIN_MARKER_ZOOM) return;

	const isCompact = currentZoom < COMPACT_MARKER_ZOOM_THRESHOLD;
	const compactSize = getCompactMarkerSize(currentZoom);

	for (const station of stations) {
		if (!getAlertState(station, selectedFilter)) continue;

		const marker = markers.get(station.number);
		if (!marker) continue;

		const displayedFilter = getDisplayedFilter(station, selectedFilter, blink);
		marker.setIcon(createStationIcon(leaflet, station, displayedFilter, isCompact, compactSize));
	}
}
