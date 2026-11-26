import type { Link } from './shared';
import { House, Bike, Menu, BusFront } from '@lucide/svelte';

// Items
const homePage: Link = { href: '/', label: 'Accueil', icon: House };
const velocitePage: Link = { href: '/velocite', label: 'Vélocité', icon: Bike };
const ginkoPage: Link = { href: '/ginko', label: 'Bus & tram', icon: BusFront };
//const settingsPage = { href: '/settings', label: 'Paramètres', icon: Bolt };
const menuPage: Link = { href: '/menu', label: 'Menu', icon: Menu };

// Menu links
export const topBarLinks: Link[] = [ginkoPage, velocitePage]; // Warning: never put more than 3 items here
export const menuHubLinks: Link[] = [homePage, ginkoPage, velocitePage]; // Warning: never put more than 3 items here (links for the /menu page)
export const bottomBarLinks: Link[] = [homePage, ginkoPage, velocitePage, menuPage]; // Warning: never put more than 5 items here
