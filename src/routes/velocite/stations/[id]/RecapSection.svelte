<script lang="ts">
	import type { FormattedStation } from '$core/dto/jcdecaux';
	import { Ban, Bike, SquareParking, Zap } from '@lucide/svelte';
	import RecapTile from './RecapTile.svelte';
	import { cn } from '$lib/utils.js';
	import RecapCompactTile from './RecapCompactTile.svelte';

	interface Props {
		station: FormattedStation;
		class?: string;
	}

	let { station, class: className = '' }: Props = $props();

	const unavailable = $derived(station.unavailableStands);
</script>

<main class={cn('grid w-full max-w-130 grid-cols-3 gap-0.5 lg:gap-1', className)}>
	<RecapTile
		title="Vélos mécaniques"
		count={station.totalStands.availabilities.mechanicalBikes}
		icon={Bike}
		type="mechanical-bikes"
	/>
	<RecapTile
		title="Vélos électriques"
		count={station.totalStands.availabilities.electricalBikes}
		icon={Zap}
		type="electrical-bikes"
	/>
	{#if unavailable === 0}
		<RecapTile
			title="Places disponibles"
			count={station.totalStands.availabilities.stands}
			icon={SquareParking}
			type="available-stands"
		/>
	{:else}
		<div class="sm:hidden">
			<RecapTile
				title="Places disponibles"
				count={station.totalStands.availabilities.stands}
				icon={SquareParking}
				type="available-stands"
			/>
		</div>
		<div class="hidden grid-rows-2 gap-0.5 sm:grid lg:gap-1">
			<RecapCompactTile
				title="Places disponibles"
				count={station.totalStands.availabilities.stands}
				icon={SquareParking}
				type="available-stands"
			/>
			<RecapCompactTile
				title="Places indisponibles"
				count={unavailable}
				icon={Ban}
				type="unavailable-stands"
			/>
		</div>
	{/if}
</main>
