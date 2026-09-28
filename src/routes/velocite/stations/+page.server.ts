import { getStations } from '$core/api/JCDecauxApi';
import type { FormattedStation, Station } from '$core/dto/jcdecaux';
import { formatStationName } from '$lib/core/helper/velocite/format';
import { getUnavailableStands } from '$lib/core/helper/velocite/sort';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const stations: Station[] = await getStations();

	const formattedStations: FormattedStation[] = stations.map((station) => ({
		...station,
		formattedName: formatStationName(station.name),
		unavailableStands: getUnavailableStands(station)
	}));

	return {
		stations: formattedStations
	};
};
