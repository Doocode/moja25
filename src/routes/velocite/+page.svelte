<script lang="ts">
	import type { FormattedStation } from '$core/dto/jcdecaux';
	import { sortStations } from '$lib/core/helper/velocite/sort';
	import { VelociteSortField } from '$core/enum/VelociteSortField';
	import StationRow from './StationRow.svelte';

	interface Props {
		data: {
			stations: FormattedStation[];
		};
	}

	let { data }: Props = $props();

	// Flags de tri
	let sortField = $state(VelociteSortField.UNAVAILABLE_STANDS);
	let sortAscending = $state(true);

	const sortedStations = $derived(sortStations(data.stations, sortField, sortAscending));
</script>

<main class="_container m-auto max-w-lg">
	<h1 class="p-4 text-3xl font-bold">Vélocité</h1>

	<select bind:value={sortField} class="bg-background">
		{#each Object.values(VelociteSortField) as field}
			<option value={field}>{field}</option>
		{/each}
	</select>

	<ul class="grid gap-0.5 px-4 pb-4">
		{#each sortedStations as station}
			<StationRow {station} {sortField} />
		{/each}
	</ul>
</main>
