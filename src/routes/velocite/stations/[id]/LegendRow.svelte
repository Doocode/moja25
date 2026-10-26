<script lang="ts">
	import { cn } from '$lib/utils';
	import type { Component } from 'svelte';

	interface Props {
		icon: Component;
		label: string;
		value: number;
		class?: string;
	}

	let { icon, label, value, class: className }: Props = $props();
</script>

<div class="flex items-center justify-between">
	<div class="flex items-center justify-start gap-2">
		<div
			class={cn(
				'flex aspect-square items-center justify-center rounded-[25%] p-2',
				className,
				value <= 0 && 'bg-[#444]!'
			)}
		>
			{#if icon}
				{@const Icon = icon}
				<Icon class="size-5" />
			{/if}
		</div>

		<p class="text-sm" class:line-through={value <= 0} class:text-muted-foreground={value <= 0}>
			{label}
		</p>
	</div>

	<span class="font-bold">{value}</span>
</div>
