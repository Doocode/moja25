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
	import { FeatureBubble, FeatureRow } from './vehicule';

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
</dl>

<dl class="my-8 grid grid-cols-3 items-start gap-2">
	<FeatureBubble
		icon={Accessibility}
		title="Accès pour PMR"
		value={accessibilite === 1
			? 'Accessible'
			: accessibilite === 2
				? 'Non accessible'
				: 'Information indisponible'}
		available={accessibilite === 1 ? true : accessibilite === 2 ? false : null}
	/>
	<FeatureBubble
		icon={Snowflake}
		title="Présence de clim"
		value={vehicule.climatisation ? 'Oui' : 'Non'}
		available={vehicule.climatisation}
	/>
	<FeatureBubble
		icon={Usb}
		title="Prises USB"
		value={vehicule.prisesUSB ? 'Oui' : 'Non'}
		available={vehicule.prisesUSB}
	/>
</dl>

<dl class="grid gap-3">
	<FeatureRow
		icon={Monitor}
		title="Affichage des prochaines stations"
		value={vehicule.affichageDynamique ? 'Oui' : 'Non'}
		available={vehicule.affichageDynamique}
	/>
	<FeatureRow
		icon={Volume2}
		title="Annonces sonores"
		value={vehicule.annoncesSonores ? 'Oui' : 'Non'}
		available={vehicule.annoncesSonores}
	/>
</dl>
