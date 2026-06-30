<script lang="ts">
	import { MapPinned, MapPin } from '@lucide/svelte';
	import {
		DropdownMenu,
		DropdownMenuContent,
		DropdownMenuItem,
		DropdownMenuLabel,
		DropdownMenuSeparator,
		DropdownMenuTrigger
	} from '$shadcn/dropdown-menu';
	import { buttonVariants } from '$shadcn/button';
	import type { Arret } from '$lib/core/dto/ginko';

	interface Props {
		station: Arret;
	}

	let { station }: Props = $props();

	const mapLinks = $derived.by(() => {
		const lat = station.latitude;
		const lon = station.longitude;
		const name = encodeURIComponent(station.nom);

		return [
			{
				label: 'Google Maps',
				url: `https://www.google.com/maps/search/?api=1&query=${lat},${lon}`
			},
			{
				label: 'Bing Maps',
				url: `https://www.bing.com/maps?cp=${lat}~${lon}&lvl=17`
			},
			{
				label: 'Apple Plans',
				url: `https://maps.apple.com/?ll=${lat},${lon}&q=${name}`
			},
			{
				label: 'HERE WeGo',
				url: `https://share.here.com/l/${lat},${lon},${name}?z=17.0&t=normal`
			},
			{
				label: 'OpenStreetMap',
				url: `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lon}#map=17/${lat}/${lon}`
			}
		];
	});

	function openMap(url: string) {
		window.open(url, '_blank', 'noopener,noreferrer');
	}
</script>

<DropdownMenu>
	<DropdownMenuTrigger class={buttonVariants({ variant: 'outline', size: 'icon' })}>
		<MapPin class="size-5" />
		<span class="sr-only">Voir sur la carte</span>
	</DropdownMenuTrigger>
	<DropdownMenuContent align="end" class="w-56">
		<DropdownMenuLabel class="flex items-center gap-2">
			<MapPinned class="size-4" />
			Ouvrir dans une carte
		</DropdownMenuLabel>
		<DropdownMenuSeparator />
		{#each mapLinks as mapLink (mapLink.label)}
			<DropdownMenuItem onclick={() => openMap(mapLink.url)}>{mapLink.label}</DropdownMenuItem>
		{/each}
	</DropdownMenuContent>
</DropdownMenu>
