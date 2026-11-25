<script lang="ts">
	import ViewMode from './ViewMode.svelte';
	import { getTypologie } from './typologies';
	import type { Ligne } from '#core/dto/ginko/index.ts';
	import GroupLignes from './GroupLignes.svelte';
	import SearchBar from '#lib/ui/SearchBar.svelte';

	interface Props {
		data: {
			lignes: Ligne[];
		};
	}

	let { data }: Props = $props();

	let lignes = $derived(data.lignes);
	let viewmode: 'grid' | 'list' = $state('grid');
	let queryInput = $state('');

	const normalize = (search: string) =>
		search
			.normalize('NFD')
			.replace(/\p{Diacritic}/gu, '')
			.toLowerCase();

	let filteredLines = $derived.by(() => {
		const terms = normalize(queryInput).split(/\s+/).filter(Boolean);
		if (terms.length === 0) return lignes;
		return lignes.filter((l) => {
			const haystack = normalize(`${l.numLignePublic} ${l.libellePublic}`);
			return terms.every((t) => haystack.includes(t));
		});
	});

	let groups = $derived(
		Object.entries(
			Object.groupBy(
				[...filteredLines].sort(
					(a, b) =>
						a.typologie - b.typologie ||
						a.numLignePublic.localeCompare(b.numLignePublic, 'fr', { numeric: true })
				),
				(l) => l.typologie
			)
		)
	);
</script>

<svelte:head>
	<title>Ligne de bus et de tram</title>
</svelte:head>

<main class="container m-auto p-4 transition-all duration-500" class:max-w-lg={viewmode === 'list'}>
	<header
		class="mb-4 grid flex-col gap-1 sm:flex sm:flex-row sm:items-center sm:justify-between"
		class:grid!={viewmode === 'list'}
	>
		<h1 class="text-2xl font-bold">Lignes</h1>
		<div class="flex items-center justify-end gap-1">
			<SearchBar bind:value={queryInput} />
			<ViewMode bind:viewmode />
		</div>
	</header>

	<div class="grid gap-8">
		{#each groups as [typologie, items] (typologie)}
			<GroupLignes
				icon={getTypologie(Number(typologie)).icon}
				label={getTypologie(Number(typologie)).label}
				items={items ?? []}
				{viewmode}
			/>
		{:else}
			<p class="text-center text-muted-foreground">Aucune ligne ne correspond à la recherche.</p>
		{/each}
	</div>
</main>
