<script lang="ts">
	import {
		Ban,
		Bike,
		CheckCircle,
		CreditCard,
		SquareParking,
		Star,
		TriangleAlert,
		Wifi,
		Zap
	} from '@lucide/svelte';
	import type { FormattedStation } from '$core/dto/jcdecaux';
	import { VelociteSortField } from '$core/enum/VelociteSortField';
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
	const capacity = $derived(station.totalStands.capacity);
	const unavailableStands = $derived(station.unavailableStands);

	function countColor(n: number): string {
		if (n <= 0) return 'text-red-500';
		if (n <= 3) return 'text-orange-500';
		return 'text-green-500';
	}

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

<li
	class={{
		'flex items-center justify-between gap-4 rounded-md px-4 py-3 duration-75': true,
		'bg-green-200/70 hover:bg-green-300 active:bg-green-400 dark:bg-green-950/70 hover:dark:bg-green-900 active:dark:bg-green-800':
			(isCountSort && countValue > 3 && sortField !== VelociteSortField.UNAVAILABLE_STANDS) ||
			(isCountSort && countValue <= 0 && sortField === VelociteSortField.UNAVAILABLE_STANDS) ||
			(sortField === VelociteSortField.BANKING && station.banking) ||
			(sortField === VelociteSortField.OPEN && isOpen) ||
			(sortField === VelociteSortField.CONNECTED && station.connected),
		'bg-orange-200/70 hover:bg-orange-300 active:bg-orange-400 dark:bg-yellow-950/70 hover:dark:bg-yellow-900 active:dark:bg-yellow-800':
			(isCountSort && countValue > 0 && countValue <= 3) ||
			(sortField === VelociteSortField.BONUS && station.bonus),
		'bg-red-200/70 hover:bg-red-300 active:bg-red-400 dark:bg-red-950/70 hover:dark:bg-red-900 active:dark:bg-red-800':
			(isCountSort && countValue <= 0 && sortField !== VelociteSortField.UNAVAILABLE_STANDS) ||
			(isCountSort && countValue > 3 && sortField === VelociteSortField.UNAVAILABLE_STANDS) ||
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
	<!-- Gauche : icône + nom -->
	<div class="flex min-w-0 flex-1 items-center gap-3">
		<StationIcon {station} {sortField} {countValue} />
		<span class="truncate font-medium">{station.formattedName}</span>
	</div>

	<!-- Droite : informations contextuelle -->
	<StationContext {station} {sortField} />
</li>
