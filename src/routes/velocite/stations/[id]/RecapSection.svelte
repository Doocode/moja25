<script lang="ts">
	import type { FormattedStation } from '$core/dto/jcdecaux';
	import { Bike, SquareParking, Zap } from '@lucide/svelte';
	import RecapTile from './RecapTile.svelte';
	import { cn } from '$lib/utils.js';

	interface Props {
		station: FormattedStation;
		class?: string;
	}

	let { station, class: className = '' }: Props = $props();
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
	<RecapTile
		title="Places disponibles"
		count={station.totalStands.availabilities.stands}
		icon={SquareParking}
		type="available-stands"
	/>
</main>
