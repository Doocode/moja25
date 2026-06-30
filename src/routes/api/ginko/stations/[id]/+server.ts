import { getDetailsArret, getTempsLieu } from '$core/api/GinkoApi';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { isAuthorized } from '../../../helper';

export const GET: RequestHandler = async ({ request, url, params }) => {
	if (!isAuthorized(request, url.origin)) {
		error(403, 'Forbidden');
	}

	const id = params.id?.trim();
	if (!id) {
		error(400, 'Missing station id');
	}

	const nom = url.searchParams.get('nom')?.trim();
	const nbParam = url.searchParams.get('nb')?.trim();
	const parsedNb = nbParam ? Number.parseInt(nbParam, 10) : NaN;
	const nb = Number.isFinite(parsedNb) && parsedNb > 0 ? parsedNb : 1;
	const [arret, tempsLieu] = await Promise.all([
		getDetailsArret({ id }),
		getTempsLieu({
			nb,
			...(nom ? { nom } : { idArret: id })
		})
	]);

	return json({ arret, tempsLieu });
};
