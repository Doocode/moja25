import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { getMessages, getLignes } from '#core/api/GinkoApi.ts';
import type { Message, Ligne } from '#core/dto/ginko/index.ts';

export const load: PageServerLoad = async ({ params }) => {
	// Validate params
	const id = params.id;
	if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
		throw error(400, "L'id de la ligne n'est pas valide ");
	}

	// Fetch messages and lignes concurrently
	const [listMessages, listLignes]: [Message[], Ligne[]] = await Promise.all([
		getMessages(),
		getLignes()
	]);

	// Filter messages for the current line and find the line details
	const messages = listMessages.filter((message) => message.lignes.includes(id));
	const ligne = listLignes.find((ligne) => ligne.id === id);

	// Find lignes related to all messages
	const listIdLignes = Array.from(new Set(messages.flatMap((message) => message.lignes)));
	const lignes = listIdLignes
		.map((idLigne) => listLignes.find((ligne) => ligne.id === idLigne))
		.filter((l): l is Ligne => l !== undefined);

	if (!ligne) {
		throw error(404, "Cette ligne n'existe pas");
	}

	return { messages, ligne, lignes };
};
