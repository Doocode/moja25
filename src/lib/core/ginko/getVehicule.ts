import type { VehiculeDR } from '$core/dto/ginko';
import { cacheVehicule, getCachedVehicule } from './vehiculeCache';

/**
 * Loads vehicle details in the browser, using the 24-hour local cache unless forced.
 */
export async function getVehicule(
	numero: string,
	options: { force?: boolean; signal?: AbortSignal } = {}
): Promise<VehiculeDR> {
	const num = numero.trim();
	if (!num) throw new Error('Numéro de véhicule absent');

	options.signal?.throwIfAborted();

	if (!options.force) {
		const cached = getCachedVehicule(num);
		if (cached) return cached;
	}

	const response = await fetch(`/api/ginko/detailsVehiculeDR/${encodeURIComponent(num)}`, {
		signal: options.signal
	});
	if (!response.ok) throw new Error(`Erreur HTTP ${response.status}`);

	const vehicule: VehiculeDR = await response.json();
	options.signal?.throwIfAborted();
	cacheVehicule(num, vehicule);
	return vehicule;
}
