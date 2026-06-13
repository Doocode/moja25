<script lang="ts">
	import { ArrowLeft, MapPin } from '@lucide/svelte';
	import type { FormattedStation } from '$core/dto/jcdecaux';

	interface Props {
		station: FormattedStation;
	}

	let { station }: Props = $props();

	const isOpen = $derived(station.status === 'OPEN');
</script>

<div class="mb-4">
	<a
		href="/velocite"
		class="mb-4 inline-flex items-center gap-1.5 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
	>
		<ArrowLeft class="size-5" />
		Toutes les stations
	</a>

	<div class="mb-1 flex items-start justify-between gap-3">
		<h1 class="text-2xl leading-tight font-bold">{station.formattedName}</h1>
		<span
			class="mt-1 shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold
			{isOpen
				? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400'
				: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400'}"
		>
			{isOpen ? 'Ouvert' : 'Fermé'}
		</span>
	</div>

	<div class="flex items-center gap-1.5 text-sm text-muted-foreground">
		<MapPin class="size-3.5 shrink-0" />
		<span>{station.address}</span>
	</div>
</div>
