<script lang="ts">
	import type { FormattedStation } from '$core/dto/jcdecaux';
	import RecapSection from './RecapSection.svelte';
	import StationHeader from './StationHeader.svelte';
	import StationAvailabilities from './StationAvailabilities.svelte';
	import StationInfos from './StationInfos.svelte';
	import StationDetails from './StationDetails.svelte';

	interface Props {
		data: { station: FormattedStation };
	}

	let { data }: Props = $props();
	const station = $derived(data.station);
</script>

<svelte:head>
	<title>{station.formattedName} — Vélocité</title>
</svelte:head>

<main class="m-auto max-w-4xl p-4">
	<StationHeader {station} />
	<RecapSection {station} class="mb-4" />
	<StationAvailabilities {station} class="mb-3" />
	<StationInfos {station} class="mb-3" />
	<StationDetails {station} />
</main>
