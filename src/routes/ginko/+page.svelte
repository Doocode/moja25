<script lang="ts">
	import Hero from './Hero.svelte';
	import { resolve } from '$app/paths';
	import { mainLinks } from './links';
	import { BusFront } from '@lucide/svelte';
</script>

<svelte:head>
	<title>Bus & tram de Besançon</title>
</svelte:head>

<Hero />

<main class="mx-auto mt-8 max-w-6xl px-4 pb-22 sm:mt-4 sm:px-6">
	<section aria-labelledby="explore-title">
		<div class="mb-6 flex items-center gap-2 sm:mb-8">
			<BusFront class="size-8 text-sky-700 dark:text-sky-300" />
			<h2 id="explore-title" class="text-2xl font-black tracking-tight sm:text-3xl">
				Se déplacer
				<span
					class="ml-1 hidden tracking-normal text-sky-700 sm:inline sm:font-light dark:text-sky-300"
				>
					à Besançon
				</span>
			</h2>
		</div>

		<ul class="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
			{#each mainLinks as link (link.href)}
				<li>
					<a
						href={resolve(link.href)}
						class="group flex h-full min-h-52 flex-col rounded-4xl border-5 border-border/20 bg-card p-5 shadow-sm transition duration-200 hover:border-sky-500/50 hover:shadow-lg hover:shadow-sky-950/5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
					>
						<div class="flex items-start justify-between">
							{#if link.icon}
								{@const Icon = link.icon}
								<span
									class="flex items-center justify-center rounded-lg bg-sky-200 p-4 text-sky-800 transition group-hover:bg-sky-600 group-hover:text-white dark:bg-sky-900 dark:text-sky-200 dark:group-hover:bg-sky-500 dark:group-hover:text-slate-950"
								>
									<Icon class="size-7 lg:size-20" aria-hidden="true" />
								</span>
							{/if}
						</div>
						<strong class="mt-6 text-base font-semibold">{link.label}</strong>
						{#if link.description}
							<span class="mt-2 text-sm text-muted-foreground">
								{link.description}
							</span>
						{/if}
					</a>
				</li>
			{/each}
		</ul>
	</section>
</main>
