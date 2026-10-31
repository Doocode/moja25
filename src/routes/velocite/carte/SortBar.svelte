<script lang="ts">
	import { VelociteSortField } from '$lib/core/enum/VelociteSortField';
	import { FIELD_CONFIG } from '../shared/core/sort-config';
	import { EllipsisVertical } from '@lucide/svelte';
	import { Button } from '$shadcn/button';

	interface Props {
		selectedSort: VelociteSortField;
		onSelectSort: (filter: VelociteSortField) => void;
		drawerOpen?: boolean;
	}

	let {
		selectedSort = $bindable(VelociteSortField.TOTAL_BIKES),
		drawerOpen = $bindable(false),
		onSelectSort
	}: Props = $props();

	const QUICK_FILTERS_LARGE = [
		VelociteSortField.TOTAL_BIKES,
		VelociteSortField.MECHANICAL_BIKES,
		VelociteSortField.ELECTRICAL_BIKES,
		VelociteSortField.AVAILABLE_STANDS
	];

	const QUICK_FILTERS_COMPACT = [VelociteSortField.TOTAL_BIKES, VelociteSortField.AVAILABLE_STANDS];

	function openDrawer() {
		drawerOpen = true;
	}
</script>

<div
	class="fixed bottom-20 left-[50%] z-20 flex -translate-x-1/2 justify-center gap-1 rounded-2xl border bg-background/20 p-2 shadow-xl backdrop-blur transition-[bottom] md:bottom-4 dark:bg-background/80"
>
	{#snippet listFilters(filters: VelociteSortField[])}
		{#each filters as field (FIELD_CONFIG[field].label)}
			{@const isActive = selectedSort === field}
			{@const { icon: Icon, shortLabel, label } = FIELD_CONFIG[field]}
			<Button
				variant={isActive ? 'default' : 'outline'}
				class="size-14 rounded-lg"
				onclick={() => onSelectSort(field)}
				title={label}
			>
				<Icon class="size-7" />
				<span class="sr-only">{shortLabel ?? label}</span>
			</Button>
		{/each}
	{/snippet}

	<div class="flex justify-center gap-1 sm:hidden">
		{@render listFilters(QUICK_FILTERS_COMPACT)}
	</div>

	<div class="hidden justify-center gap-1 sm:flex">
		{@render listFilters(QUICK_FILTERS_LARGE)}
	</div>

	<Button
		variant={drawerOpen ? 'default' : 'outline'}
		class="size-14 rounded-lg"
		onclick={openDrawer}
		title="Plus d'options de tri des stations Vélocité"
	>
		<EllipsisVertical class="size-7" />
		<span class="sr-only">Plus d'options de tri des stations Vélocité</span>
	</Button>
</div>
