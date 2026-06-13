<script lang="ts">
	import type { Component } from 'svelte';
	import { Hash, MapPin } from '@lucide/svelte';
	import type { FormattedStation } from '$core/dto/jcdecaux';
	import { cn } from '$lib/utils.js';
	import InfoCard from './InfoCard.svelte';

	interface Props {
		station: FormattedStation;
		class?: string;
	}

	let { station, class: className }: Props = $props();

	const lastUpdate = $derived(new Date(station.lastUpdate));
</script>

{#snippet detailRow(icon: Component | null, label: string, value: string, mono = false)}
	<div class="flex items-center justify-between">
		<span class="flex items-center gap-1.5 text-muted-foreground">
			{#if icon}
				{@const Icon = icon}
				<Icon class="size-3.5" />
			{/if}
			{label}
		</span>
		<span class={cn(mono && 'font-mono text-xs')}>{value}</span>
	</div>
{/snippet}

<InfoCard title="Détails" class={cn('text-sm', className)}>
	<div class="space-y-2">
		{@render detailRow(Hash, 'Numéro', String(station.number), true)}
		{@render detailRow(
			MapPin,
			'Coordonnées',
			`${station.position.latitude.toFixed(5)}, ${station.position.longitude.toFixed(5)}`,
			true
		)}
		{@render detailRow(null, 'Contrat', station.contractName)}
		{@render detailRow(
			null,
			'Mis à jour',
			lastUpdate.toLocaleTimeString('fr-FR', {
				hour: '2-digit',
				minute: '2-digit',
				second: '2-digit'
			})
		)}

		<div class="flex items-center gap-1.5 text-sm text-muted-foreground">
			<MapPin class="size-3.5 shrink-0" />
			<span class="font-semibold">Emplacement</span>
			<span>{station.address}</span>
		</div>
	</div>
</InfoCard>
