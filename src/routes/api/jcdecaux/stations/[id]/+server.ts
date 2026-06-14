import { getStation } from '$core/api/JCDecauxApi';
import type { FormattedStation, Station } from '$core/dto/jcdecaux';
import { formatStationName } from '$lib/core/helper/velocite/format';
import { getUnavailableStands } from '$lib/core/helper/velocite/sort';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { isAuthorized } from '../../../helper';

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

	return json(formattedStation);
};
