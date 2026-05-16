import type { FormattedStation } from '$core/dto/jcdecaux';

// Mots à conserver en majuscules
const UPPERCASE_WORDS = [
	// Universités et instituts
	'BU', // Bibliothèque Universitaire
	'IUT', // Institut Universitaire de Technologie
	'UFC',
	'UFR',
	'IAE',
	'ISBA',
	'AFPA',
	'CNRS',
	'SHLS',
	'ISTA',
	'ISIFC',
	'SJEPG',
	'STAPS',

	// Hopitaux et centres de santé
	'CH', // Centre Hospitalier
	'EFS', // Établissement Français du Sang
	'CHU', // Centre Hospitalier Universitaire
	'CHRU', // Centre Hospitalier Régional Universitaire

	// Autres lieux
	'CAF' // Caisse d'Allocations Familiales
];

// Formate le nom d'une station Vélocité JCDecaux
// Ex: "12345 - STATION NAME (CB)" → "Station Name"
export function formatStationName(name: string): string {
	// Retire le numéro et le tiret au début : "12345 - "
	let formatted = name.replace(/^\d+\s*-\s*/, '');

	// Retire "(CB)" à la fin
	formatted = formatted.replace(/\s*\(CB\)\s*$/i, '').trim();

	// Capitalise chaque mot, sauf ceux dans UPPERCASE_WORDS qui restent en majuscules
	return formatted
		.split(' ')
		.map((word) => {
			if (UPPERCASE_WORDS.includes(word.toUpperCase())) {
				return word.toUpperCase();
			}
			return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
		})
		.join(' ');
}
