<script lang="ts">
	import type { FormattedStation } from '$lib/core/dto/jcdecaux/FormattedStation';

	let { station }: { station: FormattedStation } = $props();

	// List of segments representing different types of cells, representing the different types of contents of the station
	const segments = $derived([
		{
			label: 'Vélos mécaniques',
			color: '#bb1985',
			count: station.totalStands.availabilities.mechanicalBikes
		},
		{
			label: 'Vélos électriques',
			color: '#00a4bc',
			count: station.totalStands.availabilities.electricalBikes
		},
		{
			label: 'Places disponibles',
			color: '#444444',
			count: station.totalStands.availabilities.stands
		},
		{
			label: 'Places non-disponibles',
			color: '#e09303',
			count: station.unavailableStands
		}
	]);

	const cells = $derived.by(() => {
		const capacity = Math.max(0, station.totalStands.capacity);
		const result: { label: string; number: number | null; color: string | null }[] = [];

		for (const segment of segments) {
			for (let i = 1; i <= segment.count && result.length < capacity; i++) {
				result.push({ label: segment.label, number: i, color: segment.color });
			}
		}

		while (result.length < capacity) {
			result.push({ label: 'Non renseigné', number: null, color: 'red' });
		}

		return result;
	});
</script>

<div
	class="grid grid-cols-[repeat(auto-fit,minmax(2rem,1fr))] gap-0.5"
	role="img"
	aria-label="Niveau d'occupation des bornes"
>
	{#each cells as cell, index (index)}
		<div
			class="flex aspect-square min-h-8 cursor-default items-center justify-center rounded-sm text-sm font-medium text-white"
			class:unavailable={cell.color === '#e09303'}
			style:background-color={cell.color ?? 'red'}
			title={cell.label}
		>
			{cell.number ?? ''}
		</div>
	{/each}
</div>

<style>
	.unavailable {
		--color1: #e09303;
		--color2: #ad7101;
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
</style>
