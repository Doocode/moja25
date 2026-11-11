<script lang="ts">
	import { cn } from '$lib/utils.js';
	import { Button } from '$shadcn/button';
	import LegendRow from './LegendRow.svelte';
	import type { FormattedStation } from '$core/dto/jcdecaux';
	import { Ban, Bike, SquareLetterP, Zap } from '@lucide/svelte';
	import UnavailableStandsDrawer from './UnavailableStandsDrawer.svelte';

	interface Props {
		station: FormattedStation;
		class?: string;
	}

	let { station, class: className }: Props = $props();

	const mechanicalBikes = $derived(station.mainStands.availabilities.mechanicalBikes);
	const electricalBikes = $derived(station.mainStands.availabilities.electricalBikes);
	const stands = $derived(station.mainStands.availabilities.stands);

	let drawerUnavailableStands = $state(false);
</script>

<div class={cn('relative z-10 grid max-w-75 gap-0.75', className)}>
	<h2 class="mt-4 mb-0.5 sm:mt-0 text-lg font-bold sm:sr-only">Légende</h2>

	<LegendRow icon={Bike} label="Vélos mécaniques" value={mechanicalBikes} kind="mechanical-bikes" />
	<LegendRow icon={Zap} label="Vélos électriques" value={electricalBikes} kind="electrical-bikes" />
	<LegendRow
		icon={SquareLetterP}
		label="Places disponibles"
		value={stands}
		kind="available-stands"
	/>

	<Button
		class="grid h-auto grid-cols-1 p-0 text-inherit"
		variant="ghost"
		onclick={() => (drawerUnavailableStands = true)}
	>
		<LegendRow
			icon={Ban}
			label="Bornes indisponibles"
			value={station.unavailableStands}
			kind="unavailable-stands"
		/>
	</Button>
</div>

<UnavailableStandsDrawer {station} bind:open={drawerUnavailableStands} />
