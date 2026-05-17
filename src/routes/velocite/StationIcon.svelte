<script lang="ts">
	import {
		Ban,
		Bike,
		Check,
		CreditCard,
		SquareParking,
		Star,
		TriangleAlert,
		Wifi,
		Zap
	} from '@lucide/svelte';
	import StationCounter from './StationCounter.svelte';
	import StationStatus from './StationStatus.svelte';
	import { VelociteSortField } from '$core/enum/VelociteSortField';
	import type { FormattedStation } from '$core/dto/jcdecaux';
	import { MEDIUM_LEVEL_THRESHOLD } from './sort-config';

	interface Props {
		station: FormattedStation;
		sortField: VelociteSortField;
		countValue?: number;
	}

	let { station, sortField, countValue }: Props = $props();

	const isOpen = $derived(station.status === 'OPEN');
	const connected = $derived(station.connected);
	const mechanicalBikes = $derived(station.mainStands.availabilities.mechanicalBikes);
	const electricalBikes = $derived(station.mainStands.availabilities.electricalBikes);
	const totalBikes = $derived(station.mainStands.availabilities.bikes);
	const availableStands = $derived(station.mainStands.availabilities.stands);
	const capacity = $derived(station.totalStands.capacity);
	const unavailableStands = $derived(station.unavailableStands);

	let counterIcon = $derived.by(() => {
		if (
			[VelociteSortField.NAME, VelociteSortField.NUMBER, VelociteSortField.CAPACITY].includes(
				sortField
			)
		)
			return Bike;
		if ([VelociteSortField.TOTAL_BIKES, VelociteSortField.MECHANICAL_BIKES].includes(sortField))
			return Bike;
		if (sortField === VelociteSortField.ELECTRICAL_BIKES) return Zap;
		if (sortField === VelociteSortField.AVAILABLE_STANDS) return SquareParking;
		if (sortField === VelociteSortField.UNAVAILABLE_STANDS)
			return unavailableStands > 0 ? Ban : Check;
		return Bike;
	});
</script>

<main>
	{#if sortField === VelociteSortField.NAME || sortField === VelociteSortField.NUMBER || sortField === VelociteSortField.CAPACITY}
		<Bike class="size-6! shrink-0 text-primary" />
	{:else if [VelociteSortField.TOTAL_BIKES, VelociteSortField.MECHANICAL_BIKES, VelociteSortField.ELECTRICAL_BIKES, VelociteSortField.AVAILABLE_STANDS].includes(sortField)}
		{@const CounterIcon = counterIcon}
		<CounterIcon
			class={{
				'size-6! shrink-0': true,
				'text-green-500': countValue > MEDIUM_LEVEL_THRESHOLD,
				'text-orange-500': countValue > 0 && countValue <= MEDIUM_LEVEL_THRESHOLD,
				'text-red-500': countValue === 0
			}}
		/>
	{:else if [VelociteSortField.UNAVAILABLE_STANDS].includes(sortField)}
		{@const CounterIcon = counterIcon}
		<CounterIcon
			class={{
				'size-6! shrink-0': true,
				'text-red-500': countValue > MEDIUM_LEVEL_THRESHOLD,
				'text-orange-500': countValue > 0 && countValue <= MEDIUM_LEVEL_THRESHOLD,
				'text-green-500': countValue === 0
			}}
		/>
	{:else if sortField === VelociteSortField.BONUS}
		{#if station.bonus}
			<Star class="size-6! shrink-0 text-yellow-500" />
		{:else}
			<Bike class="size-6! shrink-0 text-primary" />
		{/if}
	{:else if sortField === VelociteSortField.BANKING}
		{#if station.banking}
			<CreditCard class="size-6! shrink-0 text-primary" />
		{:else}
			<Bike class="size-6! shrink-0 text-primary" />
		{/if}
	{:else if sortField === VelociteSortField.OPEN}
		{#if station.status === 'OPEN'}
			<Check class="size-6! shrink-0 text-green-500" />
		{:else}
			<Ban class="size-6! shrink-0 text-red-500" />
		{/if}
	{:else if sortField === VelociteSortField.CONNECTED}
		{#if station.connected}
			<Wifi class="size-6! shrink-0 text-green-500" />
		{:else}
			<Ban class="size-6! shrink-0 text-red-500" />
		{/if}
	{/if}
</main>
