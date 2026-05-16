import type { FormattedStation, Station } from '$core/dto/jcdecaux';

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

// Trie les stations selon un champ et un ordre spécifiés
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
					return getUnavailableStands(s);
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

export function getUnavailableStands(station: FormattedStation | Station): number {
	return (
		station.totalStands.capacity -
		station.totalStands.availabilities.bikes -
		station.totalStands.availabilities.stands
	);
}
