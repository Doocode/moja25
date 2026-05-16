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
	import { VelociteSortField } from '$lib/core/helper/velocite';
	import type { FormattedStation } from '$core/dto/jcdecaux';

	interface Props {
		station: FormattedStation;
		sortField: VelociteSortField;
	}

	let { station, sortField }: Props = $props();

	const isOpen = $derived(station.status === 'OPEN');
	const connected = $derived(station.connected);
	const mechanicalBikes = $derived(station.mainStands.availabilities.mechanicalBikes);
	const electricalBikes = $derived(station.mainStands.availabilities.electricalBikes);
	const totalBikes = $derived(station.mainStands.availabilities.bikes);
	const availableStands = $derived(station.mainStands.availabilities.stands);
	const capacity = $derived(station.totalStands.capacity);
	const unavailableStands = $derived(capacity - totalBikes - availableStands);
</script>

<main>
	{#if sortField === VelociteSortField.NAME || sortField === VelociteSortField.NUMBER}
		<span class="shrink-0 tabular-nums">
			<span class="text-xs text-muted-foreground">#</span><span class="font-medium text-primary"
				>{station.number}</span
			>
		</span>
	{:else if sortField === VelociteSortField.CAPACITY}
		<span class="shrink-0 font-medium text-primary tabular-nums">{capacity}</span>
	{:else if sortField === VelociteSortField.TOTAL_BIKES}
		<StationCounter icon={Bike} value={totalBikes} total={capacity} />
	{:else if sortField === VelociteSortField.MECHANICAL_BIKES}
		<StationCounter icon={Bike} value={mechanicalBikes} total={capacity} />
	{:else if sortField === VelociteSortField.ELECTRICAL_BIKES}
		<StationCounter icon={Zap} value={electricalBikes} total={capacity} />
	{:else if sortField === VelociteSortField.AVAILABLE_STANDS}
		<StationCounter icon={SquareParking} value={availableStands} total={capacity} />
	{:else if sortField === VelociteSortField.UNAVAILABLE_STANDS}
		<StationCounter
			icon={unavailableStands > 0 ? Ban : Check}
			value={unavailableStands}
			total={capacity}
			negative
		/>
	{:else if sortField === VelociteSortField.BONUS}
		<StationStatus
			enabled={station.bonus}
			icon={station.bonus ? Star : Ban}
			text={station.bonus ? 'Bonus' : 'Non-bonus'}
			positiveClass="text-yellow-500"
		/>
	{:else if sortField === VelociteSortField.BANKING}
		<StationStatus
			enabled={station.banking}
			icon={station.banking ? CreditCard : Ban}
			text={station.banking ? 'CB' : 'Sans CB'}
		/>
	{:else if sortField === VelociteSortField.OPEN}
		<StationStatus
			enabled={isOpen}
			icon={isOpen ? Check : Ban}
			text={isOpen ? 'Ouvert' : 'Fermé'}
			negativeClass="text-red-500"
		/>
	{:else if sortField === VelociteSortField.CONNECTED}
		<StationStatus
			enabled={station.connected}
			icon={station.connected ? Wifi : Ban}
			text={station.connected ? 'Connecté' : 'Hors-ligne'}
			negativeClass="text-red-500"
		/>
	{/if}
</main>
