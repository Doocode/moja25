import { getDetailsVehicule_DR } from '#core/api/GinkoApi.ts';
import type { VehiculeDR } from '#core/dto/ginko/index.ts';
import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { isAuthorized } from '#core/helper/api.ts';

export const GET: RequestHandler = async ({ request, url, params }) => {
	if (!isAuthorized(request, url.origin)) {
		error(403, 'Forbidden');
	}

	const num = params.num.trim();
	if (!num) {
		error(404, 'Véhicule introuvable');
	}

	const vehicule: VehiculeDR = await getDetailsVehicule_DR({ num });

	if (!vehicule) {
		error(404, 'Véhicule introuvable');
	}

	return Response.json(vehicule);
};
