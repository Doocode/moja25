import { page } from '$app/state';
import type { Component } from 'svelte';

// Link interface for navbar items
export interface Link {
	href: string;
	label: string;
	icon: Component;
}

// Check if provided path is the current page
export function isCurrent(href: string): boolean {
	return (
		page.url.pathname === href || // Exact match
		(page.url.pathname.startsWith(href + '/') && href !== '/')
	); // Subpath match (excluding root path)
}
