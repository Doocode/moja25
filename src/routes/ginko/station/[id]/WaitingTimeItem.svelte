<script lang="ts">
	import { getDisplayTexts, TypeDeTemps } from './waitingTimes';
	import type { TempsAttente } from '$core/dto/ginko';

	interface Props {
		temps: TempsAttente;
		index?: number;
	}

	let { temps, index = -1 }: Props = $props();

	const ALTERNATE_DELAY_MS = 3000;

	let texts = $derived(getDisplayTexts(temps));
	let textIndex = $state(0);
	let text = $derived(texts[textIndex % texts.length]);

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
			'text-orange-600 dark:text-orange-400': isMessage,
			'text-muted-foreground italic': isTheoretical
		}}
	>
		{#if !text}
			Pas de temps
		{:else if isTheoretical}
			Théorique <span class="text-xs font-normal">({text})</span>
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
