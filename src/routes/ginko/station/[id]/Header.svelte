<script lang="ts">
	import type { FormattedArret } from '#core/dto/ginko/index.ts';
	import { afterNavigate, goto } from '$app/navigation';
	import { Button } from '#shadcn/button/index.ts';
	import { ArrowLeft } from '@lucide/svelte';
	import TabBar from './tabs/TabBar.svelte';
	import { resolve } from '$app/paths';
	interface Props {
		arret: FormattedArret;
	}

	let { arret }: Props = $props();

	const fallbackHref = resolve('ginko/recherche');
	let canGoBack = $state(false);

	// `from` is null when this page is the first one of the session
	afterNavigate(({ from, shallow, type }) => {
		if (shallow && type === 'goto') return;

		canGoBack = from !== null;
	});

	function goBack(event: MouseEvent) {
		event.preventDefault();
		if (canGoBack) {
			history.back();
		} else {
			goto(fallbackHref);
		}
	}
</script>

<header
	class="bg-linear-to-b from-cyan-300 to-transparent p-4 pb-0 text-center sm:py-8 md:py-4 md:text-start dark:from-cyan-800"
>
	<div class="container m-auto grid md:flex md:items-center md:justify-between md:gap-3 md:px-4">
		<div class="flex flex-2 items-center justify-start gap-2 md:flex-col md:items-start">
			<Button
				variant="default"
				size="icon"
				href={fallbackHref}
				title="Voir la liste de tous les stations"
				class="rounded-full p-5"
				onclick={goBack}
			>
				<ArrowLeft class="size-6" />
				<span class="sr-only">Liste des stations</span>
			</Button>

			<h1 class=" text-2xl font-black md:text-4xl">
				{#if arret.nomDecoupe}
					<span class="block text-sm font-normal text-foreground/70">{arret.nomDecoupe.ville}</span>
					<span class="block">{arret.nomDecoupe.station}</span>
				{:else}
					{arret.nom}
				{/if}
			</h1>
		</div>

		<TabBar />

		<div class="hidden flex-2 justify-end sm:flex"></div>
	</div>
</header>
