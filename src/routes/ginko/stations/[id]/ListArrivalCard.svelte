<script lang="ts">
	import type { TempsLieu } from '$core/dto/ginko';
	import {
		groupTempsByLineAndDirection,
		type GroupedTempsByLine
	} from '$core/helper/ginko/groupTemps';
	import ArrivalCard from './ArrivalCard.svelte';

	interface Props {
		tempsLieu: TempsLieu;
		arrivalsPerLine: number;
	}

	let { tempsLieu, arrivalsPerLine }: Props = $props();

	const groupedArrivals = $derived<GroupedTempsByLine[]>(
		groupTempsByLineAndDirection(tempsLieu?.listeTemps ?? [], arrivalsPerLine)
	);
</script>

{#if groupedArrivals.length > 0}
	<div class="grid gap-3">
		{#each groupedArrivals as group (group.key)}
			<ArrivalCard {group} />
		{/each}
	</div>
{:else}
	<div class="rounded-xl border bg-card p-6 text-center text-muted-foreground">
		Cette station n'est pas desservie pour le moment.
	</div>
{/if}
