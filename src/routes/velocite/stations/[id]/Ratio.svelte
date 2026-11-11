<script lang="ts">
	import type { FormattedStation } from '$core/dto/jcdecaux';
	import { cn } from '$lib/utils.js';

	interface Props {
		station: FormattedStation;
		class?: string;
	}

	let { station, class: className = '' }: Props = $props();

	const countBikes = $derived(station.totalStands.availabilities.bikes);
	const countCapacity = $derived(station.totalStands.capacity);
</script>

{#snippet item(count: number, label: string)}
	<p
		class={{
			'grid text-center': true,
			'text-destructive': count <= 0
		}}
	>
		<span class="text-6xl font-bold">{count}</span>
		<span class="text-xs tracking-wider">{label}</span>
	</p>
{/snippet}

<main class={cn('flex items-center justify-center gap-4 p-4', className)}>
	{@render item(countBikes, 'Vélos')}
	<span class="mb-4 text-5xl">/</span>
	{@render item(countCapacity, 'Bornes')}
</main>
