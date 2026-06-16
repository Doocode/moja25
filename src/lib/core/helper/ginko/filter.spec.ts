import { describe, expect, it } from 'vitest';
import { filterArrets } from './filter';
import type { Arret } from '$lib/core/dto/ginko';

function makeArret(nom: string, id = '1'): Arret {
	return {
		id,
		nom,
		latitude: 0,
		longitude: 0,
		accessibilite: 0
	};
}

const arrets: Arret[] = [
	makeArret('Gare Viotte'),
	makeArret('République'),
	makeArret('Pôle Temis'),
	makeArret('Chalezeule - Gare'),
	makeArret('Besançon - Porte de Vesoul')
];

describe('filterArrets', () => {
	it('should return all arrets when query is empty', () => {
		const result = filterArrets(arrets, '');
		expect(result).toEqual(arrets);
	});

	it('should filter arrets by name (case insensitive)', () => {
		const result = filterArrets(arrets, 'gare');
		expect(result).toEqual([makeArret('Gare Viotte'), makeArret('Chalezeule - Gare')]);
	});

	it('should filter arrets by name (accent insensitive)', () => {
		const result = filterArrets(arrets, 'temis');
		expect(result).toEqual([makeArret('Pôle Temis')]);
	});

	it('should return an empty array when no arrets match the query', () => {
		const result = filterArrets(arrets, 'nonexistent');
		expect(result).toEqual([]);
	});
});
