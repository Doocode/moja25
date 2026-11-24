<script lang="ts">
	import type { FormattedStation } from '#lib/core/dto/jcdecaux/FormattedStation.ts';

	let { station }: { station: FormattedStation } = $props();

	const mechanicalBikes = $derived(station.totalStands.availabilities.mechanicalBikes);
	const electricalBikes = $derived(station.totalStands.availabilities.electricalBikes);
	const availableStands = $derived(station.totalStands.availabilities.stands);
	const unavailableStands = $derived(station.unavailableStands);
	const totalBikes = $derived(station.totalStands.availabilities.bikes);
	const capacity = $derived(station.totalStands.capacity);
</script>

<main class="progress_bar grid gap-1">
	<div class="flex h-3 gap-0.5 overflow-clip rounded-full">
		{#if mechanicalBikes > 0}
			<div
				class="bar segment-mechanical rounded-[4px] bg-[#ff65cc] dark:bg-[#bb1985]"
				style:width="{(mechanicalBikes / capacity) * 100}%"
			></div>
		{/if}
		{#if electricalBikes > 0}
			<div
				class="bar segment-electrical rounded-[4px] bg-[#00c2e0] dark:bg-[#00a4bc]"
				style:width="{(electricalBikes / capacity) * 100}%"
			></div>
		{/if}
		{#if availableStands > 0}
			<div
				class="bar segment-available rounded-[4px] bg-[#c9d1d4] dark:bg-[#324f58]"
				style:width="{(availableStands / capacity) * 100}%"
			></div>
		{/if}
		{#if unavailableStands > 0}
			<div
				class="bar segment-unavailable relative rounded-[4px] bg-amber-500"
				style:width="{(unavailableStands / capacity) * 100}%"
			></div>
		{/if}
	</div>

	<div class="legend-text flex justify-between gap-4 text-xs text-muted-foreground">
		<p class="font-bold">{totalBikes} {totalBikes === 1 ? 'vélo' : 'vélos'}</p>
		<p>{capacity} {capacity === 1 ? 'borne' : 'bornes'}</p>
	</div>
</main>

<style>
	.progress_bar .bar:is(.segment-mechanical, .segment-electrical) {
		--stripe-gradient-start: red;
		--stripe-gradient-via: lime;
		--stripe-gradient-end: blue;

		background: linear-gradient(
			to top,
			var(--stripe-gradient-start) 0%,
			var(--stripe-gradient-via) 50%,
			var(--stripe-gradient-end) 100%
		);

		&.segment-mechanical {
			--stripe-gradient-start: #990066;
			--stripe-gradient-via: #ee09a2;
			--stripe-gradient-end: #ff83b0;
		}
		&.segment-electrical {
			--stripe-gradient-start: #0293a6;
			--stripe-gradient-via: #02c9e7;
			--stripe-gradient-end: #44fde3;
		}
	}
	.segment-unavailable {
		--color1: #ffb327;
		--color2: #c45800;
		background: repeating-linear-gradient(
			-45deg,
			var(--color1),
			var(--color1) 10px,
			var(--color2) 10px,
			var(--color2) 20px
		);
		background-position: center center;

		&::after {
			content: '';
			position: absolute;
			inset: 0;
			width: 100%;
			height: 100%;
			background: linear-gradient(to bottom, #ffffffcc, #00000055);
			pointer-events: none;
			mix-blend-mode: overlay;
		}
	}

	:root.dark .segment-unavailable {
		--color1: #e09303;
		--color2: #885800;
	}
</style>
