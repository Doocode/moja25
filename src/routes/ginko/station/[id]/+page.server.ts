import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { FormattedArret, TempsLieu } from '$core/dto/ginko';
import { formatArret } from '$core/helper/ginko/format';
import { getArretsProches, getDetailsArret, getTempsLieu } from '$core/api/GinkoApi';

const NB_TEMPS = 3;

export const load: PageServerLoad = async ({ params, url }) => {
	// Validate id
	const id: string = params.id;
	if (!id || !/^[\w-]+$/.test(id)) {
		throw error(400, "L'id de la station n'est pas valide");
	}

	// Fetch stop details
	let arret: FormattedArret | undefined = await getDetailsArret({ id });
	if (!arret) {
		throw error(404, 'Station non trouvée');
	}
	arret = formatArret(arret); // Format name (split into parts)

	const nom = url.searchParams.get('nom')?.trim();

	// Fetch data
	const [arretsProchesRaw, tempsLieu] = await Promise.all([
		getArretsProches({ latitude: arret.latitude, longitude: arret.longitude }),
		getTempsLieu(nom ? { nom, nb: NB_TEMPS } : { idArret: id, nb: NB_TEMPS })
	]);

	const arretsProches = (arretsProchesRaw ?? [])
		.map(formatArret) // Split name into parts
		.filter((a) => a.id !== id); // Exclude the current stop from nearby stops

	return {
		arret,
		arretsProches,
		tempsLieu: (tempsLieu ?? null) as TempsLieu | null
	};
};
