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

	// Remove duplicate variantes (same destination and same stops)
	const seen = new Set<string>();
	const uniqueIndexes = ligne.variantes
		.map((_, i) => i)
		.filter((i) => {
			// Check if the destination and stops names are the same
			const key = `${ligne.variantes[i].destination}|${variantes[i].map((a) => a.nom).join(',')}`;
			if (seen.has(key)) return false;
			seen.add(key);
			return true;
		});

	return {
		ligne: { ...ligne, variantes: uniqueIndexes.map((i) => ligne.variantes[i]) },
		variantes: uniqueIndexes.map((i) => variantes[i])
	};
};
