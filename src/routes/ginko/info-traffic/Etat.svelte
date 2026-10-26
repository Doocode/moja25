<script lang="ts">
	import { Etat } from './enums';

	interface Props {
		etat: number;
	}

	let { etat }: Props = $props();
</script>

<main
	class={{
		'flex items-center justify-center gap-4 rounded-sm px-2 py-1 text-xs uppercase': true,
		'bg-green-300 dark:bg-green-700': etat === Etat.Aucune_perturbation,
		'bg-blue-300 dark:bg-blue-700': etat === Etat.Information_réseau,
		'bg-slate-300 dark:bg-slate-700': etat === Etat.Perturbation_future,
		'bg-amber-300 dark:bg-amber-700': etat === Etat.Perturbation_en_cours,
		'bg-red-300 dark:bg-red-900': etat === Etat.Circulation_interrompue
	}}
>
	{#if etat === Etat.Aucune_perturbation}
		<span>Aucune perturbation</span>
	{:else if etat === Etat.Information_réseau}
		<span>Evolution du réseau</span>
	{:else if etat === Etat.Perturbation_future}
		<span>Perturbation future</span>
	{:else if etat === Etat.Perturbation_en_cours}
		<span>Perturbation en cours</span>
	{:else if etat === Etat.Circulation_interrompue}
		<span>Circulation interrompue</span>
	{/if}
</main>
