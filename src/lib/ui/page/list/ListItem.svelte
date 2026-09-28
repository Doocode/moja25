<script lang="ts">
	import { cn } from '$lib/utils.js';
	import { getContext } from 'svelte';
	import type { Snippet } from 'svelte';

	interface Props {
		class?: string;
		children?: Snippet;
	}

	let { class: className, children }: Props = $props();

	const listType = getContext<'ul' | 'ol'>('listType') ?? 'ul';
</script>

{#if listType === 'ol'}
	<li
		class={cn(
			'relative before:absolute before:-top-1.5 before:-left-8 before:flex before:w-6 before:justify-end before:text-2xl before:font-semibold before:text-primary before:content-[counter(list-item)]',
			className
		)}
	>
		{@render children?.()}
	</li>
{:else}
	<li
		class={cn(
			"relative before:absolute before:top-1 before:-left-8 before:flex before:aspect-square before:w-4 before:rounded-full before:bg-primary before:content-['']",
			className
		)}
	>
		{@render children?.()}
	</li>
{/if}
