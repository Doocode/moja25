import type { Arret, FormattedArret } from '$core/dto/ginko';
import { KindOfStop, kindOfStop } from './stops';

export function formatArrets(arrets: Arret[]): FormattedArret[] {
	const groups = new Map<string, Arret[]>();

	// Group arrets by their name to aggregate children under the same stop name
	for (const arret of arrets) {
		const group = groups.get(arret.nom);
		if (group) group.push(arret);
		else groups.set(arret.nom, [arret]);
	}

	// Group arrets by their name to aggregate children under the same stop name
	return Array.from(groups.values(), (group) => {
		if (group.length === 1) return group[0];

		// Sort children so that trams come first, then buses
		const children = [...group].sort(
			(a, b) =>
				Number(kindOfStop(b) === KindOfStop.Tram) - Number(kindOfStop(a) === KindOfStop.Tram)
		);

		// Return a formatted arret with aggregated children information
		return {
			...children[0],
			intemperie: children.some((arret) => arret.intemperie),
			childrenIds: children.map((arret) => arret.id),
			children
		};
	});
}
