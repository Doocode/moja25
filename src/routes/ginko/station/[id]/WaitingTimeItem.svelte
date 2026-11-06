<script lang="ts">
	import { getDisplayTexts, TypeDeTemps } from './waitingTimes';
	import type { TempsAttente } from '$core/dto/ginko';

	interface Props {
		temps: TempsAttente;
		index?: number;
		large?: boolean;
	}

	let { temps, index = -1, large = false }: Props = $props();

	const ALTERNATE_DELAY_MS = 3000;

	let texts = $derived(getDisplayTexts(temps));
	let textIndex = $state(0);
	let text = $derived(texts[textIndex % texts.length]);
	let lessThan_10min = $derived(temps.tempsEnSeconde <= 10 * 60 && temps.tempsEnSeconde > 2 * 60);
	let lessThan_2min = $derived(temps.tempsEnSeconde <= 2 * 60);

	$effect(() => {
		textIndex = 0;
		if (texts.length < 2) return;
		const timer = setInterval(
			() => (textIndex = (textIndex + 1) % texts.length),
			ALTERNATE_DELAY_MS
		);
		return () => clearInterval(timer);
	});

	let isMessage = $derived(temps.typeDeTemps === TypeDeTemps.Texte);
	let isTheoretical = $derived(!temps.fiable && !isMessage);
</script>

<li
	class="grid gap-0.5 text-lg"
	title={isTheoretical ? 'Horaire théorique : le véhicule n’est pas localisé' : undefined}
>
	<span
		class={{
			'font-light': index > 0,
			'font-black': index === 0,
			'text-orange-600 dark:text-orange-400': isMessage && !lessThan_2min,
			'text-muted-foreground italic': isTheoretical,
			'less-than-10min': lessThan_10min,
			'less-than-2min': lessThan_2min && !isMessage,
			'text-sky-600 dark:text-sky-400': lessThan_10min && !isMessage,
			'text-red-600 dark:text-red-400': lessThan_2min && !isMessage
		}}
	>
		{#if !text}
			Pas de temps
		{:else if isTheoretical}
			Théorique <span class="text-xs font-normal">({text})</span>
		{:else if temps.typeDeTemps === TypeDeTemps.Duree && large}
			{@const tempsEnMinute = Math.round(temps.tempsEnSeconde / 60)}
			{@const tempsEnHeure = Math.round(tempsEnMinute / 60)}
			{#if tempsEnMinute <= 99}
				<div class="flex flex-col">
					<span class="text-5xl">{tempsEnMinute}</span>
					<span class="text-xs">min</span>
				</div>
			{:else}
				<div class="flex flex-col">
					<span class="text-5xl">{tempsEnHeure}</span>
					<span class="text-xs">heure</span>
				</div>
			{/if}
		{:else}
			{text}
		{/if}
	</span>

	<div class="flex flex-wrap items-center gap-x-2 text-xs text-muted-foreground">
		{#if isTheoretical}
			<span>Théorique</span>
		{/if}
		{#if temps.quai}
			<span>{temps.quai}</span>
		{/if}
	</div>
</li>

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
	.less-than-10min {
		animation: blink 4s infinite;
	}
	.less-than-2min {
		animation: quick_blink 0.75s infinite;
	}
</style>
