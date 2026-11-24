<script lang="ts">
	import { Database } from '@lucide/svelte';
	import BigLink from './BigLink.svelte';
	import { Li, Ul } from '#lib/ui/page/index.ts';
</script>

<svelte:head>
	<title>À propos des données - Ginko</title>
</svelte:head>

<main class="container mx-auto max-w-4xl px-4 py-8 pb-22 sm:px-6 sm:py-12">
	<header class="mb-10">
		<h1 class="text-3xl font-black tracking-tight sm:text-4xl">À propos de</h1>
	</header>

	<div class="space-y-8">
		<section>
			<p class="text-sm text-muted-foreground">
				Ce site web n'est ni affilié, ni géré par Ginko ou le Grand Besançon Métropole. Cependant,
				il utilise les données disponibles en open data, communiquées par l'autorité organisatrice
				des mobilités.
			</p>
		</section>
		<section
			aria-labelledby="sources-title"
			class="border-border/60 shadow-sm md:rounded-3xl md:border md:bg-card md:p-8 lg:p-10"
		>
			<div class="mb-4 flex items-center gap-3 text-sky-700 dark:text-sky-300">
				<Database class="size-6" />
				<h2 id="sources-title" class="text-xl font-bold">Sources des données</h2>
			</div>
			<p class="text-sm leading-relaxed">
				Les informations présentées dans cet espace "Bus & tram" proviennent de l'API du réseau
				Ginko, le réseau de transport du Grand Besançon Métropole. La collectivité met ces données à
				disposition gratuitement en open data.
			</p>

			<p class="mt-8 text-sm leading-relaxed">
				Les données de l'API Ginko permettent d'obtenir plusieurs informations sur le réseau de
				transport, telles que :
			</p>
			<Ul class="mt-2 pl-7 text-sm">
				<Li class="before:-left-7 before:w-3.5">
					Les <strong class="text-primary">temps d'attente en temps réel</strong>, le niveau de
					l'affluence ;
				</Li>
				<Li class="before:-left-7 before:w-3.5">
					Les <strong class="text-primary">itinéraires des lignes</strong> ainsi que leur mode de transport
					;
				</Li>
				<Li class="before:-left-7 before:w-3.5">
					La <strong class="text-primary">liste des stations</strong> avec leurs emplacements, numéro
					de quai et les lignes qui y passent ;
				</Li>
				<Li class="before:-left-7 before:w-3.5">
					Les <strong class="text-primary">informations sur le trafic</strong> (perturbations, incidents,
					évolutions, etc.).
				</Li>
				<Li class="before:-left-7 before:w-3.5">
					Les <strong class="text-primary">titres de transport</strong> mis en vente sur le réseau.
				</Li>
			</Ul>

			<p class="mt-8 text-sm text-muted-foreground">Pour plus d'informations, consultez :</p>
			<BigLink
				newTab
				href="https://api.ginko.voyage/#prez"
				title="L'API Ginko (api.ginko.voyage)"
				legend="Présentation technique de l'API (documentation destinée aux développeurs)."
			/>
			<BigLink
				newTab
				href="https://transport.data.gouv.fr/datasets/gtfs-et-siri-du-reseau-ginko-besancon-lignes-urbaines-et-periurbaines"
				title="Jeux de données (transport.data.gouv.fr)"
				legend="Liens de téléchargement des données GTFS et SIRI du réseau Ginko."
			/>
		</section>
	</div>
</main>
