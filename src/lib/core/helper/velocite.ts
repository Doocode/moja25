import type { FormattedStation } from '../dto/jcdecaux';

// Champs de tri disponibles pour les stations Vélocité
export enum VelociteSortField {
	NAME = 'NAME',
	NUMBER = 'NUMBER',
	MECHANICAL_BIKES = 'MECHANICAL_BIKES',
	ELECTRICAL_BIKES = 'ELECTRICAL_BIKES',
	TOTAL_BIKES = 'TOTAL_BIKES',
	AVAILABLE_STANDS = 'AVAILABLE_STANDS',
	UNAVAILABLE_STANDS = 'UNAVAILABLE_STANDS',
	CAPACITY = 'CAPACITY',
	BONUS = 'BONUS',
	BANKING = 'BANKING',
	OPEN = 'OPEN',
	CONNECTED = 'CONNECTED'
}

export function sortStations(
	stations: FormattedStation[],
	field: VelociteSortField,
	ascending: boolean
): FormattedStation[] {
	return [...stations].sort((a, b) => {
		const getValue = (s: FormattedStation): string | number => {
			switch (field) {
				case VelociteSortField.NAME:
					return s.formattedName;
				case VelociteSortField.NUMBER:
					return s.number;
				case VelociteSortField.MECHANICAL_BIKES:
					return s.mainStands.availabilities.mechanicalBikes;
				case VelociteSortField.ELECTRICAL_BIKES:
					return s.mainStands.availabilities.electricalBikes;
				case VelociteSortField.TOTAL_BIKES:
					return s.mainStands.availabilities.bikes;
				case VelociteSortField.AVAILABLE_STANDS:
					return s.mainStands.availabilities.stands;
				case VelociteSortField.UNAVAILABLE_STANDS:
					return (
						s.totalStands.capacity -
						s.mainStands.availabilities.bikes -
						s.mainStands.availabilities.stands
					);
				case VelociteSortField.CAPACITY:
					return s.totalStands.capacity;
				case VelociteSortField.BONUS:
					return Number(s.bonus);
				case VelociteSortField.BANKING:
					return Number(s.banking);
				case VelociteSortField.OPEN:
					return Number(s.status === 'OPEN');
				case VelociteSortField.CONNECTED:
					return Number(s.connected);
			}
		};

		const valA = getValue(a);
		const valB = getValue(b);
		const cmp =
			typeof valA === 'string' && typeof valB === 'string'
				? valA.localeCompare(valB)
				: (valA as number) - (valB as number);

		return ascending ? cmp : -cmp;
	});
}

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
