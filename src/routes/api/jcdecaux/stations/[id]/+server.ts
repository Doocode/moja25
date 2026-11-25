import { getStation } from '#core/api/JCDecauxApi.ts';
import type { FormattedStation, Station } from '#core/dto/jcdecaux/index.ts';
import { formatStationName } from '#core/helper/velocite/format.ts';
import { getUnavailableStands } from '#core/helper/velocite/sort.ts';
import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { isAuthorized } from '#core/helper/api.ts';

export const GET: RequestHandler = async ({ request, url, params }) => {
	if (!isAuthorized(request, url.origin)) {
		error(403, 'Forbidden');
	}

	const stationNumber = Number(params.id);
	if (!Number.isInteger(stationNumber) || stationNumber <= 0) {
		error(404, 'Station introuvable');
	}

	const station: Station = await getStation(stationNumber);

	if (!station) {
		error(404, 'Station introuvable');
	}

	const formattedStation: FormattedStation = {
		...station,
		formattedName: formatStationName(station.name),
		unavailableStands: getUnavailableStands(station)
	};

	return Response.json(formattedStation);
};
