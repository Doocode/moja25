import type { Link } from './shared';
import { House, Bike, Menu, BusFront } from '@lucide/svelte';

// Items
const homePage = { href: '/', label: 'Accueil', icon: House };
const velocitePage = { href: '/velocite', label: 'Vélocité', icon: Bike };
const ginkoPage = { href: '/ginko', label: 'Bus & tram', icon: BusFront };
//const settingsPage = { href: '/settings', label: 'Paramètres', icon: Bolt };
const menuPage = { href: '/menu', label: 'Menu', icon: Menu };

// Menu links
export const topBarLinks: Link[] = [ginkoPage, velocitePage]; // Warning: never put more than 3 items here
export const bottomBarLinks: Link[] = [homePage, ginkoPage, velocitePage, menuPage]; // Warning: never put more than 5 items here
