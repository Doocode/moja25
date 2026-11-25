<script lang="ts">
	import { Button } from '#shadcn/button/index.ts';
	import AffectedLines from './AffectedLines.svelte';
	import AffectedStops from './AffectedStops.svelte';
	import { ExternalLink } from '@lucide/svelte';
	import type { Arret, Ligne, Message } from '#core/dto/ginko/index.ts';
	import NavBar from './NavBar.svelte';
	import Etat from '../../Etat.svelte';

	interface Props {
		data: {
			message: Message;
			lignes: Ligne[];
			arrets: Arret[];
		};
	}

	let { data }: Props = $props();

	let message = $derived(data.message);
	let lignes = $derived(data.lignes);
	let arrets = $derived(data.arrets);
	let hasAside = $derived(lignes.length > 0 || arrets.length > 0);
</script>

<svelte:head>
	<title>Etat du service</title>
</svelte:head>

<NavBar />

<header class="mx-auto grid max-w-2xl justify-items-center gap-3 py-6 text-center">
	<Etat etat={message.etat} />
	<h1 class="text-2xl font-black">{@html message.titre}</h1>
</header>

<main
	class="container m-auto grid gap-6 p-4"
	class:max-w-2xl={!hasAside}
	class:max-w-6xl={hasAside}
>
	<div
		class={{
			'grid items-start gap-8': true,
			'sm:grid-cols-[300px_1fr]': hasAside
		}}
	>
		{#if hasAside}
			<aside class="grid gap-8">
				{#if lignes.length > 0}
					<AffectedLines {lignes} />
				{/if}

				{#if arrets.length > 0}
					<AffectedStops {arrets} />
				{/if}
			</aside>
		{/if}

		<div class="grid gap-6">
			<section class="prose max-w-none dark:prose-invert">
				{@html message.texte}
			</section>

			{#if message.url}
				<nav class="flex-flow flex gap-2">
					<Button href={message.url} target="_blank" rel="noopener noreferrer" variant="outline">
						Plus d'informations sur Ginko.voyage
						<ExternalLink class="size-4" />
					</Button>
				</nav>
			{/if}
		</div>
	</div>
</main>
