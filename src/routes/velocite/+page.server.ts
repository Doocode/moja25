import { getStations } from '$core/api/JCDecauxApi';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	// Fetch data from Ginko API
	const [stations] = await Promise.all([getStations()]);

	return {
		stations
	};
};
