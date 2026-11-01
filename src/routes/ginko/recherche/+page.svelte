<script lang="ts">
	import ResultCount from './ResultCount.svelte';
	import ResultList from './ResultList.svelte';
	import SearchBar from '../../velocite/shared/ui/tool-bar/SearchBar.svelte';
	import type { Arret } from '$core/dto/ginko';

	interface Props {
		data: {
			arrets: Arret[];
		};
	}

	let { data }: Props = $props();

	let queryInput = $state('');

	let results = $derived.by(() => {
		const terms = normalize(queryInput) // Remove diacritics and normalize special characters
			.split(/\s+/) // Split on spaces to get individual search terms instead of one long string
			.filter(Boolean); // Remove empty strings

		if (terms.length === 0) return []; // No search terms, return empty array

		// Filter and sort
		return data.arrets
			.filter((a) => {
				const haystack = normalize(a.nom);
				return terms.every((t) => haystack.includes(t)); // Match all search terms
			})
			.sort((a, b) => a.nom.localeCompare(b.nom, 'fr', { numeric: true }));
	});

	// Transform [à, é, è, etc.] to [a, e, e, etc.]
	// TODO: Move to helper file
	function normalize(search: string) {
		return search
			.normalize('NFD') // Separate diacritics from letters
			.replace(/\p{Diacritic}/gu, '') // Remove diacritics
			.replace(/œ/g, 'oe')
			.replace(/æ/g, 'ae')
			.toLowerCase();
	}
</script>

<svelte:head>
	<title>Rechercher une station</title>
</svelte:head>

<main class="container m-auto max-w-lg p-4">
	<header class="mb-4 flex flex-col gap-4">
		<h1 class="text-2xl font-bold">Rechercher une station</h1>
		<SearchBar placeholder="Nom de la station" bind:value={queryInput} />
	</header>

	{#if normalize(queryInput).trim() === ''}
		<p class="text-center text-muted-foreground">
			Saisissez le nom d'une station de bus ou de tram.
		</p>
	{:else if results.length === 0}
		<p class="text-center text-muted-foreground">Aucune station ne correspond à la recherche.</p>
	{:else}
		<ResultCount count={results.length} />
		<ResultList arrets={results} />
	{/if}
</main>
