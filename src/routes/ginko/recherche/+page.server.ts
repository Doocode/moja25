import type { PageServerLoad } from './$types';
import { getArrets } from '$core/api/GinkoApi';
import type { Arret } from '$core/dto/ginko';
import { formatArrets } from '$core/helper/ginko/format';

const GROUP_STATIONS = true;

export const load: PageServerLoad = async () => {
	const arrets: Arret[] = await getArrets();
	return { arrets: GROUP_STATIONS ? formatArrets(arrets) : arrets };
};
