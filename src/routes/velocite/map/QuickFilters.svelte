<script lang="ts">
	import { VelociteSortField } from '$lib/core/enum/VelociteSortField';
	import { FIELD_CONFIG } from '../sort-config';
	import { Button } from '$shadcn/button';
	import { EllipsisVertical } from '@lucide/svelte';

	interface Props {
		selectedFilter: VelociteSortField;
		onSelectFilter: (filter: VelociteSortField) => void;
		drawerOpen?: boolean;
	}

	let {
		selectedFilter = $bindable(VelociteSortField.TOTAL_BIKES),
		drawerOpen = $bindable(false),
		onSelectFilter
	}: Props = $props();

	const QUICK_FILTERS = [
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
	{#each QUICK_FILTERS as field (FIELD_CONFIG[field].label)}
		{@const isActive = selectedFilter === field}
		{@const { icon: Icon, shortLabel, label } = FIELD_CONFIG[field]}
		<Button
			variant={isActive ? 'default' : 'outline'}
			class="size-14 rounded-lg"
			onclick={() => onSelectFilter(field)}
			title={label}
		>
			<Icon class="size-7" />
			<span class="sr-only">{shortLabel ?? label}</span>
		</Button>
	{/each}

	<Button
		variant={drawerOpen ? 'default' : 'outline'}
		class="size-14 rounded-lg"
		onclick={openDrawer}
		title="Plus de filtres"
	>
		<EllipsisVertical class="size-7" />
		<span class="sr-only">Plus de filtres</span>
	</Button>
</div>
