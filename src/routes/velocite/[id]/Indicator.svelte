<script lang="ts">
	import type { Component } from 'svelte';

	interface Props {
		icon: Component;
		text: string;
		enabled?: boolean;
		kind?: 'success' | 'warning' | 'danger';
		slash?: boolean;
	}

	let { icon, text, enabled = false, kind = 'success', slash = false }: Props = $props();
</script>

<div class="flex flex-col items-center justify-start gap-1.5 text-center">
	<div class="relative">
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
		{#if slash && !enabled}
			<div
				class="slash absolute top-1/2 h-1.5 w-full -translate-y-1/2 rotate-45 transform border-t-4 border-t-background bg-muted-foreground sm:h-2.75 sm:border-t-8"
			></div>
		{/if}
	</div>
	<span
		class={{
			'text-xs sm:text-sm': true,
			'text-foreground': enabled,
			'text-muted-foreground': !enabled
		}}>{text}</span
	>
</div>
