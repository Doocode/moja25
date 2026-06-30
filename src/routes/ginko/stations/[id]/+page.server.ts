import { getDetailsArret, getTempsLieu, getVariantesDesservantArret } from '$core/api/GinkoApi';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

const ARRIVALS_PER_LINE = 3;

export const load: PageServerLoad = async ({ params, url }) => {
	const id = params.id?.trim();
	if (!id) {
		error(400, 'Missing station id');
	}

	const nom = url.searchParams.get('nom')?.trim();

	const [arret, tempsLieu, variantes] = await Promise.all([
		getDetailsArret({ id }),
		getTempsLieu({
			nb: ARRIVALS_PER_LINE,
			...(nom ? { nom } : { idArret: id })
		}),
		getVariantesDesservantArret({ idArret: id })
	]);

	return {
		arret,
		tempsLieu,
		variantes,
		nomQuery: nom ?? null,
		arrivalsPerLine: ARRIVALS_PER_LINE
	};
};
