<script lang="ts">
	import { cn } from '$lib/utils';
	import type { Component } from 'svelte';

	interface Props {
		icon: Component;
		label: string;
		value: number;
		class?: string;
		kind: 'mechanical-bikes' | 'electrical-bikes' | 'available-stands' | 'unavailable-stands';
	}

	let { icon, label, value, class: className, kind }: Props = $props();
</script>

<div class="legend-row flex items-center justify-between">
	<div class="flex items-center justify-start gap-2">
		<div
			class={cn(
				'flex aspect-square items-center justify-center rounded-[25%] p-2',
				className,
				value <= 0 && 'empty',
				kind && kind
			)}
		>
			{#if icon}
				{@const Icon = icon}
				<Icon class="size-5" />
			{/if}
		</div>

		<p
			class={{
				'text-sm': true,
				'text-muted-foreground line-through': value <= 0
			}}
		>
			{label}
		</p>
	</div>

	<span
		class={{
			'font-bold': true,
			'text-muted-foreground line-through': value <= 0
		}}
	>
		{value}
	</span>
</div>

<style>
	.mechanical-bikes {
		background-color: #ff65cc;
	}
	.electrical-bikes {
		background-color: #00c2e0;
	}
	.available-stands,
	.empty {
		background-color: #c9d1d4;
	}
	.unavailable-stands:not(.empty) {
		--color1: #ffca67;
		--color2: #f09c00;
		background: repeating-linear-gradient(
			-45deg,
			var(--color1),
			var(--color1) 10px,
			var(--color2) 10px,
			var(--color2) 20px
		);
		background-position: center center;
		background-attachment: fixed;
	}

	:root.dark .legend-row {
		.mechanical-bikes {
			background-color: #bb1985;
		}
		.electrical-bikes {
			background-color: #00a4bc;
		}
		.available-stands,
		.empty {
			background-color: #324146;
		}
		.unavailable-stands {
			--color1: #e09303;
			--color2: #ad7101;
		}
	}
</style>
