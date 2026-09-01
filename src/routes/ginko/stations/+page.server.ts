import { getArrets } from '$lib/core/api/GinkoApi';
import type { Arret } from '$core/dto/ginko';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const arrets: Arret[] = await getArrets();
	return { arrets };
};
