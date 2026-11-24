import { INTERNAL_API_KEYS } from '$app/env/private';

export function isAuthorized(request: Request, serverOrigin: string): boolean {
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
		const allowedKeys = (INTERNAL_API_KEYS ?? '')
			.split(',')
			.map((k) => k.trim())
			.filter(Boolean);

		return allowedKeys.includes(apiKey);
	}

	return false;
}
