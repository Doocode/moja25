<script lang="ts">
	import { Button } from '$shadcn/button';
	import { BadgeLigne } from '$lib/ui/ginko';
	import { AArrowDown, AArrowUp } from '@lucide/svelte';
	import type { WaitingTimeGroup } from './waitingTimes';
	import WaitingTimeItem from './WaitingTimeItem.svelte';

	interface Props {
		group: WaitingTimeGroup;
		largeFontSize?: boolean;
		onPassageClick?: (numVehicule: string) => void;
	}

	let { group, largeFontSize = $bindable(false), onPassageClick }: Props = $props();

	let listePassages = $derived.by(() => {
		const listePassageTemps = group.temps.map((t) => t.temps);
		const uniqueTemps = new Set(listePassageTemps);
		if (uniqueTemps.size === 1) {
			return [group.temps[0]];
		}
		return group.temps;
	});

	function toggleFontSize() {
		largeFontSize = !largeFontSize;
	}
</script>

<li
	class="relative grid gap-2 rounded-xl border-b border-slate-400/80 bg-slate-200 p-3 pb-2 md:static md:grid-cols-[1fr_250px] md:pb-3 dark:border-slate-600 dark:bg-slate-800"
>
	<header class="flex items-stretch gap-3 md:relative md:items-center">
		<BadgeLigne ligne={group.ligne} class="shrink-0 py-1.5 md:px-2.5 md:py-1.75" />

		<div class="grid min-w-0 flex-1 items-center">
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

	<ul
		class={{
			'grid items-start gap-2 text-center': true,
			'grid-cols-2': listePassages.length == 2,
			'grid-cols-3': listePassages.length == 3,
			'grid-cols-4': listePassages.length == 4,
			'grid-cols-5': listePassages.length == 5
		}}
	>
		{#each listePassages as temps, ii (ii)}
			<WaitingTimeItem
				{temps}
				index={ii}
				large={largeFontSize}
				onclick={() => onPassageClick?.(temps)}
			/>
		{:else}
			<li class="text-sm text-muted-foreground col-span-3">Aucun passage prévu</li>
		{/each}
	</ul>
</li>
