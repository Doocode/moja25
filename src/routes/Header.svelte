<script lang="ts">
	import favicon from '$assets/favicon.svg';
	import DarkModeToggle from './lib/DarkModeToggle.svelte';
	import type { Component } from 'svelte';
	import { Bike, House } from '@lucide/svelte';
	import { page } from '$app/state';

	interface Link {
		href: string;
		label: string;
		icon: Component;
		highlightOnSubpage?: boolean;
	}

	let links: Link[] = [
		{
			href: '/',
			label: 'Accueil',
			icon: House
		},
		{
			href: '/velocite',
			label: 'Vélocité',
			icon: Bike,
			highlightOnSubpage: true
		}
	];
</script>

<header class="bg-primary text-primary-foreground">
	<div class="container m-auto flex items-center justify-between p-4">
		<a href="/" class="flex flex-1 items-center gap-2">
			<img src={favicon} alt="Logo de Moja Besançon" class="h-8" />
			<h1 class="text-3xl font-bold hover:underline">Moja <span class="sr-only">Besançon</span></h1>
		</a>

		<nav class="flex flex-2 items-center justify-center">
			<ul class="flex items-center justify-center gap-0.5">
				{#each links as { href, label, icon, highlightOnSubpage } (href)}
					{@const Icon = icon}
					<li>
						<a
							{href}
							class={{
								'flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent/50 hover:text-accent-foreground': true,
								'bg-accent text-accent-foreground':
									href === page.url.pathname ||
									(highlightOnSubpage && page.url.pathname.startsWith(href))
							}}
						>
							<Icon class="size-5" />
							<span>{label}</span>
						</a>
					</li>
				{/each}
			</ul>
		</nav>

		<div class="flex flex-1 justify-end">
			<DarkModeToggle />
		</div>
	</div>
</header>
