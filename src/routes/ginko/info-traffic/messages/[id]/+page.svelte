<script lang="ts">
	import Etat from '../../Etat.svelte';
	import { resolve } from '$app/paths';
	import { Button } from '$shadcn/button';
	import { BadgeLigne } from '$lib/ui/ginko';
	import type { Arret, Ligne, Message } from '$core/dto/ginko';
	import { ArrowLeft, ExternalLink, MapPin } from '@lucide/svelte';

	interface Props {
		data: {
			message: Message;
			lignes: Ligne[];
			arrets: Arret[];
		};
	}

	let { data }: Props = $props();

	let message = $derived(data.message);
</script>

<svelte:head>
	<title>Info-trafic</title>
</svelte:head>

<main class="container m-auto grid max-w-2xl gap-6 p-4">
	<a
		href={resolve('/ginko/info-traffic')}
		class="inline-flex items-center gap-1 text-sm text-muted-foreground hover:underline"
	>
		<ArrowLeft class="size-4" />
		Info-trafic
	</a>

	<header class="grid justify-items-start gap-3">
		<Etat etat={message.etat} />
		<h1 class="text-2xl font-bold">{@html message.titre}</h1>
	</header>

	{#if data.lignes.length > 0}
		<section class="grid gap-2">
			<h2 class="font-semibold">Lignes concernées</h2>
			<ul class="flex flex-wrap gap-2">
				{#each data.lignes as ligne (ligne.id)}
					<li>
						<a
							href={resolve('/ginko/lignes/[idLigne]', { idLigne: ligne.id })}
							title={ligne.libellePublic}
						>
							<BadgeLigne {ligne} />
						</a>
					</li>
				{/each}
			</ul>
		</section>
	{/if}

	{#if data.arrets.length > 0}
		<section class="grid gap-2">
			<h2 class="font-semibold">Arrêts concernés</h2>
			<ul class="flex flex-wrap gap-2">
				{#each data.arrets as arret (arret.id)}
					<li class="inline-flex items-center gap-1 rounded-full border px-3 py-1 text-sm">
						<MapPin class="size-3.5" />
						{arret.nom}
					</li>
				{/each}
			</ul>
		</section>
	{/if}

	<section class="prose max-w-none dark:prose-invert">
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
</main>
