<script lang="ts">
	import type { Ligne } from '$core/dto/ginko';
	import type { Component } from 'svelte';
	import GroupLignes from './GroupLignes.svelte';
	import { BusFront, Leaf, TramFront, Bus } from '@lucide/svelte';

	interface Props {
		data: {
			lignes: Ligne[];
		};
	}

	let { data }: Props = $props();

	let lignes = $derived(data.lignes);
	let viewmode = $state('grid');

	interface GroupName {
		icon: Component;
		label: string;
	}

	const typologies: Record<number, GroupName> = {
		10: { icon: TramFront, label: 'Tramway' },
		20: { icon: Leaf, label: 'Lianes' },
		30: { icon: BusFront, label: 'Lignes urbaines' },
		40: { icon: BusFront, label: 'Lignes complémentaires' },
		50: { icon: Bus, label: 'Lignes périurbaines' },
		60: { icon: Bus, label: 'Lignes scolaires' },
		70: { icon: Bus, label: 'Services à la demande' },
		80: { icon: Bus, label: 'Autre' }
	};

	let groupes = $derived(
		Object.entries(
			Object.groupBy(
				[...lignes].sort(
					(a, b) =>
						a.typologie - b.typologie ||
						a.numLignePublic.localeCompare(b.numLignePublic, 'fr', { numeric: true })
				),
				(l) => l.typologie
			)
		)
	);
</script>

<main class="container m-auto p-4" class:max-w-lg={viewmode === 'list'}>
	<h1 class="mb-4 text-2xl font-bold">Lignes</h1>

	<div class="grid gap-8">
		{#each groupes as [typologie, items] (typologie)}
			<GroupLignes
				icon={typologies[Number(typologie)].icon}
				label={typologies[Number(typologie)].label ?? 'Autre'}
				items={items ?? []}
				viewmode="grid"
			/>
		{/each}
	</div>
</main>
