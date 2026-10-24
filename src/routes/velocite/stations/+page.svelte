<script lang="ts">
	import { onMount } from 'svelte';
	import type { FormattedStation } from '$core/dto/jcdecaux';
	import { sortStations } from '$lib/core/helper/velocite/sort';
	import { filterStations } from '$lib/core/helper/velocite/filter';
	import { VelociteSortField } from '$core/enum/VelociteSortField';
	import { LocalStorageHelper, LocalStorageKey } from '$lib/core/helper/local_storage';
	import { SearchX } from '@lucide/svelte';
	import { browser } from '$app/environment';
	import { StationRow } from '../shared/ui/list-station';
	import { defaultRefreshInterval, refreshIntervals } from '../shared/core/settings';
	import { SearchBar, SortButtonGroup, RefreshDropdown } from '../shared/ui/tool-bar';

	interface Props {
		data: {
			stations: FormattedStation[];
		};
	}

	let { data }: Props = $props();

	let stations = $derived<FormattedStation[]>(data.stations);
	let searchQuery = $state('');
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

	const filteredStations = $derived(filterStations(stations, searchQuery));
	const sortedStations = $derived(sortStations(filteredStations, sortField, sortAscending));
</script>

<svelte:head>
	<title>Liste des stations Vélocité</title>
</svelte:head>

<main class="m-auto max-w-lg p-4">
	<header class="mb-1 flex items-center justify-between">
		<h1 class="text-3xl font-bold">Vélocité</h1>
		<RefreshDropdown bind:interval={refreshInterval} />
	</header>

	<div class="mb-4 flex items-center justify-between">
		<p>{filteredStations.length} stations</p>
		<div class="flex gap-1">
			<SortButtonGroup bind:sortField bind:sortAscending />
		</div>
	</div>

	<SearchBar class="mb-1 rounded-lg" bind:value={searchQuery} />

	<div class="mb:pb-0 grid gap-0.5 pb-18">
		{#each sortedStations as station (station.number)}
			<StationRow {station} {sortField} />
		{:else}
			<div class="flex flex-col items-center gap-3 py-16 text-muted-foreground text-center">
				<SearchX class="size-30" />
				<div>
					<p class="mb-2 font-medium">Oups ! Nous n’avons rien trouvé</p>
					<p class="text-sm">
						Aucun résultat pour <span class="font-medium text-foreground">"{searchQuery}"</span>
					</p>
				</div>
			</div>
		{/each}
	</div>
</main>
