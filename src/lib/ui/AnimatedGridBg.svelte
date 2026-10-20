<script lang="ts">
	import { cn } from '$lib/utils';
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	interface Props extends HTMLAttributes<HTMLDivElement> {
		children?: Snippet;
		class?: string;
        spacing?: string;
        strokeWidth?: string;
	}

	let { children, class: className, spacing = '100px', strokeWidth = '2px', ...restProps }: Props = $props();

	let container = $state<HTMLDivElement | null>(null);
	let mouseX = $state<number | null>(null);
	let mouseY = $state<number | null>(null);

	function handleMouseMove(event: MouseEvent) {
		if (!container) return;
		const rect = container.getBoundingClientRect();
		mouseX = event.clientX - rect.left;
		mouseY = event.clientY - rect.top;
	}

	function handleMouseLeave() {
		mouseX = null;
		mouseY = null;
	}

	let maskStyle = $derived.by(() => {
		if (mouseX === null || mouseY === null) {
			return 'none';
		}
		return `radial-gradient(400px 400px at ${mouseX}px ${mouseY}px, black 50%, transparent 100%)`;
	});
</script>

<svelte:window onmousemove={handleMouseMove} onmouseleave={handleMouseLeave} />

<div
	bind:this={container}
	class={cn('grid-bg-container', className)}
	style:mask-image={maskStyle}
	style:-webkit-mask-image={maskStyle}
    style:--spacing={spacing}
    style:--width={strokeWidth}
	{...restProps}
>
	{#if children}
		{@render children()}
	{/if}
</div>

<style>
	.grid-bg-container {
		--spacing: 200px;
        --width: 2px;
		background-image: radial-gradient(circle at 1px 1px, white var(--width), transparent 0);
		background-size: var(--spacing) var(--spacing);
		background-position: center center;
		mask-repeat: no-repeat;
		-webkit-mask-repeat: no-repeat;
	}
</style>
