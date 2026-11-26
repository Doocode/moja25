<script lang="ts">
	import type { Link } from '#lib/ui/header/shared.ts';

	interface Props {
		links: Link[];
	}

	let { links }: Props = $props();
</script>

<div
	class="m-auto grid max-w-xl grid-cols-2 px-6 pt-6 pb-4"
	class:grid-cols-3={links.length === 3}
	class:grid-cols-4={links.length === 4}
	class:grid-cols-5={links.length === 5}
>
	{#each links as { label, icon, href } (label)}
		<a
			{href}
			class="group grid items-center justify-items-center gap-2 px-2 py-2 text-center text-inherit"
		>
			<div
				class="flex size-14 items-center justify-center rounded-full bg-secondary group-hover:bg-primary group-hover:text-primary-foreground"
			>
				{#if icon}
					{@const Icon = icon}
					<Icon class="size-6" />
				{/if}
			</div>
			<p class="w-full overflow-hidden text-xs text-ellipsis whitespace-nowrap">
				{label}
			</p>
		</a>
	{/each}
</div>
