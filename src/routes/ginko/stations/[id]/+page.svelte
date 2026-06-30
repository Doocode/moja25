<script lang="ts">
	import type { Arret, TempsLieu } from '$core/dto/ginko';
	import {
		groupTempsByLineAndDirection,
		type GroupedTempsByLine
	} from '$core/helper/ginko/groupTemps';
	import Header from './Header.svelte';
	import ArrivalCard from './ArrivalCard.svelte';

	interface Props {
		data: {
			arret: Arret;
			tempsLieu: TempsLieu;
			arrivalsPerLine: number;
		};
	}

	let { data }: Props = $props();

	const station = $derived(data.arret);
	const groupedArrivals = $derived<GroupedTempsByLine[]>(
		groupTempsByLineAndDirection(data.tempsLieu?.listeTemps ?? [], data.arrivalsPerLine)
	);
</script>

<svelte:head>
	<title>{station.nom} - Ginko</title>
</svelte:head>

<Header {station} />

<main class="m-auto max-w-4xl p-4 lg:-mt-6">
	<section class="grid gap-3">
		{#each groupedArrivals as group (group.key)}
			<ArrivalCard {group} />
		{:else}
			<div class="rounded-xl border bg-card p-6 text-center text-muted-foreground">
				Cette station n'est pas desservie pour le moment.
			</div>
		{/each}
	</section>
</main>
