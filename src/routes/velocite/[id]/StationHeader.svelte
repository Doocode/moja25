<script lang="ts">
	import { onMount } from 'svelte';
	import { ArrowLeft } from '@lucide/svelte';
	import RefreshDropdown from '$lib/ui/RefreshDropdown.svelte';
	import type { FormattedStation } from '$core/dto/jcdecaux';
	import { defaultRefreshInterval, refreshIntervals } from '../settings';

	interface Props {
		station: FormattedStation;
		refreshInterval: number;
	}

	let { station, refreshInterval = $bindable(defaultRefreshInterval) }: Props = $props();

	onMount(() => {
		const storedInterval = localStorage.getItem('velocite-refresh-interval');
		if (storedInterval !== null) {
			const parsed = Number(storedInterval);
			if (refreshIntervals.includes(parsed)) refreshInterval = parsed;
		}
	});
</script>

<div class="bg-linear-to-b from-[#8e86ff] to-[#3fc9c9] dark:from-[#204174] dark:to-[#007cc7]">
	<div class="container mx-auto p-4">
		<a
			href="/velocite"
			class="-mt-4 mb-4 inline-flex items-center gap-1.5 py-4 text-sm transition-colors hover:text-foreground hover:underline"
		>
			<ArrowLeft class="size-5" />
			Liste des stations
		</a>

		<div class="flex items-start justify-between gap-3 pb-1">
			<div class="grid max-w-40">
				<p class="-ml-1 text-8xl font-thin" title="Numéro de la station">{station.number}</p>
				<h1 class="text-2xl leading-tight font-bold">{station.formattedName}</h1>
			</div>

			<div class="flex max-w-40 justify-end">
				<!-- TODO: Actions (add to bookmarks, share, open in map) -->
				<RefreshDropdown bind:interval={refreshInterval} />
			</div>
		</div>
	</div>
</div>
