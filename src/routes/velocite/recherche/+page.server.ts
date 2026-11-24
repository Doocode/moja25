import { getStations } from '$core/api/JCDecauxApi';
import type { FormattedStation, Station } from '$core/dto/jcdecaux';
import { formatStationName } from '#lib/core/helper/velocite/format.ts';
import { getUnavailableStands } from '#lib/core/helper/velocite/sort.ts';
import type { PageServerLoad } from '../stations/$types';

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
