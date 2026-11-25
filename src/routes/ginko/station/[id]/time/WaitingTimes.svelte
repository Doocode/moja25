<script lang="ts">
	import { Button } from '#shadcn/button/index.ts';
	import { AArrowUp, X } from '@lucide/svelte';
	import { groupWaitingTimes } from './waitingTimes';
	import type { TempsAttente } from '#core/dto/ginko/index.ts';
	import WaitingTimeCard from './WaitingTimeCard.svelte';
	import KeepScreenAwake from '#lib/ui/KeepScreenAwake.svelte';
	import { LocalStorageKey } from '#core/helper/local_storage/index.ts';
	import VehiculeGetter from '../vehicule/VehiculeGetter.svelte';
	import DetailsVehiculeDrawer from '../DetailsVehiculeDrawer.svelte';
	import DetailsArrival from './DetailsArrival.svelte';

	interface Props {
		temps: TempsAttente[];
	}

	let { temps }: Props = $props();

	let groups = $derived(groupWaitingTimes(temps));

	let largeFontSize = $derived(groups.length < 4);
	let drawerOpen = $state(false);
	let numVehicule = $state('');
	let tempsAttente = $state<TempsAttente | null>(null);
	let clientWidth = $state(1300);

	function toggleFontSize() {
		largeFontSize = !largeFontSize;
	}

	function onPassageClick(temps: TempsAttente) {
		drawerOpen = true;
		numVehicule = temps.numVehicule;
		tempsAttente = temps;
	}

	function closeDetails() {
		drawerOpen = false;
		numVehicule = '';
		tempsAttente = null;
	}
</script>

<svelte:body bind:clientWidth />

<main
	class={{
		'mx-auto grid w-full max-w-2xl gap-8': true,
		'xl:container xl:w-auto xl:grid-cols-2': drawerOpen
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
			{#each groups as group, ii (group.key)}
				<WaitingTimeCard {group} {largeFontSize} {onPassageClick} selected={ii === 0} />
			{:else}
				<img
					src="/assets/ginko/vehicule/empty-tram.svg"
					alt="Aucun véhicule disponible"
					class="mx-auto w-50 bg-slate-700 invert-100 hue-rotate-180 dark:hue-rotate-0 dark:invert-0 rounded-[25%] mb-2"
				/>
				<li class="text-center text-muted-foreground">Aucun passage prévu prochainement.</li>
			{/each}
		</ul>
	</section>

	<section class="min-w-0">
		{#if clientWidth < 1280 && tempsAttente}
			<DetailsVehiculeDrawer bind:open={drawerOpen} {numVehicule} {tempsAttente} />
		{:else if drawerOpen && tempsAttente}
			{#key numVehicule}
				<div class="hidden xl:block">
					<header class="mb-4 flex items-start justify-between">
						<h2 class="mb-1 text-xs font-bold tracking-widest text-muted-foreground uppercase">
							Détails du passage
						</h2>
						<Button onclick={closeDetails} variant="outline">
							<X class="size-5" />
							Masquer les détails
						</Button>
					</header>
					<DetailsArrival {tempsAttente} />

					<header class="mb-2 flex items-start justify-between">
						<h2 class="text-xs font-bold tracking-widest text-muted-foreground uppercase">
							Détails du véhicule
						</h2>
					</header>
					<VehiculeGetter {numVehicule} extendedIllustration />
				</div>
			{/key}
		{/if}
	</section>
</main>
