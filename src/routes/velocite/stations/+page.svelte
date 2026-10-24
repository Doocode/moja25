<script lang="ts">
	import { onMount } from 'svelte';
	import Header from './Header.svelte';
	import { SearchX } from '@lucide/svelte';
	import { browser } from '$app/environment';
	import { StationRow } from '../shared/ui/list-station';
	import type { FormattedStation } from '$core/dto/jcdecaux';
	import { sortStations } from '$lib/core/helper/velocite/sort';
	import { VelociteSortField } from '$core/enum/VelociteSortField';
	import { filterStations } from '$lib/core/helper/velocite/filter';
	import { SortButtonGroup, RefreshDropdown, SortForm } from '../shared/ui/tool-bar';
	import { defaultRefreshInterval, refreshIntervals } from '../shared/core/settings';
	import { LocalStorageHelper, LocalStorageKey } from '$lib/core/helper/local_storage';
	import CountItems from './CountItems.svelte';

	interface Props {
		data: {
			stations: FormattedStation[];
		};
	}

	let { data }: Props = $props();

	let stations = $derived<FormattedStation[]>(data.stations);
	let queryInput = $state('');
	let sortField = $state(VelociteSortField.TOTAL_BIKES);
	let sortAscending = $state(true);
	let refreshInterval = $state(defaultRefreshInterval);

	onMount(() => {
		const storedInterval = Number(
			LocalStorageHelper.getValue(
				LocalStorageKey.VELOCITE_REFRESH_INTERVAL,
				String(defaultRefreshInterval)
			)
		);
		if (refreshIntervals.includes(storedInterval)) refreshInterval = storedInterval;

		const storedSortField = LocalStorageHelper.getValue(LocalStorageKey.VELOCITE_SORT_FIELD, '');
		const validSortField = Object.values(VelociteSortField).find(
			(field) => field === storedSortField
		);
		if (validSortField) sortField = validSortField;

		const storedSortOrder = LocalStorageHelper.getValue(LocalStorageKey.VELOCITE_SORT_ORDER, '');
		if (storedSortOrder === 'true') sortAscending = true;
		if (storedSortOrder === 'false') sortAscending = false;
	});

	$effect(() => {
		if (!browser) return;
		LocalStorageHelper.setValue(LocalStorageKey.VELOCITE_REFRESH_INTERVAL, String(refreshInterval));
		LocalStorageHelper.setValue(LocalStorageKey.VELOCITE_SORT_FIELD, sortField);
		LocalStorageHelper.setValue(LocalStorageKey.VELOCITE_SORT_ORDER, String(sortAscending));
	});

	$effect(() => {
		if (refreshInterval === 0) return;
		const id = setInterval(refreshStations, refreshInterval);
		return () => clearInterval(id);
	});

	async function refreshStations() {
		const res = await fetch('/api/jcdecaux/stations');
		if (res.ok) {
			stations = await res.json();
		}
	}

	const filteredStations = $derived(filterStations(stations, queryInput));
	const sortedStations = $derived(sortStations(filteredStations, sortField, sortAscending));
</script>

<svelte:head>
	<title>Liste des stations Vélocité</title>
</svelte:head>

<Header bind:queryInput />

<main class="m-auto grid max-w-lg gap-8 p-4 xl:max-w-6xl xl:grid-cols-2">
	<div class="hidden content-start xl:grid">
		<h2 class="heading-font mx-4 mb-4 text-lg font-bold">Options de tri</h2>
		<SortForm bind:sortField />
	</div>
	<div class="grid content-start">
		<div class="mb-4 flex items-center justify-between">
			<CountItems
				{queryInput}
				totalLength={stations.length}
				filteredLength={filteredStations.length}
			/>

			<div class="flex gap-1">
				<SortButtonGroup bind:sortField bind:sortAscending />
				<RefreshDropdown bind:interval={refreshInterval} />
			</div>
		</div>

		<div class="mb:pb-0 grid gap-0.5 pb-18">
			{#each sortedStations as station (station.number)}
				<StationRow {station} {sortField} />
			{:else}
				<div class="flex flex-col items-center gap-3 py-16 text-muted-foreground text-center">
					<SearchX class="size-30" />
					<div>
						<p class="mb-2 font-medium">Oups ! Nous n’avons rien trouvé</p>
						<p class="text-sm">
							Aucun résultat pour <span class="font-medium text-foreground">"{queryInput}"</span>
						</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
</main>
