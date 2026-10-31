<script lang="ts">
	import type { Link } from '$lib/ui/header/shared';
	import { Search, Map, Bike } from '@lucide/svelte';
	import DomainHeader from '$lib/ui/header/DomainHeader.svelte';

	const links: Link[] = [
		{ href: '/velocite/carte', label: 'Carte des stations', icon: Map },
		{ href: '/velocite/recherche', label: 'Rechercher une station', icon: Search }
	];
</script>

<DomainHeader
	class="bg-[#ff9add] dark:bg-[#b7007a]"
	{links}
	icon={Bike}
	heading="Vélocité"
	headingHref="/velocite"
/>
