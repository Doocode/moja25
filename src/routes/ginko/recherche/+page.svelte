<script lang="ts">
	import { Button } from '$shadcn/button';
	import ResultList from './ResultList.svelte';
	import type { Arret } from '$core/dto/ginko';
	import ResultCount from './ResultCount.svelte';
	import SearchBar from '../../velocite/shared/ui/tool-bar/SearchBar.svelte';
	import { BusFront, CircleAlert, CircleDotDashed, TextCursorInput } from '@lucide/svelte';

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

<header class="container m-auto flex max-w-lg flex-col gap-4 p-4 pb-8 sm:py-8 md:py-14">
	<p class="flex items-center gap-2 text-2xl font-medium text-sky-700 dark:text-sky-300">
		<BusFront class="size-7" />
		<span>Bus & tram</span>
	</p>

	<h1 class="text-4xl leading-none font-black text-balance">
		Rechercher <span class="font-light text-sky-700 dark:text-sky-300">une station</span>
	</h1>
</header>

<div class="m-auto max-w-xl px-4">
	<SearchBar
		class="md:rounded-full md:py-4"
		placeholder="Nom de la station"
		bind:value={queryInput}
	/>
</div>

<main class="container m-auto max-w-lg p-4 pt-0">
	{#if normalize(queryInput).trim() === ''}
		<div class="py-10 text-center">
			<TextCursorInput class="mx-auto mb-4 size-40" stroke-width={1} />
			<p class="text-center text-sm text-balance text-muted-foreground">
				Saisissez le nom d'une station de bus ou de tram pour démarrer la recherche.
			</p>
		</div>
	{:else if results.length === 0}
		<div class="py-10 text-center">
			<CircleDotDashed
				class="mx-auto mb-4 size-40 text-amber-600 dark:text-amber-400"
				stroke-width={1}
			/>
			<p class="text-center text-sm text-balance">
				Aucune station ne correspond à votre recherche.
			</p>
			<p class="mt-1 mb-4 text-center text-sm text-balance text-muted-foreground">
				Essayez autre chose ou vérifiez l'orthographe.
			</p>
			<Button onclick={() => (queryInput = '')} class="min-w-40">Effacer la saisie</Button>
		</div>
	{:else}
		<ResultCount count={results.length} />
		{#if results.some((arret) => arret.intemperie)}
			<div
				class="my-2 grid grid-cols-[1fr_auto] gap-4 rounded-lg bg-red-200 p-4 text-sm text-red-600 dark:bg-red-950 dark:text-red-300"
			>
				<CircleAlert class="size-8" />
				<p>
					Attention : certaines stations sont impactées par les intempéries. Elles sont marquées par
					cet indicateur.
				</p>
			</div>
		{/if}
		<ResultList arrets={results} />
	{/if}
</main>
