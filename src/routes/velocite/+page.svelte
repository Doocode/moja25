<script lang="ts">
	import type { FormattedStation } from '$core/dto/jcdecaux';
	import { sortStations } from '$lib/core/helper/velocite/sort';
	import { filterStations } from '$lib/core/helper/velocite/filter';
	import { VelociteSortField } from '$core/enum/VelociteSortField';
	import { SearchX } from '@lucide/svelte';
	import StationRow from './StationRow.svelte';
	import SearchBar from './SearchBar.svelte';
	import SortButtonGroup from './SortButtonGroup.svelte';

	interface Props {
		data: {
			stations: FormattedStation[];
		};
	}

	let { data }: Props = $props();

	let stations = $state<FormattedStation[]>(data.stations);
	let searchQuery = $state('');
	let sortField = $state(VelociteSortField.TOTAL_BIKES);
	let sortAscending = $state(true);

	async function refreshStations() {
		const res = await fetch('/api/jcdecaux/stations');
		if (res.ok) {
			stations = await res.json();
		}
	}

	$effect(() => {
		const interval = setInterval(refreshStations, 15_000);
		return () => clearInterval(interval);
	});

	const filteredStations = $derived(filterStations(stations, searchQuery));
	const sortedStations = $derived(sortStations(filteredStations, sortField, sortAscending));
</script>

<svelte:head>
	<title>Vélocité</title>
</svelte:head>

<main class="m-auto max-w-lg p-4">
	<h1 class="mb-2 text-center text-3xl font-bold">Vélocité</h1>

	<SearchBar class="mb-1" bind:value={searchQuery} />

	<div class="mb-4 flex items-center justify-between">
		<p>{filteredStations.length} stations</p>
		<SortButtonGroup bind:sortField bind:sortAscending />
	</div>

	<ul class="grid gap-0.5">
		{#each sortedStations as station}
			<StationRow {station} {sortField} />
		{:else}
			<li class="flex flex-col items-center gap-3 py-16 text-muted-foreground text-center">
				<SearchX class="size-30" />
				<div>
					<p class="mb-2 font-medium">Oups ! Nous n’avons rien trouvé</p>
					<p class="text-sm">
						Aucun résultat pour <span class="font-medium text-foreground">"{searchQuery}"</span>
					</p>
				</div>
			</li>
		{/each}
	</ul>
</main>
