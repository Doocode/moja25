<script lang="ts">
	import { countFilters, numberFilters, statusFilters } from './filters';
	import { VelociteSortField } from '#lib/core/enum/VelociteSortField.ts';
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
	<Drawer.Content class="pb-safe mx-auto max-w-150 pb-18 md:pb-10">
		<Drawer.Header>
			<Drawer.Title>Trier les stations Vélocité</Drawer.Title>
		</Drawer.Header>

		<div class="overflow-y-auto pb-2">
			<div class="mx-auto w-full max-w-125">
				<SortSection title="Trier par nombre" class="mb-6 grid gap-4">
					<GridSortField
						fields={countFilters.slice(0, 3)}
						sortField={selectedSort}
						onSelect={onSelectSort}
					/>
				</SortSection>

				<div class="grid gap-6 lg:grid-cols-2">
					<div class="grid gap-6">
						<ListSortField
							fields={countFilters.slice(3)}
							sortField={selectedSort}
							onSelect={onSelectSort}
						/>
						<SortSection title="Caractéristiques">
							<ListSortField
								fields={numberFilters}
								sortField={selectedSort}
								onSelect={onSelectSort}
							/>
						</SortSection>
					</div>

					<SortSection title="État de la station" class="lg:pt-6">
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
