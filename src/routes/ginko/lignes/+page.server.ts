import type { PageServerLoad } from './$types';
import { getLignes } from '$core/api/GinkoApi';
import type { Ligne } from '$core/dto/ginko';

export const load: PageServerLoad = async () => {
	const lignes: Ligne[] = await getLignes();
	return { lignes };
};
