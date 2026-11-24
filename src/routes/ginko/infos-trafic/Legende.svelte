<script lang="ts">
	import { cn } from '#lib/utils.ts';
	import { EtatLigne } from './enums';
	import EtatVoyant from './EtatVoyant.svelte';

	interface Props {
		class?: string;
	}

	let { class: className }: Props = $props();

	const items: { etat: EtatLigne; description: string }[] = [
		{
			etat: EtatLigne.Aucune_info,
			description: "Pas d'info sur l'état de la ligne (exemple : lignes TAD)"
		},
		{
			etat: EtatLigne.Normal,
			description: 'La ligne fonctionne normalement (aucune perturbation en cours ni prévue)'
		},
		{
			etat: EtatLigne.Information,
			description: 'Il y a une information concernant la ligne (nouveauté, évolution)'
		},
		{
			etat: EtatLigne.Hors_service,
			description: 'La ligne ne fonctionne pas en ce moment, selon sa période de fonctionnement'
		},
		{
			etat: EtatLigne.Perturbation_future,
			description: 'Une perturbation est prévue dans le futur'
		},
		{
			etat: EtatLigne.Perturbation_en_cours,
			description: 'Une perturbation est en cours'
		},
		{
			etat: EtatLigne.Circulation_interrompue,
			description: 'La circulation de la ligne est interrompue (totalement)'
		}
	];
</script>

<section class={cn('grid gap-3', className)}>
	<h2 class="text-lg font-bold">Légende</h2>
	<ul class="grid gap-2">
		{#each items as item (item.etat)}
			<li class="flex items-center gap-3 text-sm">
				<span class="flex size-7.5 shrink-0 items-center justify-center">
					{#if item.etat === EtatLigne.Aucune_info}
						<span
							class="size-7.5 rounded-sm border-2 border-dashed border-muted-foreground/50"
							aria-hidden="true"
						></span>
					{:else}
						<EtatVoyant etat={item.etat} class="size-7.5" />
					{/if}
				</span>
				<span>{item.description}</span>
			</li>
		{/each}
	</ul>
</section>
