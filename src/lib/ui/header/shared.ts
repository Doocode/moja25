import { page } from '$app/state';
import { resolve } from '$app/paths';
import type { Path, RouteId } from '$app/types';
import type { Component } from 'svelte';

export type StaticRouteId = Exclude<RouteId, `${string}[${string}]${string}`>;
type LinkHref = StaticRouteId | '/menu';

// Link interface for navbar items
export interface Link {
	href: LinkHref;
	label: string;
	icon: Component;
}

export function resolveLink(href: LinkHref): string {
	if (href === '/menu') return href;
	return resolve(href.slice(1) as Path);
}

// Check if provided path is the current page
export function isCurrent(href: string): boolean {
	return (
		page.url.pathname === href || // Exact match
		(page.url.pathname.startsWith(href + '/') && href !== '/')
	); // Subpath match (excluding root path)
}
