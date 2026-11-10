<script lang="ts">
	import { resolve } from '$app/paths';
	import { isCurrent } from './shared';
	import { bottomBarLinks } from './links';
</script>

<nav
	class="bottom-navbar fixed inset-[auto_0_0] z-100 m-auto grid bg-card md:hidden"
	class:grid-cols-3={bottomBarLinks.length === 3}
	class:grid-cols-4={bottomBarLinks.length === 4}
	class:grid-cols-5={bottomBarLinks.length === 5}
>
	{#each bottomBarLinks as { href, label, icon } (icon)}
		{#if icon !== null}
			{@const Icon = icon}
			<a
				href={resolve(href as Parameters<typeof resolve>[0])}
				class="grid flex-1 place-items-center items-center justify-center gap-1 border-b-3 px-1 py-3 text-center text-inherit focus-within:inset-ring-4 focus-within:inset-ring-primary/70 hover:bg-primary/20 focus:outline-0 dark:border-neutral-800"
				class:border-b-primary!={isCurrent(href)}
			>
				<Icon />
				<span class="m-0 w-full overflow-hidden text-xs font-light text-ellipsis whitespace-nowrap">
					{label}
				</span>
			</a>
		{/if}
	{/each}
</nav>

<style>
	nav {
		box-shadow:
			0 0 0 1px #00000022,
			0 0 15px #00000022;
	}
</style>
