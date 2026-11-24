<script lang="ts">
	import type { FormattedStation } from '#lib/core/dto/jcdecaux/FormattedStation.ts';

	let { station }: { station: FormattedStation } = $props();

	interface Segment {
		label: string;
		count: number;
		className: string;
	}

	// List of segments representing different types of cells, representing the different types of contents of the station
	const segments: Segment[] = $derived([
		{
			label: 'Vélos mécaniques',
			className: 'mechanical-bikes',
			count: station.totalStands.availabilities.mechanicalBikes
		},
		{
			label: 'Vélos électriques',
			className: 'electrical-bikes',
			count: station.totalStands.availabilities.electricalBikes
		},
		{
			label: 'Places disponibles',
			className: 'available-stands',
			count: station.totalStands.availabilities.stands
		},
		{
			label: 'Places non-disponibles',
			className: 'unavailable-stands',
			count: station.unavailableStands
		}
	]);

	const cells = $derived.by(() => {
		const capacity = Math.max(0, station.totalStands.capacity);
		const result: { label: string; counter: number | null; className: string }[] = [];

		for (const segment of segments) {
			for (let i = 1; i <= segment.count && result.length < capacity; i++) {
				result.push({ label: segment.label, counter: i, className: segment.className });
			}
		}

		while (result.length < capacity) {
			result.push({ label: 'Non renseigné', counter: null, className: 'unavailable' });
		}

		return result;
	});
</script>

<div class="grid">
	<h2 class="mt-2 mb-0.5 text-lg font-bold">Composition de la station</h2>
	<div
		class="progress-cells grid grid-cols-[repeat(auto-fit,minmax(2rem,1fr))] gap-0.5"
		role="img"
		aria-label="Niveau d'occupation des bornes"
	>
		{#each cells as cell, index (index)}
			<div
				class="flex aspect-square min-h-8 cursor-default items-center justify-center rounded-sm text-sm font-medium"
				class:unavailable-stands={cell.className === 'unavailable-stands'}
				class:mechanical-bikes={cell.className === 'mechanical-bikes'}
				class:electrical-bikes={cell.className === 'electrical-bikes'}
				class:available-stands={cell.className === 'available-stands'}
				title={cell.label}
			>
				{cell.counter ?? ''}
			</div>
		{/each}
	</div>
</div>

<style>
	.mechanical-bikes {
		background-color: #ff65cc;
	}
	.electrical-bikes {
		background-color: #00c2e0;
	}
	.available-stands {
		background-color: #c9d1d4;
	}
	.unavailable-stands {
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
	}

	:root.dark .progress-cells {
		.mechanical-bikes {
			background-color: #bb1985;
		}
		.electrical-bikes {
			background-color: #00a4bc;
		}
		.available-stands {
			background-color: #324146;
		}
		.unavailable-stands {
			--color1: #e09303;
			--color2: #ad7101;
		}
	}
</style>
