<script lang="ts">
	import Header from './Header.svelte';
	import * as Tabs from '#shadcn/tabs/index.ts';
	import ListStop from './ListStop.svelte';
	import { ArrowRight } from '@lucide/svelte';
	import type { Ligne, Arret } from '#core/dto/ginko/index.ts';

	interface Props {
		data: {
			ligne: Ligne;
			variantes: Arret[][];
		};
	}

	let { data }: Props = $props();

	let ligne = $derived(data.ligne);
	let selected = $state('');
	let current = $derived(
		ligne.variantes.some((v) => v.id === selected) ? selected : (ligne.variantes[0]?.id ?? '')
	);
</script>

<svelte:head>
	<title>Ligne {ligne.numLignePublic} : {ligne.libellePublic}</title>
</svelte:head>

<Header {ligne} />

<!-- TODO: Display Etat du service -->

<main class="container m-auto max-w-2xl p-4">
	{#if ligne.variantes.length === 0}
		<p class="text-center text-muted-foreground">Aucune variante disponible pour cette ligne.</p>
	{:else}
		<Tabs.Root value={current} onValueChange={(v) => (selected = v)} class="sm:-mt-11.5">
			<Tabs.List
				class="sticky top-4 z-10 h-auto! w-full flex-wrap rounded-2xl backdrop-blur-2xl sm:bg-muted/50"
			>
				{#each ligne.variantes as variante (variante.id)}
					<Tabs.Trigger value={variante.id} class="h-auto flex-1 rounded-xl p-4">
						<ArrowRight class="size-5" />
						{variante.destination}
					</Tabs.Trigger>
				{/each}
			</Tabs.List>

			{#each ligne.variantes as variante, ii (variante.id)}
				<Tabs.Content value={variante.id} class="mt-4">
					<div class="mx-auto grid max-w-85">
						<p class="mb-1 text-xs tracking-widest text-muted-foreground uppercase">Destination</p>
						<p class="text-lg font-bold">{variante.destination}</p>
						{#if variante.precisionDestination}
							<p class="mb-3 text-sm text-muted-foreground">{variante.precisionDestination}</p>
						{/if}
					</div>

					<ListStop stops={data.variantes[ii]} {ligne} />
				</Tabs.Content>
			{/each}
		</Tabs.Root>
	{/if}
</main>
