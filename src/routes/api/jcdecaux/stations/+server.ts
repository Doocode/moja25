import { getStations } from '$core/api/JCDecauxApi';
import type { FormattedStation, Station } from '$core/dto/jcdecaux';
import { formatStationName } from '#lib/core/helper/velocite/format.ts';
import { getUnavailableStands } from '#lib/core/helper/velocite/sort.ts';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { isAuthorized } from '$core/helper/api';

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
