<script lang="ts">
	import type { Component } from 'svelte';
	import './recap-blocks.css';

	interface Props {
		count: number;
		title: string;
		icon: Component;
		kind: 'mechanical-bikes' | 'electrical-bikes' | 'available-stands' | 'unavailable-stands';
	}

	let { count, title, icon, kind }: Props = $props();

	let delay = $derived.by(() => {
		switch (kind) {
			case 'mechanical-bikes':
				return 0;
			case 'electrical-bikes':
				return 1;
			case 'available-stands':
				return 2;
			case 'unavailable-stands':
				return 3;
		}
	});
</script>

<main
	class={{
		'recap_block relative flex aspect-3/4 flex-col gap-2 overflow-clip rounded-xl sm:rounded-2xl': true,
		'text-red-600 dark:text-red-400': count <= 0,
		'text-white': count > 0
	}}
	class:mechanical-bikes={kind === 'mechanical-bikes' && count > 0}
	class:electrical-bikes={kind === 'electrical-bikes' && count > 0}
	class:available-stands={kind === 'available-stands' && count > 0}
	class:unavailable-stands={kind === 'unavailable-stands' && count > 0}
	class:empty={count <= 0}
	style:--delay={delay}
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
