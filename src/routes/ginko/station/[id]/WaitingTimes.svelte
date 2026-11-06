<script lang="ts">
	import WaitingTimeCard from './WaitingTimeCard.svelte';
	import { groupWaitingTimes } from './waitingTimes';
	import type { TempsAttente } from '$core/dto/ginko';

	interface Props {
		temps: TempsAttente[];
	}

	let { temps }: Props = $props();

	let groups = $derived(groupWaitingTimes(temps));
</script>

<section>
	<h2 class="mb-3 text-xs font-bold tracking-widest text-muted-foreground uppercase">
		Prochains passages
	</h2>

	<ul class="grid gap-1">
		{#each groups as group (group.key)}
			<WaitingTimeCard {group} />
		{:else}
			<li class="text-center text-muted-foreground">Aucun passage prévu prochainement.</li>
		{/each}
	</ul>
</section>
