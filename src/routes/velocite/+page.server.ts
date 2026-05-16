import { getStations } from '$core/api/JCDecauxApi';
import type { FormattedStation, Station } from '$core/dto/jcdecaux';
import { formatStationName } from '$lib/core/helper/velocite';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const stations: Station[] = await getStations();

	const formattedStations: FormattedStation[] = stations.map((station) => ({
		...station,
		formattedName: formatStationName(station.name)
	}));

	return {
		stations: formattedStations
	};
};
