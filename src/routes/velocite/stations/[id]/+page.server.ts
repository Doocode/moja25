import { getStation } from '$core/api/JCDecauxApi';
import type { FormattedStation } from '$core/dto/jcdecaux';
import { formatStationName } from '#lib/core/helper/velocite/format.ts';
import { getUnavailableStands } from '#lib/core/helper/velocite/sort.ts';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const stationNumber = Number(params.id);
	if (!Number.isInteger(stationNumber) || stationNumber <= 0) {
		throw error(400, "L'id de la station n'est pas valide");
	}

	const raw = await getStation(stationNumber);

	const station: FormattedStation = {
		...raw,
		formattedName: formatStationName(raw.name),
		unavailableStands: getUnavailableStands(raw)
	};

	return { station };
};
