<script lang="ts">
	import { VelociteSortField } from '$lib/core/enum/VelociteSortField';
	import { FIELD_CONFIG } from '../shared/core/sort-config';
	import { EllipsisVertical } from '@lucide/svelte';
	import SortButton from './SortButton.svelte';

	interface Props {
		selectedSort: VelociteSortField;
		onSelectSort: (option: VelociteSortField) => void;
		drawerOpen?: boolean;
	}

	let {
		selectedSort = $bindable(VelociteSortField.TOTAL_BIKES),
		drawerOpen = $bindable(false),
		onSelectSort
	}: Props = $props();

	const QUICK_SORT_LARGE = [
		VelociteSortField.TOTAL_BIKES,
		VelociteSortField.MECHANICAL_BIKES,
		VelociteSortField.ELECTRICAL_BIKES,
		VelociteSortField.AVAILABLE_STANDS
	];

	const QUICK_SORT_COMPACT = [VelociteSortField.TOTAL_BIKES, VelociteSortField.AVAILABLE_STANDS];

	function openDrawer() {
		drawerOpen = true;
	}
</script>

<div
	class="fixed bottom-20 left-[50%] z-20 flex -translate-x-1/2 justify-center gap-1 rounded-2xl border bg-background/20 p-2 shadow-xl backdrop-blur transition-[bottom] md:bottom-4 dark:bg-background/80"
>
	<!-- Render a list of SortButton -->
	{#snippet listOptions(options: VelociteSortField[])}
		{#each options as field (FIELD_CONFIG[field].label)}
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

	<!-- Render the last option if it's not included in the quick sort lists -->
	{#snippet lastOptionFrom(options: VelociteSortField[])}
		{#if !options.includes(selectedSort)}
			{@const { icon: Icon, shortLabel, label } = FIELD_CONFIG[selectedSort]}
			<SortButton
				icon={Icon}
				text={shortLabel ?? label}
				title={label}
				selected
				onclick={() => onSelectSort(selectedSort)}
			/>
		{/if}
	{/snippet}

	<!-- Compact variant: with less buttons -->
	<div class="flex justify-center gap-1 sm:hidden">
		{@render listOptions(QUICK_SORT_COMPACT)}
		{@render lastOptionFrom(QUICK_SORT_COMPACT)}
	</div>

	<!-- Large variant: with more buttons -->
	<div class="hidden justify-center gap-1 sm:flex">
		{@render listOptions(QUICK_SORT_LARGE)}
		{@render lastOptionFrom(QUICK_SORT_LARGE)}
	</div>

	<!-- Button to open the sorting drawer -->
	<SortButton
		selected={drawerOpen}
		icon={EllipsisVertical}
		text="Plus d'options de tri des stations Vélocité"
		title="Plus d'options de tri des stations Vélocité"
		onclick={openDrawer}
	/>
</div>
