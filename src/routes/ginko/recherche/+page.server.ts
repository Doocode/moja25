import type { PageServerLoad } from './$types';
import { getArrets } from '#core/api/GinkoApi.ts';
import type { Arret } from '#core/dto/ginko/index.ts';
import { formatArret, groupArrets } from '#core/helper/ginko/format.ts';

const GROUP_STATIONS = true;

export const load: PageServerLoad = async () => {
	const arrets: Arret[] = await getArrets();
	const formattedArrets = arrets.map(formatArret);
	return { arrets: GROUP_STATIONS ? groupArrets(formattedArrets) : formattedArrets };
};
