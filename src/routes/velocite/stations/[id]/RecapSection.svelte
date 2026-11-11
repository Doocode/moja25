<script lang="ts">
	import { Ban, Bike, SquareLetterP, Zap } from '@lucide/svelte';
	import type { FormattedStation } from '$core/dto/jcdecaux';
	import RecapCompactTile from './RecapCompactTile.svelte';
	import RecapTile from './RecapTile.svelte';
	import { cn } from '$lib/utils.js';

	interface Props {
		station: FormattedStation;
		class?: string;
	}

	let { station, class: className = '' }: Props = $props();

	const unavailable = $derived(station.unavailableStands);
</script>

<main
	class={cn('grid w-full max-w-130 grid-cols-3 gap-0.5 lg:gap-1', className)}
	style:perspective="500px"
>
	<RecapTile
		title="Vélos mécaniques"
		count={station.totalStands.availabilities.mechanicalBikes}
		icon={Bike}
		kind="mechanical-bikes"
	/>
	<RecapTile
		title="Vélos électriques"
		count={station.totalStands.availabilities.electricalBikes}
		icon={Zap}
		kind="electrical-bikes"
	/>
	{#if unavailable === 0}
		<RecapTile
			title="Places disponibles"
			count={station.totalStands.availabilities.stands}
			icon={SquareLetterP}
			kind="available-stands"
		/>
	{:else}
		<div class="sm:hidden">
			<RecapTile
				title="Places disponibles"
				count={station.totalStands.availabilities.stands}
				icon={SquareLetterP}
				kind="available-stands"
			/>
		</div>
		<div class="hidden grid-rows-2 gap-0.5 sm:grid lg:gap-1">
			<RecapCompactTile
				title="Places disponibles"
				count={station.totalStands.availabilities.stands}
				icon={SquareLetterP}
				kind="available-stands"
			/>
			<RecapCompactTile
				title="Places indisponibles"
				count={unavailable}
				icon={Ban}
				kind="unavailable-stands"
			/>
		</div>
	{/if}
</main>
