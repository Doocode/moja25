<script lang="ts">
	import { cn } from '$lib/utils';
	import { resolve } from '$app/paths';
	import { BadgeLigne } from '$lib/ui/ginko';
	import type { ItemEtatLigne } from './types';
	import EtatVoyant from './EtatVoyant.svelte';

	interface Props {
		lignes: ItemEtatLigne[];
		size?: 'sm' | 'md' | 'lg';
	}

	let { lignes, size = 'sm' }: Props = $props();
</script>

<div class="flex flex-wrap items-center gap-2 px-4 sm:gap-4 md:gap-6">
	{#each lignes as ligne (ligne.idLigne)}
		<a
			class="relative"
			href={resolve('/ginko/infos-trafic/ligne/[id]', { id: ligne.idLigne })}
			data-sveltekit-preload-data="tap"
		>
			<BadgeLigne
				ligne={{
					...ligne,
					id: ligne.idLigne,
					libellePublic: ligne.numLignePublic,
					variantes: [],
					periurbain: false
				}}
				class={cn(
					size === 'lg' && 'w-22 rounded-lg py-3 text-5xl',
					size === 'md' && 'min-w-13 rounded-md px-3 text-3xl'
				)}
			/>

			<EtatVoyant etat={ligne.etat} class="absolute -top-2 -right-2" />
		</a>
	{/each}
</div>
