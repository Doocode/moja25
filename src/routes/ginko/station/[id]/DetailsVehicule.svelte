<script lang="ts">
	import type { VehiculeDR } from '$core/dto/ginko';
	import {
		Accessibility,
		BusFront,
		Fuel,
		Hash,
		Monitor,
		Snowflake,
		TramFront,
		Usb,
		Volume2,
		Zap
	} from '@lucide/svelte';

	interface Props {
		vehicule: VehiculeDR;
	}

	let { vehicule }: Props = $props();

	const energie = $derived(vehicule.energie);
	const accessibilite = $derived(vehicule.accessiblite);
</script>

<dl class="grid gap-3">
	<div class="flex items-center gap-3">
		<Hash class="size-5 shrink-0 text-muted-foreground" aria-hidden="true" />
		<dt class="flex-1">Numéro de véhicule</dt>
		<dd class="text-right">{vehicule.num || 'Information indisponible'}</dd>
	</div>
	<div class="flex items-center gap-3">
		{#if ['Tramway 22 mètres', 'Tramway 33 mètres'].includes(vehicule.typeVehicule)}
			<TramFront class="size-5 shrink-0 text-muted-foreground" aria-hidden="true" />
		{:else}
			<BusFront class="size-5 shrink-0 text-muted-foreground" aria-hidden="true" />
		{/if}
		<dt class="flex-1">Type de véhicule</dt>
		<dd class="text-right">{vehicule.typeVehicule || 'Information indisponible'}</dd>
	</div>
	<div class="flex items-center gap-3">
		{#if vehicule.energie === 4}
			<Zap class="size-5 shrink-0 text-muted-foreground" aria-hidden="true" />
		{:else}
			<Fuel class="size-5 shrink-0 text-muted-foreground" aria-hidden="true" />
		{/if}
		<dt class="flex-1">Énergie</dt>
		<dd class="text-right">
			{#if energie === 1}
				Gazole
			{:else if energie === 2}
				Gaz naturel
			{:else if energie === 3}
				Hybride électrique et gaz
			{:else if energie === 4}
				Électrique
			{:else}
				Information indisponible
			{/if}
		</dd>
	</div>
	<div class="flex items-center gap-3">
		<Accessibility class="size-5 shrink-0 text-muted-foreground" aria-hidden="true" />
		<dt class="flex-1">Accessibilité PMR</dt>
		<dd class="text-right">
			{#if accessibilite === 1}
				Accessible
			{:else if accessibilite === 2}
				Non accessible
			{:else}
				Information indisponible
			{/if}
		</dd>
	</div>
	<div class="flex items-center gap-3">
		<Snowflake class="size-5 shrink-0 text-muted-foreground" aria-hidden="true" />
		<dt class="flex-1">Climatisation</dt>
		<dd>{vehicule.climatisation ? 'Oui' : 'Non'}</dd>
	</div>
	<div class="flex items-center gap-3">
		<Usb class="size-5 shrink-0 text-muted-foreground" aria-hidden="true" />
		<dt class="flex-1">Prises USB</dt>
		<dd>{vehicule.prisesUSB ? 'Oui' : 'Non'}</dd>
	</div>
	<div class="flex items-center gap-3">
		<Monitor class="size-5 shrink-0 text-muted-foreground" aria-hidden="true" />
		<dt class="flex-1">Affichage des prochaines stations</dt>
		<dd>{vehicule.affichageDynamique ? 'Oui' : 'Non'}</dd>
	</div>
	<div class="flex items-center gap-3">
		<Volume2 class="size-5 shrink-0 text-muted-foreground" aria-hidden="true" />
		<dt class="flex-1">Annonces sonores</dt>
		<dd>{vehicule.annoncesSonores ? 'Oui' : 'Non'}</dd>
	</div>
</dl>
