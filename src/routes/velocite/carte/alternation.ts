import type { FormattedStation } from '#core/dto/jcdecaux/index.ts';
import { VelociteSortField } from '#core/enum/VelociteSortField.ts';

/**
 * Returns the "alert state" layer of a station to alternate with the selected layer,
 * or `undefined` if the station should not alternate.
 *
 * - Station closed -> alternates with the OPEN layer (unless this layer is already selected).
 * - Station offline -> alternates with the CONNECTED layer (unless this layer is already selected).
 * - Station closed AND offline -> only the "closed" state is considered, to display a single marker or symbol per station.
 */
export function getAlertState(
	station: FormattedStation,
	selectedFilter: VelociteSortField
): VelociteSortField | undefined {
	if (station.status !== 'OPEN' && selectedFilter !== VelociteSortField.OPEN) {
		return VelociteSortField.OPEN;
	}
	if (!station.connected && selectedFilter !== VelociteSortField.CONNECTED) {
		return VelociteSortField.CONNECTED;
	}
	return undefined;
}

/**
 * Layer actually displayed for a station at a given moment.
 * `blink` alternates every second: `true` displays the alert state, `false` displays the selected layer.
 */
export function getDisplayedFilter(
	station: FormattedStation,
	selectedFilter: VelociteSortField,
	blink: boolean
): VelociteSortField {
	const alertState = getAlertState(station, selectedFilter);
	return blink && alertState ? alertState : selectedFilter;
}
