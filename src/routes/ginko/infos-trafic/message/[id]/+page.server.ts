import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getArrets, getLignes, getMessages } from '#core/api/GinkoApi.ts';
import type { Arret, Ligne, Message } from '#core/dto/ginko/index.ts';

export const load: PageServerLoad = async ({ params }) => {
	const id = Number(params.id);
	if (!Number.isInteger(id) || id <= 0) {
		throw error(400, "L'id du message n'est pas valide");
	}

	const [messages, allLignes, allArrets]: [Message[], Ligne[], Arret[]] = await Promise.all([
		getMessages({}),
		getLignes(),
		getArrets()
	]);

	const message = messages.find((m) => m.id === id);
	if (!message) {
		throw error(404, 'Message non trouvé');
	}

	const lignes = message.lignes
		.map((ref) => allLignes.find((ll) => ll.numLignePublic === ref || ll.id === ref))
		.filter((ll): ll is Ligne => ll !== undefined);

	const arrets = message.arrets
		.map((idArret) => allArrets.find((aa) => aa.id === idArret))
		.filter((aa): aa is Arret => aa !== undefined);

	return { message, lignes, arrets };
};
