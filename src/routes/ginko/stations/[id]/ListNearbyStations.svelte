<script lang="ts">
	import { Button } from '$shadcn/button';
	import type { Arret } from '$core/dto/ginko';
	import ArretRow from '../ArretRow.svelte';

	interface Props {
		arrets: Arret[];
	}

	let { arrets }: Props = $props();
	let expanded = $state(false);

	const visibleArrets = $derived(expanded ? arrets : arrets.slice(0, 5));
	const remainingCount = $derived(Math.max(0, arrets.length - 5));
</script>

{#if arrets.length > 0}
	<div class="grid gap-0.5">
		{#each visibleArrets as arret (arret.id)}
			<ArretRow {arret} />
		{/each}
	</div>

	{#if remainingCount > 0}
		<div class="mt-3 flex justify-center">
			<Button
				variant="secondary"
				class="h-auto rounded-full px-5 py-2.5"
				onclick={() => (expanded = !expanded)}
			>
				{#if expanded}
					Voir moins de stations
				{:else}
					Voir plus de stations (+{remainingCount})
				{/if}
			</Button>
		</div>
	{/if}
{:else}
	<div class="rounded-md border border-dashed p-4 text-center text-sm text-muted-foreground">
		Aucune station a proximite.
	</div>
{/if}
