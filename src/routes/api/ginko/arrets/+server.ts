import { getArrets } from '#core/api/GinkoApi.ts';
import type { Arret } from '#core/dto/ginko/index.ts';
import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { isAuthorized } from '#core/helper/api.ts';

export const GET: RequestHandler = async ({ request, url }) => {
	if (!isAuthorized(request, url.origin)) {
		error(403, 'Forbidden');
	}

	const arrets: Arret[] = await getArrets();
	return Response.json(arrets);
};
