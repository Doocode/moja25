<script lang="ts">
	import { getDisplayTexts, TypeDeTemps } from './waitingTimes';
	import LargeTime from './LargeTime.svelte';
	import LargeMessage from './LargeMessage.svelte';
	import type { TempsAttente } from '#core/dto/ginko/index.ts';
	import { Button } from '#shadcn/button/index.ts';

	interface Props {
		temps: TempsAttente;
		index?: number;
		large?: boolean;
		onclick?: () => void;
	}

	let { temps, index = -1, large = false, onclick = () => {} }: Props = $props();

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

<Button
	variant="ghost"
	class="grid h-auto gap-0.5 py-1 text-lg hover:bg-slate-400/50 dark:hover:bg-slate-600"
	title={isTheoretical ? 'Horaire théorique : le véhicule n’est pas localisé' : undefined}
	{onclick}
>
	<span
		class={{
			'font-light': index > 0,
			'font-bold': index === 0,
			'text-orange-600 dark:text-orange-400': isMessage,
			'less-than-10min': lessThan_10min && !isMessage,
			'less-than-2min': lessThan_2min && !isMessage,
			'text-sky-600 dark:text-sky-400': lessThan_10min && !isMessage,
			'text-red-600 dark:text-red-400': lessThan_2min && !isMessage
		}}
	>
		{#if large}
			{#if isMessage}
				<LargeMessage {temps} />
			{:else}
				<LargeTime {temps} />
			{/if}
		{:else if !text}
			Pas de temps
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
</Button>

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
