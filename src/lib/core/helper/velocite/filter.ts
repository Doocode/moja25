import type { FormattedStation } from '$core/dto/jcdecaux';
import { normalize } from '../string';

// Filtre les stations dont le nom contient la requête (insensible à la casse et aux accents)
export function filterStations(stations: FormattedStation[], query: string): FormattedStation[] {
	const normalizedQuery = normalize(query.trim());
	if (!normalizedQuery) return stations;

	return stations.filter((station) => normalize(station.name).includes(normalizedQuery));
}
