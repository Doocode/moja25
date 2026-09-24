<script lang="ts">
	import { countFilters, numberFilters, statusFilters } from './filters';
	import { VelociteSortField } from '$lib/core/enum/VelociteSortField';
	import ListSortField from '../ListSortField.svelte';
	import GridSortField from '../GridSortField.svelte';
	import SortSection from '../SortSection.svelte';
	import * as Drawer from '$shadcn/drawer';

	interface Props {
		selectedFilter: VelociteSortField;
		onSelectFilter: (filter: VelociteSortField) => void;
		open: boolean;
	}

	let {
		selectedFilter = $bindable(VelociteSortField.TOTAL_BIKES),
		open = $bindable(false),
		onSelectFilter
	}: Props = $props();
</script>

<Drawer.Root bind:open>
	<Drawer.Content class="pb-safe mx-auto max-w-150">
		<Drawer.Header>
			<Drawer.Title>Filtrer</Drawer.Title>
		</Drawer.Header>

		<div class="overflow-y-auto pb-8">
			<div class="mx-auto w-full max-w-125">
				<SortSection title="Filtrer par nombre" class="mb-6">
					<GridSortField
						fields={countFilters}
						sortField={selectedFilter}
						onSelect={onSelectFilter}
					/>
				</SortSection>

				<div class="grid gap-4 lg:grid-cols-2">
					<SortSection title="Caractéristiques">
						<ListSortField
							fields={numberFilters}
							sortField={selectedFilter}
							onSelect={onSelectFilter}
						/>
					</SortSection>

					<SortSection title="État de la station">
						<ListSortField
							fields={statusFilters}
							sortField={selectedFilter}
							onSelect={onSelectFilter}
						/>
					</SortSection>
				</div>
			</div>
		</div>
	</Drawer.Content>
</Drawer.Root>
