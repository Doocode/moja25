<script lang="ts">
	import type { FormattedStation } from '$core/dto/jcdecaux';
	import RecapSection from './RecapSection.svelte';
	import StationHeader from './StationHeader.svelte';
	import StationAvailabilities from './StationAvailabilities.svelte';
	import StationInfos from './StationInfos.svelte';
	import StationDetails from './StationDetails.svelte';
	import { defaultRefreshInterval, refreshIntervals } from '../settings';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';

	interface Props {
		data: { station: FormattedStation };
	}

	let { data }: Props = $props();
	const station = $derived(data.station);
	let refreshInterval = $state(defaultRefreshInterval);

	onMount(() => {
		const storedInterval = localStorage.getItem('velocite-refresh-interval');
		if (storedInterval !== null) {
			const parsed = Number(storedInterval);
			if (refreshIntervals.includes(parsed)) refreshInterval = parsed;
		}
	});

	$effect(() => {
		if (browser) {
			localStorage.setItem('velocite-refresh-interval', String(refreshInterval));
		}
	});

	$effect(() => {
		if (refreshInterval === 0) return;
		const id = setInterval(refreshInformations, refreshInterval);
		return () => clearInterval(id);
	});

	async function refreshInformations() {
		const res = await fetch(`/api/jcdecaux/stations/${station.number}`);
		if (!res.ok) {
			console.error('Failed to refresh station data');
			return;
		}
		const newData: { station: FormattedStation } = await res.json();
		data = newData;
	}
</script>

<svelte:head>
	<title>{station.formattedName} — Vélocité</title>
</svelte:head>

<StationHeader {station} bind:refreshInterval />

<main class="m-auto max-w-4xl p-4 lg:-mt-50">
	<RecapSection {station} class="mb-4" />
	<StationAvailabilities {station} class="mb-3" />
	<StationInfos {station} class="mb-3" />
	<StationDetails {station} />
</main>
