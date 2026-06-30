import { getDetailsArret, getTempsLieu } from '$core/api/GinkoApi';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

const ARRIVALS_PER_LINE = 3;

export const load: PageServerLoad = async ({ params }) => {
	const id = params.id?.trim();
	if (!id) {
		error(400, 'Missing station id');
	}

	const [arret, tempsLieu] = await Promise.all([
		getDetailsArret({ id }),
		getTempsLieu({ idArret: id, nb: ARRIVALS_PER_LINE })
	]);

	return {
		arret,
		tempsLieu,
		arrivalsPerLine: ARRIVALS_PER_LINE
	};
};
