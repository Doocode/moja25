import type { FormattedStation } from '$core/dto/jcdecaux';

// Normalise une chaîne : supprime les accents et met en minuscule
function normalize(str: string): string {
	return str
		.normalize('NFD') // Décompose les caractères accentués en caractère de base + diacritique (ex: "é" → "e" + "´")
		.replace(/[\u0300-\u036f]/g, '') // Supprime les diacritiques (accents, cédilles, trémas…)
		.toLowerCase();
}

// Filtre les stations dont le nom contient la requête (insensible à la casse et aux accents)
export function filterStations(stations: FormattedStation[], query: string): FormattedStation[] {
	const normalizedQuery = normalize(query.trim());
	if (!normalizedQuery) return stations;

	return stations.filter((station) => normalize(station.name).includes(normalizedQuery));
}
