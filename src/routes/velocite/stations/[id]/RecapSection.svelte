<script lang="ts">
	import { Ban, Bike, SquareLetterP, Zap } from '@lucide/svelte';
	import type { FormattedStation } from '#core/dto/jcdecaux/index.ts';
	import RecapCompactTile from './RecapCompactTile.svelte';
	import RecapTile from './RecapTile.svelte';
	import { cn } from '#lib/utils.js';

	interface Props {
		station: FormattedStation;
		class?: string;
	}

	let { station, class: className = '' }: Props = $props();

	const mechanical = $derived(station.totalStands.availabilities.mechanicalBikes);
	const electrical = $derived(station.totalStands.availabilities.electricalBikes);
	const stands = $derived(station.totalStands.availabilities.stands);
	const unavailable = $derived(station.unavailableStands);

	// Concatenate the counts of mechanical, electrical, available, and unavailable stands to detect changes in the station's availability
	const concatNb = $derived(`${mechanical} ${electrical} ${stands} ${unavailable}`);
</script>

{#if concatNb}
	{#key concatNb}
		<main
			class={cn('grid w-full max-w-130 grid-cols-3 gap-0.5 lg:gap-1', className)}
			style:perspective="500px"
		>
			<RecapTile title="Vélos mécaniques" count={mechanical} icon={Bike} kind="mechanical-bikes" />
			<RecapTile title="Vélos électriques" count={electrical} icon={Zap} kind="electrical-bikes" />
			{#if unavailable === 0}
				<RecapTile
					title="Places disponibles"
					count={stands}
					icon={SquareLetterP}
					kind="available-stands"
				/>
			{:else}
				<div class="sm:hidden">
					<RecapTile
						title="Places disponibles"
						count={stands}
						icon={SquareLetterP}
						kind="available-stands"
					/>
				</div>
				<div class="hidden grid-rows-2 gap-0.5 sm:grid lg:gap-1">
					<RecapCompactTile
						title="Places disponibles"
						count={stands}
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
	{/key}
{/if}
