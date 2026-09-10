<script lang="ts">
	import { browser } from '$app/environment';
	import { resolve } from '$app/paths';
	import { onMount } from 'svelte';
	import { ArrowLeft } from '@lucide/svelte';
	import RefreshDropdown from '../RefreshDropdown.svelte';
	import type { FormattedStation } from '$core/dto/jcdecaux';
	import { defaultRefreshInterval, refreshIntervals } from '../settings';
	import KeepScreenOnToggle from '../KeepScreenOnToggle.svelte';
	import { slide } from 'svelte/transition';

	interface Props {
		station: FormattedStation;
		refreshInterval: number;
	}

	let { station, refreshInterval = $bindable(defaultRefreshInterval) }: Props = $props();

	let wakeLockSupported = $state(false);

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

		// Check if we can use the Wake Lock API
		wakeLockSupported = 'wakeLock' in navigator;
	});
</script>

<div
	class="bg-linear-to-b from-[#91bdff] to-[#76adff] dark:from-[#0e3877] dark:to-[#038de4]"
	in:slide|local
>
	<div class="container mx-auto p-4 pt-0">
		<a
			href={resolve('/velocite')}
			class="-mt-4 mb-4 inline-flex items-center gap-1.5 py-4 text-sm transition-colors hover:text-foreground hover:underline"
		>
			<ArrowLeft class="size-5" />
			Liste des stations
		</a>

		<div class="flex items-start justify-between gap-3 pb-1">
			<div class="grid max-w-40">
				<p class="text-8xl font-thin" title="Numéro de la station">{station.number}</p>
				<h1 class="text-2xl leading-tight font-bold">{station.formattedName}</h1>
			</div>

			<div class="flex max-w-40 justify-end gap-2">
				<!-- TODO: Actions (add to bookmarks, share, open in map) -->
				{#if wakeLockSupported}
					<KeepScreenOnToggle />
				{/if}

				<RefreshDropdown bind:interval={refreshInterval} />
			</div>
		</div>
	</div>
</div>
