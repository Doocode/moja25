<script>
	import Hero from './Hero.svelte';
	import { resolve } from '$app/paths';
	import { Ul, Li } from '#lib/ui/page/index.ts';
	import { Button } from '#shadcn/button/index.ts';
	import TilesBlock from './TilesBlock.svelte';
	import { Map, Bike, Globe, SquareArrowOutUpRight } from '@lucide/svelte';
</script>

<svelte:head>
	<title>Vélocité</title>
</svelte:head>

<Hero />

<main class="mx-auto max-w-6xl px-4 pt-8 pb-22 sm:px-6 sm:pt-4">
	<TilesBlock />

	<article class="container m-auto hidden p-4">
		<p>
			Découvrez le réseau <strong class="font-bold">Ginko Vélocité</strong>, le service de vélos en
			libre-service de Besançon.
		</p>

		<Ul class="my-4">
			<Li>200 vélos à votre disposition</Li>
			<Li>Dont la moitié en assistance électrique</Li>
			<Li>Plus de 30 stations réparties dans toute la ville</Li>
			<Li>Des stations accessibles 24h/24 et 7j/7</Li>
		</Ul>

		<nav class="flex flex-wrap items-start gap-0.5">
			<Button href={resolve('velocite/recherche')}
				><Bike /> <span>Rechercher une station</span></Button
			>

			<Button href={resolve('velocite/carte')} variant="secondary"
				><Map /> <span>Voir le plan des stations</span></Button
			>

			<Button
				href="https://velocite.ginko.voyage/fr/home"
				variant="link"
				target="_blank"
				rel="noopener noreferrer"
			>
				<Globe />
				<span>Accéder au site web officiel</span>
				<SquareArrowOutUpRight />
			</Button>
		</nav>
	</article>
</main>
