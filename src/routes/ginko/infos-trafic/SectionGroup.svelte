<script lang="ts">
	import { Button } from '$shadcn/button';
	import type { Component, Snippet } from 'svelte';
	import { BusFront, ChevronDown, ChevronUp } from '@lucide/svelte';
	import { slide } from 'svelte/transition';

	interface Props {
		icon?: Component;
		title: string;
		open?: boolean;
		children?: Snippet;
	}

	let { icon = BusFront, title, open = false, children }: Props = $props();

	function toggleOpen() {
		open = !open;
	}
</script>

<section class="grid">
	<Button variant="ghost" class="h-auto gap-2 py-2 text-lg" onclick={toggleOpen}>
		{#if icon !== undefined}
			{@const Icon = icon}
			<Icon class="size-6 text-sky-700 dark:text-sky-300" />
		{/if}
		<p class="-mt-0.5 flex-1 text-start font-bold">{title}</p>

		{#if open}
			<ChevronUp class="size-5" />
		{:else}
			<ChevronDown class="size-5" />
		{/if}
	</Button>

	{#if open}
		<div transition:slide={{ duration: 100 }} class="pt-2">
			{@render children?.()}
		</div>
	{/if}
</section>
