<script lang="ts">
	import { resolve } from '$app/paths';
	import type { FormattedStation } from '$core/dto/jcdecaux';
	import { VelociteSortField } from '$core/enum/VelociteSortField';
	import { StationColorStatus, getStationColorStatus } from '../../core/sort-config';
	import StationContext from './StationContext.svelte';
	import StationIcon from './StationIcon.svelte';

	interface Props {
		station: FormattedStation;
		sortField?: VelociteSortField;
	}

	let { station, sortField = VelociteSortField.NAME }: Props = $props();

	const isOpen = $derived(station.status === 'OPEN');
	const mechanicalBikes = $derived(station.mainStands.availabilities.mechanicalBikes);
	const electricalBikes = $derived(station.mainStands.availabilities.electricalBikes);
	const totalBikes = $derived(station.mainStands.availabilities.bikes);
	const availableStands = $derived(station.mainStands.availabilities.stands);
	const unavailableStands = $derived(station.unavailableStands);

	const isCountSort = $derived(
		sortField === VelociteSortField.MECHANICAL_BIKES ||
			sortField === VelociteSortField.ELECTRICAL_BIKES ||
			sortField === VelociteSortField.TOTAL_BIKES ||
			sortField === VelociteSortField.AVAILABLE_STANDS ||
			sortField === VelociteSortField.UNAVAILABLE_STANDS
	);

	let countValue = $derived.by(() => {
		if (sortField === VelociteSortField.MECHANICAL_BIKES) return mechanicalBikes;
		if (sortField === VelociteSortField.ELECTRICAL_BIKES) return electricalBikes;
		if (sortField === VelociteSortField.TOTAL_BIKES) return totalBikes;
		if (sortField === VelociteSortField.AVAILABLE_STANDS) return availableStands;
		if (sortField === VelociteSortField.UNAVAILABLE_STANDS) return unavailableStands;
		return 0;
	});
</script>

<a
	href={resolve('/velocite/stations/' + station.number)}
	class={{
		'flex items-center justify-between gap-4 rounded-md px-4 py-3 duration-75': true,
		'bg-green-200 hover:bg-green-300 active:bg-green-400 dark:bg-green-900 hover:dark:bg-green-800 active:dark:bg-green-700':
			(isCountSort &&
				getStationColorStatus(countValue, sortField) === StationColorStatus.Success) ||
			(sortField === VelociteSortField.BANKING && station.banking) ||
			(sortField === VelociteSortField.OPEN && isOpen) ||
			(sortField === VelociteSortField.CONNECTED && station.connected),
		'bg-orange-200 hover:bg-orange-300 active:bg-orange-400 dark:bg-yellow-900 hover:dark:bg-yellow-800 active:dark:bg-yellow-700':
			(isCountSort &&
				getStationColorStatus(countValue, sortField) === StationColorStatus.Warning) ||
			(sortField === VelociteSortField.BONUS && station.bonus),
		'bg-red-200 hover:bg-red-300 active:bg-red-400 dark:bg-red-900 hover:dark:bg-red-800 active:dark:bg-red-700':
			(isCountSort && getStationColorStatus(countValue, sortField) === StationColorStatus.Danger) ||
			(sortField === VelociteSortField.OPEN && !isOpen) ||
			(sortField === VelociteSortField.CONNECTED && !station.connected),
		'hover:bg-primary/30 active:bg-primary/40':
			(sortField === VelociteSortField.BONUS && !station.bonus) ||
			(sortField === VelociteSortField.BANKING && !station.banking) ||
			[VelociteSortField.NAME, VelociteSortField.NUMBER, VelociteSortField.CAPACITY].includes(
				sortField
			)
	}}
>
	<!-- Left side : icon + station name -->
	<div class="flex min-w-0 flex-1 items-center gap-3">
		<StationIcon {station} {sortField} {countValue} />
		<span class="truncate font-medium">{station.formattedName}</span>
	</div>

	<!-- Right side : contextual information (count or status) -->
	<StationContext {station} {sortField} />
</a>
