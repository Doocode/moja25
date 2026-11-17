<script lang="ts">
	import type { InfoLigne, Ligne } from '$core/dto/ginko';
	import ListeLignes from './ListeLignes.svelte';
	import SectionGroup from './SectionGroup.svelte';
	import type { ItemEtatLigne } from './types';
	import { TramFront, Leaf, BusFront } from '@lucide/svelte';
	import type { Component } from 'svelte';

	interface Props {
		etatLignes: InfoLigne[];
		lignes: Ligne[];
	}

	let { etatLignes, lignes }: Props = $props();

	const items: ItemEtatLigne[] = $derived.by(() => {
		return etatLignes
			.map((etat) => {
				const ligne = lignes.find((l) => l.id === etat.idLigne);
				if (!ligne) return null;
				return {
					idLigne: etat.idLigne,
					numLignePublic: ligne.numLignePublic,
					couleurFond: ligne.couleurFond,
					couleurTexte: ligne.couleurTexte,
					etat: etat.etat,
					modeTransport: ligne.modeTransport,
					scolaire: ligne.scolaire,
					typologie: ligne.typologie
				};
			})
			.filter((item) => item !== null);
	});

	function getItemsByTypologie(typologie: number) {
		return items.filter((item) => item.typologie === typologie);
	}

	interface Groups {
		icon?: Component;
		title: string;
		items: ItemEtatLigne[];
		size?: 'sm' | 'md' | 'lg';
	}

	const tramLignes = $derived.by(() => getItemsByTypologie(10));
	const lianesLignes = $derived.by(() => getItemsByTypologie(20));
	const groupMajorLines = $derived.by(() => tramLignes.length < 3);
	const majorLines = $derived.by(() => {
		if (groupMajorLines) {
			return [
				{
					title: 'Tram & Lianes',
					icon: TramFront,
					items: [...tramLignes, ...lianesLignes],
					size: 'lg'
				}
			];
		} else {
			return [
				{
					title: 'Tram',
					icon: TramFront,
					items: [...tramLignes],
					size: 'lg'
				},
				{
					title: 'Lianes',
					icon: Leaf,
					items: [...lianesLignes],
					size: 'lg'
				}
			];
		}
	});

	const groups: Groups[] = $derived.by(() => {
		return [
			...majorLines,
			{
				title: 'Lignes complémentaires',
				icon: BusFront,
				size: 'md',
				items: getItemsByTypologie(40)
			},
			{
				title: 'Lignes périurbaines',
				items: getItemsByTypologie(50)
			},
			{
				title: 'Lignes scolaires',
				items: getItemsByTypologie(60)
			},
			{
				title: 'Lignes spéciales',
				items: getItemsByTypologie(70)
			},
			{
				title: 'Autres lignes',
				items: getItemsByTypologie(80)
			}
		];
	});
</script>

<div class="grid gap-8 px-3 sm:px-4">
	{#each groups as group (group.title)}
		{#if group.items.length > 0}
			<SectionGroup title={group.title} icon={group.icon}>
				<ListeLignes lignes={group.items} size={group.size} />
			</SectionGroup>
		{/if}
	{/each}
</div>
