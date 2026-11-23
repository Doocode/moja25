<script lang="ts">
	import { Button } from '$shadcn/button';
	import { AArrowUp } from '@lucide/svelte';
	import { groupWaitingTimes } from './waitingTimes';
	import type { TempsAttente } from '$core/dto/ginko';
	import WaitingTimeCard from './WaitingTimeCard.svelte';
	import KeepScreenAwake from '$lib/ui/KeepScreenAwake.svelte';
	import { LocalStorageKey } from '$lib/core/helper/local_storage';
	import VehiculeGetter from '../vehicule/VehiculeGetter.svelte';
	import DetailsVehiculeDrawer from '../DetailsVehiculeDrawer.svelte';
	import { fade } from 'svelte/transition';

	interface Props {
		temps: TempsAttente[];
	}

	let { temps }: Props = $props();

	let groups = $derived(groupWaitingTimes(temps));

	let largeFontSize = $derived(groups.length < 4);
	let drawerOpen = $state(false);
	let numVehicule = $state('');
	let clientWidth = $state(1300);

	function toggleFontSize() {
		largeFontSize = !largeFontSize;
	}

	function onPassageClick(temps: TempsAttente) {
		drawerOpen = true;
		numVehicule = temps.numVehicule;
	}

	function closeDetails() {
		drawerOpen = false;
		numVehicule = '';
	}
</script>

<svelte:body bind:clientWidth />

<main
	class={{
		'mx-auto grid w-full max-w-2xl gap-8': true,
		'xl:max-w-7xl xl:grid-cols-2': drawerOpen
	}}
>
	<section class="relative z-1 shrink-0">
		<h2 class="mb-1 text-xs font-bold tracking-widest text-muted-foreground uppercase">
			Prochains passages
		</h2>

		<nav class="mb-4">
			<KeepScreenAwake localStorageKey={LocalStorageKey.GINKO_KEEP_SCREEN_AWAKE} />

			{#if groups.length > 0}
				<Button
					onclick={toggleFontSize}
					size="icon"
					variant={largeFontSize ? 'outline' : 'ghost'}
					title={largeFontSize
						? "Désactiver l'affichage en grande police"
						: "Activer l'affichage en grande police"}
				>
					<AArrowUp class="size-5" />
				</Button>
			{/if}
		</nav>

		<ul class="grid gap-1">
			{#each groups as group (group.key)}
				<WaitingTimeCard {group} {largeFontSize} {onPassageClick} />
			{:else}
				<li class="text-center text-muted-foreground">Aucun passage prévu prochainement.</li>
			{/each}
		</ul>
	</section>

	<section class="min-w-0">
		{#if clientWidth < 1280}
			<DetailsVehiculeDrawer bind:open={drawerOpen} {numVehicule} />
		{:else if drawerOpen && numVehicule.trim().length > 0}
			{#key numVehicule}
				<div class="hidden xl:block" in:fade|global={{ duration: 150 }}>
					<header class="mb-4 flex items-start justify-between">
						<h2 class="mb-1 text-xs font-bold tracking-widest text-muted-foreground uppercase">
							Détails du véhicule
						</h2>
						<Button onclick={closeDetails} variant="outline">Fermer</Button>
					</header>
					<VehiculeGetter {numVehicule} extendedIllustration />
				</div>
			{/key}
		{/if}
	</section>
</main>
