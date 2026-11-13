<script lang="ts">
	import WaitingTimeItem from './WaitingTimeItem.svelte';
	import { BadgeLigne } from '$lib/ui/ginko';
	import type { WaitingTimeGroup } from './waitingTimes';
	import { Button } from '$shadcn/button';
	import { AArrowDown, AArrowUp } from '@lucide/svelte';
	import DetailsVehiculeDrawer from './DetailsVehiculeDrawer.svelte';

	interface Props {
		group: WaitingTimeGroup;
		largeFontSize?: boolean;
	}

	let { group, largeFontSize = $bindable(false) }: Props = $props();
	let drawerOpen = $state(false);
	let numVehicule = $state('');

	function toggleFontSize() {
		largeFontSize = !largeFontSize;
	}
</script>

<li
	class="relative grid gap-2 rounded-xl border-b border-slate-400/80 bg-slate-200 p-3 pb-2 md:static md:grid-cols-[1fr_250px] md:pb-3 dark:border-slate-600 dark:bg-slate-800"
>
	<header class="flex items-center gap-3 md:relative">
		<BadgeLigne ligne={group.ligne} class="shrink-0 md:px-2.5 md:py-1.75" />

		<div class="grid min-w-0 flex-1">
			<span class="truncate font-bold">{group.destination}</span>
			{#if group.precisionDestination}
				<span class="text-xs text-muted-foreground">{group.precisionDestination}</span>
			{/if}
		</div>

		<Button
			onclick={toggleFontSize}
			size="icon"
			variant="ghost"
			class="absolute top-2 right-2 my-auto rounded-full text-muted-foreground hover:bg-primary hover:text-primary-foreground md:top-0 md:right-0 md:bottom-0 dark:hover:bg-primary dark:hover:text-primary-foreground"
			title={largeFontSize
				? "Désactiver l'affichage en grande police"
				: "Activer l'affichage en grande police"}
		>
			{#if largeFontSize}
				<AArrowDown class="size-5" />
			{:else}
				<AArrowUp class="size-5" />
			{/if}
		</Button>
	</header>

	<ul class="grid grid-cols-3 items-center gap-2 text-center">
		{#each group.temps as temps, ii (ii)}
			<WaitingTimeItem
				{temps}
				index={ii}
				large={largeFontSize}
				onclick={() => {
					numVehicule = temps.numVehicule;
					drawerOpen = true;
				}}
			/>
		{:else}
			<li class="text-sm text-muted-foreground col-span-3">Aucun passage prévu</li>
		{/each}
	</ul>

	<DetailsVehiculeDrawer bind:open={drawerOpen} {numVehicule} />
</li>
