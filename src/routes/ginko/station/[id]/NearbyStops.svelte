<script lang="ts">
	import ResultItem from '../../recherche/ResultItem.svelte';
	import ChildrenDrawer from '../../recherche/ChildrenDrawer.svelte';
	import type { FormattedArret } from '#core/dto/ginko/index.ts';

	interface Props {
		arrets: FormattedArret[];
	}

	let { arrets }: Props = $props();

	let drawerOpen = $state(false);
	let selectedArret: FormattedArret | null = $state(null);

	function showChildren(arret: FormattedArret) {
		selectedArret = arret;
		drawerOpen = true;
	}
</script>

<section class="mx-auto max-w-100">
	<h2 class="mb-3 text-xs font-bold tracking-widest text-muted-foreground uppercase">
		Stations à proximité
	</h2>
	<ul class="grid gap-0.5">
		{#each arrets as arret (arret.id)}
			<ResultItem {arret} onchildren={showChildren} />
		{:else}
			<li class="text-center text-muted-foreground">Aucune station à proximité.</li>
		{/each}
	</ul>
</section>

<ChildrenDrawer bind:open={drawerOpen} arret={selectedArret} />
