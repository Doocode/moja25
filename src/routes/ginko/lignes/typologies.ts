import { Bus, BusFront, Leaf, TramFront } from '@lucide/svelte';
import { type Component } from 'svelte';

export interface Typologie {
	label: string;
	icon: Component;
	value: number;
}

export const typologies: Typologie[] = [
	{
		label: 'Tramway',
		icon: TramFront,
		value: 10
	},
	{
		label: 'Lianes',
		icon: Leaf,
		value: 20
	},
	{
		label: 'Lignes urbaines',
		icon: BusFront,
		value: 30
	},
	{
		label: 'Lignes complémentaires',
		icon: BusFront,
		value: 40
	},
	{
		label: 'Lignes périurbaines',
		icon: Bus,
		value: 50
	},
	{
		label: 'Lignes scolaires',
		icon: Bus,
		value: 60
	},
	{
		label: 'Services à la demande',
		icon: Bus,
		value: 70
	},
	{
		label: 'Autre',
		icon: Bus,
		value: 80
	}
];
