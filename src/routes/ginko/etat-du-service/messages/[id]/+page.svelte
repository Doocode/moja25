<script lang="ts">
	import { resolve } from '$app/paths';
	import Header from './Header.svelte';
	import { Button } from '$shadcn/button';
	import AffectedLines from './AffectedLines.svelte';
	import AffectedStops from './AffectedStops.svelte';
	import { ArrowLeft, ExternalLink } from '@lucide/svelte';
	import type { Arret, Ligne, Message } from '$core/dto/ginko';

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

<main
	class="container m-auto grid gap-6 p-4"
	class:max-w-2xl={!hasAside}
	class:max-w-6xl={hasAside}
>
	<a
		href={resolve('/ginko/etat-du-service')}
		class="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground hover:underline"
	>
		<ArrowLeft class="size-4" />
		Retour
	</a>

	<Header {message} />

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
			<section
				class="prose max-w-none rounded-2xl border-secondary sm:border-4 sm:px-6 dark:prose-invert"
			>
				{@html message.texte}
			</section>

			{#if message.url}
				<nav class="flex-flow flex gap-2">
					<Button href={message.url} target="_blank" rel="noopener noreferrer" variant="outline">
						Plus d'informations
						<ExternalLink class="size-4" />
					</Button>
				</nav>
			{/if}
		</div>
	</div>
</main>
