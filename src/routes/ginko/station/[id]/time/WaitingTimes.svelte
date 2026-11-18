<script lang="ts">
	import { Button } from '$shadcn/button';
	import { AArrowUp } from '@lucide/svelte';
	import { groupWaitingTimes } from './waitingTimes';
	import type { TempsAttente } from '$core/dto/ginko';
	import WaitingTimeCard from './WaitingTimeCard.svelte';
	import KeepScreenAwake from '$lib/ui/KeepScreenAwake.svelte';
	import { LocalStorageKey } from '$lib/core/helper/local_storage';
	import DetailsVehiculeDrawer from '../DetailsVehiculeDrawer.svelte';

	interface Props {
		temps: TempsAttente[];
	}

	let { temps }: Props = $props();

	let groups = $derived(groupWaitingTimes(temps));

	let largeFontSize = $derived(groups.length < 4);
	let drawerOpen = $state(false);
	let numVehicule = $state('');

	function toggleFontSize() {
		largeFontSize = !largeFontSize;
	}

	function onPassageClick(temps: TempsAttente) {
		drawerOpen = true;
		numVehicule = temps.numVehicule;
	}
</script>

<section>
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

<DetailsVehiculeDrawer bind:open={drawerOpen} {numVehicule} />
