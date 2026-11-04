import type { Arret } from '$lib/core/dto/ginko';

export enum KindOfStop {
	Bus = 'Bus',
	Tram = 'Tram'
}

export function kindOfStop(arret: Arret) {
	if (arret.id.toLowerCase().startsWith('t_')) {
		return KindOfStop.Tram;
	} else {
		return KindOfStop.Bus;
	}
}
