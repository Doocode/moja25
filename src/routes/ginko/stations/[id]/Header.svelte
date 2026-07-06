<script lang="ts">
	import type { Arret } from '$core/dto/ginko';
	import MenuMaps from './MenuMaps.svelte';
	import RefreshDropdown from '$lib/ui/RefreshDropdown.svelte';
	import { defaultRefreshInterval } from './settings';
	import BackButton from '$lib/ui/BackButton.svelte';

	interface Props {
		station: Arret;
		refreshInterval: number;
	}

	let { station, refreshInterval = $bindable(defaultRefreshInterval) }: Props = $props();

	const pmrStatus = $derived.by(() => {
		if (station.accessibilite === 1) {
			return { text: 'Accessible PMR', className: 'bg-emerald-500/20 text-emerald-700' };
		}
		if (station.accessibilite === 2) {
			return { text: 'PMR limité', className: 'bg-amber-500/20 text-amber-700' };
		}
		return { text: 'Accessibilité inconnue', className: 'bg-muted text-muted-foreground' };
	});
</script>

<header class="bg-gradient-to-b from-primary/30 to-transparent">
	<div class="m-auto flex max-w-6xl items-center justify-between gap-3 p-4 pb-8">
		<div class="flex flex-1 items-center gap-2">
			<BackButton href="/ginko/stations" label="Retour" />
		</div>

		<div class="flex-2 text-center">
			<h1 class="mb-2 text-2xl leading-tight font-black sm:text-3xl md:text-5xl">{station.nom}</h1>
			<p class="inline-flex rounded-full px-2 py-1 text-xs font-medium {pmrStatus.className}">
				{pmrStatus.text}
			</p>
		</div>

		<div class="flex flex-1 items-center justify-end gap-2">
			<RefreshDropdown bind:interval={refreshInterval} />
			<MenuMaps {station} />
		</div>
	</div>
</header>
