<script lang="ts">
	import { cn } from '$lib/utils';
	import type { Link } from './shared';
	import { resolve } from '$app/paths';
	import type { Component } from 'svelte';
	import { isCurrent } from '$lib/ui/header/shared';

	interface Props {
		links: Link[];
		heading: string;
		headingHref?: string;
		icon?: Component;
		class?: string;
	}

	let { links, heading, headingHref, icon, class: className }: Props = $props();
</script>

<header
	class={cn(
		'overflow-auto border-b border-[#00000077] bg-purple-300 whitespace-nowrap dark:border-[#ffffff77] dark:bg-purple-800',
		className
	)}
>
	<div class="container m-auto flex items-center gap-4">
		<h1 class="min-w-50 text-2xl font-black">
			<a
				href={resolve(headingHref ?? '/')}
				class="flex items-center gap-2 p-4 underline-offset-4 hover:underline sm:py-6"
			>
				{#if icon}
					{@const Icon = icon}
					<Icon class="size-7" />
				{/if}
				<span>{heading}</span>
			</a>
		</h1>

		<nav class="flex flex-2 gap-1 pr-4">
			{#each links as { href, label, icon } (icon)}
				{#if icon !== null}
					{@const Icon = icon}
					<a
						href={resolve(href)}
						class={{
							'flex items-center gap-1.5 rounded-lg px-3.25 py-2.5 hover:bg-foreground/25 hover:text-foreground': true,
							'bg-background text-foreground': isCurrent(href)
						}}
					>
						<Icon class="size-5" />
						<span class="text-sm">
							{label}
						</span>
					</a>
				{/if}
			{/each}
		</nav>
	</div>
</header>
