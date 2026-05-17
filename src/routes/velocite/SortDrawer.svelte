<script lang="ts">
	import { VelociteSortField } from '$core/enum/VelociteSortField';
	import * as Drawer from '$shadcn/drawer';
	import { COUNT_FIELDS, PRIMARY_FIELDS, STATUS_FIELDS } from './sort-config';
	import GridSortField from './GridSortField.svelte';
	import ListSortField from './ListSortField.svelte';
	import SortSection from './SortSection.svelte';

	interface Props {
		sortField: VelociteSortField;
		open: boolean;
	}

	let { sortField = $bindable(), open = $bindable() }: Props = $props();

	function select(field: VelociteSortField) {
		sortField = field;
		open = false;
	}
</script>

<Drawer.Root bind:open>
	<Drawer.Content class="pb-safe mx-auto max-w-150">
		<Drawer.Header>
			<Drawer.Title>Trier par</Drawer.Title>
		</Drawer.Header>

		<div class="overflow-y-auto pb-8">
			<div class="mx-auto w-full max-w-125">
				<SortSection title="Trier par" class="mb-6">
					<GridSortField fields={PRIMARY_FIELDS} {sortField} onSelect={select} />
				</SortSection>

				<div class="grid gap-4 lg:grid-cols-2">
					<SortSection title="Décompte">
						<ListSortField fields={COUNT_FIELDS} {sortField} onSelect={select} />
					</SortSection>

					<SortSection title="Statut">
						<ListSortField fields={STATUS_FIELDS} {sortField} onSelect={select} />
					</SortSection>
				</div>
			</div>
		</div>
	</Drawer.Content>
</Drawer.Root>
