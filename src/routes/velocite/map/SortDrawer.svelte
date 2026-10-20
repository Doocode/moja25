<script lang="ts">
	import { countFilters, numberFilters, statusFilters } from './filters';
	import { VelociteSortField } from '$lib/core/enum/VelociteSortField';
	import { GridSortField, ListSortField, SortSection } from '../shared/ui/tool-bar';
	import * as Drawer from '$shadcn/drawer';

	interface Props {
		selectedSort: VelociteSortField;
		onSelectSort: (filter: VelociteSortField) => void;
		open: boolean;
	}

	let {
		selectedSort = $bindable(VelociteSortField.TOTAL_BIKES),
		open = $bindable(false),
		onSelectSort
	}: Props = $props();
</script>

<Drawer.Root bind:open>
	<Drawer.Content class="pb-safe mx-auto max-w-150">
		<Drawer.Header>
			<Drawer.Title>Trier les stations Vélocité</Drawer.Title>
		</Drawer.Header>

		<div class="overflow-y-auto pb-8">
			<div class="mx-auto w-full max-w-125">
				<SortSection title="Trier par nombre" class="mb-6 grid gap-4">
					<GridSortField
						fields={countFilters.slice(0, 3)}
						sortField={selectedSort}
						onSelect={onSelectSort}
					/>
					<ListSortField
						fields={countFilters.slice(3)}
						sortField={selectedSort}
						onSelect={onSelectSort}
					/>
				</SortSection>

				<div class="grid gap-4 lg:grid-cols-2">
					<SortSection title="Caractéristiques">
						<ListSortField
							fields={numberFilters}
							sortField={selectedSort}
							onSelect={onSelectSort}
						/>
					</SortSection>

					<SortSection title="État de la station">
						<ListSortField
							fields={statusFilters}
							sortField={selectedSort}
							onSelect={onSelectSort}
						/>
					</SortSection>
				</div>
			</div>
		</div>
	</Drawer.Content>
</Drawer.Root>
