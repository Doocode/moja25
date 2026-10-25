<script lang="ts">
	import EmptyResult from './EmptyResult.svelte';
	import type { FormattedStation } from '$core/dto/jcdecaux';
	import StationRow from '../shared/ui/list-station/StationRow.svelte';
	import type { VelociteSortField } from '$lib/core/enum/VelociteSortField';
	import { cn } from '$lib/utils';
	import { Button } from '$shadcn/button';
	import { CircleChevronDown, CircleChevronUp } from '@lucide/svelte';

	interface Props {
		stations: FormattedStation[];
		sortField: VelociteSortField;
		queryInput?: string;
		class?: string;
	}

	let { stations, sortField, queryInput = $bindable(''), class: className = '' }: Props = $props();

	const LIMIT_PER_PAGE = 10;
	let limitEnabled = $state(true);
	let currentLimit = $state(LIMIT_PER_PAGE);
	let nextIncreaseLimit = $derived(Math.min(currentLimit + LIMIT_PER_PAGE, stations.length));

	function increaseLimit() {
		currentLimit = nextIncreaseLimit;
	}

	function decreaseLimit() {
		currentLimit = Math.max(currentLimit - LIMIT_PER_PAGE, LIMIT_PER_PAGE);
	}
</script>

<div class={cn('grid gap-0.5 pb-18 md:pb-4 lg:pb-8', className)}>
	<!-- Empty result message -->
	{#if stations.length < 1}
		<EmptyResult bind:queryInput />
	{/if}

	<!-- Station list -->
	{#if !limitEnabled}
		{#each stations as station, ii (station.number)}
			<StationRow {station} {sortField} showAddress={ii === 0} showRecap={ii === 0} />
		{/each}
	{:else}
		{#each stations.slice(0, currentLimit) as station, ii (station.number)}
			<StationRow {station} {sortField} showAddress={ii === 0} showRecap={ii === 0} />
		{/each}
	{/if}

	<!-- Pagination buttons -->
	{#if limitEnabled && stations.length > LIMIT_PER_PAGE}
		<div
			class={{
				'grid gap-0.5 md:h-10': true,
				'sm:grid-cols-2': currentLimit > LIMIT_PER_PAGE && currentLimit < stations.length
			}}
		>
			{#if currentLimit > LIMIT_PER_PAGE}
				<Button variant="secondary" class="h-auto border-none py-5" onclick={decreaseLimit}>
					<CircleChevronUp class="size-5" />
					<span>Voir moins de résultats</span>
				</Button>
			{/if}
			{#if currentLimit < stations.length}
				<Button variant="default" class="h-auto border-none py-5" onclick={increaseLimit}>
					<CircleChevronDown class="size-5" />
					<span>Voir plus de résultats (+{nextIncreaseLimit - currentLimit})</span>
				</Button>
			{/if}
		</div>
	{/if}
</div>
