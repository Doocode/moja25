<script lang="ts">
	import { VelociteSortField } from '#core/enum/VelociteSortField.ts';
	import GridSortField from './GridSortField.svelte';
	import ListSortField from './ListSortField.svelte';
	import SortSection from './SortSection.svelte';

	interface Props {
		sortField: VelociteSortField;
		onSelect?: (field: VelociteSortField) => void;
	}

	let { sortField = $bindable(), onSelect = () => {} }: Props = $props();

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
		onSelect(field);
	}
</script>

<main>
	<SortSection title="Trier par" class="mb-8">
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
</main>
