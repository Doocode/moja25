<script lang="ts">
	import AnimatedGridBg from '$lib/ui/AnimatedGridBg.svelte';
	import { DatabaseSearch, TextSearch, Search } from '@lucide/svelte';
	import { SearchBar } from '../shared/ui/tool-bar';

	interface Props {
		queryInput?: string;
	}

	let { queryInput = $bindable('') }: Props = $props();
</script>

<header class="border-b border-[#00000077] bg-[#f59bd7] dark:border-[#ffffff77] dark:bg-[#bb1985]">
	<AnimatedGridBg spacing="46px">
		<div class="container m-auto max-w-lg p-4 md:py-8 lg:py-10">
			<div class="icons mb-4 flex gap-2 text-white sm:mb-8">
				<Search class="size-20 lg:size-25" stroke-width={1} />
				<DatabaseSearch class="size-20 lg:size-25" stroke-width={1} />
				<TextSearch class="size-20 lg:size-25" stroke-width={1} />
			</div>

			<h1
				class="heading-font text-2xl font-bold text-balance text-white lg:text-2xl xl:mb-4 xl:text-4xl xl:font-light"
			>
				Rechercher une station Vélocité
			</h1>
			<p class="mb-4 text-sm text-balance text-white">
				Retrouvez-la ici à partir de son nom ou de son emplacement.
			</p>

			<div class="rounded-lg backdrop-blur-2xl">
				<SearchBar
					bind:value={queryInput}
					class="rounded-lg bg-background/70 dark:bg-background/20"
				/>
			</div>
		</div>
	</AnimatedGridBg>
</header>

<style>
	header {
		background:
			radial-gradient(circle, #800657 30%, #bb198577),
			url('https://velocite.ginko.voyage/assets/img/newscast/bandeau-actualites.png');
		background-size: cover;
		background-position: center;
	}
</style>
