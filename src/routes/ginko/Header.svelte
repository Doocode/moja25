<script lang="ts">
	import { mainLinks } from './links';
	import { resolve } from '$app/paths';
	import { isCurrent } from '$lib/ui/header/shared';
	import { BusFront } from '@lucide/svelte';
</script>

<header
	class="overflow-auto border-b border-[#00000077] bg-purple-300 whitespace-nowrap dark:border-[#ffffff77] dark:bg-purple-800"
>
	<div class="container m-auto flex items-center gap-10">
		<h1 class="text-2xl font-black">
			<a
				href={resolve('/ginko')}
				class="flex items-center gap-2 p-4 underline-offset-4 hover:underline"
			>
				<BusFront class="size-7" />
				<span>Bus & tram</span>
			</a>
		</h1>

		<nav class="flex flex-2 gap-1 pr-4">
			{#each mainLinks as { href, label, icon } (icon)}
				{#if icon !== null}
					{@const Icon = icon}
					<a
						href={resolve(href)}
						class={{
							'flex items-center gap-1 rounded-lg px-3.25 py-2.5 hover:bg-foreground/25 hover:text-foreground': true,
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
