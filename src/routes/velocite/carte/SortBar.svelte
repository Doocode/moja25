<script lang="ts">
	import { VelociteSortField } from '$lib/core/enum/VelociteSortField';
	import { FIELD_CONFIG } from '../shared/core/sort-config';
	import { EllipsisVertical } from '@lucide/svelte';
	import SortButton from './SortButton.svelte';

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

	const QUICK_FILTERS_COMPACT = [
		VelociteSortField.TOTAL_BIKES,
		VelociteSortField.MECHANICAL_BIKES,
		VelociteSortField.ELECTRICAL_BIKES,
		VelociteSortField.AVAILABLE_STANDS
	];

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
			<SortButton
				icon={Icon}
				text={shortLabel ?? label}
				title={label}
				selected={isActive}
				onclick={() => onSelectSort(field)}
			/>
		{/each}
	{/snippet}

	<div class="flex justify-center gap-1 sm:hidden">
		{@render listFilters(QUICK_FILTERS_COMPACT)}
	</div>

	<div class="hidden justify-center gap-1 sm:flex">
		{@render listFilters(QUICK_FILTERS_LARGE)}
	</div>

	<SortButton
		selected={drawerOpen}
		icon={EllipsisVertical}
		text="Plus d'options de tri des stations Vélocité"
		title="Plus d'options de tri des stations Vélocité"
		onclick={openDrawer}
	/>
</div>
