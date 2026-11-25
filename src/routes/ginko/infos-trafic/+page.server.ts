import type { PageServerLoad } from './$types';
import { getLignes, getEtatLignes } from '#core/api/GinkoApi.ts';
import type { Ligne, InfoLigne } from '#core/dto/ginko/index.ts';

export const load: PageServerLoad = async () => {
	const [etatLignes, lignes]: [InfoLigne[], Ligne[]] = await Promise.all([
		getEtatLignes(),
		getLignes()
	]);
	return { etatLignes, lignes };
};
