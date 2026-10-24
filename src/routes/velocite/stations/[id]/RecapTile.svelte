<script lang="ts">
	import type { Component } from 'svelte';

	interface Props {
		count: number;
		title: string;
		icon: Component;
		type: 'mechanical-bikes' | 'electrical-bikes' | 'available-stands' | 'unavailable-stands';
	}

	let { count, title, icon, type }: Props = $props();
</script>

<main
	class={{
		'relative grid gap-2 overflow-clip rounded-lg md:h-48 md:rounded-2xl': true,
		'text-red-400': count <= 0,
		'text-white': count > 0
	}}
	class:mechanical-bikes={type === 'mechanical-bikes' && count > 0}
	class:electrical-bikes={type === 'electrical-bikes' && count > 0}
	class:available-stands={type === 'available-stands' && count > 0}
	class:unavailable-stands={type === 'unavailable-stands' && count > 0}
	class:empty={count <= 0}
>
	<div
		class="stripe relative z-10 h-1.5 bg-(--gradient-end) sm:h-2"
		class:bg-red-400={count <= 0}
	></div>
	<div class="flex flex-col items-start justify-between gap-2 p-3 sm:p-4">
		<div class="-mt-4 flex flex-col md:-mt-10">
			<span class="text-4xl font-bold md:text-6xl">{count}</span>
			<span class="text-[0.65rem] font-semibold uppercase md:text-xs">{title}</span>
		</div>
		{#if icon !== undefined}
			{@const Icon = icon}
			<Icon class="size-10 md:size-12" />

			<div class="absolute -top-4 -right-4 opacity-15">
				<Icon class="size-20 -rotate-12 md:size-35" />
			</div>
		{/if}
	</div>
</main>

<style>
	main {
		--gradient-start: red;
		--gradient-end: lime;

		background: linear-gradient(
			to bottom right,
			var(--gradient-start) 0%,
			var(--gradient-end) 100%
		);

		&.mechanical-bikes {
			--gradient-start: #411537;
			--gradient-end: #ee09a2;
		}

		&.electrical-bikes {
			--gradient-start: #0f2127;
			--gradient-end: #02c9e7;
		}

		&.available-stands {
			--gradient-start: #212326;
			--gradient-end: #879292;
		}

		&.unavailable-stands {
			--gradient-start: #794e0d;
			--gradient-end: #ff8f00;
		}

		&.empty {
			--gradient-start: #0e0705;
			--gradient-end: #640a04;
		}
	}
</style>
