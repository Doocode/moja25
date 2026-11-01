<script lang="ts">
	import { resolve } from '$app/paths';
	import { BusFront, TramFront } from '@lucide/svelte';
	import type { Arret } from '$core/dto/ginko';

	interface Props {
		arret: Arret;
	}

	let { arret }: Props = $props();

	let kind: 'train' | 'tram' | 'bus' = $derived.by(() => {
		if (arret.id.toLowerCase().startsWith('t_')) {
			return 'tram';
		} else {
			return 'bus';
		}
	});
</script>

<a
	href={resolve('/ginko/station/[id]', { id: arret.id })}
	class={{
		'flex items-center gap-3 rounded-lg px-4 py-3 transition-colors hover:bg-accent': true,
		'bg-sky-500/20 hover:bg-sky-500/30': kind === 'tram',
		'bg-orange-500/20 hover:bg-orange-500/30': kind === 'bus'
	}}
>
	{#if kind === 'tram'}
		<TramFront class="size-5 shrink-0 text-sky-500 dark:text-sky-400" />
	{:else}
		<BusFront class="size-5 shrink-0 text-orange-500 dark:text-orange-400" />
	{/if}
	<span>{arret.nom}</span>
</a>
