<script lang="ts">
	import { ArrowDown01, ArrowDownAZ, ArrowUp01, ArrowUpAZ, ArrowUpDown } from '@lucide/svelte';
	import { VelociteSortField } from '$core/enum/VelociteSortField';
	import { Button } from '$shadcn/button';
	import { ButtonGroup } from '$shadcn/button-group';
	import { FIELD_CONFIG } from './sort-config';
	import SortDrawer from './SortDrawer.svelte';

	interface Props {
		sortField: VelociteSortField;
		sortAscending: boolean;
	}

	let { sortField = $bindable(), sortAscending = $bindable() }: Props = $props();

	let drawerOpen = $state(false);

	const config = $derived(FIELD_CONFIG[sortField]);
	const DirectionIcon = $derived(
		config.isText
			? sortAscending
				? ArrowDownAZ
				: ArrowUpAZ
			: sortAscending
				? ArrowDown01
				: ArrowUp01
	);
</script>

<ButtonGroup>
	<!-- Bouton 1 : tri actuel → ouvre le drawer -->
	<Button variant="outline" class="gap-2" onclick={() => (drawerOpen = true)}>
		<ArrowUpDown class="size-5" />
		<span>Trier par</span>
	</Button>

	<!-- Bouton 2 : sens du tri -->
	<Button variant="outline" size="icon" onclick={() => (sortAscending = !sortAscending)}>
		<DirectionIcon class="size-5" />
	</Button>
</ButtonGroup>

<SortDrawer bind:sortField bind:open={drawerOpen} />
