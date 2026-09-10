<script lang="ts">
	import type { Component } from 'svelte';

	interface Props {
		icon: Component;
		text: string;
		enabled?: boolean;
		kind?: 'success' | 'warning' | 'danger';
	}

	let { icon, text, enabled = false, kind = 'success' }: Props = $props();
</script>

<div class="flex flex-col items-center justify-start gap-1.5 text-center">
	{#if icon}
		{@const Icon = icon}
		<Icon
			strokeWidth={1.25}
			class={{
				'size-8 sm:size-14': true,
				'text-green-600 dark:text-green-400': enabled && kind === 'success',
				'text-yellow-600 dark:text-yellow-400': enabled && kind === 'warning',
				'text-red-600 dark:text-red-400': enabled && kind === 'danger',
				'text-muted-foreground': !enabled
			}}
		/>
	{/if}
	<span
		class={{
			'text-xs sm:text-sm': true,
			'text-foreground': enabled,
			'text-muted-foreground': !enabled
		}}>{text}</span
	>
</div>
