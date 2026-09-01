<script lang="ts">
	import type { Component } from 'svelte';
	import { Button } from '$shadcn/button';
	import { BusFront, MapPin, MessageCircleWarning } from '@lucide/svelte';

	interface Link {
		href: string;
		title: string;
		legend?: string;
		icon: Component;
	}

	const links: Link[] = [
		{
			href: '/ginko/stations',
			title: 'Stations',
			icon: MapPin,
			legend: 'Horaires en temps réel'
		},
		{
			href: '/ginko/lignes',
			title: 'Lignes',
			icon: BusFront,
			legend: 'Bus, tram et periurbain'
		},
		{
			href: '/ginko/info-trafic',
			title: 'Info-trafic',
			icon: MessageCircleWarning,
			legend: 'Perturbations et incidents'
		}
	];
</script>

<svelte:head>
	<title>Ginko - Moja Besançon</title>
</svelte:head>

<main class="container m-auto p-4">
	<h1 class="mb-4 text-4xl font-black">Ginko</h1>
	<nav class="grid grid-cols-[repeat(auto-fill,_minmax(230px,_1fr))] gap-1">
		{#each links as link}
			{@const Icon = link.icon}
			<Button
				href={link.href}
				variant="outline"
				class="flex h-auto flex-col items-center rounded-4xl! rounded-lg border px-4 py-8 md:aspect-square"
			>
				<Icon class="size-[5rem] text-chart-2" />
				<p class="text-xl font-bold text-primary">{link.title}</p>
				{#if link.legend}
					<p class="text-sm">{link.legend}</p>
				{/if}
			</Button>
		{/each}
	</nav>
</main>
