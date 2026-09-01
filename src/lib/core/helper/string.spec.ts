import { describe, expect, it } from 'vitest';
import { normalize } from './string';

describe('normalize', () => {
	it('supprime les accents et met en minuscule', () => {
		expect(normalize('Éléphant')).toBe('elephant');
		expect(normalize('Café')).toBe('cafe');
		expect(normalize('àéîöü')).toBe('aeiou');
		expect(normalize('Besançon')).toBe('besancon');
	});
	it('gère les chaînes vides', () => {
		expect(normalize('')).toBe('');
	});
	it('gère les chaînes sans accents', () => {
		expect(normalize('Hello World')).toBe('hello world');
	});
});
