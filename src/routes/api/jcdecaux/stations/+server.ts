import { getStations } from '$core/api/JCDecauxApi';
import type { FormattedStation, Station } from '$core/dto/jcdecaux';
import { formatStationName } from '$lib/core/helper/velocite/format';
import { getUnavailableStands } from '$lib/core/helper/velocite/sort';
import { env } from '$env/dynamic/private';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

function isAuthorized(request: Request, serverOrigin: string): boolean {
	// Requête same-origin depuis le navigateur
	// - Origin est envoyé pour les requêtes cross-origin et certains POST
	// - Referer est envoyé pour tous les fetch() same-origin (y compris GET)
	// TODO: mettre en place un système d'authentification (JWT, session)
	const origin = request.headers.get('Origin');
	if (origin === serverOrigin) return true;

	const referer = request.headers.get('Referer');
	if (referer?.startsWith(serverOrigin)) return true;

	// Application externe autorisée via clé API
	const apiKey = request.headers.get('X-API-Key');
	if (apiKey) {
		const allowedKeys = (env.INTERNAL_API_KEYS ?? '')
			.split(',')
			.map((k) => k.trim())
			.filter(Boolean);
		return allowedKeys.includes(apiKey);
	}

	return false;
}

export const GET: RequestHandler = async ({ request, url }) => {
	if (!isAuthorized(request, url.origin)) {
		error(403, 'Forbidden');
	}

	const stations: Station[] = await getStations();

	const formattedStations: FormattedStation[] = stations.map((station) => ({
		...station,
		formattedName: formatStationName(station.name),
		unavailableStands: getUnavailableStands(station)
	}));

	return json(formattedStations);
};
