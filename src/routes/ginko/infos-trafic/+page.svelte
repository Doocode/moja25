<script lang="ts">
	import Header from './Header.svelte';
	import Legende from './Legende.svelte';
	import EtatLignes from './EtatLignes.svelte';
	import type { InfoLigne, Ligne } from '#core/dto/ginko/index.ts';

	interface Props {
		data: {
			etatLignes: InfoLigne[];
			lignes: Ligne[];
		};
	}

	let { data }: Props = $props();
	const { etatLignes, lignes } = $derived(data);
</script>

<svelte:head>
	<title>Infos trafic</title>
</svelte:head>

<main class="mx-auto max-w-260 pb-20 sm:pb-10">
	<Header />

	<div class="grid items-start gap-8 md:grid-cols-[1fr_300px]">
		<EtatLignes {etatLignes} {lignes} />
		<Legende class="sticky top-8 px-4 md:p-0" />
	</div>
</main>
