import type { FormattedStation } from '#core/dto/jcdecaux/index.ts';

// Normalize a string: remove accents and convert to lowercase
function normalize(str: string): string {
	return str
		.normalize('NFD') // Normalize diacritics
		.replace(/[\u0300-\u036f]/g, '') // Remove diacritics (accents, cedillas, umlauts…)
		.toLowerCase();
}

// Filter stations whose name or address contains the query (case and accent insensitive)
export function filterStations(stations: FormattedStation[], query: string): FormattedStation[] {
	const normalizedQuery = normalize(query.trim());
	if (!normalizedQuery) return stations;

	return stations.filter(
		(station) =>
			normalize(station.name).includes(normalizedQuery) ||
			normalize(station.address).includes(normalizedQuery)
	);
}
