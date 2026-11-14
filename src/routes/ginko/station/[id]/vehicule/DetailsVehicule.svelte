<script lang="ts">
	import type { VehiculeDR } from '$core/dto/ginko';
	import {
		Accessibility,
		BusFront,
		CircleUser,
		Fuel,
		Hash,
		Monitor,
		Snowflake,
		TramFront,
		Usb,
		Volume2,
		Zap
	} from '@lucide/svelte';
	import {
		DetailRow,
		FeatureBubble,
		FeatureRow,
		Illustration,
		nomRamesTramway,
		pageNomRames
	} from '.';

	interface Props {
		vehicule: VehiculeDR;
	}

	let { vehicule }: Props = $props();

	const energie = $derived(vehicule.energie);
	const accessibilite = $derived(vehicule.accessiblite);
	const isTramway = $derived(
		['Tramway 22 mètres', 'Tramway 33 mètres'].includes(vehicule.typeVehicule)
	);
	const nomRame = $derived(nomRamesTramway.find((rame) => String(rame.num) === vehicule.num));
	const nomEnergie = $derived(
		energie === 1
			? 'Gazole'
			: energie === 2
				? 'Gaz naturel'
				: energie === 3
					? 'Hybride électrique et gaz'
					: energie === 4
						? 'Électrique'
						: 'Information indisponible'
	);
</script>

<div class="grid">
	<Illustration {vehicule} />
	<dl class="grid gap-3 sm:grid-cols-2">
		<DetailRow
			icon={Hash}
			title="Numéro de véhicule"
			value={vehicule.num || 'Information indisponible'}
		/>
		<DetailRow
			icon={isTramway ? TramFront : BusFront}
			title="Type de véhicule"
			value={vehicule.typeVehicule || 'Information indisponible'}
		/>
		{#if isTramway && nomRame}
			<DetailRow
				icon={CircleUser}
				title="Nom de la rame"
				value={nomRame.name}
				href={nomRame.anchor ? `${pageNomRames}#${nomRame.anchor}` : undefined}
			/>
		{/if}
		<DetailRow icon={energie === 4 ? Zap : Fuel} title="Énergie" value={nomEnergie} />
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
			value={vehicule.prisesUSB ? 'Disponibles' : 'Inexistantes'}
			available={vehicule.prisesUSB}
		/>
	</dl>

	<dl class="grid gap-3 sm:grid-cols-2">
		<FeatureRow
			icon={Monitor}
			title="Affichages dynamiques"
			value={vehicule.affichageDynamique ? 'Intégrés' : 'Non équipé'}
			available={vehicule.affichageDynamique}
		/>
		<FeatureRow
			icon={Volume2}
			title="Annonces sonores"
			value={vehicule.annoncesSonores ? 'Activées' : 'Non disponible'}
			available={vehicule.annoncesSonores}
		/>
	</dl>
</div>
