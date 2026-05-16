import { describe, expect, it } from 'vitest';
import { filterStations } from './filter';
import type { Availabilities, FormattedStation, Stands } from '$core/dto/jcdecaux';

// Crée une station minimale pour les tests
function makeStation(name: string, id = 0): FormattedStation {
	const availabilities: Availabilities = {
		bikes: 10,
		stands: 20,
		mechanicalBikes: 5,
		electricalBikes: 5,
		electricalInternalBatteryBikes: 0,
		electricalRemovableBatteryBikes: 0
	};
	const stands: Stands = {
		availabilities,
		capacity: 30
	};

	return {
		number: id,
		name,
		formattedName: name,
		address: '',
		position: { latitude: 0, longitude: 0 },
		banking: false,
		bonus: false,
		status: 'OPEN',
		connected: true,
		overflow: false,
		contractName: 'besancon',
		lastUpdate: 0,
		totalStands: stands,
		mainStands: stands
	} as FormattedStation;
}

const stations = [
	makeStation('1 - GARE VIOTTE (CB)', 1),
	makeStation('2 - PLACE DE LA REPUBLIQUE (CB)', 2),
	makeStation('3 - ILE DE FRANCE (CB)', 3),
	makeStation('4 - HOPITAL SAINT-JACQUES (CB)', 4),
	makeStation('5 - SAINT-FERJEUX', 5)
];

describe('filterStations', () => {
	it('retourne toutes les stations si la requête est vide', () => {
		expect(filterStations(stations, '')).toHaveLength(stations.length);
	});

	it('retourne toutes les stations si la requête ne contient que des espaces', () => {
		expect(filterStations(stations, '   ')).toHaveLength(stations.length);
	});

	it('filtre par correspondance exacte (casse insensible)', () => {
		const result = filterStations(stations, 'gare');
		expect(result).toHaveLength(1);
		expect(result[0].name).toBe('1 - GARE VIOTTE (CB)');
	});

	it('filtre sans tenir compte de la casse', () => {
		expect(filterStations(stations, 'GARE')).toHaveLength(1);
		expect(filterStations(stations, 'Gare')).toHaveLength(1);
		expect(filterStations(stations, 'gArE')).toHaveLength(1);
	});

	it('recherche sans accent trouve les stations avec accent', () => {
		const result = filterStations(stations, 'hopital');
		expect(result).toHaveLength(1);
		expect(result[0].name).toBe('4 - HÔPITAL SAINT-JACQUES (CB)');
	});

	it('recherche avec accent fonctionne aussi', () => {
		const result = filterStations(stations, 'hôpital');
		expect(result).toHaveLength(1);
		expect(result[0].name).toBe('4 - HOPITAL SAINT-JACQUES (CB)');
	});

	it('recherche sans accent trouve les stations avec é, è, ê', () => {
		const withAccent = [makeStation('6 - EGLISE SAINT-PIERRE (CB)'), ...stations];
		expect(filterStations(withAccent, 'eglise')).toHaveLength(1);
		expect(filterStations(withAccent, 'église')).toHaveLength(1);
	});

	it('retourne plusieurs résultats correspondants', () => {
		const result = filterStations(stations, 'PLACE');
		expect(result).toHaveLength(1);
	});

	it('retourne un tableau vide si aucune station ne correspond', () => {
		expect(filterStations(stations, 'XYZ_INEXISTANT')).toHaveLength(0);
	});

	it('recherche dans le nom brut (Station.name) et non dans formattedName', () => {
		// Le numéro "1 -" est dans name mais pas dans formattedName
		const result = filterStations(stations, '1 - GARE');
		expect(result).toHaveLength(1);
	});
});
