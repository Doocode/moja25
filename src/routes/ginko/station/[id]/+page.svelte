<script lang="ts">
	import Header from './Header.svelte';
	import * as Tabs from '#shadcn/tabs/index.ts';
	import NearbyStops from './NearbyStops.svelte';
	import WaitingTimes from './time/WaitingTimes.svelte';
	import type { Arret, TempsLieu } from '#core/dto/ginko/index.ts';

	interface Props {
		data: {
			arret: Arret;
			arretsProches: Arret[];
			tempsLieu: TempsLieu | null;
		};
	}

	let { data }: Props = $props();
</script>

<svelte:head>
	<title>[Bus & tram] {data.arret.nom}</title>
</svelte:head>

<Tabs.Root value="times">
	<Header arret={data.arret} />

	<div class="container mx-auto gap-0 px-4 pb-22">
		<Tabs.Content value="times" class="grid">
			<WaitingTimes temps={data.tempsLieu?.listeTemps ?? []} />
		</Tabs.Content>
		<Tabs.Content value="nearby">
			<NearbyStops arrets={data.arretsProches} />
		</Tabs.Content>
	</div>
</Tabs.Root>
