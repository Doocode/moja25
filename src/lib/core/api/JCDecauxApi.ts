import type { Station } from '$core/dto/jcdecaux';
import { JCDECAUX_API_KEY, JCDECAUX_CONTRACT } from '$app/env/private';

const BASE_URL = 'https://api.jcdecaux.com/vls/v3';

// Helper to construct API URL with endpoint and parameters
function apiUrl(endpoint: string, params: Record<string, string | number | boolean> = {}) {
	const queryString = new URLSearchParams({
		apiKey: JCDECAUX_API_KEY,
		...Object.fromEntries(Object.entries(params).map(([k, v]) => [k, String(v)]))
	}).toString();

	return `${BASE_URL}/${endpoint}?${queryString}`;
}

// Helper to make API calls and parse response
async function apiCall<T>(
	endpoint: string,
	params: Record<string, string | number | boolean> = {}
): Promise<T> {
	const url = apiUrl(endpoint, params);
	const response = await fetch(url);

	if (!response.ok) {
		throw new Error(`API call failed: [${endpoint}] (${response.status})`);
	}

	return response.json() as Promise<T>;
}

// Get all stations for a given contract
export async function getStations(contract: string = JCDECAUX_CONTRACT): Promise<Station[]> {
	return apiCall<Station[]>('stations', { contract });
}

// Get station details by its number
export async function getStation(
	stationNumber: number,
	contract: string = JCDECAUX_CONTRACT
): Promise<Station> {
	return apiCall<Station>(`stations/${stationNumber}`, { contract });
}
