<script lang="ts">
	import Header from './Header.svelte';
	import NearbyStops from './NearbyStops.svelte';
	import WaitingTimes from './WaitingTimes.svelte';
	import type { Arret, Ligne, TempsLieu } from '$core/dto/ginko';

	interface Props {
		data: {
			arret: Arret;
			lignes: Ligne[];
			arretsProches: Arret[];
			tempsLieu: TempsLieu | null;
		};
	}

	let { data }: Props = $props();
</script>

<svelte:head>
	<title>{data.arret.nom} - Station</title>
</svelte:head>

<Header arret={data.arret} lignes={data.lignes} />

<main class="container m-auto grid max-w-2xl gap-8 p-4">
	<WaitingTimes temps={data.tempsLieu?.listeTemps ?? []} />
	<NearbyStops arrets={data.arretsProches} />
</main>
