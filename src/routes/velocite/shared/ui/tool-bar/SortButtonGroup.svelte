<script lang="ts">
	import { Button } from '$shadcn/button';
	import SortDrawer from './SortDrawer.svelte';
	import { ButtonGroup } from '$shadcn/button-group';
	import { FIELD_CONFIG } from '../../core/sort-config';
	import { VelociteSortField } from '$core/enum/VelociteSortField';
	import { ArrowDown01, ArrowDownAZ, ArrowUp01, ArrowUpAZ, ArrowUpDown } from '@lucide/svelte';

	interface Props {
		sortField: VelociteSortField;
		sortAscending: boolean;
		onTriggerDrawer?: () => boolean;
	}

	let {
		sortField = $bindable(),
		sortAscending = $bindable(),
		onTriggerDrawer = () => true
	}: Props = $props();

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

	function openDrawer() {
		const canOpenDrawer = onTriggerDrawer();
		if (canOpenDrawer) {
			drawerOpen = true;
		}
	}
</script>

<ButtonGroup>
	<!-- Button 1 : current sort field -->
	<Button variant="outline" class="gap-2" onclick={openDrawer}>
		<ArrowUpDown class="size-5" />
		<span class="hidden sm:inline">Trier par</span>
	</Button>

	<!-- Button 2 : order direction -->
	<Button variant="outline" size="icon" onclick={() => (sortAscending = !sortAscending)}>
		<DirectionIcon class="size-5" />
	</Button>
</ButtonGroup>

<SortDrawer bind:sortField bind:open={drawerOpen} />
