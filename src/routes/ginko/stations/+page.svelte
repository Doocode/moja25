<script lang="ts">
	import SearchBar from '../../SearchBar.svelte';
	import type { Arret } from '$core/dto/ginko';
	import ArretRow from './ArretRow.svelte';
	import { filterArrets } from '$lib/core/helper/ginko/filter';
	import { SearchX } from '@lucide/svelte';

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
