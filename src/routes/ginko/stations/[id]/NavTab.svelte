<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		onClick?: () => void;
		href: string;
		label?: string;
		children?: Snippet;
	}

	let { onClick, href, label = 'Lorem ipsum', children }: Props = $props();
</script>

<a {href} onclick={onClick} class="group">
	<div
		class="flex size-30 items-center justify-center rounded-4xl border border-input bg-secondary duration-200 group-hover:bg-accent"
	>
		{@render children?.()}
	</div>
	<p
		class="mt-2 w-30 overflow-hidden text-center text-sm font-semibold text-ellipsis whitespace-nowrap group-hover:text-primary"
	>
		{label}
	</p>
</a>
