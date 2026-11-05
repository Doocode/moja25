<script lang="ts">
	import { browser } from '$app/environment';
	import { resolve } from '$app/paths';
	import { onMount } from 'svelte';
	import { Button } from '$shadcn/button';
	import { ArrowLeft } from '@lucide/svelte';
	import AnimatedGridBg from '$lib/ui/AnimatedGridBg.svelte';
	import type { FormattedStation } from '$core/dto/jcdecaux';
	import { RefreshDropdown } from '../../shared/ui/tool-bar';
	import KeepScreenAwake from '$lib/ui/KeepScreenAwake.svelte';
	import { LocalStorageHelper, LocalStorageKey } from '$lib/core/helper/local_storage';
	import { defaultRefreshInterval, refreshIntervals } from '../../shared/core/settings';

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
	spacing="30px"
	strokeWidth="3px"
>
	<header class="grid border-b border-[#00000077] dark:border-[#ffffff77]">
		<div class="container mx-auto grid xl:max-w-7xl">
			<div class="flex justify-between gap-4 p-4">
				<Button
					variant="default"
					size="icon"
					href={resolve('/velocite/recherche')}
					title="Voir la liste de tous les stations"
					class="rounded-full p-5"
				>
					<ArrowLeft class="size-6" />
					<span class="sr-only">Liste des stations</span>
				</Button>

				<div class="flex max-w-40 justify-end gap-2">
					<!-- TODO: Actions (add to bookmarks, share, open in map) -->
					{#if wakeLockSupported}
						<KeepScreenAwake size="lg" localStorageKey={LocalStorageKey.VELOCITE_KEEP_SCREEN_ON} />
					{/if}

					<RefreshDropdown size="lg" bind:interval={refreshInterval} />
				</div>
			</div>

			<div class="flex flex-wrap p-4">
				<div class="grid place-content-end justify-start sm:w-75 md:h-40">
					<h1
						class="text-3xl leading-tight font-bold text-balance sm:text-4xl md:text-5xl md:font-light"
					>
						{station.formattedName}
					</h1>
					{#if station.address !== null && station.address !== ''}
						<p class="mt-1 text-xs text-balance">{station.address}</p>
					{/if}
				</div>
			</div>
		</div>
	</header>
</AnimatedGridBg>
