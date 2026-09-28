<script lang="ts">
	import type { Component } from 'svelte';
	import { MEDIUM_LEVEL_THRESHOLD } from '../../core/sort-config';

	interface Props {
		icon: Component;
		value: number;
		total: number;
		negative?: boolean;
	}

	let { icon, value = 0, total = 0, negative = false }: Props = $props();

	function countColor(count: number): string {
		if (!negative) {
			// This counter represents a positive quantity (e.g., available bikes, available stands)
			if (count <= 0) return 'text-red-600 dark:text-red-400';
			if (count <= MEDIUM_LEVEL_THRESHOLD) return 'text-amber-600 dark:text-amber-400';
			return 'text-green-600 dark:text-green-400';
		} else {
			// This counter represents a negative quantity (e.g., unavailable stands, unavailable bikes)
			if (count <= 0) return 'text-green-600 dark:text-green-400';
			if (count <= MEDIUM_LEVEL_THRESHOLD) return 'text-amber-600 dark:text-amber-400';
			return 'text-red-600 dark:text-red-400';
		}
	}

	let colorClass = $derived(countColor(value));
</script>

<div class="flex shrink-0 items-center tabular-nums">
	{#if icon !== undefined}
		{@const Icon = icon}
		<Icon class="mx-1 size-5! {colorClass}" />
	{/if}
	<span class="text-md font-medium {colorClass}">{value}</span>
	<span class="text-sm text-muted-foreground">/{total}</span>
</div>
