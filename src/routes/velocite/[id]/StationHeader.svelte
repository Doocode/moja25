<script lang="ts">
	import { ArrowLeft, MapPin } from '@lucide/svelte';
	import type { FormattedStation } from '$core/dto/jcdecaux';

	interface Props {
		station: FormattedStation;
	}

	let { station }: Props = $props();

	const isOpen = $derived(station.status === 'OPEN');
</script>

<div class="mb-4 bg-[#98c5ff] dark:bg-[#3266aa]">
	<div class="container mx-auto p-4">
		<a
			href="/velocite"
			class="-mt-4 mb-4 inline-flex items-center gap-1.5 py-4 text-sm transition-colors hover:text-foreground hover:underline"
		>
			<ArrowLeft class="size-5" />
			Liste des stations
		</a>

		<div class="flex items-start justify-between gap-3 pb-1">
			<div class="grid">
				<p class="text-8xl font-thin">{station.number}</p>
				<h1 class="text-2xl leading-tight font-bold">{station.formattedName}</h1>
			</div>

			<div class="flex justify-end">
				<!-- TODO: Actions (add to bookmarks, share, open in map) -->
			</div>
		</div>
	</div>
</div>
