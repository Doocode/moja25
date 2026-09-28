<script lang="ts">
	import type { FormattedStation } from '$core/dto/jcdecaux';
	import RecapSection from './RecapSection.svelte';
	import StationHeader from './StationHeader.svelte';
	import StationAvailabilities from './StationAvailabilities.svelte';
	import Indicators from './Indicators.svelte';
	import StationAddress from './StationAddress.svelte';
	import { defaultRefreshInterval, refreshIntervals } from '../../shared/core/settings';
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
		if (!browser) return;

		// Update refresh interval
		localStorage.setItem('velocite-refresh-interval', String(refreshInterval));
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
	<title>{station.formattedName} - Vélocité</title>
</svelte:head>

<StationHeader {station} bind:refreshInterval />

<main class="mb:pb-0 m-auto max-w-4xl p-4 pb-18 lg:-mt-53 xl:-mt-50">
	<RecapSection {station} class="mb-4" />
	<Indicators {station} class="mt-6 mb-3 sm:mt-8" />
	<StationAvailabilities {station} class="mb-3" />
	<StationAddress {station} />
</main>
