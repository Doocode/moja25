import { getStation } from '$core/api/JCDecauxApi';
import type { FormattedStation } from '$core/dto/jcdecaux';
import { formatStationName } from '$lib/core/helper/velocite/format';
import { getUnavailableStands } from '$lib/core/helper/velocite/sort';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const stationNumber = Number(params.id);
	if (!Number.isInteger(stationNumber) || stationNumber <= 0) {
		error(404, 'Station introuvable');
	}

	const raw = await getStation(stationNumber);

	const station: FormattedStation = {
		...raw,
		formattedName: formatStationName(raw.name),
		unavailableStands: getUnavailableStands(raw)
	};

	return { station };
};
