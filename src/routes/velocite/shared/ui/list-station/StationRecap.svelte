<script lang="ts">
	import type { FormattedStation } from '#core/dto/jcdecaux/index.ts';
	import { Ban, Bike, SquareParking, WifiOff, Zap } from '@lucide/svelte';
	import { type Component } from 'svelte';
	import { MEDIUM_LEVEL_THRESHOLD } from '../../core/sort-config';

	interface Props {
		station: FormattedStation;
	}

	let { station }: Props = $props();

	const mechanicalBikes = $derived(station.mainStands.availabilities.mechanicalBikes);
	const electricalBikes = $derived(station.mainStands.availabilities.electricalBikes);
	const availableStands = $derived(station.mainStands.availabilities.stands);
	const unavailableStands = $derived(station.unavailableStands);
	const isOpen = $derived(station.status === 'OPEN');
	const connected = $derived(station.connected);
</script>

<div class="flex justify-between gap-4 md:pl-9">
	{#snippet recap(icon: Component, label: string, count: number, negative?: boolean)}
		{@const Icon = icon}
		<div
			class={{
				'flex items-center gap-1': true,
				'text-red-600 dark:text-red-400':
					(!negative && count === 0) || (negative && count >= MEDIUM_LEVEL_THRESHOLD),
				'text-amber-600 dark:text-amber-400':
					(!negative && count > 0 && count < MEDIUM_LEVEL_THRESHOLD) ||
					(negative && count < MEDIUM_LEVEL_THRESHOLD),
				'text-green-600 dark:text-green-400':
					(!negative && count >= MEDIUM_LEVEL_THRESHOLD) || (negative && count === 0)
			}}
			title="{count} {label}"
		>
			<Icon class="size-5" />
			<span class="text-xl font-light">{count}</span>
		</div>
	{/snippet}

	{@render recap(Bike, 'vélos mécaniques disponibles', mechanicalBikes)}
	{@render recap(Zap, 'vélos électriques disponibles', electricalBikes)}

	<span class="flex-1"></span>
	{@render recap(SquareParking, 'places disponibles', availableStands)}
	{#if unavailableStands > 0}
		{@render recap(Ban, 'places indisponibles', unavailableStands, true)}
	{/if}

	{#if !isOpen || !connected}
		<span class="hidden flex-1 md:flex"></span>
		{#snippet danger(icon: Component, label: string)}
			{@const Icon = icon}
			<div class="hidden items-center gap-1 text-red-600 md:flex dark:text-red-400" title={label}>
				<Icon class="size-5" />
			</div>
		{/snippet}
		{#if !isOpen}
			{@render danger(Ban, 'Station fermée')}
		{/if}
		{#if !connected}
			{@render danger(WifiOff, 'Station non connectée')}
		{/if}
	{/if}
</div>
