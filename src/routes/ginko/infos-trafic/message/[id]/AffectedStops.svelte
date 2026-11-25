<script lang="ts">
	//import { resolve } from '$app/paths';
	import { MapPin } from '@lucide/svelte';
	import Section from './Section.svelte';
	import type { Arret } from '#core/dto/ginko/index.ts';

	interface Props {
		arrets: Arret[];
	}

	let { arrets }: Props = $props();
</script>

<Section title="Arrêts concernés" icon={MapPin}>
	<ul class="flex flex-wrap gap-1">
		{#each arrets as arret (arret.id)}
			<li class="inline-flex items-center gap-1 rounded-full border px-3 py-1 text-sm">
				<MapPin class="size-3.5" />
				{arret.nom}
			</li>
		{/each}
	</ul>
</Section>
