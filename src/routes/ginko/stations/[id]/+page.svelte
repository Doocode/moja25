<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import type { Arret, TempsLieu } from '$core/dto/ginko';
	import {
		groupTempsByLineAndDirection,
		type GroupedTempsByLine
	} from '$core/helper/ginko/groupTemps';
	import Header from './Header.svelte';
	import ArrivalCard from './ArrivalCard.svelte';
	import { defaultRefreshInterval, refreshIntervals } from './settings';

	interface Props {
		data: {
			arret: Arret;
			tempsLieu: TempsLieu;
			arrivalsPerLine: number;
		};
	}

	let { data }: Props = $props();
	let refreshInterval = $state(defaultRefreshInterval);

	const station = $derived(data.arret);
	const groupedArrivals = $derived<GroupedTempsByLine[]>(
		groupTempsByLineAndDirection(data.tempsLieu?.listeTemps ?? [], data.arrivalsPerLine)
	);

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
		const res = await fetch(`/api/ginko/stations/${station.id}?nb=${data.arrivalsPerLine}`);
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

<Header {station} bind:refreshInterval />

<main class="m-auto max-w-4xl p-4 lg:-mt-6">
	<section class="grid gap-3">
		{#each groupedArrivals as group (group.key)}
			<ArrivalCard {group} />
		{:else}
			<div class="rounded-xl border bg-card p-6 text-center text-muted-foreground">
				Cette station n'est pas desservie pour le moment.
			</div>
		{/each}
	</section>
</main>
