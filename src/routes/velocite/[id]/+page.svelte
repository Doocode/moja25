<script lang="ts">
	import {
		ArrowLeft,
		Ban,
		Bike,
		CheckCircle,
		CreditCard,
		Hash,
		Layers,
		MapPin,
		SquareParking,
		Star,
		TriangleAlert,
		Wifi,
		XCircle,
		Zap
	} from '@lucide/svelte';
	import type { FormattedStation } from '$core/dto/jcdecaux';
	import RecapSection from './RecapSection.svelte';

	interface Props {
		data: { station: FormattedStation };
	}

	let { data }: Props = $props();
	const station = $derived(data.station);

	const isOpen = $derived(station.status === 'OPEN');
	const totalBikes = $derived(station.mainStands.availabilities.bikes);
	const mechanicalBikes = $derived(station.mainStands.availabilities.mechanicalBikes);
	const electricalBikes = $derived(station.mainStands.availabilities.electricalBikes);
	const internalBikes = $derived(station.mainStands.availabilities.electricalInternalBatteryBikes);
	const removableBikes = $derived(
		station.mainStands.availabilities.electricalRemovableBatteryBikes
	);
	const availableStands = $derived(station.mainStands.availabilities.stands);
	const capacity = $derived(station.totalStands.capacity);
	const lastUpdate = $derived(new Date(station.lastUpdate));

	function countColor(n: number, capacity: number): string {
		const ratio = capacity > 0 ? n / capacity : 0;
		if (n <= 0) return 'text-red-500';
		if (ratio <= 0.2) return 'text-orange-500';
		return 'text-green-500';
	}
</script>

<svelte:head>
	<title>{station.formattedName} — Vélocité</title>
</svelte:head>

<main class="m-auto max-w-lg p-4">
	<!-- Navigation -->
	<a
		href="/velocite"
		class="mb-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
	>
		<ArrowLeft class="size-4" />
		Toutes les stations
	</a>

	<!-- En-tête -->
	<div class="mb-4">
		<div class="mb-1 flex items-start justify-between gap-3">
			<h1 class="text-2xl leading-tight font-bold">{station.formattedName}</h1>
			<span
				class="mt-1 shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold
				{isOpen
					? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400'
					: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400'}"
			>
				{isOpen ? 'Ouvert' : 'Fermé'}
			</span>
		</div>
		<div class="flex items-center gap-1.5 text-sm text-muted-foreground">
			<MapPin class="size-3.5 shrink-0" />
			<span>{station.address}</span>
		</div>
	</div>

	<RecapSection {station} class="mb-4" />

	<!-- Disponibilités principales -->
	<div class="mb-3 grid grid-cols-2 gap-2">
		<!-- Vélos -->
		<div class="rounded-xl border bg-card p-4">
			<div class="mb-3 flex items-center gap-2 text-sm font-medium text-muted-foreground">
				<Bike class="size-4" />
				Vélos disponibles
			</div>
			<p class="text-4xl font-bold {countColor(totalBikes, capacity)}">{totalBikes}</p>
			<p class="mt-0.5 text-xs text-muted-foreground">sur {capacity} places</p>

			<div class="mt-3 space-y-1.5 border-t pt-3">
				<div class="flex items-center justify-between text-sm">
					<span class="flex items-center gap-1.5 text-muted-foreground">
						<Bike class="size-3.5" /> Mécaniques
					</span>
					<span class="font-semibold {countColor(mechanicalBikes, capacity)}"
						>{mechanicalBikes}</span
					>
				</div>
				<div class="flex items-center justify-between text-sm">
					<span class="flex items-center gap-1.5 text-muted-foreground">
						<Zap class="size-3.5" /> Électriques
					</span>
					<span class="font-semibold {countColor(electricalBikes, capacity)}"
						>{electricalBikes}</span
					>
				</div>
				{#if internalBikes > 0 || removableBikes > 0}
					<div class="flex items-center justify-between pl-5 text-xs text-muted-foreground">
						<span>Batterie interne</span>
						<span>{internalBikes}</span>
					</div>
					<div class="flex items-center justify-between pl-5 text-xs text-muted-foreground">
						<span>Batterie amovible</span>
						<span>{removableBikes}</span>
					</div>
				{/if}
			</div>
		</div>

		<!-- Places -->
		<div class="rounded-xl border bg-card p-4">
			<div class="mb-3 flex items-center gap-2 text-sm font-medium text-muted-foreground">
				<SquareParking class="size-4" />
				Places libres
			</div>
			<p class="text-4xl font-bold {countColor(availableStands, capacity)}">{availableStands}</p>
			<p class="mt-0.5 text-xs text-muted-foreground">sur {capacity} places</p>

			<div class="mt-3 space-y-1.5 border-t pt-3">
				<div class="flex items-center justify-between text-sm">
					<span class="flex items-center gap-1.5 text-muted-foreground">
						<Layers class="size-3.5" /> Capacité
					</span>
					<span class="font-semibold">{capacity}</span>
				</div>
				<div class="flex items-center justify-between text-sm">
					<span class="flex items-center gap-1.5 text-muted-foreground">
						<Ban class="size-3.5" /> Indisponibles
					</span>
					<span class="font-semibold {station.unavailableStands > 0 ? 'text-orange-500' : ''}"
						>{station.unavailableStands}</span
					>
				</div>
			</div>
		</div>
	</div>

	<!-- Attributs de la station -->
	<div class="mb-3 rounded-xl border bg-card p-4">
		<h2 class="mb-3 text-sm font-medium tracking-wider text-muted-foreground uppercase">
			Informations
		</h2>
		<div class="grid grid-cols-2 gap-2">
			{#each [{ Icon: CheckCircle, label: 'Ouverte', active: isOpen, activeClass: 'text-green-500', inactiveIcon: XCircle }, { Icon: Wifi, label: 'Connectée', active: station.connected, activeClass: 'text-green-500', inactiveIcon: XCircle }, { Icon: CreditCard, label: 'Carte bancaire', active: station.banking, activeClass: 'text-green-500', inactiveIcon: XCircle }, { Icon: Star, label: 'Bonus', active: station.bonus, activeClass: 'text-yellow-500', inactiveIcon: XCircle }, { Icon: TriangleAlert, label: 'Débordement', active: station.overflow, activeClass: 'text-orange-500', inactiveIcon: XCircle }] as item}
				<div class="flex items-center gap-2 text-sm">
					{#if item.active}
						<item.Icon class="size-4 {item.activeClass}" />
					{:else}
						<XCircle class="size-4 text-muted-foreground/40" />
					{/if}
					<span class={item.active ? 'text-foreground' : 'text-muted-foreground/60'}
						>{item.label}</span
					>
				</div>
			{/each}
		</div>
	</div>

	<!-- Métadonnées -->
	<div class="rounded-xl border bg-card p-4">
		<h2 class="mb-3 text-sm font-medium tracking-wider text-muted-foreground uppercase">Détails</h2>
		<div class="space-y-2 text-sm">
			<div class="flex items-center justify-between">
				<span class="flex items-center gap-1.5 text-muted-foreground">
					<Hash class="size-3.5" /> Numéro
				</span>
				<span class="font-mono font-medium">{station.number}</span>
			</div>
			<div class="flex items-center justify-between">
				<span class="flex items-center gap-1.5 text-muted-foreground">
					<MapPin class="size-3.5" /> Coordonnées
				</span>
				<span class="font-mono text-xs"
					>{station.position.latitude.toFixed(5)}, {station.position.longitude.toFixed(5)}</span
				>
			</div>
			<div class="flex items-center justify-between">
				<span class="text-muted-foreground">Contrat</span>
				<span class="capitalize">{station.contractName}</span>
			</div>
			<div class="flex items-center justify-between">
				<span class="text-muted-foreground">Mis à jour</span>
				<span class="text-xs"
					>{lastUpdate.toLocaleTimeString('fr-FR', {
						hour: '2-digit',
						minute: '2-digit',
						second: '2-digit'
					})}</span
				>
			</div>
		</div>
	</div>
</main>
