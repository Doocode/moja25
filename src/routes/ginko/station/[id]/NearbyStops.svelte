<script lang="ts">
	import NearbyStopItem from './NearbyStopItem.svelte';
	import type { Arret } from '$core/dto/ginko';

	interface Props {
		arrets: Arret[];
	}

	let { arrets }: Props = $props();
</script>

<section class="mx-auto max-w-100">
	<h2 class="mb-3 text-xs font-bold tracking-widest text-muted-foreground uppercase">
		Stations à proximité
	</h2>
	<ul class="grid gap-0.5">
		{#each arrets as arret (arret.id)}
			<NearbyStopItem {arret} />
		{:else}
			<li class="text-center text-muted-foreground">Aucune station à proximité.</li>
		{/each}
	</ul>
</section>
