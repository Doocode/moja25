<script lang="ts">
	import { defaultRefreshInterval, refreshIntervals } from '../../shared/core/settings';
	import { LocalStorageHelper, LocalStorageKey } from '$lib/core/helper/local_storage';
	import StationAvailabilities from './StationAvailabilities.svelte';
	import type { FormattedStation } from '$core/dto/jcdecaux';
	import StationAddress from './StationAddress.svelte';
	import ProgressCells from './ProgressCells.svelte';
	import StationHeader from './StationHeader.svelte';
	import RecapSection from './RecapSection.svelte';
	import ProgressBar from './ProgressBar.svelte';
	import Indicators from './Indicators.svelte';
	import { browser } from '$app/environment';
	import Ratio from './Ratio.svelte';
	import { onMount } from 'svelte';

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
		class="recap relative m-auto grid max-w-130 border-[#000000cc] lg:-mt-65 lg:mr-0 lg:max-w-138 lg:rounded-4xl lg:border-t lg:bg-background lg:p-4 lg:pb-0 xl:mx-auto dark:lg:border-[#ffffffaa]"
	>
		<RecapSection {station} class="mb-4" />
		<ProgressBar {station} />
	</div>

	<Indicators {station} class="mt-6 mb-3 sm:my-10" />

	<div class="mt-2 mb-6 grid items-center gap-1 sm:grid-cols-[auto_300px] sm:gap-x-6">
		<Ratio {station} />
		<ProgressCells {station} />
		<StationAvailabilities {station} class="sm:col-start-2 sm:row-start-1 sm:row-end-3" />
	</div>

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
			top: 213px;
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
