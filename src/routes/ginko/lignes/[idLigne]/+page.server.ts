import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { Ligne, Arret } from '$core/dto/ginko';
import { getDetailsVariante, getLignes } from '$core/api/GinkoApi';

export const load: PageServerLoad = async ({ params }) => {
	// Get idLigne
	const idLigne: string = params.idLigne;
	if (!Number.isInteger(Number(idLigne)) || Number(idLigne) <= 0) {
		throw error(400, "L'id de la ligne n'est pas valide");
	}

	// Fetch the ligne data based on the idLigne
	const lignes: Ligne[] = await getLignes();
	const ligne: Ligne | undefined = lignes.find((l) => l.id === idLigne);
	if (!ligne) {
		throw error(404, 'Ligne non trouvée');
	}

	// Fetch the details of the variante for the ligne
	const idVariantes: string[] = ligne.variantes.map((v) => v.id);
	const variantes: Arret[][] = await Promise.all(
		idVariantes.map((idVariante) => getDetailsVariante({ idLigne, idVariante }))
	);

	// Return the ligne and its variantes details
	return { ligne, variantes };
};
