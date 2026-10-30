<script lang="ts">
	import { Ban, Bike, SquareParking, Zap } from '@lucide/svelte';
	import type { FormattedStation } from '$core/dto/jcdecaux';
	import { cn } from '$lib/utils.js';
	import LegendRow from './LegendRow.svelte';

	interface Props {
		station: FormattedStation;
		class?: string;
	}

	let { station, class: className }: Props = $props();

	const mechanicalBikes = $derived(station.mainStands.availabilities.mechanicalBikes);
	const electricalBikes = $derived(station.mainStands.availabilities.electricalBikes);
	const stands = $derived(station.mainStands.availabilities.stands);
</script>

<div class={cn('relative z-10 grid max-w-75 gap-1', className)}>
	<h2 class="mb-2 text-lg font-bold">Légende</h2>

	<LegendRow icon={Bike} label="Vélos mécaniques" value={mechanicalBikes} kind="mechanical-bikes" />
	<LegendRow icon={Zap} label="Vélos électriques" value={electricalBikes} kind="electrical-bikes" />
	<LegendRow
		icon={SquareParking}
		label="Places disponibles"
		value={stands}
		kind="available-stands"
	/>
	<LegendRow
		icon={Ban}
		label="Bornes indisponibles"
		value={station.unavailableStands}
		kind="unavailable-stands"
	/>
</div>
