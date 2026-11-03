<script lang="ts">
	import WaitingTimeItem from './WaitingTimeItem.svelte';
	import { BadgeLigne } from '$lib/ui/ginko';
	import type { WaitingTimeGroup } from './waitingTimes';

	interface Props {
		group: WaitingTimeGroup;
	}

	let { group }: Props = $props();
</script>

<li class="grid gap-2 border-b border-muted-foreground/40 py-3">
	<div class="flex items-center gap-3">
		<BadgeLigne ligne={group.ligne} class="shrink-0" />
		<div class="grid min-w-0 flex-1">
			<span class="truncate font-bold">{group.destination}</span>
			{#if group.precisionDestination}
				<span class="text-xs text-muted-foreground">{group.precisionDestination}</span>
			{/if}
		</div>
	</div>

	<ul class="flex justify-between gap-2">
		{#each group.temps as temps, ii (ii)}
			<WaitingTimeItem {temps} />
		{:else}
			<li class="text-sm text-muted-foreground">Aucun passage prévu</li>
		{/each}
	</ul>
</li>
