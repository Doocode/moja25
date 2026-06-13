<script lang="ts">
	import type { Component, Snippet } from 'svelte';

	interface Props {
		title: string;
		icon: Component;
		count: number;
		capacity: number;
		countClass: string;
		children: Snippet;
	}

	let { title, icon: Icon, count, capacity, countClass, children }: Props = $props();
</script>

<div class="rounded-xl border bg-card p-4">
	<div class="mb-3 flex items-center gap-2 text-sm font-medium text-muted-foreground">
		<Icon class="size-4" />
		{title}
	</div>
	<p class="text-4xl font-bold {countClass}">{count}</p>
	<p class="mt-0.5 text-xs text-muted-foreground">sur {capacity} places</p>
	<div class="mt-3 space-y-1.5 border-t pt-3">
		{@render children()}
	</div>
</div>
