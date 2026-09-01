import { getArrets } from '$core/api/GinkoApi';
import type { Arret } from '$core/dto/ginko';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { isAuthorized } from '../../helper';

export const GET: RequestHandler = async ({ request, url }) => {
	if (!isAuthorized(request, url.origin)) {
		error(403, 'Forbidden');
	}

	const arrets: Arret[] = await getArrets();
	return json(arrets);
};
