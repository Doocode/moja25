<script lang="ts">
	import type { Component, Snippet } from 'svelte';
	import { slide } from 'svelte/transition';

	interface Props {
		title: string;
		icon: Component;
		children: Snippet;
		sectionId?: string;
	}

	let { title, icon: Icon, children, sectionId }: Props = $props();
</script>

<section id={sectionId} class="rounded-xl">
	<header class="flex w-full items-center justify-between gap-2 px-4 py-3">
		<div class="flex items-center gap-2 text-sm font-semibold sm:text-base md:text-lg">
			<Icon class="size-6 text-primary" />
			<span>{title}</span>
		</div>
	</header>

	<div class="mt-1" transition:slide={{ duration: 200 }}>
		{@render children()}
	</div>
</section>
