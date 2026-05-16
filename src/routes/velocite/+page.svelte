<script lang="ts">
	import type { FormattedStation } from '$core/dto/jcdecaux';
	import { sortStations } from '$lib/core/helper/velocite/sort';
	import { filterStations } from '$lib/core/helper/velocite/filter';
	import { VelociteSortField } from '$core/enum/VelociteSortField';
	import { Input } from '$shadcn/input';
	import StationRow from './StationRow.svelte';

	interface Props {
		data: {
			stations: FormattedStation[];
		};
	}

	let { data }: Props = $props();

	let searchQuery = $state('');
	let sortField = $state(VelociteSortField.TOTAL_BIKES);
	let sortAscending = $state(true);

	const filteredStations = $derived(filterStations(data.stations, searchQuery));
	const sortedStations = $derived(sortStations(filteredStations, sortField, sortAscending));
</script>

<main class="m-auto p-4 max-w-lg">
	<h1 class="font-bold text-3xl">Vélocité</h1>

	<Input
		type="search"
		placeholder="Rechercher"
		class="mb-4 px-4 py-3 w-full h-auto"
		bind:value={searchQuery}
	/>

	<select bind:value={sortField} class="bg-background">
		{#each Object.values(VelociteSortField) as field}
			<option value={field}>{field}</option>
		{/each}
	</select>

	<ul class="gap-0.5 grid">
		{#each sortedStations as station}
			<StationRow {station} {sortField} />
		{/each}
	</ul>
</main>
