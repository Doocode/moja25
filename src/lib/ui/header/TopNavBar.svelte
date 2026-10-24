<script lang="ts">
	import { resolve } from '$app/paths';
	import { topBarLinks } from './links';
	import { isCurrent } from './shared';
</script>

<nav class="hidden gap-1 md:flex">
	{#each topBarLinks as { href, label, icon } (icon)}
		{#if icon !== null}
			{@const Icon = icon}
			<a
				href={resolve(href as Parameters<typeof resolve>[0])}
				class={{
					'flex items-center gap-1 rounded-lg px-3.25 py-2.5 hover:bg-foreground/25 hover:text-foreground': true,
					'bg-primary text-primary-foreground': isCurrent(href)
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
