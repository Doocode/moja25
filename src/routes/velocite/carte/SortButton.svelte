<script lang="ts">
	import { Button } from '$shadcn/button';
	import type { Component } from 'svelte';

	interface Props {
		class?: string;
		icon: Component;
		text: string;
		title?: string;
		onclick?: () => void;
		selected?: boolean;
	}

	let {
		icon,
		text,
		title = text,
		onclick = () => {},
		selected = false,
		class: className = ''
	}: Props = $props();
</script>

{#if icon !== undefined}
	{@const Icon = icon}
	<Button
		variant={selected ? 'default' : 'outline'}
		{onclick}
		{title}
		class="size-12 rounded-lg {className}"
	>
		<Icon class="size-6" />
		<span class="sr-only">{text}</span>
	</Button>
{/if}
