<script lang="ts">
	import type { Ligne, Message } from '$core/dto/ginko';
	import { BadgeLigne } from '$lib/ui/ginko';
	import ListMessage from './ListMessage.svelte';
	import NavBar from './NavBar.svelte';

	interface Props {
		data: {
			messages: Message[];
			ligne: Ligne;
			lignes: Ligne[];
		};
	}

	let { data }: Props = $props();

	let messages = $derived(data.messages);
	let ligne = $derived(data.ligne);
	let lignes = $derived(data.lignes);
</script>

<svelte:head>
	<title>[Infos trafic] Ligne {ligne.numLignePublic} - Ginko</title>
</svelte:head>

<NavBar idLigne={ligne.id} />

<main class="container mx-auto grid max-w-225 gap-6 p-4 sm:-mt-12">
	<header class="flex flex-col items-center justify-center gap-3 text-center">
		<BadgeLigne {ligne} class="min-w-22 rounded-lg px-4 py-2 text-5xl" />
		<h1 class="text-2xl font-light text-balance">
			<strong class="font-black">Infos trafic</strong> de la ligne {ligne.numLignePublic}
		</h1>
	</header>

	{#if messages.length > 0}
		<ListMessage {messages} {lignes} />
	{:else}
		<p class="text-center text-muted-foreground">Aucun message pour cette ligne.</p>
	{/if}
</main>
