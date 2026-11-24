<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Restyle } from '#lib/ui/page/index.ts';

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();
</script>

<Restyle tintLight="#0083be" tintDark="#74d4ff">
	{@render children?.()}
</Restyle>
