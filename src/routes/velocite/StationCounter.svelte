<script lang="ts">
	import type { Component } from 'svelte';
	import { MEDIUM_LEVEL_THRESHOLD } from './sort-config';

	interface Props {
		icon: Component;
		value: number;
		total: number;
		negative?: boolean;
	}

	let { icon, value = 0, total = 0, negative = false }: Props = $props();

	function countColor(n: number): string {
		if (!negative) {
			// Si le role de ce compteur est de représenter une quantité positive (ex: vélos disponibles, places disponibles)
			if (value <= 0) return 'text-red-500';
			if (value <= MEDIUM_LEVEL_THRESHOLD) return 'text-amber-500';
			return 'text-green-500';
		} else {
			// Si le role de ce compteur est de représenter une quantité négative (ex: places/vélos non-disponibles)
			if (value <= 0) return 'text-green-500';
			if (value <= MEDIUM_LEVEL_THRESHOLD) return 'text-amber-500';
			return 'text-red-500';
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
