<script lang="ts">
	import type { Component } from 'svelte';

	interface Props {
		count: number;
		title: string;
		icon: Component;
		tint?: string;
	}

	let { count, title, icon, tint = '#777777' }: Props = $props();
</script>

<main
	class="flex flex-col items-start gap-2 rounded-lg p-2 pt-1 md:p-4 md:pt-3"
	style:--tint={tint}
>
	<div class="flex flex-col">
		<span class="text-3xl font-bold md:text-5xl">{count}</span>
		<span class="text-[0.65rem] uppercase md:text-xs">{title}</span>
	</div>
	{#if icon !== undefined}
		{@const Icon = icon}
		<Icon class="size-10 md:size-12" />
	{/if}
</main>

<style>
	main {
		background-color: var(--tint);
		border-top: 5px solid var(--tint);
		background: linear-gradient(
			to bottom right,
			color-mix(in oklab, var(--tint), transparent 80%) 0%,
			var(--tint) 100%
		);
	}

	:root.dark main {
		background: linear-gradient(
			to bottom right,
			color-mix(in oklab, var(--tint), transparent 80%) 0%,
			var(--tint) 100%
		);
	}
</style>
