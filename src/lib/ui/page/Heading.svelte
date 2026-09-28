<script lang="ts">
	import { cn } from '$lib/utils.js';
	import type { Component } from 'svelte';

	interface Props {
		icon?: Component;
		title?: string;
		level?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
		class?: string;
	}

	let {
		icon,
		title = 'Lorem ipsum',
		level = 'h1',
		class: className,
		...restProps
	}: Props = $props();
</script>

<svelte:element
	this={level}
	class={cn('flex items-start justify-start font-black', className)}
	{...restProps}
>
	{#if icon}
		{@const Icon = icon}
		<Icon
			class={{
				'text-primary': true,
				'-mx-1.5 mb-2 size-18!': level === 'h1',
				'-mx-1 mb-2 size-16!': level === 'h2',
				'-mx-0.5 mb-2 size-14!': level === 'h3',
				'-mx-0.5 mb-2 size-12!': level === 'h4',
				'-mx-0.5 mb-2 size-10!': level === 'h5',
				'-mx-px mb-2 size-8!': level === 'h6'
			}}
		/>
	{/if}

	<span
		class={{
			'text-4xl': level === 'h1',
			'text-3xl': level === 'h2',
			'text-2xl': level === 'h3',
			'text-xl': level === 'h4',
			'text-lg': level === 'h5',
			'text-base': level === 'h6'
		}}>{title}</span
	>
</svelte:element>
