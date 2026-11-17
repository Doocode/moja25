import { describe, expect, it } from 'vitest';
import type { Arret } from '$lib/core/dto/ginko';
import { formatArret, groupArrets, splitNomArret } from './format';

function makeArret(name: string, id: string = crypto.randomUUID()): Arret {
	return {
		id: id,
		nom: name,
		latitude: 0,
		longitude: 0,
		accessibilite: 0,
		intemperie: false
	};
}

const arrets = [
	makeArret('Besançon', 'besac_01'),
	makeArret('Besançon', 'besac_02'),
	makeArret('Besançon', 'besac_03'),
	makeArret('Besançon', 'besac_04'),
	makeArret('Besançon - Gare', 'besac_gare'),
	makeArret('Besançon - Centre', 'besac_centre'),
	makeArret('Besançon - Campus', 'besac_campus'),
	makeArret('Besançon - Hopital', 'besac_hopital')
];

describe('splitNomArret', () => {
	it('sépare la ville du nom de la station au premier séparateur', () => {
		expect(splitNomArret('Besançon - Gare - Viotte')).toEqual({
			ville: 'Besançon',
			station: 'Gare - Viotte'
		});
	});

	it('garde le nom complet si le séparateur ou une partie manque', () => {
		expect(splitNomArret('Gare-Viotte')).toBeUndefined();
		expect(splitNomArret(' - Gare')).toBeUndefined();
		expect(splitNomArret('Besançon - ')).toBeUndefined();
	});
});

describe('groupArrets', () => {
	it('regroupe les quais de même nom et conserve les stations uniques', () => {
		const result = groupArrets(arrets.map(formatArret));

		expect(result).toHaveLength(5);
		expect(result[0]).toMatchObject({
			id: 'besac_01',
			childrenIds: ['besac_01', 'besac_02', 'besac_03', 'besac_04'],
			children: arrets.slice(0, 4)
		});
		expect(result.slice(1)).toEqual(arrets.slice(4).map(formatArret));
		expect(result[1].nomDecoupe).toEqual({ ville: 'Besançon', station: 'Gare' });
	});

	it('privilégie un quai de tram et signale les intempéries de tous les quais', () => {
		const bus = { ...makeArret('Gare', 'bus'), intemperie: true };
		const tram = makeArret('Gare', 't_tram');
		const input = [bus, tram];

		const [parent] = groupArrets(input.map(formatArret));
		expect(parent).toMatchObject({
			id: 't_tram',
			intemperie: true,
			childrenIds: ['t_tram', 'bus'],
			children: [tram, bus]
		});
		expect(input).toEqual([bus, tram]);
		expect(tram.intemperie).toBe(false);
	});

	it('ne regroupe pas les noms différents et accepte une liste vide', () => {
		expect(groupArrets([])).toEqual([]);
		const input = [makeArret('Gare', '1'), makeArret('Gare - Centre', '2')];
		expect(groupArrets(input.map(formatArret))).toEqual(input.map(formatArret));
	});

	it('conserve le nom complet et le nom découpé du parent et de ses quais', () => {
		const input = [makeArret('Besançon - Gare', '1'), makeArret('Besançon - Gare', '2')];
		const [parent] = groupArrets(input.map(formatArret));

		expect(parent.nom).toBe('Besançon - Gare');
		expect(parent.nomDecoupe).toEqual({ ville: 'Besançon', station: 'Gare' });
		expect(parent.children?.map((child) => child.nomDecoupe)).toEqual([
			parent.nomDecoupe,
			parent.nomDecoupe
		]);
	});
});
