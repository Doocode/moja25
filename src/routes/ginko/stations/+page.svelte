<script lang="ts">
	import SearchBar from '../../SearchBar.svelte';
	import type { Arret } from '$core/dto/ginko';
	import ArretRow from './ArretRow.svelte';

	interface Props {
		data: {
			arrets: Arret[];
		};
	}

	let { data }: Props = $props();

	let arrets = $derived<Arret[]>(data.arrets);
	let searchQuery = $state('');
	$inspect(arrets);
</script>

<svelte:head>
	<title>Stations Ginko</title>
</svelte:head>

<main class="m-auto max-w-lg p-4">
	<h1 class="mb-2 text-center text-3xl font-bold">Ginko</h1>

	<SearchBar class="mb-1" bind:value={searchQuery} />

	<div class="grid gap-0.5">
		{#each arrets as arret (arret.id)}
			<ArretRow {arret} />
		{/each}
	</div>
</main>
