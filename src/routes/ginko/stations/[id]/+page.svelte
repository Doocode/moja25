<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import type { Arret, TempsLieu, Ligne } from '$core/dto/ginko';
	import Header from './Header.svelte';
	import ListArrivalCard from './ListArrivalCard.svelte';
	import ListNearbyStations from './ListNearbyStations.svelte';
	import { defaultRefreshInterval, refreshIntervals } from './settings';
	import Section from './Section.svelte';
	import { Clock, MapPin } from '@lucide/svelte';

	interface Props {
		data: {
			arret: Arret;
			tempsLieu: TempsLieu;
			variantes: Ligne[];
			nearbyArrets: Arret[];
			nomQuery: string | null;
			arrivalsPerLine: number;
		};
	}

	let { data }: Props = $props();
	let refreshInterval = $state(defaultRefreshInterval);

	const station = $derived(data.arret);

	onMount(() => {
		const storedInterval = localStorage.getItem('ginko-station-refresh-interval');
		if (storedInterval !== null) {
			const parsed = Number(storedInterval);
			if (refreshIntervals.includes(parsed)) refreshInterval = parsed;
		}
	});

	$effect(() => {
		if (browser) {
			localStorage.setItem('ginko-station-refresh-interval', String(refreshInterval));
		}
	});

	$effect(() => {
		if (refreshInterval === 0) return;
		const id = setInterval(refreshInformations, refreshInterval);
		return () => clearInterval(id);
	});

	async function refreshInformations() {
		const params = new URLSearchParams({ nb: String(data.arrivalsPerLine) });
		if (data.nomQuery) {
			params.set('nom', data.nomQuery);
		}

		const res = await fetch(`/api/ginko/stations/${station.id}?${params.toString()}`);
		if (!res.ok) {
			console.error('Failed to refresh station data');
			return;
		}

		const newData: { arret: Arret; tempsLieu: TempsLieu } = await res.json();
		data = {
			...data,
			arret: newData.arret,
			tempsLieu: newData.tempsLieu
		};
	}
</script>

<svelte:head>
	<title>{station.nom} - Ginko</title>
</svelte:head>

<Header {station} variantes={data.variantes} bind:refreshInterval />

<main class="m-auto w-full max-w-6xl p-4 lg:-mt-6">
	<div class="grid gap-4 lg:grid-cols-[minmax(0,1fr)_400px]">
		<Section title="Prochains passages" icon={Clock}>
			<ListArrivalCard tempsLieu={data.tempsLieu} arrivalsPerLine={data.arrivalsPerLine} />
		</Section>
		<Section title="Stations à proximité" icon={MapPin}>
			<ListNearbyStations arrets={data.nearbyArrets} />
		</Section>
	</div>
</main>
