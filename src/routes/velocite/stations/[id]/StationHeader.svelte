<script lang="ts">
	import { browser } from '$app/environment';
	import { resolve } from '$app/paths';
	import { onMount } from 'svelte';
	import { ArrowLeft } from '@lucide/svelte';
	import AnimatedGridBg from '$lib/ui/AnimatedGridBg.svelte';
	import type { FormattedStation } from '$core/dto/jcdecaux';
	import { defaultRefreshInterval, refreshIntervals } from '../../shared/core/settings';
	import { KeepScreenOnToggle, RefreshDropdown } from '../../shared/ui/tool-bar';
	import { LocalStorageHelper, LocalStorageKey } from '$lib/core/helper/local_storage';
	import { Button } from '$lib/shadcn/ui/button';

	interface Props {
		station: FormattedStation;
		refreshInterval: number;
	}

	let { station, refreshInterval = $bindable(defaultRefreshInterval) }: Props = $props();

	let wakeLockSupported = $state(false);

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

		// Check if we can use the Wake Lock API
		wakeLockSupported = 'wakeLock' in navigator;
	});
</script>

<AnimatedGridBg
	class="bg-linear-to-b from-[#91bdff] to-[#589bff] dark:from-[#0e3877] dark:to-[#038de4]"
	spacing="55px"
	strokeWidth="3px"
>
	<header class="border-b border-[#00000077] dark:border-[#ffffff77]">
		<div class="container mx-auto p-4">
			<Button
				variant="default"
				size="icon"
				href={resolve('/velocite/stations')}
				title="Voir la liste de tous les stations"
				class="rounded-full p-5"
			>
				<ArrowLeft class="size-6" />
				<span class="sr-only">Liste des stations</span>
			</Button>

			<div class="flex items-end justify-between gap-3">
				<div class="max-w-40">
					<p class="text-8xl font-thin" title="Numéro de la station">{station.number}</p>
					<h1 class="text-2xl leading-tight font-bold">{station.formattedName}</h1>
				</div>

				<div class="flex max-w-40 justify-end gap-2">
					<!-- TODO: Actions (add to bookmarks, share, open in map) -->
					{#if wakeLockSupported}
						<KeepScreenOnToggle size="lg" />
					{/if}

					<RefreshDropdown size="lg" bind:interval={refreshInterval} />
				</div>
			</div>
		</div>
	</header>
</AnimatedGridBg>
