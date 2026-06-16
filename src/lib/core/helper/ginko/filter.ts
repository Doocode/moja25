import type { Arret } from '$lib/core/dto/ginko';
import { normalize } from '../string';

export function filterArrets(arrets: Arret[], query: string): Arret[] {
	const normalizedQuery = normalize(query.trim());
	if (!normalizedQuery) return arrets;

	return arrets.filter((arret) => normalize(arret.nom).includes(normalizedQuery));
}
