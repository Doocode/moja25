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
		'_md:h-48 relative flex aspect-3/4 flex-col gap-2 overflow-clip rounded-xl sm:rounded-2xl': true,
		'text-red-400': count <= 0,
		'text-white': count > 0
	}}
	class:mechanical-bikes={type === 'mechanical-bikes' && count > 0}
	class:electrical-bikes={type === 'electrical-bikes' && count > 0}
	class:available-stands={type === 'available-stands' && count > 0}
	class:unavailable-stands={type === 'unavailable-stands' && count > 0}
	class:empty={count <= 0}
>
	<div class="stripe relative z-10 h-1.5 sm:h-2"></div>
	<div class="flex flex-1 flex-col items-start gap-2 p-3 sm:p-4">
		<div class="-mt-4 flex flex-col">
			<span class="text-4xl font-bold sm:text-6xl md:text-7xl">{count}</span>
			<span class="text-xs font-semibold text-balance sm:text-sm">{title}</span>
		</div>
		<div class="spacer w-full flex-1"></div>
		{#if icon !== undefined}
			{@const Icon = icon}
			<Icon class="size-10 sm:size-12 md:size-16" />

			<div class="absolute -top-4 -right-4 opacity-15">
				<Icon class="size-20 -rotate-12 sm:size-35" />
			</div>
		{/if}
	</div>
</main>

<style>
	main {
		--gradient-start: red;
		--gradient-end: lime;

		--stripe-gradient-start: red;
		--stripe-gradient-via: lime;
		--stripe-gradient-end: blue;

		background: linear-gradient(
			to bottom right,
			var(--gradient-start) 0%,
			var(--gradient-end) 100%
		);

		&.mechanical-bikes {
			--gradient-start: #411537;
			--gradient-end: #ee09a2;

			--stripe-gradient-start: #bb007d;
			--stripe-gradient-via: #ee09a2;
			--stripe-gradient-end: #ff468a;
		}

		&.electrical-bikes {
			--gradient-start: #0f2127;
			--gradient-end: #02c9e7;

			--stripe-gradient-start: #0293a6;
			--stripe-gradient-via: #02c9e7;
			--stripe-gradient-end: #44fde3;
		}

		&.available-stands {
			--gradient-start: #212326;
			--gradient-end: #879292;

			--stripe-gradient-start: #3a5673;
			--stripe-gradient-via: #879292;
			--stripe-gradient-end: #9bcbdb;
		}

		&.unavailable-stands {
			--gradient-start: #794e0d;
			--gradient-end: #ff8f00;

			--stripe-gradient-start: #ff7100;
			--stripe-gradient-via: #ff8f00;
			--stripe-gradient-end: #ffe600;
		}

		&.empty {
			--gradient-start: #efd9d9;
			--gradient-end: #efd9d9;

			--stripe-gradient-start: #b96600;
			--stripe-gradient-via: #ff595c;
			--stripe-gradient-end: #ff0045;
		}

		.stripe {
			background: linear-gradient(
				to right,
				var(--stripe-gradient-start) 0%,
				var(--stripe-gradient-via) 50%,
				var(--stripe-gradient-end) 100%
			);
		}
	}

	:root.dark main {
		&.empty {
			--gradient-start: #3b1818;
			--gradient-end: #3b1818;

			--stripe-gradient-start: #ad6400;
			--stripe-gradient-via: #ff6d71;
			--stripe-gradient-end: #e22761;
		}
	}
</style>
