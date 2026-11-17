<script lang="ts">
	import type { Component, Snippet } from 'svelte';
	import { Bus } from '@lucide/svelte';

	interface Props {
		icon?: Component;
		title: string;
		children?: Snippet;
	}

	let { icon = Bus, title, children }: Props = $props();
</script>

<section class="grid">
	<header class="flex gap-2 py-2 text-lg">
		{#if icon !== undefined}
			{@const Icon = icon}
			<Icon class="size-6 text-sky-700 dark:text-sky-300" />
		{/if}
		<p class="-mt-0.5 flex-1 text-start font-bold">{title}</p>
	</header>

	<div>
		{@render children?.()}
	</div>
</section>
