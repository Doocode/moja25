<script lang="ts">
	import type { Station } from '$core/api/JCDecauxApi';

	interface Props {
		data: {
			stations: Station[];
		};
	}

	let { data }: Props = $props();
</script>

<main>
	<h1>Vélocité</h1>

	<ul>
		{#each data.stations as station}
			<li>{station.name}</li>
		{/each}
	</ul>
</main>
