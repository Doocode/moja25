import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { Arret, Ligne, TempsLieu } from '$core/dto/ginko';
import {
	getArretsProches,
	getDetailsArret,
	getTempsLieu,
	getVariantesDesservantArret
} from '$core/api/GinkoApi';

export const load: PageServerLoad = async ({ params }) => {
	const id: string = params.id;
	if (!id || !/^[\w-]+$/.test(id)) {
		throw error(400, "L'id de la station n'est pas valide");
	}

	const arret: Arret | undefined = await getDetailsArret({ id });
	if (!arret) {
		throw error(404, 'Station non trouvée');
	}

	const [lignes, arretsProches, tempsLieu] = await Promise.all([
		getVariantesDesservantArret({ idArret: id }),
		getArretsProches({ latitude: arret.latitude, longitude: arret.longitude }),
		getTempsLieu({ /*idArret: id,*/ nom: arret.nom, nb: 3 })
	]);

	return {
		arret,
		lignes: (lignes ?? []) as Ligne[],
		arretsProches: ((arretsProches ?? []) as Arret[]).filter((a) => a.id !== id),
		tempsLieu: (tempsLieu ?? null) as TempsLieu | null
	};
};
