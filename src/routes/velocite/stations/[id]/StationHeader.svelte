<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/env';
	import { resolve } from '$app/paths';
	import { ArrowLeft } from '@lucide/svelte';
	import { Button } from '#shadcn/button/index.ts';
	import { afterNavigate, goto } from '$app/navigation';
	import AnimatedGridBg from '#lib/ui/AnimatedGridBg.svelte';
	import { RefreshDropdown } from '../../shared/ui/tool-bar';
	import KeepScreenAwake from '#lib/ui/KeepScreenAwake.svelte';
	import type { FormattedStation } from '#core/dto/jcdecaux/index.ts';
	import { LocalStorageHelper, LocalStorageKey } from '#core/helper/local_storage/index.ts';
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

	const fallbackHref = resolve('velocite/carte');
	let canGoBack = $state(false);

	// `from` is null when this page is the first one of the session
	afterNavigate(({ from, shallow, type }) => {
		if (shallow && type === 'goto') return;

		canGoBack = from !== null;
	});

	function goBack(event: MouseEvent) {
		event.preventDefault();
		if (canGoBack) {
			history.back();
		} else {
			goto(fallbackHref);
		}
	}
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
					href={fallbackHref}
					title="Voir la liste de tous les stations"
					class="rounded-full p-5"
					onclick={goBack}
				>
					<ArrowLeft class="size-6" />
					<span class="sr-only">Liste des stations</span>
				</Button>

				<div class="flex max-w-40 justify-end gap-2 lg:flex-col xl:flex-row">
					<!-- TODO: Actions (add to bookmarks, share, open in map) -->
					{#if wakeLockSupported}
						<KeepScreenAwake
							size="lg"
							localStorageKey={LocalStorageKey.VELOCITE_KEEP_SCREEN_AWAKE}
						/>
					{/if}

					<RefreshDropdown size="lg" bind:interval={refreshInterval} />
				</div>
			</div>

			<div class="flex flex-wrap p-4">
				<div class="grid place-content-end justify-start sm:w-75 lg:h-24 xl:h-40">
					<h1 class="text-3xl leading-none font-black text-balance sm:text-4xl md:text-5xl">
						{station.formattedName}
					</h1>
					{#if station.address !== null && station.address !== ''}
						<p class="mt-1 hidden text-xs text-balance lg:inline">{station.address}</p>
					{/if}
				</div>
			</div>
		</div>
	</header>
</AnimatedGridBg>
