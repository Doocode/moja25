<script lang="ts">
	import type { Component } from 'svelte';
	import * as Tabs from '$shadcn/tabs';

	interface Props {
		value: string;
		name: string;
		icon: Component;
	}

	let { value, name, icon }: Props = $props();
</script>

<Tabs.Trigger
	{value}
	class="flex-1 flex-col gap-2 rounded-3xl border-none p-2 data-active:bg-transparent group-data-[variant=default]/tabs-list:data-active:shadow-none dark:data-active:bg-transparent"
>
	<div class="icon-tile rounded-xl border border-ring bg-muted/50 p-4">
		{#if icon !== null}
			{@const Icon = icon}
			<Icon class="size-10" />
		{/if}
	</div>
	<span class="w-18 overflow-hidden text-center text-xs text-ellipsis whitespace-nowrap"
		>{name}</span
	>
</Tabs.Trigger>

<style>
	:global button[role='tab'][data-state='active'] .icon-tile {
		background: var(--primary);
		border-color: var(--primary);
		color: var(--primary-foreground);
	}
</style>
