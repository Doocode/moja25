import { describe, expect, it } from 'vitest';
import { formatStationName } from './velocite';

describe('formatStationName', () => {
	it('retire le numéro et le tiret au début', () => {
		expect(formatStationName('12345 - GARE VIOTTE (CB)')).toBe('Gare Viotte');
	});

	it('retire le "(CB)" à la fin', () => {
		expect(formatStationName('1 - REPUBLIQUE (CB)')).toBe('Republique');
	});

	it('capitalise la première lettre de chaque mot', () => {
		expect(formatStationName('42 - PLACE DU MARCHE (CB)')).toBe('Place Du Marche');
	});

	it('met le reste des lettres en minuscule', () => {
		expect(formatStationName('7 - MAIRIE CENTRALE (CB)')).toBe('Mairie Centrale');
	});

	it('garde "IUT" en majuscules', () => {
		expect(formatStationName('99 - IUT NORD (CB)')).toBe('IUT Nord');
	});

	it('garde "CHU" en majuscules même si en minuscule dans le nom', () => {
		expect(formatStationName('99 - chu sud (CB)')).toBe('CHU Sud');
	});

	it('gère les espaces superflus autour de "(CB)"', () => {
		expect(formatStationName('5 - BATTANT  (CB)  ')).toBe('Battant');
	});

	it('gère un nom sans numéro ni "(CB)"', () => {
		expect(formatStationName('CHAMARS')).toBe('Chamars');
	});
});
