<script lang="ts">
	import type { Arret } from '$core/dto/ginko';
	import { BusFront, TramFront } from '@lucide/svelte';

	interface Props {
		arret: Arret;
		displayId?: boolean;
	}

	let { arret, displayId = false }: Props = $props();

	let isTramStop = $derived(arret.id.startsWith('t_'));
	let nameSplit = $derived(arret.nom.split(' - '));
</script>

<a
	href="/ginko/stations/{arret.id}"
	class="flex items-center justify-between gap-4 rounded-md bg-slate-200 px-4 py-3 duration-75 hover:bg-primary/30 active:bg-primary/40 dark:bg-slate-800 dark:hover:bg-primary/30 dark:active:bg-primary/40"
>
	<div class="flex flex-2 items-center gap-3">
		{#if isTramStop}
			<TramFront class="size-6 text-chart-2" />
		{:else}
			<BusFront class="size-6 text-primary" />
		{/if}

		{#if nameSplit.length == 1}
			<span class="truncate font-medium">{arret.nom}</span>
		{:else}
			<div class="flex flex-col">
				<span class="truncate text-xs text-muted-foreground">{nameSplit[0]}</span>
				<span class="truncate font-medium">{nameSplit[1]}</span>
			</div>
		{/if}
	</div>

	{#if displayId}
		<span class="text-sm text-gray-500">{arret.id}</span>
	{/if}
</a>
