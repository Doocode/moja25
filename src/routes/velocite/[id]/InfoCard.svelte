<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '$lib/utils.js';

	interface Props {
		title?: string;
		class?: string;
		children: Snippet;
	}

	let { title, class: className, children }: Props = $props();
</script>

<div class={cn('rounded-xl border bg-card p-4', className)}>
	{#if title}
		<h2 class="mb-3 text-sm font-medium tracking-wider uppercase">
			{title}
		</h2>
	{/if}
	{@render children()}
</div>
