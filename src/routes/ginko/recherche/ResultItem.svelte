<script lang="ts">
	import { resolve } from '$app/paths';
	import type { FormattedArret } from '$core/dto/ginko';
	import { BusFront, CircleAlert, FolderOpen, TramFront } from '@lucide/svelte';
	import { KindOfStop, kindOfStop } from '#lib/core/helper/ginko/stops.ts';
	import StopName from './StopName.svelte';

	interface Props {
		arret: FormattedArret;
		recommended?: boolean;
		onchildren?: (arret: FormattedArret) => void;
	}

	let { arret, onchildren, recommended = false }: Props = $props();

	let kind = $derived(kindOfStop(arret));
	let isParent = $derived((arret.children?.length ?? 0) > 0);
	let href = $derived.by(() => {
		let url = resolve('/ginko/station/[id]', { id: arret.id });
		if (isParent) {
			url += `?${new URLSearchParams({ nom: arret.nom })}`;
		}
		return url;
	});
</script>

<div class="flex gap-px">
	<a
		{href}
		class={{
			'flex min-w-0 flex-1 items-center gap-3 rounded-l-lg bg-slate-200 px-4 py-3 transition-colors dark:bg-slate-800': true,
			'hover:bg-yellow-500/50!': isParent,
			'hover:bg-sky-500/30!': !isParent && kind === KindOfStop.Tram,
			'hover:bg-orange-500/30!': !isParent && kind === KindOfStop.Bus,
			'rounded-r-lg': !onchildren || !isParent,
			'bg-yellow-500/30! py-4': recommended
		}}
	>
		{#if isParent}
			<FolderOpen class="size-5 shrink-0 text-yellow-700 dark:text-yellow-400" />
		{:else if kind === KindOfStop.Tram}
			<TramFront class="size-5 shrink-0 text-sky-500 dark:text-sky-400" />
		{:else}
			<BusFront class="size-5 shrink-0 text-orange-500 dark:text-orange-400" />
		{/if}

		<span
			class={{
				'flex-1': true,
				'-my-1': arret.nomDecoupe?.ville && arret.nomDecoupe?.station
			}}
		>
			<StopName {arret} />
		</span>
		{#if recommended}
			<span class="text-sm text-yellow-700 dark:text-yellow-400">Recommandé</span>
		{/if}

		{#if arret.intemperie}
			<CircleAlert
				class="size-5 shrink-0 text-red-500 dark:text-red-400"
				title="Impacté par des intempéries"
			/>
		{/if}
	</a>
	{#if isParent && onchildren}
		<button
			type="button"
			class="flex items-center gap-3 rounded-r-lg bg-slate-200 px-4 py-3 text-sm text-muted-foreground transition-colors hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700"
			aria-label="Afficher les {arret.children?.length} quais de {arret.nom}"
			onclick={() => onchildren?.(arret)}>{arret.children?.length} quais</button
		>
	{/if}
</div>
