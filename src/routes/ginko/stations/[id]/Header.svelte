<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import type { Arret } from '$core/dto/ginko';
	import { Button } from '$shadcn/button';
	import { ArrowLeft } from '@lucide/svelte';
	import MenuMaps from './MenuMaps.svelte';
	import RefreshDropdown from '$lib/ui/RefreshDropdown.svelte';
	import { defaultRefreshInterval } from './settings';

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

	function goBack() {
		if (!browser) return;

		if (window.history.length > 1 && document.referrer) {
			window.history.back();
			return;
		}

		goto('/ginko/stations');
	}
</script>

<header class="bg-gradient-to-b from-primary/30 to-transparent">
	<div class="m-auto flex max-w-4xl items-center justify-between gap-3 p-4 pb-8">
		<div class="flex items-center gap-2">
			<Button
				variant="outline"
				size="icon"
				aria-label="Retour"
				onclick={goBack}
				href="/ginko/stations"
			>
				<ArrowLeft class="size-6" />
			</Button>
		</div>

		<div class="text-center">
			<h1 class="mb-2 text-2xl leading-tight font-black sm:text-3xl md:text-5xl">{station.nom}</h1>
			<p class="inline-flex rounded-full px-2 py-1 text-xs font-medium {pmrStatus.className}">
				{pmrStatus.text}
			</p>
		</div>

		<div class="flex items-center justify-end gap-2">
			<RefreshDropdown bind:interval={refreshInterval} />
			<MenuMaps {station} />
		</div>
	</div>
</header>
