<script lang="ts">
	import type { Component, Snippet } from 'svelte';

	interface Props {
		icon: Component;
		title: string;
		children: Snippet;
	}

	let { icon, title, children }: Props = $props();
</script>

<section class="grid gap-2">
	<header class="flex items-center gap-2">
		{#if icon != undefined}
			{@const Icon = icon}
			<Icon class="size-5 text-primary" />
		{/if}
		<h2 class="font-semibold">{title}</h2>
	</header>

	{@render children?.()}
</section>
