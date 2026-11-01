import type { PageServerLoad } from './$types';
import { getLignes, getEtatLignes } from '$core/api/GinkoApi';
import type { Ligne, InfoLigne } from '$core/dto/ginko';

export const load: PageServerLoad = async () => {
	const [etatLignes, lignes]: [InfoLigne[], Ligne[]] = await Promise.all([
		getEtatLignes(),
		getLignes()
	]);
	return { etatLignes, lignes };
};
