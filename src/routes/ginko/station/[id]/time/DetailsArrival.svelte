<script lang="ts">
	import type { TempsAttente } from '#core/dto/ginko/index.ts';
	import BadgeLigne from '#lib/ui/ginko/BadgeLigne.svelte';
	import { cn } from '#lib/utils.ts';
	import { TypeDeTemps } from './waitingTimes';
	import LargeMessage from './LargeMessage.svelte';
	import LargeTime from './LargeTime.svelte';

	interface Props {
		tempsAttente: TempsAttente;
	}

	let { tempsAttente }: Props = $props();

	let couleurTexte = $derived(tempsAttente.couleurTexte);
	let couleurFond = $derived(tempsAttente.couleurFond);
	let numLignePublic = $derived(tempsAttente.numLignePublic);
	let destination = $derived(tempsAttente.destination);
	let precisionDestination = $derived(tempsAttente.precisionDestination);
	let fiable = $derived(tempsAttente.fiable);
	let typeDeTemps = $derived(tempsAttente.typeDeTemps);
	let alternance = $derived(tempsAttente.alternance);
	let isMessage = $derived(typeDeTemps === TypeDeTemps.Texte);
	let lessThan_10min = $derived(
		tempsAttente.tempsEnSeconde <= 10 * 60 && tempsAttente.tempsEnSeconde > 2 * 60
	);
	let lessThan_2min = $derived(tempsAttente.tempsEnSeconde <= 2 * 60);
</script>

<main
	class="mb-8 grid grid-cols-[1fr_auto] items-center gap-4 rounded-xl bg-secondary/80 p-4 sm:rounded-4xl 2xl:min-h-70 2xl:grid-cols-1 2xl:justify-between 2xl:py-8 dark:bg-secondary"
>
	<header
		class="flex flex-col items-center justify-center gap-2 text-center sm:flex-row sm:justify-start sm:gap-4 sm:text-start 2xl:flex-col 2xl:items-center 2xl:gap-2 2xl:text-center"
	>
		<BadgeLigne
			ligne={{ numLignePublic, couleurTexte, couleurFond }}
			class={cn(
				'rounded-lg border border-background px-2.75 font-black sm:min-w-20 sm:rounded-xl sm:px-4 sm:py-3',
				numLignePublic.length < 4 ? 'text-2xl sm:text-4xl' : '',
				numLignePublic.length == 4 ? 'text-3xl' : ''
			)}
		/>

		<div class="grid min-w-0 flex-1 items-center">
			<p class="sr-only">Destination</p>
			<p class="truncate text-base font-bold sm:text-lg">{destination}</p>
			{#if precisionDestination}
				<p class="text-xs text-muted-foreground">{precisionDestination}</p>
			{/if}
		</div>
	</header>

	<div
		class={{
			'min-w-15 text-center': true,
			'font-bold': !isMessage,
			'text-orange-600 dark:text-orange-400': isMessage,
			'less-than-10min': lessThan_10min && !isMessage,
			'less-than-2min': lessThan_2min && !isMessage,
			'text-sky-600 dark:text-sky-300': lessThan_10min && !isMessage,
			'text-red-600 dark:text-red-300': lessThan_2min && !isMessage
		}}
	>
		{#if isMessage}
			<LargeMessage temps={tempsAttente} />
		{:else}
			<LargeTime temps={tempsAttente} theoretical={!fiable} />
		{/if}
	</div>
</main>

<style>
	@keyframes blink {
		0%,
		100% {
			opacity: 0;
		}
		10%,
		90% {
			opacity: 1;
		}
	}
	@keyframes quick_blink {
		0%,
		100% {
			opacity: 1;
		}
		50% {
			opacity: 0;
		}
	}
	/*.less-than-10min {
		animation: blink 4s infinite;
	}*/
	.less-than-2min {
		animation: quick_blink 0.75s infinite;
	}
</style>
