<script lang="ts">
	import SearchBar from '../../SearchBar.svelte';
	import type { Arret } from '$core/dto/ginko';
	import ArretRow from './ArretRow.svelte';
	import { filterArrets } from '$lib/core/helper/ginko/filter';

	interface Props {
		data: {
			arrets: Arret[];
		};
	}

	let { data }: Props = $props();

	let arrets = $derived<Arret[]>(data.arrets);
	let searchQuery = $state('');
	let filteredArrets = $derived<Arret[]>(filterArrets(arrets, searchQuery));
</script>

<svelte:head>
	<title>Stations Ginko</title>
</svelte:head>

<main class="m-auto max-w-lg p-4">
	<h1 class="mb-2 text-center text-3xl font-bold">Ginko</h1>

	<SearchBar class="mb-1" bind:value={searchQuery} />

	<div class="mb-4 flex items-center justify-between">
		<p>{filteredArrets.length} stations</p>
		<div class="flex gap-1">
			<!-- <SortButtonGroup bind:sortField bind:sortAscending /> -->
		</div>
	</div>

	<div class="grid gap-0.5">
		{#each filteredArrets as arret (arret.id)}
			<ArretRow {arret} />
		{/each}
	</div>
</main>
