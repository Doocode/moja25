<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { type ClassValue } from 'clsx';
	import type { Snippet } from 'svelte';
	import { cn } from '$lib/utils.js';

	interface Props extends Omit<HTMLAttributes<HTMLElement>, 'class'> {
		class?: ClassValue;
		tag?: string;
		tintLight?: string;
		tintDark?: string;
		children: Snippet;
	}

	let {
		class: className,
		tintLight,
		tintDark,
		tag = 'div',
		children,
		...restProps
	}: Props = $props();
</script>

<svelte:element
	this={tag}
	class={cn('restyle-wrapper', className)}
	style:--tintLight={tintLight}
	style:--tintDark={tintDark}
	{...restProps}
>
	{@render children()}
</svelte:element>

{#if tintLight && !tintDark}
	<style>
		.restyle-wrapper {
			--primary: var(--tintLight);
		}
	</style>
{:else if tintDark && !tintLight}
	<style>
		:root.dark .restyle-wrapper {
			--primary: var(--tintDark);
		}
	</style>
{:else if tintLight && tintDark}
	<style>
		.restyle-wrapper {
			--primary: var(--tintLight);
		}
		:root.dark .restyle-wrapper {
			--primary: var(--tintDark);
		}
	</style>
{/if}
