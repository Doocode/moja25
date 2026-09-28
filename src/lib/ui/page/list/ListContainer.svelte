<script lang="ts">
	import { cn } from '$lib/utils.js';
	import { onMount, setContext } from 'svelte';
	import type { Snippet } from 'svelte';

	interface Props {
		class?: string;
		type?: 'ul' | 'ol';
		children?: Snippet;
	}

	let { class: className, type = 'ul', children }: Props = $props();

	onMount(() => {
		setContext('listType', type);
	});
</script>

{#key type}
	<svelte:element this={type} class={cn('grid gap-2.5 pl-8 text-balance', className)}>
		{@render children?.()}
	</svelte:element>
{/key}
