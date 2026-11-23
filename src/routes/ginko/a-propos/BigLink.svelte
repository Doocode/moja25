<script lang="ts">
	import { ArrowRight, ExternalLink } from '@lucide/svelte';

	interface Props {
		href: string;
		title: string;
		legend?: string;

		newTab?: boolean;
	}

	let { href, title, legend = '', newTab = false }: Props = $props();
</script>

<a
	{href}
	{title}
	class="group flex items-start gap-3 rounded-xl p-3 text-sm hover:bg-primary/20 active:bg-primary active:text-primary-foreground"
	target={newTab ? '_blank' : '_self'}
>
	<ArrowRight
		class="my-0.75 size-5 group-hover:text-primary group-active:text-inherit"
		aria-hidden="true"
	/>
	<div class="grid flex-1">
		<strong class="text-primary underline-offset-3 group-hover:underline group-active:text-inherit">
			{title}
		</strong>
		{#if legend.trim().length > 0}
			<span class="leading-tight text-muted-foreground group-active:text-inherit">{legend}</span>
		{/if}
	</div>
	{#if newTab}
		<ExternalLink
			class="inline size-5 text-primary opacity-0 duration-100 group-hover:opacity-100 group-active:text-inherit"
			aria-label="(ouvrir le lien dans une nouvelle fenêtre)"
		/>
	{/if}
</a>
