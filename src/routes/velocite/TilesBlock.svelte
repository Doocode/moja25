<script lang="ts">
	import { Bike, ChartPie, Map, Search } from '@lucide/svelte';
	import TileItem from './TileItem.svelte';
</script>

<section aria-labelledby="explore-title">
	<div class="mb-6 flex items-center gap-2 sm:mb-8">
		<Bike class="size-8 text-pink-700 dark:text-pink-300" />
		<h2 id="explore-title" class="text-2xl font-black tracking-tight sm:text-3xl">
			Se déplacer
			<span
				class="ml-1 hidden tracking-normal text-pink-700 sm:inline sm:font-light dark:text-pink-300"
			>
				en Vélocité
			</span>
		</h2>
	</div>

	<ul class="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
		<TileItem
			icon={Map}
			title="Plan des stations"
			description="Consulter la carte pour retrouver une station à proximité"
			href="/velocite/carte"
			lightImg="/assets/velocite/tiles/map-markers-light.png"
			darkImg="/assets/velocite/tiles/map-markers-dark.png"
		/>
		<TileItem
			icon={Search}
			title="Rechercher une station"
			description="Trouvez rapidement une station, ou triez en fonction de la disponibilité des vélos"
			href="/velocite/recherche"
			lightImg="/assets/velocite/tiles/search-light.png"
			darkImg="/assets/velocite/tiles/search-dark.png"
			bgSize="contain"
		/>
		<TileItem
			icon={ChartPie}
			title="Récapitulatif de la station"
			description="Visualisez la répartition des vélos et des places en un coup d'œil"
			href="/velocite/stations/1"
			lightImg="/assets/velocite/tiles/station-recap-light.png"
			darkImg="/assets/velocite/tiles/station-recap-dark.png"
			bgSize="contain"
		/>
		<TileItem
			icon={Search}
			title="Aperçu rapide"
			description="Obtenez un aperçu rapide d'une station en un clic sur la carte"
			href="/velocite/carte"
			lightImg="/assets/velocite/tiles/map-popup-light.png"
			darkImg="/assets/velocite/tiles/map-popup-dark.png"
		/>
	</ul>
</section>
