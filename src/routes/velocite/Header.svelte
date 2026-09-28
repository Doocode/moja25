<script lang="ts">
	import type { Link } from '$lib/ui/header/shared';
	import { House, Bike, MapPin } from '@lucide/svelte';
	import { resolve } from '$app/paths';
	import { page } from '$app/stores';

	const links: Link[] = [
		{ href: resolve('/velocite'), label: 'Accueil', icon: House },
		{ href: '/velocite/map', label: 'Carte', icon: MapPin },
		{ href: '/velocite/stations', label: 'Stations', icon: Bike }
	];
</script>

<header class="bg-linear-to-b from-[#91bdff] to-[#589bff] dark:from-[#0e3877] dark:to-[#038de4]">
	<div class="container m-auto flex h-50 items-center justify-center gap-4 p-4">
		<Bike class="size-14 lg:size-25" />
		<h1 class="text-3xl font-bold lg:text-5xl">Vélocité</h1>
	</div>

	<nav class="container m-auto overflow-auto px-2 whitespace-nowrap sm:px-0">
		<ul class="flex items-center gap-1">
			{#each links as { href, label, icon } (icon)}
				<li>
					<a
						{href}
						class={{
							'flex items-center gap-2 rounded-t-lg px-4 py-3  transition-colors duration-200 hover:bg-background/40': true,
							'bg-background': $page.url.pathname === href
						}}
					>
						{#if icon}
							{@const Icon = icon}
							<Icon class="size-5" />
						{/if}
						{label}
					</a>
				</li>
			{/each}
		</ul>
	</nav>
</header>
