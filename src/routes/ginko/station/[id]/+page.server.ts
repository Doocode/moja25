import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { Arret, TempsLieu } from '$core/dto/ginko';
import { getArretsProches, getDetailsArret, getTempsLieu } from '$core/api/GinkoApi';

const NB_TEMPS = 3;

export const load: PageServerLoad = async ({ params, url }) => {
	const id: string = params.id;
	if (!id || !/^[\w-]+$/.test(id)) {
		throw error(400, "L'id de la station n'est pas valide");
	}

	const arret: Arret | undefined = await getDetailsArret({ id });
	if (!arret) {
		throw error(404, 'Station non trouvée');
	}

	const nom = url.searchParams.get('nom')?.trim();

	const [arretsProches, tempsLieu] = await Promise.all([
		getArretsProches({ latitude: arret.latitude, longitude: arret.longitude }),
		getTempsLieu(nom ? { nom, nb: NB_TEMPS } : { idArret: id, nb: NB_TEMPS })
	]);

	return {
		arret,
		arretsProches: ((arretsProches ?? []) as Arret[]).filter((a) => a.id !== id),
		tempsLieu: (tempsLieu ?? null) as TempsLieu | null
	};
};
