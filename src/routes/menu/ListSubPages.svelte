<script lang="ts">
	import type { Link } from '#lib/ui/header/shared.ts';

	interface Props {
		heading?: string;
		links: Link[];
		kind?: 'ginko' | 'velocite';
	}

	let { links, heading, kind }: Props = $props();
</script>

<div class="mx-auto mt-4 mb-8 grid max-w-xl">
	{#if heading}
		<h2
			class={{
				'mx-9 my-2 text-base font-bold': true,
				'text-sky-600 dark:text-sky-400': kind === 'ginko',
				'text-pink-600 dark:text-fuchsia-400': kind === 'velocite'
			}}
		>
			{heading}
		</h2>
	{/if}
	{#each links as { label, icon, href } (label)}
		<a
			{href}
			class="flex items-center justify-start gap-2 px-9 py-3.5 text-center text-inherit hover:bg-secondary active:bg-primary active:text-primary-foreground sm:rounded-lg"
		>
			{#if icon}
				{@const Icon = icon}
				<Icon class="size-5" />
			{/if}
			<p class="text-sm">
				{label}
			</p>
		</a>
	{/each}
</div>
