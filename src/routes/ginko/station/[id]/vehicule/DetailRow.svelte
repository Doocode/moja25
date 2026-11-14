<script lang="ts">
	import { ExternalLink } from '@lucide/svelte';
	import type { Component } from 'svelte';

	interface Props {
		icon: Component;
		title: string;
		value: string;
		href?: string;
		iconClass?: string;
	}

	let { icon: Icon, title, value, href, iconClass = 'text-primary' }: Props = $props();
</script>

<div class="relative grid min-h-11 content-center pl-10">
	<dt>
		<Icon
			class="absolute top-[55%] left-0 size-7.5 -translate-y-1/2 {iconClass}"
			aria-hidden="true"
			stroke-width={1.75}
		/>
		<span class="text-xs font-semibold tracking-wide text-muted-foreground">{title}</span>
	</dt>
	<dd class="">
		{#if href}
			<a
				{href}
				target="_blank"
				rel="noreferrer"
				class="flex items-center gap-1.5 font-medium text-sky-700 underline-offset-4 hover:text-sky-900 hover:underline dark:text-sky-300 dark:hover:text-sky-100"
			>
				{value}
				<ExternalLink class="size-3.5" aria-label="(nouvelle fenêtre)" />
			</a>
		{:else}
			{value}
		{/if}
	</dd>
</div>
