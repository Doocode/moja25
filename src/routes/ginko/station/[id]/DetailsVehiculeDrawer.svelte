<script lang="ts">
	import * as Drawer from '#shadcn/drawer/index.ts';
	import DetailsArrival from './time/DetailsArrival.svelte';
	import VehiculeGetter from './vehicule/VehiculeGetter.svelte';
	import type { TempsAttente } from '#core/dto/ginko/index.ts';

	interface Props {
		open: boolean;
		numVehicule: string;
		tempsAttente: TempsAttente;
	}

	let { open = $bindable(false), numVehicule, tempsAttente }: Props = $props();
</script>

<Drawer.Root bind:open>
	<Drawer.Content class="mx-auto max-w-150 pb-18 md:pb-6">
		<Drawer.Header>
			<Drawer.Title class="font-bold">Détails du véhicule</Drawer.Title>
		</Drawer.Header>

		<div class="overflow-y-auto px-4 pb-4 md:px-10">
			{#if open}
				<DetailsArrival {tempsAttente} />
				<VehiculeGetter {numVehicule} />
			{/if}
		</div>
	</Drawer.Content>
</Drawer.Root>
