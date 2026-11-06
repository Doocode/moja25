<script lang="ts">
	import { groupWaitingTimes } from './waitingTimes';
	import type { TempsAttente } from '$core/dto/ginko';
	import WaitingTimeCard from './WaitingTimeCard.svelte';
	import KeepScreenAwake from '$lib/ui/KeepScreenAwake.svelte';
	import { LocalStorageKey } from '$lib/core/helper/local_storage';

	interface Props {
		temps: TempsAttente[];
	}

	let { temps }: Props = $props();

	let groups = $derived(groupWaitingTimes(temps));
</script>

<section>
	<h2 class="mb-1 text-xs font-bold tracking-widest text-muted-foreground uppercase">
		Prochains passages
	</h2>

	<nav class="mb-4">
		<KeepScreenAwake localStorageKey={LocalStorageKey.GINKO_KEEP_SCREEN_AWAKE} />
	</nav>

	<ul class="grid gap-1">
		{#each groups as group (group.key)}
			<WaitingTimeCard {group} />
		{:else}
			<li class="text-center text-muted-foreground">Aucun passage prévu prochainement.</li>
		{/each}
	</ul>
</section>
