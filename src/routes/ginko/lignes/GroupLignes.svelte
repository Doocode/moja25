<script lang="ts">
	import type { Ligne } from '#core/dto/ginko/index.ts';
	import type { Component } from 'svelte';
	import ListLignes from './ListLignes.svelte';
	import GridLignes from './GridLignes.svelte';

	interface Props {
		icon?: Component;
		label: string;
		items: Ligne[];
		viewmode?: 'list' | 'grid';
	}

	let { icon, label, items, viewmode = 'list' }: Props = $props();
</script>

<section>
	<header class="flex items-center gap-2">
		{#if icon}
			{@const Icon = icon}
			<Icon class="size-6 text-purple-600 dark:text-purple-400" />
		{/if}
		<h2 class="text-lg font-semibold">{label}</h2>
	</header>

	{#if viewmode === 'grid'}
		<GridLignes {items} />
	{:else if viewmode === 'list'}
		<ListLignes {items} />
	{/if}
</section>
