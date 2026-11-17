<script lang="ts">
	import type { InfoLigne, Ligne } from '$core/dto/ginko';
	import ListeLignes from './ListeLignes.svelte';
	import SectionGroup from './SectionGroup.svelte';
	import type { ItemEtatLigne } from './types';
	import { TramFront } from '@lucide/svelte';
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

	const groups: Groups[] = $derived.by(() => {
		return [
			{
				title: 'Tram & Lianes',
				icon: TramFront,
				items: [...getItemsByTypologie(10), ...getItemsByTypologie(20)],
				size: 'lg'
			},
			{
				title: 'Lignes urbaines',
				items: getItemsByTypologie(30),
				size: 'md'
			},
			{
				title: 'Lignes complémentaires',
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
