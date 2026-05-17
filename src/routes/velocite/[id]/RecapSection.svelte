<script lang="ts">
	import type { FormattedStation } from '$core/dto/jcdecaux';
	import { Ban, Bike, Layers, SquareParking, Zap } from '@lucide/svelte';
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
		'grid gap-1',
		className,
		station.unavailableStands <= 0 && 'grid-cols-3',
		station.unavailableStands > 0 && 'grid-cols-4'
	)}
>
	<RecapTile
		title="Vélos mécaniques"
		count={station.totalStands.availabilities.mechanicalBikes}
		icon={Bike}
		tint="#b7007a"
	/>
	<RecapTile
		title="Vélos électriques"
		count={station.totalStands.availabilities.electricalBikes}
		icon={Zap}
		tint="#00abc4"
	/>
	<RecapTile
		title="Places disponibles"
		count={station.totalStands.availabilities.stands}
		icon={SquareParking}
		tint="#777777"
	/>
	{#if station.unavailableStands > 0}
		<RecapTile
			title="Place non disponibles"
			count={station.unavailableStands}
			icon={Ban}
			tint="#FF8F00"
		/>
	{/if}
</main>
