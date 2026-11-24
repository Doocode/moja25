<script lang="ts">
	import { cn } from '#lib/utils.ts';
	import { EtatLigne } from './enums';
	import { Check, Info, TriangleAlert, X } from '@lucide/svelte';

	interface Props {
		etat: number;
		class?: string;
	}

	let { etat, class: className }: Props = $props();
</script>

{#if etat !== EtatLigne.Aucune_info}
	<div
		class={cn(
			'flex size-6 items-center justify-center rounded-sm border-2 border-background text-white dark:text-black',
			{
				'bg-green-600 dark:bg-green-400': etat === EtatLigne.Normal,
				'bg-blue-600 dark:bg-blue-400': etat === EtatLigne.Information,
				'bg-slate-600 dark:bg-slate-400':
					etat === EtatLigne.Hors_service || etat === EtatLigne.Perturbation_future,
				'bg-amber-600 dark:bg-amber-400': etat === EtatLigne.Perturbation_en_cours,
				'bg-red-600 dark:bg-red-400': etat === EtatLigne.Circulation_interrompue
			},
			className
		)}
	>
		{#if etat === EtatLigne.Normal}
			<Check class="size-4" />
		{:else if etat === EtatLigne.Information}
			<Info class="size-4" />
		{:else if etat === EtatLigne.Perturbation_future || etat === EtatLigne.Perturbation_en_cours}
			<TriangleAlert class="size-4" />
		{:else if etat === EtatLigne.Hors_service || etat === EtatLigne.Circulation_interrompue}
			<X class="size-4" />
		{/if}
	</div>
{/if}
