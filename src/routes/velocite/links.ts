import type { Link } from '#lib/ui/header/shared.ts';
import { Search, Map } from '@lucide/svelte';

export const headerLinks: Link[] = [
	{ href: '/velocite/carte', label: 'Carte des stations', icon: Map },
	{ href: '/velocite/recherche', label: 'Rechercher une station', icon: Search }
];
