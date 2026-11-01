<script lang="ts">
	import { cn } from '$lib/utils';

	interface Props {
		class?: string;
	}

	let { class: className }: Props = $props();
</script>

<header class={cn('container mx-auto p-4 md:py-8', className)}>
	<h1 class="mb-1 text-2xl font-black">Infos trafic</h1>
	<p class="text-sm text-muted-foreground">Consultez l'état du trafic du réseau Ginko</p>
</header>
