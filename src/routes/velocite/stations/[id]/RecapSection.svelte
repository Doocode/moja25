<script lang="ts">
	import type { FormattedStation } from '$core/dto/jcdecaux';
	import { Ban, Bike, SquareParking, Zap } from '@lucide/svelte';
	import RecapTile from './RecapTile.svelte';
	import { cn } from '$lib/utils.js';

	interface Props {
		station: FormattedStation;
		class?: string;
	}

	let { station, class: className = '' }: Props = $props();
</script>

<main
	class={cn(
		'm-auto grid max-w-156 gap-1 rounded-[2rem] bg-neutral-100/30 backdrop-blur-2xl lg:gap-2 lg:border lg:border-card lg:p-4 lg:shadow-2xl dark:bg-neutral-900/30 lg:dark:border-input lg:dark:shadow-background',
		className,
		station.unavailableStands <= 0 && 'grid-cols-3',
		station.unavailableStands > 0 && 'grid-cols-4'
	)}
>
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
	<RecapTile
		title="Places disponibles"
		count={station.totalStands.availabilities.stands}
		icon={SquareParking}
		type="available-stands"
	/>
	{#if station.unavailableStands > 0}
		<RecapTile
			title="Places non disponibles"
			count={station.unavailableStands}
			icon={Ban}
			type="unavailable-stands"
		/>
	{/if}
</main>
