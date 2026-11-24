import { getLignes } from '$core/api/GinkoApi';
import type { Ligne } from '$core/dto/ginko';
import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { isAuthorized } from '$core/helper/api';

export const GET: RequestHandler = async ({ request, url }) => {
	if (!isAuthorized(request, url.origin)) {
		error(403, 'Forbidden');
	}

	const lignes: Ligne[] = await getLignes();
	return Response.json(lignes);
};
