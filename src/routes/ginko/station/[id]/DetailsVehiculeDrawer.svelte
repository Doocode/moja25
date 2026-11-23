<script lang="ts">
	import * as Drawer from '$shadcn/drawer';
	import VehiculeGetter from './vehicule/VehiculeGetter.svelte';

	interface Props {
		open: boolean;
		numVehicule: string;
	}

	let { open = $bindable(false), numVehicule }: Props = $props();
</script>

<Drawer.Root bind:open>
	<Drawer.Content class="mx-auto max-w-150 pb-18 md:pb-6">
		<Drawer.Header>
			<Drawer.Title class="font-bold">Détails du véhicule</Drawer.Title>
		</Drawer.Header>

		<div class="overflow-y-auto px-4 pb-4 md:px-10">
			{#if open}
				<VehiculeGetter {numVehicule} />
			{/if}
		</div>
	</Drawer.Content>
</Drawer.Root>
