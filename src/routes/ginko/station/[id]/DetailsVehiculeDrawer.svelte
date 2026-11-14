<script lang="ts">
	import { Button } from '$shadcn/button';
	import * as Drawer from '$shadcn/drawer';
	import type { VehiculeDR } from '$core/dto/ginko';
	import DetailsVehicule from './vehicule/DetailsVehicule.svelte';
	import { cacheVehicule, getCachedVehicule } from './vehiculeCache';

	interface Props {
		open: boolean;
		numVehicule: string;
	}

	let { open = $bindable(false), numVehicule }: Props = $props();
	let vehicule = $state<VehiculeDR | null>(null);
	let loading = $state(false);
	let errorMessage = $state('');
	let attempt = $state(0);

	$effect(() => {
		const num = numVehicule?.trim();
		void attempt; // Trigger Svelte reactivity when attempt changes
		if (!open) return;

		// Reset state
		vehicule = null;
		errorMessage = '';
		loading = false;

		// Validate number of the vehicle
		if (!num || num.length === 0) {
			errorMessage = 'Les informations du véhicule ne sont pas disponibles pour ce passage.';
			return;
		}

		// Get cached vehicle if available
		const cached = getCachedVehicule(num);
		if (cached) {
			vehicule = cached;
			return;
		}

		// Fetch vehicle details from the API if not cached
		const controller = new AbortController();
		const url = `/api/ginko/detailsVehiculeDR/${encodeURIComponent(num)}`;
		loading = true;

		async function load() {
			try {
				const response = await fetch(url, { signal: controller.signal });
				if (!response.ok) throw new Error(`Erreur HTTP ${response.status}`);
				const data: VehiculeDR = await response.json();
				if (!controller.signal.aborted) {
					// Save the fetched vehicle details to the cache
					cacheVehicule(num, data);
					vehicule = data;
				}
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

<Drawer.Root bind:open>
	<Drawer.Content class="mx-auto max-w-150 pb-18 md:pb-6">
		<Drawer.Header>
			<Drawer.Title class="font-bold">Détails du véhicule</Drawer.Title>
		</Drawer.Header>

		<div class="overflow-y-auto px-4 pb-4 md:px-10">
			{#if loading}
				<p role="status" class="text-muted-foreground">Chargement des informations…</p>
			{:else if errorMessage}
				<p role="alert" class="text-muted-foreground">{errorMessage}</p>
				{#if numVehicule?.trim()}
					<Button variant="outline" class="mt-4" onclick={() => attempt++}>Réessayer</Button>
				{/if}
			{:else if vehicule}
				<DetailsVehicule {vehicule} />
			{/if}
		</div>
	</Drawer.Content>
</Drawer.Root>
