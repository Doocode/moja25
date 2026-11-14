<script lang="ts">
	import type { VehiculeDR } from '$core/dto/ginko';
	import { BusArticule, BusStandard, BusMoyenneCapacite } from './svg';

	interface Props {
		vehicule: VehiculeDR;
	}

	let { vehicule }: Props = $props();
</script>

{#if vehicule.typeVehicule === 'Bus articulé'}
	<BusArticule class="m-auto mb-4 w-full max-w-100" />
{:else if vehicule.typeVehicule === 'Bus standard'}
	<BusStandard class="m-auto mb-4 w-full max-w-100" />
{:else if vehicule.typeVehicule === 'Bus moyenne capacité'}
	<BusMoyenneCapacite class="m-auto mb-4 w-full max-w-100" />
{/if}
