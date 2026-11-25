<script lang="ts">
	import { Button } from '#shadcn/button/index.ts';
	import type { VehiculeDR } from '#core/dto/ginko/index.ts';
	import { getVehicule } from '#core/ginko/getVehicule.ts';
	import DetailsVehicule from './DetailsVehicule.svelte';

	interface Props {
		numVehicule: string;
		extendedIllustration?: boolean;
	}

	let { numVehicule, extendedIllustration = false }: Props = $props();
	let vehicule = $state<VehiculeDR | null>(null);
	let loading = $state(false);
	let errorMessage = $state('');
	let attempt = $state(0);

	$effect(() => {
		const num = numVehicule?.trim();
		void attempt;

		vehicule = null;
		errorMessage = '';
		loading = false;

		if (!num) {
			errorMessage = 'Les informations du véhicule ne sont pas disponibles pour ce passage.';
			return;
		}

		const controller = new AbortController();
		loading = true;

		async function load() {
			try {
				const data = await getVehicule(num, { signal: controller.signal });
				if (!controller.signal.aborted) vehicule = data;
			} catch (error) {
				if (!controller.signal.aborted) {
					console.error('Impossible de charger les détails du véhicule', error);
					errorMessage = 'Impossible de charger les informations du véhicule.';
				}
			} finally {
				if (!controller.signal.aborted) loading = false;
			}
		}

		void load();
		return () => controller.abort();
	});
</script>

{#if loading}
	<p role="status" class="text-muted-foreground">Chargement des informations…</p>
{:else if errorMessage}
	<p role="alert" class="text-muted-foreground">{errorMessage}</p>
	{#if numVehicule?.trim()}
		<Button variant="outline" class="mt-4" onclick={() => attempt++}>Réessayer</Button>
	{/if}
{:else if vehicule}
	<DetailsVehicule {vehicule} {extendedIllustration} />
{/if}
