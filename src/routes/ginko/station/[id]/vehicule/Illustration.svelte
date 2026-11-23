<script lang="ts">
	import type { VehiculeDR } from '$core/dto/ginko';
	import {
		BusArticule,
		BusStandard,
		BusMoyenneCapacite,
		TramCafUrbos,
		TramAlstomCitadis
	} from './svg';

	interface Props {
		vehicule: VehiculeDR;
		extendedIllustration?: boolean;
	}

	let { vehicule, extendedIllustration = false }: Props = $props();

	const isTram = $derived(vehicule.typeVehicule.startsWith('Tramway'));
</script>

{#if isTram}
	<div
		class={{
			'-mx-4 mb-4 flex min-w-0 justify-end overflow-hidden px-4 md:-mx-10 md:px-10': true,
			'xl:pointer-events-none xl:mr-0 xl:-ml-26 xl:mask-[linear-gradient(to_right,transparent,black_5rem)] xl:px-0':
				extendedIllustration,
			'border-b-3 border-slate-600 bg-linear-to-b from-transparent to-slate-300 dark:border-slate-500 dark:to-slate-700':
				!extendedIllustration
		}}
	>
		{#if vehicule.typeVehicule === 'Tramway 22 mètres'}
			<TramCafUrbos class="h-25 w-auto max-w-none shrink-0" />
		{:else if vehicule.typeVehicule === 'Tramway 33 mètres'}
			<TramAlstomCitadis class="h-25 w-auto max-w-none shrink-0" />
		{/if}
	</div>
{/if}

{#if vehicule.typeVehicule === 'Bus articulé'}
	<BusArticule class="m-auto mb-4 h-auto w-full max-w-100" />
{:else if vehicule.typeVehicule === 'Bus standard'}
	<BusStandard class="m-auto mb-4 h-auto w-full max-w-100" />
{:else if vehicule.typeVehicule === 'Bus moyenne capacité'}
	<BusMoyenneCapacite class="m-auto mb-4 h-auto w-full max-w-100" />
{/if}
