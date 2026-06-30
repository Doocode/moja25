<script lang="ts">
	import type { Temps } from '$core/dto/ginko';
	import { onMount } from 'svelte';

	interface Props {
		estimations: Temps[];
	}

	let { estimations }: Props = $props();
	let showAlternance = $state(false);

	onMount(() => {
		const id = setInterval(() => {
			showAlternance = !showAlternance;
		}, 3000);

		return () => clearInterval(id);
	});

	function displayedHtml(temps: Temps): string {
		if (temps.alternance && temps.tempsHTMLEnAlternance) {
			return showAlternance ? temps.tempsHTMLEnAlternance : temps.tempsHTML;
		}
		return temps.tempsHTML;
	}

	function estimationClass(typeDeTemps: number): string {
		if (typeDeTemps === 2) return 'bg-amber-500/15 text-amber-800';
		return 'bg-muted text-foreground';
	}
</script>

<div class="grid grid-cols-2 gap-1 sm:grid-cols-3">
	{#each estimations as estimation, index (`${estimation.idLigne}-${estimation.numVehicule}-${index}`)}
		<div class="rounded-xl px-2 py-2 text-center {estimationClass(estimation.typeDeTemps)}">
			<p class="text-lg font-extrabold">
				{@html displayedHtml(estimation)}
			</p>
		</div>
	{/each}
</div>

<style>
	:global(.gk-temps),
	:global(.gk-horaire),
	:global(.gk-mot) {
		font-weight: 800;
	}

	:global(.gk-mn) {
		font-size: 0.75rem;
		font-weight: 500;
		text-transform: uppercase;
	}
</style>
