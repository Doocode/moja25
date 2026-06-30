<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { Button } from '$shadcn/button';
	import { ArrowLeft } from '@lucide/svelte';

	interface Props {
		class?: string;
		href?: string;
		label?: string;
		title?: string;
		variant?: 'secondary' | 'outline' | 'ghost' | 'link' | 'destructive' | 'default';
	}

	let {
		class: className = 'gap-1',
		href = '/',
		label = undefined,
		title = 'Retour',
		variant = 'outline'
	}: Props = $props();

	function goBack() {
		if (!browser) return;

		if (window.history.length > 1 && document.referrer) {
			window.history.back();
			return;
		}

		goto(href);
	}
</script>

<Button
	{variant}
	onclick={goBack}
	class={className}
	size={label ? 'default' : 'icon'}
	aria-label={label}
	{title}
	{href}
>
	<ArrowLeft class="size-6" />
	{#if label}
		<span>{label}</span>
	{/if}
</Button>
