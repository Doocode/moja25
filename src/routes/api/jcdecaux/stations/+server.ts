import { getStations } from '#core/api/JCDecauxApi.ts';
import type { FormattedStation, Station } from '#core/dto/jcdecaux/index.ts';
import { formatStationName } from '#core/helper/velocite/format.ts';
import { getUnavailableStands } from '#core/helper/velocite/sort.ts';
import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { isAuthorized } from '#core/helper/api.ts';

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

	return Response.json(formattedStations);
};
