<script lang="ts">
	import type { FormattedStation } from '$core/dto/jcdecaux';
	import { sortStations } from '$lib/core/helper/velocite/sort';
	import { filterStations } from '$lib/core/helper/velocite/filter';
	import { VelociteSortField } from '$core/enum/VelociteSortField';
	import { Input } from '$shadcn/input';
	import StationRow from './StationRow.svelte';
	import SortButtonGroup from './SortButtonGroup.svelte';

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

<svelte:head>
	<title>Vélocité</title>
</svelte:head>

<main class="m-auto max-w-lg p-4">
	<h1 class="mb-2 text-3xl font-bold">Vélocité</h1>

	<Input
		type="search"
		placeholder="Rechercher"
		class="mb-1 h-auto w-full px-4 py-3"
		bind:value={searchQuery}
	/>

	<div class="mb-4 flex items-center justify-between">
		<p>{filteredStations.length} stations</p>
		<SortButtonGroup bind:sortField bind:sortAscending />
	</div>

	<ul class="grid gap-0.5">
		{#each sortedStations as station}
			<StationRow {station} {sortField} />
		{/each}
	</ul>
</main>
