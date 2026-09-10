import type { Link } from './shared';
import { House, Bike, MapPin, Bolt, Menu } from '@lucide/svelte';

// Items
const homePage = { href: '/', label: 'Accueil', icon: House };
const velocitePage = { href: '/velocite', label: 'Vélocité', icon: Bike };
const mapsPage = { href: '/velocite/map', label: 'Cartes', icon: MapPin };
const settingsPage = { href: '/settings', label: 'Paramètres', icon: Bolt };
const menuPage = { href: '/menu', label: 'Menu', icon: Menu };

// Menu links
export const topBarLinks: Link[] = [velocitePage, mapsPage, settingsPage]; // Warning: never put more than 3 items here
export const bottomBarLinks: Link[] = [homePage, velocitePage, mapsPage, settingsPage, menuPage]; // Warning: never put more than 5 items here
