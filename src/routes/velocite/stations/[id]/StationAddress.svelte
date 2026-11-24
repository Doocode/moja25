<script lang="ts">
	import type { FormattedStation } from '$core/dto/jcdecaux';
	import { cn } from '#lib/utils.js';

	import GoogleLogo from '$assets/logo/google-maps.png';
	import BingLogo from '$assets/logo/bing-maps.png';
	import AppleLogo from '$assets/logo/apple-maps.png';
	import OpenStreetMapLogo from '$assets/logo/osm.png';
	import HereWeGoLogo from '$assets/logo/here-maps.png';
	import WazeLogo from '$assets/logo/waze.png';

	interface Props {
		station: FormattedStation;
		class?: string;
	}

	let { station, class: className }: Props = $props();

	interface MapApp {
		logo: string;
		name: string;
		url: string;
	}

	let apps: MapApp[] = $derived([
		{
			name: 'Google Maps',
			url: `https://www.google.com/maps/search/?api=1&query=${station.position.latitude},${station.position.longitude}`,
			logo: GoogleLogo
		},
		{
			name: 'Bing Maps',
			url: `https://www.bing.com/maps?sp=point.${station.position.latitude}_${station.position.longitude}_${encodeURIComponent(station.name || 'Station')}&lvl=15`,
			logo: BingLogo
		},
		{
			name: 'Apple Maps',
			url: `https://maps.apple.com/?ll=${station.position.latitude},${station.position.longitude}&q=${encodeURIComponent(station.name || 'Station')}`,
			logo: AppleLogo
		},
		{
			name: 'Open Street Map',
			url: `https://www.openstreetmap.org/?mlat=${station.position.latitude}&mlon=${station.position.longitude}#map=15/${station.position.latitude}/${station.position.longitude}`,
			logo: OpenStreetMapLogo
		},
		{
			name: 'Here WeGo', // Path not working correctly
			url: `https://wego.here.com/search/${station.position.latitude},${station.position.longitude}`,
			logo: HereWeGoLogo
		},
		{
			name: 'Waze',
			url: `https://www.waze.com/ul?ll=${station.position.latitude},${station.position.longitude}&navigate=no`,
			logo: WazeLogo
		}
	]);
</script>

<div title="Emplacement" class={cn(className)}>
	<h2 class="mt-2 mb-0.5 text-lg font-bold">Emplacement</h2>
	<p class="text-sm text-muted-foreground">{station.address}</p>

	<div class="mt-4 grid">
		<p class="font-semibold">Voir sur une carte</p>
		<nav class="mt-2 flex gap-4 overflow-auto px-4 md:flex-wrap md:gap-x-8">
			{#each apps as app (app.name)}
				<a href={app.url} target="_blank" class="group flex flex-col items-center gap-1 rounded-md">
					<img src={app.logo} alt={'Logo de ' + app.name} class="size-20 shrink-0 rounded-[25%]" />
					<span
						class="w-20 text-xs wrap-normal underline-offset-3 group-hover:text-primary group-hover:underline"
						>{app.name}</span
					>
				</a>
			{/each}
		</nav>
	</div>
</div>
