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
	import { LocalStorageHelper, LocalStorageKey } from '$lib/core/helper/local_storage';
	import ProgressCells from './ProgressCells.svelte';

	interface Props {
		data: { station: FormattedStation };
	}

	let { data }: Props = $props();
	const station = $derived(data.station);
	let refreshInterval = $state(defaultRefreshInterval);

	onMount(() => {
		const storedInterval = Number(
			LocalStorageHelper.getValue(
				LocalStorageKey.VELOCITE_REFRESH_INTERVAL,
				String(defaultRefreshInterval)
			)
		);
		if (refreshIntervals.includes(storedInterval)) refreshInterval = storedInterval;
	});

	$effect(() => {
		if (!browser) return;

		// Update refresh interval
		LocalStorageHelper.setValue(LocalStorageKey.VELOCITE_REFRESH_INTERVAL, String(refreshInterval));
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

<main class="mb:pb-0 m-auto max-w-4xl p-4 pb-18">
	<div
		class="recap relative m-auto grid max-w-130 border-[#000000cc] lg:-mt-61 lg:mr-0 lg:rounded-4xl lg:border-t lg:bg-background lg:p-4 lg:pb-0 xl:mx-auto dark:lg:border-[#ffffffaa]"
	>
		<RecapSection {station} class="mb-4" />
		<ProgressCells {station} />
	</div>
	<Indicators {station} class="mt-6 mb-3 sm:mt-8" />
	<StationAvailabilities {station} class="mt-2 mb-3" />
	<StationAddress {station} />
</main>

<style>
	.recap {
		--corner-size: 30px;
		&::before,
		&::after {
			content: '';
			position: absolute;
			background: var(--background);
			width: var(--corner-size);
			height: var(--corner-size);
			top: 197px;
		}

		&::before {
			left: calc(-1 * var(--corner-size));
			mask-image: radial-gradient(
				circle var(--corner-size) at top left,
				transparent var(--corner-size),
				black calc(var(--corner-size) + 0.5px)
			);
		}
		&::after {
			right: calc(-1 * var(--corner-size));
			mask-image: radial-gradient(
				circle var(--corner-size) at top right,
				transparent var(--corner-size),
				black calc(var(--corner-size) + 0.5px)
			);
		}
	}
</style>
