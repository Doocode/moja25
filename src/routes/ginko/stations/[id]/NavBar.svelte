<script lang="ts">
	import type { Ligne } from '$lib/core/dto/ginko';
	import { Bike, CarFront, MapPinSearch } from '@lucide/svelte';
	import LineBadge from './LineBadge.svelte';
	import NavTab from './NavTab.svelte';

	interface Props {
		variantes: Ligne[];
	}

	let { variantes }: Props = $props();

	const displayedVariantes = $derived(variantes.length > 4 ? variantes.slice(0, 3) : variantes);
	const remainingVariantesCount = $derived(
		Math.max(0, variantes.length - displayedVariantes.length)
	);
</script>

<nav class="flex items-center justify-center gap-2">
	<NavTab href="#arrivals" label="Bus & tram" selected>
		<div
			class={{
				'items-center justify-center gap-1 overflow-hidden': true,
				'grid grid-cols-2': displayedVariantes.length > 1,
				'flex h-full flex-1': displayedVariantes.length <= 1
			}}
		>
			{#each displayedVariantes as variante (variante.id)}
				<LineBadge
					numLignePublic={variante.numLignePublic}
					couleurFond={variante.couleurFond}
					couleurTexte={variante.couleurTexte}
					modeTransport={variante.modeTransport}
					class={displayedVariantes.length > 1
						? 'size-10 border-1 border-background'
						: 'm-4 size-20 flex-1 rounded-xl border-1 border-background text-6xl'}
				/>
			{/each}

			{#if remainingVariantesCount > 0}
				<LineBadge
					numLignePublic={`+${remainingVariantesCount}`}
					couleurFond="334155"
					couleurTexte="ffffff"
					modeTransport={0}
					class="border-1 border-background"
				/>
			{/if}
		</div>
	</NavTab>

	<NavTab href="#velocite" label="Vélocité">
		<Bike class="size-20 text-fuchsia-500 dark:text-fuchsia-400" />
	</NavTab>

	<NavTab href="#citiz" label="Citiz">
		<CarFront class="size-20 text-cyan-500 dark:text-cyan-400" />
	</NavTab>

	<NavTab href="#nearby" label="À proximité">
		<MapPinSearch class="size-20 text-amber-500 dark:text-amber-400" />
	</NavTab>
</nav>
