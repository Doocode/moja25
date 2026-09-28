<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		title: string;
		children: Snippet;
		class?: string;
	}

	let { title, children, class: className = '' }: Props = $props();
</script>

<section class={className}>
	<h3 class="mb-1 px-4 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
		{title}
	</h3>
	{@render children()}
</section>
