<script lang="ts">
	import { resolve } from '$app/paths';
	import type { Component } from 'svelte';

	interface Props {
		icon: Component;
		title: string;
		description: string;
		href: string;
		lightImg: string;
		darkImg: string;
		bgSize?: 'cover' | 'contain';
	}

	let { icon, title, description, href, lightImg, darkImg, bgSize = 'cover' }: Props = $props();
</script>

<li>
	<a
		href={resolve(href)}
		class="group flex flex-col items-start overflow-clip rounded-2xl bg-purple-100 transition hover:bg-purple-200 hover:shadow-lg hover:shadow-purple-700/20 dark:bg-purple-950 dark:hover:bg-purple-900 dark:hover:shadow-purple-300/20"
	>
		<div
			class="bg-img h-75 w-full bg-background bg-center bg-no-repeat sm:aspect-square sm:h-auto"
			class:bg-cover={bgSize === 'cover'}
			class:bg-contain={bgSize === 'contain'}
			style:--bg_light={`url(${lightImg})`}
			style:--bg_dark={`url(${darkImg})`}
		></div>
		<div
			class="-mt-12 ml-4 w-auto rounded-xl bg-purple-200 p-4 text-purple-800 transition group-hover:bg-background! group-hover:shadow-lg group-hover:shadow-purple-700/20 md:ml-6 md:rounded-2xl dark:bg-purple-900 dark:text-purple-200 dark:group-hover:shadow-purple-300/20"
		>
			{#if icon !== null}
				{@const Icon = icon}
				<Icon class="size-7 md:size-8" />
			{/if}
		</div>
		<div class="p-4 md:-mt-2 md:p-6">
			<h3 class="mb-2 font-semibold text-purple-700 dark:text-purple-300">{title}</h3>
			<p class="text-sm text-balance">{description}</p>
		</div>
	</a>
</li>

<style>
	.bg-img {
		background-image: var(--bg_light);
	}
	:root.dark {
		.bg-img {
			background-image: var(--bg_dark, '/assets/velocite/tiles/map-markers-light.png');
		}
	}
</style>
