import type { Temps } from '$core/dto/ginko';

export interface GroupedTempsByLine {
	key: string;
	idLigne: string;
	numLignePublic: string;
	couleurFond: string;
	couleurTexte: string;
	sensAller: boolean;
	destination: string;
	precisionDestination: string;
	modeTransport: number;
	estimations: Temps[];
}

export function groupTempsByLineAndDirection(
	tempsList: Temps[],
	maxItemsPerGroup = 3
): GroupedTempsByLine[] {
	const groups = new Map<string, GroupedTempsByLine>();

	for (const temps of tempsList) {
		const key = `${temps.idLigne}-${temps.sensAller ? 'aller' : 'retour'}`;
		const existing = groups.get(key);

		if (!existing) {
			groups.set(key, {
				key,
				idLigne: temps.idLigne,
				numLignePublic: temps.numLignePublic,
				couleurFond: temps.couleurFond,
				couleurTexte: temps.couleurTexte,
				sensAller: temps.sensAller,
				destination: temps.destination,
				precisionDestination: temps.precisionDestination,
				modeTransport: temps.modeTransport,
				estimations: [temps]
			});
			continue;
		}

		existing.estimations.push(temps);
		if (!existing.precisionDestination && temps.precisionDestination) {
			existing.precisionDestination = temps.precisionDestination;
		}
	}

	return Array.from(groups.values()).map((group) => ({
		...group,
		estimations: group.estimations.slice(0, Math.max(1, maxItemsPerGroup))
	}));
}
