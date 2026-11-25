import type { PageServerLoad } from './$types';
import { getLignes } from '#core/api/GinkoApi.ts';
import type { Ligne } from '#core/dto/ginko/index.ts';

export const load: PageServerLoad = async () => {
	const lignes: Ligne[] = await getLignes();
	return { lignes };
};
