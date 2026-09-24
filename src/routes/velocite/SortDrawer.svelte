<script lang="ts">
	import { VelociteSortField } from '$core/enum/VelociteSortField';
	import * as Drawer from '$shadcn/drawer';
	import GridSortField from './GridSortField.svelte';
	import ListSortField from './ListSortField.svelte';
	import SortSection from './SortSection.svelte';

	interface Props {
		sortField: VelociteSortField;
		open: boolean;
	}

	let { sortField = $bindable(), open = $bindable() }: Props = $props();

	// Main sorting fields
	const PRIMARY_FIELDS = [
		VelociteSortField.NAME,
		VelociteSortField.TOTAL_BIKES,
		VelociteSortField.AVAILABLE_STANDS,
		VelociteSortField.CAPACITY
	];

	// Numeric counts fields
	const COUNT_FIELDS = [
		VelociteSortField.NUMBER,
		VelociteSortField.MECHANICAL_BIKES,
		VelociteSortField.ELECTRICAL_BIKES,
		VelociteSortField.UNAVAILABLE_STANDS
	];

	// Boolean status fields
	const STATUS_FIELDS = [
		VelociteSortField.BONUS,
		VelociteSortField.BANKING,
		VelociteSortField.OPEN,
		VelociteSortField.CONNECTED
	];

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
