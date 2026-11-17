import type { Arret, FormattedArret } from '$core/dto/ginko';
import { KindOfStop, kindOfStop } from './stops';

export function splitNomArret(nom: string): FormattedArret['nomDecoupe'] {
	const separator = nom.indexOf(' - ');
	if (separator === -1) return undefined;

	const ville = nom.slice(0, separator).trim();
	const station = nom.slice(separator + 3).trim();
	return ville && station ? { ville, station } : undefined;
}

export function formatArret(arret: Arret): FormattedArret {
	const nomDecoupe = splitNomArret(arret.nom);
	return nomDecoupe ? { ...arret, nomDecoupe } : { ...arret };
}

export function groupArrets(arrets: FormattedArret[]): FormattedArret[] {
	const groups = new Map<string, FormattedArret[]>();

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
