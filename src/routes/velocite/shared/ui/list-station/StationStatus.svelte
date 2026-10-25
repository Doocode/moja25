<script lang="ts">
	import type { Component } from 'svelte';

	interface Props {
		enabled: boolean;
		icon: Component;
		text: string;
		positiveClass?: string;
		negativeClass?: string;
	}

	let {
		enabled,
		icon,
		text,
		positiveClass = 'text-green-500',
		negativeClass = 'text-muted-foreground'
	}: Props = $props();
</script>

<div
	class={{
		'flex shrink-0 items-center tabular-nums': true,
		[`${positiveClass}`]: enabled,
		[`${negativeClass}`]: !enabled
	}}
>
	{#if icon !== undefined}
		{@const Icon = icon}
		<Icon class="mx-1 size-5!" />
	{/if}
	{#if text.length > 0}
		<span class="text-sm font-medium">
			{text}
		</span>
	{/if}
</div>
