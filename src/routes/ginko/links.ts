import type { Link } from '$lib/ui/header/shared';
import { Search, BusFront, Map, Info } from '@lucide/svelte';

export interface GinkoLink extends Link {
	description?: string;
}

// Items
const mapsPage: GinkoLink = {
	href: '/ginko/carte',
	label: 'Plan du réseau',
	icon: Map,
	description: 'Repérer les stations et des lignes du réseau sur une carte interactive'
};
const searchPage: GinkoLink = {
	href: '/ginko/recherche',
	label: 'Rechercher une station',
	icon: Search,
	description: 'Rechercher une station de bus ou de tram'
};
const linesPage: GinkoLink = {
	href: '/ginko/lignes',
	label: 'Lignes du réseau',
	icon: BusFront,
	description: 'Liste des lignes de bus et tram'
};
const infoPage: GinkoLink = {
	href: '/ginko/infos-trafic',
	label: 'Infos trafic',
	icon: Info,
	description: 'Suivre les perturbations et les infos du réseau'
};

// Header links
export const headerLinks: GinkoLink[] = [searchPage, mapsPage, linesPage, infoPage];

// Home page links
export const mainLinks: GinkoLink[] = [mapsPage, linesPage, searchPage, infoPage];
