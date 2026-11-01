<script lang="ts">
	import { resolve } from '$app/paths';
	import { ArrowRight, BusFront, Search } from '@lucide/svelte';

	const messages = [
		'Tous vos trajets commencent ici.',
		'Tous les routes mènent à Besançon.',
		'Accrochez-vous, le voyage commence!'
		/*'En tram, en bus, en liane ou à vélo ?',
		'Victor Hugo a été aperçu dans le tram',
		'Colette se cache à la Gare Viotte'*/
	];

	let currentMessage = $derived.by(() => messages[Math.floor(Math.random() * messages.length)]);
</script>

<div class="container m-auto sm:p-4 md:py-8 lg:py-12">
	<header
		aria-labelledby="hero-title"
		class="relative overflow-clip bg-linear-to-br from-sky-400 via-cyan-400 to-teal-300 p-6 text-black shadow-xl shadow-cyan-900/20 sm:rounded-[2rem] md:p-10 lg:p-12 dark:shadow-cyan-300/20"
	>
		<div
			class="bg-image absolute top-0 right-0 left-0 h-60 bg-background lg:bottom-0 lg:left-auto lg:h-auto lg:w-160 xl:w-200 2xl:w-260"
		></div>

		<div class="relative max-w-xl">
			<div class="spacer h-50 lg:hidden"></div>

			<p class="mb-4 flex items-center gap-2 text-2xl font-medium md:mb-8">
				<BusFront class="size-7" />
				<span>Bus & tram</span>
			</p>

			<p class="text-3xl leading-tight font-black text-balance sm:text-6xl">
				{currentMessage}
			</p>
			<p class="mt-2 max-w-lg text-sm text-balance sm:mt-5 sm:text-lg">
				Retrouvez ici des outils pour faciliter vos déplacements sur le réseau Ginko.
			</p>

			<!-- TODO: Put a real Searchbar -->
			<a
				href={resolve('/ginko/recherche')}
				class="mt-6 flex max-w-100 items-center gap-3 rounded-full bg-background px-5 py-3 text-foreground shadow-lg shadow-slate-900/15 transition hover:bg-background/80 focus-visible:outline-4 focus-visible:outline-offset-6 focus-visible:outline-slate-950 md:px-6 md:py-5 lg:mt-8 lg:max-w-120"
			>
				<Search class="size-5" aria-hidden="true" />
				<span class="flex-1">Rechercher <span class="hidden sm:inline">une station</span></span>
				<ArrowRight class="size-5" aria-hidden="true" />
			</a>
		</div>
	</header>
</div>

<style>
	.bg-image {
		mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 1) 70%, rgba(0, 0, 0, 0));
		background-image: url('/assets/ginko-root-hero.webp');
		background-size: cover;
		background-position: center;
	}

	@media (min-width: 1024px) {
		.bg-image {
			mask-image: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1) 50%);
		}
	}

	@media (min-width: 1280px) {
		.bg-image {
			mask-image: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1) 20%);
		}
	}
</style>
