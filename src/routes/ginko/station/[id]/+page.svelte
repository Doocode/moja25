<script lang="ts">
	import Header from './Header.svelte';
	import * as Tabs from '$shadcn/tabs';
	import TabBar from './TabBar.svelte';
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
	<title>[Bus & tram] {data.arret.nom}</title>
</svelte:head>

<Header arret={data.arret} lignes={data.lignes} />

<Tabs.Root value="times" class="container mx-auto -mt-10 max-w-2xl gap-0 p-4 pb-22">
	<TabBar />

	<Tabs.Content value="times" class="mt-6">
		<WaitingTimes temps={data.tempsLieu?.listeTemps ?? []} />
	</Tabs.Content>
	<Tabs.Content value="nearby" class="mt-6">
		<NearbyStops arrets={data.arretsProches} />
	</Tabs.Content>
</Tabs.Root>
