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
		sticky?: boolean;
	}

	let { links, heading, headingHref, icon, class: className, sticky = false }: Props = $props();
</script>

<header
	class={cn(
		'overflow-auto border-b border-[#00000077] bg-purple-300 whitespace-nowrap dark:border-[#ffffff77] dark:bg-purple-800',
		sticky ? 'sticky top-0 right-0 left-0 z-50' : '',
		className
	)}
>
	<div class="container m-auto flex items-center gap-4">
		<h1 class="min-w-50 text-2xl font-black">
			<a
				href={resolve(headingHref ?? '/')}
				class="flex items-center gap-2 p-4 py-3.5 underline-offset-4 hover:underline"
			>
				{#if icon}
					{@const Icon = icon}
					<Icon class="size-7" />
				{/if}
				<span>{heading}</span>
			</a>
		</h1>

		<nav class="flex flex-2 pr-4">
			{#each links as { href, label, icon } (icon)}
				{#if icon !== null}
					{@const Icon = icon}
					<a
						href={resolve(href)}
						class={{
							'px-3.25 duration-100 hover:bg-background/50 hover:text-foreground dark:hover:bg-background/25': true,
							'bg-linear-to-r from-transparent via-background/50 to-transparent hover:bg-none dark:via-foreground/20':
								isCurrent(href)
						}}
					>
						<span
							class={{
								'flex items-center gap-1.5 border-y-5 border-transparent py-4 duration-100 md:py-5.5': true,
								'border-b-foreground!': isCurrent(href),
								'opacity-70 hover:opacity-100': !isCurrent(href)
							}}
						>
							<Icon class="size-4.5" />
							<span class="text-sm">
								{label}
							</span>
						</span>
					</a>
				{/if}
			{/each}
		</nav>
	</div>
</header>
