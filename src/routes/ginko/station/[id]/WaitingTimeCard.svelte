<script lang="ts">
	import WaitingTimeItem from './WaitingTimeItem.svelte';
	import { BadgeLigne } from '$lib/ui/ginko';
	import type { WaitingTimeGroup } from './waitingTimes';

	interface Props {
		group: WaitingTimeGroup;
	}

	let { group }: Props = $props();
</script>

<li
	class="grid gap-2 rounded-xl border-b border-slate-400/80 bg-slate-200 p-3 pb-2 md:grid-cols-[1fr_250px] md:pb-3 dark:border-slate-600 dark:bg-slate-800"
>
	<header class="flex items-center gap-3">
		<BadgeLigne ligne={group.ligne} class="shrink-0 md:px-2.5 md:py-1.75" />
		<div class="grid min-w-0 flex-1">
			<span class="truncate font-bold">{group.destination}</span>
			{#if group.precisionDestination}
				<span class="text-xs text-muted-foreground">{group.precisionDestination}</span>
			{/if}
		</div>
	</header>

	<ul class="grid grid-cols-3 items-center gap-2 text-center">
		{#each group.temps as temps, ii (ii)}
			<WaitingTimeItem {temps} index={ii} />
		{:else}
			<li class="text-sm text-muted-foreground">Aucun passage prévu</li>
		{/each}
	</ul>
</li>
