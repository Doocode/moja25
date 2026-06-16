<script lang="ts">
	import type { Arret } from '$core/dto/ginko';
	import { BusFront, TramFront } from '@lucide/svelte';

	interface Props {
		arret: Arret;
		displayId?: boolean;
	}

	let { arret, displayId = false }: Props = $props();

	let isTramStop = $derived(arret.id.startsWith('t_'));
</script>

<a
	href="/ginko/stations/{arret.id}"
	class="flex items-center justify-between gap-4 rounded-md px-4 py-3 duration-75 hover:bg-primary/30 active:bg-primary/40"
>
	<div class="flex flex-2 items-center gap-3">
		{#if isTramStop}
			<TramFront class="size-6 text-chart-2" />
		{:else}
			<BusFront class="size-6 text-primary" />
		{/if}
		<span class="truncate font-medium">{arret.nom}</span>
	</div>

	{#if displayId}
		<span class="text-sm text-gray-500">{arret.id}</span>
	{/if}
</a>
