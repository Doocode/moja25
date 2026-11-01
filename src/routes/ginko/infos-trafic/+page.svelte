<script lang="ts">
	import Header from './Header.svelte';
	import EtatLignes from './EtatLignes.svelte';
	import type { InfoLigne, Ligne } from '$core/dto/ginko';

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

<main class="mx-auto max-w-250 pb-20 sm:pb-10">
	<Header />

	<!-- TODO: Create legend block -->
	<EtatLignes {etatLignes} {lignes} />
</main>
