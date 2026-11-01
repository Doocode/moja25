<script lang="ts">
	import { cn } from '$lib/utils';
	import { EtatLigne } from './enums';
	import { resolve } from '$app/paths';
	import { BadgeLigne } from '$lib/ui/ginko';
	import type { ItemEtatLigne } from './types';
	import { Check, Info, TriangleAlert, X } from '@lucide/svelte';

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

			{#if ligne.etat !== EtatLigne.Aucune_info}
				<div
					class={{
						'absolute -top-2 -right-2 flex size-6 items-center justify-center rounded-sm border-2 border-background text-white dark:text-black': true,
						'bg-green-600 dark:bg-green-400': ligne.etat === EtatLigne.Normal,
						'bg-blue-600 dark:bg-blue-400': ligne.etat === EtatLigne.Information,
						'bg-slate-600 dark:bg-slate-400':
							ligne.etat === EtatLigne.Hors_service || ligne.etat === EtatLigne.Perturbation_future,
						'bg-amber-600 dark:bg-amber-400': ligne.etat === EtatLigne.Perturbation_en_cours,
						'bg-red-600 dark:bg-red-400': ligne.etat === EtatLigne.Circulation_interrompue
					}}
				>
					{#if ligne.etat === EtatLigne.Normal}
						<Check class="size-4" />
					{:else if ligne.etat === EtatLigne.Information}
						<Info class="size-4" />
					{:else if ligne.etat === EtatLigne.Perturbation_future || ligne.etat === EtatLigne.Perturbation_en_cours}
						<TriangleAlert class="size-4" />
					{:else if ligne.etat === EtatLigne.Hors_service || ligne.etat === EtatLigne.Circulation_interrompue}
						<X class="size-4" />
					{/if}
				</div>
			{/if}
		</a>
	{/each}
</div>
