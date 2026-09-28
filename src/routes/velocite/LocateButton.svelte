<script lang="ts">
	import { Locate, LocateFixed, LocateOff, LoaderCircle } from '@lucide/svelte';
	import { buttonVariants } from '$shadcn/button';
	import { cn } from '$lib/utils';

	interface Props {
		permissionDenied?: boolean;
		hasLocation?: boolean;
		loading?: boolean;
		class?: string;
		onclick?: () => void;
	}

	let {
		permissionDenied = false,
		hasLocation = false,
		loading = false,
		class: className = '',
		onclick
	}: Props = $props();

	let titleText = $derived.by(() => {
		if (loading) return 'Recherche de votre position...';
		if (permissionDenied) return 'Géolocalisation refusée';
		if (hasLocation) return 'Centrer sur ma position';
		return 'Me géolocaliser';
	});
</script>

<button
	type="button"
	{onclick}
	disabled={loading}
	title={titleText}
	aria-label={titleText}
	class={cn(
		'h-11.25 w-11.25 rounded-lg transition-colors',
		buttonVariants({ variant: 'outline', size: 'icon' }),
		className
	)}
>
	{#if loading}
		<LoaderCircle class="size-6 animate-spin text-muted-foreground" />
	{:else if permissionDenied}
		<LocateOff class="size-6 text-red-500" />
	{:else if hasLocation}
		<LocateFixed class="size-6 text-primary" />
	{:else}
		<Locate class="size-6 text-foreground" />
	{/if}
</button>
