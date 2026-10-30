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
	description: 'Emplacement des stations et trajets des lignes'
};
const searchPage: GinkoLink = {
	href: '/ginko/recherche',
	label: 'Rechercher une station',
	icon: Search,
	description: 'Rechercher une station de bus ou de tram'
};
const linesPage: GinkoLink = {
	href: '/ginko/lignes',
	label: 'Lignes',
	icon: BusFront,
	description: 'Liste des lignes de bus et tram'
};
const infoPage: GinkoLink = {
	href: '/ginko/etat-du-service/messages',
	label: 'Etat du service',
	icon: Info,
	description: 'Informations sur les trajets et les stations'
};

// Menu links
export const mainLinks: GinkoLink[] = [searchPage, mapsPage, linesPage, infoPage];
