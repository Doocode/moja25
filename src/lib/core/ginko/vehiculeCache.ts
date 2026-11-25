import type { VehiculeDR } from '#core/dto/ginko/index.ts';
import { LocalStorageHelper, LocalStorageKey } from '#core/helper/local_storage/index.ts';

const CACHE_DURATION_MS = 24 * 60 * 60 * 1000; // 24 hours in ms (hours * minutes * seconds * milliseconds)

function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === 'object' && value !== null;
}

// Type guard to check if a value is a valid vehicle object
function isVehicule(value: unknown): value is VehiculeDR {
	return (
		isRecord(value) &&
		typeof value.num === 'string' &&
		typeof value.typeVehicule === 'string' &&
		typeof value.energie === 'number' &&
		typeof value.accessiblite === 'number' &&
		typeof value.climatisation === 'boolean' &&
		typeof value.prisesUSB === 'boolean' &&
		typeof value.affichageDynamique === 'boolean' &&
		typeof value.annoncesSonores === 'boolean'
	);
}

// Retrieve vehicle information from local storage if it exists and is not expired
export function getCachedVehicule(num: string): VehiculeDR | null {
	const key = `${LocalStorageKey.GINKO_VEHICULE_DETAILS}${num}`;
	const stored = LocalStorageHelper.getValue(key, '');
	if (!stored) return null;

	// Parse the stored JSON value to retrieve the cache entry
	let entry: unknown;
	try {
		entry = JSON.parse(stored);
	} catch (error) {
		console.error(`Invalid vehicle cache entry "${key}"`, error);
		LocalStorageHelper.removeValue(key);
		return null;
	}

	// Remove the cache entry if it is invalid
	if (
		!isRecord(entry) ||
		typeof entry.timestamp !== 'number' ||
		!Number.isFinite(entry.timestamp) ||
		!isVehicule(entry.vehicule)
	) {
		console.error(`Invalid vehicle cache entry "${key}"`);
		LocalStorageHelper.removeValue(key);
		return null;
	}

	// Check if the cache entry is expired
	const age = Date.now() - entry.timestamp;
	if (age < 0 || age >= CACHE_DURATION_MS) {
		console.error(`Vehicle cache entry "${key}" is expired`);
		LocalStorageHelper.removeValue(key);
		return null;
	}

	// Return the cached vehicle
	return entry.vehicule;
}

// Store vehicle information in local storage with a timestamp to manage cache expiration
export function cacheVehicule(num: string, vehicule: VehiculeDR): void {
	const key = `${LocalStorageKey.GINKO_VEHICULE_DETAILS}${num}`;
	const value = JSON.stringify({ timestamp: Date.now(), vehicule });
	LocalStorageHelper.setValue(key, value);
}
