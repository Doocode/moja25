import type { TempsAttente } from '$core/dto/ginko';

// Time types (typeDeTemps field)
export const TypeDeTemps = {
	Duree: 0, // e.g. '2 min'
	Horaire: 1, // e.g. '17:30'
	Texte: 2 // e.g. 'Déviation', 'Bus complet'
} as const;

export interface WaitingTimeGroup {
	key: string;
	ligne: Pick<TempsAttente, 'numLignePublic' | 'couleurFond' | 'couleurTexte'>;
	destination: string;
	precisionDestination: string;
	temps: TempsAttente[];
}

// Groups waiting times by line, direction and destination.
// The order provided by the API (by line/direction, then ascending time) is preserved.
export function groupWaitingTimes(list: TempsAttente[]): WaitingTimeGroup[] {
	const groups = new Map<string, WaitingTimeGroup>();

	for (const t of list) {
		const key = [t.idLigne, t.sensAller, t.destination, t.precisionDestination].join('|');
		const group = groups.get(key);
		if (group) {
			group.temps.push(t);
		} else {
			groups.set(key, {
				key,
				ligne: {
					numLignePublic: t.numLignePublic,
					couleurFond: t.couleurFond,
					couleurTexte: t.couleurTexte
				},
				destination: t.destination,
				precisionDestination: t.precisionDestination,
				temps: [t]
			});
		}
	}

	return [...groups.values()];
}

// The *HTML fields contain <span> formatting tags: only the text is kept
export function htmlToText(html: string): string {
	return html
		.replace(/<[^>]*>/g, ' ')
		.replace(/\s+/g, ' ')
		.trim();
}

// Texts to alternate (every 3 seconds); a single text when there is no alternation
export function getDisplayTexts(t: TempsAttente): string[] {
	const main = t.tempsHTML ? htmlToText(t.tempsHTML) : t.temps;
	if (t.alternance && t.tempsHTMLEnAlternance) {
		const alt = htmlToText(t.tempsHTMLEnAlternance);
		if (alt && alt !== main) return [main, alt];
	}
	return [main];
}
