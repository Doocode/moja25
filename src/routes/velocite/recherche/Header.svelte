<script lang="ts">
	import AnimatedGridBg from '$lib/ui/AnimatedGridBg.svelte';
	import { DatabaseSearch, TextSearch, Search } from '@lucide/svelte';
	import { SearchBar } from '../shared/ui/tool-bar';

	interface Props {
		queryInput?: string;
	}

	let { queryInput = $bindable('') }: Props = $props();

	const colors = ['#800657', '#733e0a', '#106803', '#1b75a4', '#4c05a2', '#9c0800'];
	const randomColor = $derived(colors[Math.floor(Math.random() * colors.length)]);
</script>

<header
	class="relative overflow-clip bg-[#f59bd7] dark:bg-[#bb1985]"
	style:--gradient-color={randomColor}
>
	<div class="gradient">
		<AnimatedGridBg spacing="46px" class="border-b border-[#00000077] dark:border-[#ffffff77]">
			<div class="container m-auto max-w-lg p-4 text-center md:py-8 lg:py-10">
				<div class="icons mb-4 grid place-items-center text-white sm:mb-8" aria-hidden="true">
					<span class="icon"><Search class="size-20 lg:size-25" stroke-width={1} /></span>
					<span class="icon"><DatabaseSearch class="size-20 lg:size-25" stroke-width={1} /></span>
					<span class="icon"><TextSearch class="size-20 lg:size-25" stroke-width={1} /></span>
				</div>

				<h1
					class="heading-font mb-2 text-2xl font-bold text-balance text-white lg:text-2xl xl:mb-4 xl:text-4xl xl:font-light"
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
	</div>
</header>

<style>
	header::before {
		--gradient-color: #800657;
		background: url('/assets/velocite/search.webp');
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		position: absolute;
		inset: 0;
		content: '';
		animation: image-animation 1.75s normal forwards ease-in-out;
	}

	header .gradient {
		background: radial-gradient(circle farthest-side, var(--gradient-color) 30%, #ffffff00 90%);
		background-size: 1300px;
		background-position: center;
		background-repeat: no-repeat;
		animation: gradient-animation 2s normal forwards ease-in-out;
		position: relative;
	}

	.icon {
		grid-area: 1 / 1;
		opacity: 0;
		animation: icon-cycle 6s infinite ease-in-out;
	}

	.icon:nth-child(2) {
		animation-delay: 2s;
	}

	.icon:nth-child(3) {
		animation-delay: 4s;
	}

	@keyframes icon-cycle {
		0% {
			opacity: 0;
			transform: scale(0.6);
		}
		6%,
		27% {
			opacity: 1;
			transform: scale(1);
		}
		33.33%,
		100% {
			opacity: 0;
			transform: scale(1.4);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.icon,
		header::before,
		header .gradient {
			animation: none;
		}

		.icon:first-child {
			opacity: 1;
		}
	}

	@keyframes gradient-animation {
		from {
			background-size: 5300px;
		}
		to {
			background-size: 1300px;
		}
	}

	@keyframes image-animation {
		from {
			transform: scale(2);
		}
		to {
			transform: scale(1);
		}
	}
</style>
