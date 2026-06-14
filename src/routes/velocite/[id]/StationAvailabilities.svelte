<script lang="ts">
	import { Ban, Bike, Layers, SquareParking, Zap } from '@lucide/svelte';
	import type { FormattedStation } from '$core/dto/jcdecaux';
	import { cn } from '$lib/utils.js';
	import AvailabilityCard from './AvailabilityCard.svelte';

	interface Props {
		station: FormattedStation;
		class?: string;
		displayBatteryDetails?: boolean;
	}

	let { station, class: className, displayBatteryDetails = false }: Props = $props();

	const totalBikes = $derived(station.mainStands.availabilities.bikes);
	const mechanicalBikes = $derived(station.mainStands.availabilities.mechanicalBikes);
	const electricalBikes = $derived(station.mainStands.availabilities.electricalBikes);
	const internalBikes = $derived(station.mainStands.availabilities.electricalInternalBatteryBikes);
	const removableBikes = $derived(
		station.mainStands.availabilities.electricalRemovableBatteryBikes
	);
	const availableStands = $derived(station.mainStands.availabilities.stands);
	const capacity = $derived(station.totalStands.capacity);

	function countClass(n: number): string {
		const ratio = capacity > 0 ? n / capacity : 0;
		if (n <= 0) return 'text-red-500';
		if (ratio <= 0.2) return 'text-orange-500';
		return 'text-green-500';
	}
</script>

<div class={cn('relative z-10 grid grid-cols-2 gap-2', className)}>
	<AvailabilityCard
		title="Vélos disponibles"
		icon={Bike}
		count={totalBikes}
		{capacity}
		countClass={countClass(totalBikes)}
	>
		<div class="flex items-center justify-between text-sm">
			<span class="flex items-center gap-1.5 text-muted-foreground">
				<Bike class="size-3.5" /> Mécaniques
			</span>
			<span class="font-semibold {countClass(mechanicalBikes)}">{mechanicalBikes}</span>
		</div>
		<div class="flex items-center justify-between text-sm">
			<span class="flex items-center gap-1.5 text-muted-foreground">
				<Zap class="size-3.5" /> Électriques
			</span>
			<span class="font-semibold {countClass(electricalBikes)}">{electricalBikes}</span>
		</div>
		{#if displayBatteryDetails && (internalBikes > 0 || removableBikes > 0)}
			<div class="flex items-center justify-between pl-5 text-xs text-muted-foreground">
				<span>Batterie interne</span>
				<span>{internalBikes}</span>
			</div>
			<div class="flex items-center justify-between pl-5 text-xs text-muted-foreground">
				<span>Batterie amovible</span>
				<span>{removableBikes}</span>
			</div>
		{/if}
	</AvailabilityCard>

	<AvailabilityCard
		title="Places libres"
		icon={SquareParking}
		count={availableStands}
		{capacity}
		countClass={countClass(availableStands)}
	>
		<div class="flex items-center justify-between text-sm">
			<span class="flex items-center gap-1.5 text-muted-foreground">
				<Layers class="size-3.5" /> Capacité
			</span>
			<span class="font-semibold">{capacity}</span>
		</div>
		<div class="flex items-center justify-between text-sm">
			<span class="flex items-center gap-1.5 text-muted-foreground">
				<Ban class="size-3.5" /> Indisponibles
			</span>
			<span class="font-semibold {station.unavailableStands > 0 ? 'text-orange-500' : ''}">
				{station.unavailableStands}
			</span>
		</div>
	</AvailabilityCard>
</div>
