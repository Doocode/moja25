<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import { X } from '@lucide/svelte';
	import Header from './Header.svelte';
	import { Button } from '$shadcn/button';
	import { scale } from 'svelte/transition';
	import { browser } from '$app/env';
	import CountItems from './CountItems.svelte';
	import ListStations from './ListStations.svelte';
	import type { FormattedStation } from '$core/dto/jcdecaux';
	import { sortStations } from '#lib/core/helper/velocite/sort.ts';
	import { VelociteSortField } from '$core/enum/VelociteSortField';
	import { filterStations } from '#lib/core/helper/velocite/filter.ts';
	import { SortButtonGroup, RefreshDropdown, SortForm } from '../shared/ui/tool-bar';
	import { defaultRefreshInterval, refreshIntervals } from '../shared/core/settings';
	import { LocalStorageHelper, LocalStorageKey } from '#lib/core/helper/local_storage/index.ts';

	interface Props {
		data: {
			stations: FormattedStation[];
		};
	}

	let { data }: Props = $props();

	let stations = $derived<FormattedStation[]>(data.stations);
	let queryInput = $state(page.url.searchParams.get('q') ?? '');
	let sortField = $state(VelociteSortField.TOTAL_BIKES);
	let sortAscending = $state(true);
	let refreshInterval = $state(defaultRefreshInterval);
	let displaySortingPane = $state(false);

	onMount(() => {
		const storedInterval = Number(
			LocalStorageHelper.getValue(
				LocalStorageKey.VELOCITE_REFRESH_INTERVAL,
				String(defaultRefreshInterval)
			)
		);
		if (refreshIntervals.includes(storedInterval)) refreshInterval = storedInterval;

		const storedDisplaySortingPane = LocalStorageHelper.getValue(
			LocalStorageKey.VELOCITE_DISPLAY_SORTING_PANE,
			'false'
		);
		displaySortingPane = storedDisplaySortingPane === 'true';

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
		LocalStorageHelper.setValue(
			LocalStorageKey.VELOCITE_DISPLAY_SORTING_PANE,
			String(displaySortingPane)
		);
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

	function onTriggerDrawer() {
		if (window.innerWidth >= 1280) {
			displaySortingPane = !displaySortingPane;
			return false;
		}
		return true;
	}
</script>

<svelte:head>
	<title>[Vélocité] Rechercher une station</title>
</svelte:head>

<Header bind:queryInput />

<main
	class={{
		'm-auto grid max-w-lg gap-8 p-4': true,
		'xl:max-w-5xl xl:grid-cols-2': displaySortingPane
	}}
>
	{#if displaySortingPane}
		<div class="hidden content-start xl:grid">
			<div class="relative grid rounded-2xl border border-input bg-card p-2" in:scale>
				<h2 class="heading-font mx-4 mt-2 mb-6 text-lg font-bold">Options de tri</h2>
				<Button
					variant="secondary"
					class="absolute top-3 right-3"
					size="icon"
					onclick={() => (displaySortingPane = false)}><X class="size-5" /></Button
				>

				<SortForm bind:sortField />
			</div>
		</div>
	{/if}
	<div class="grid content-start">
		<div class="mb-4 flex items-center justify-between">
			<CountItems
				{queryInput}
				totalLength={stations.length}
				filteredLength={filteredStations.length}
			/>

			<div class="flex gap-1">
				<SortButtonGroup bind:sortField bind:sortAscending {onTriggerDrawer} />

				<RefreshDropdown bind:interval={refreshInterval} />
			</div>
		</div>

		<ListStations stations={sortedStations} {sortField} bind:queryInput />
	</div>
</main>
