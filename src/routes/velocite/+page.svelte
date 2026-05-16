<script lang="ts">
	import type { FormattedStation } from '$core/api/JCDecauxApi';

	interface Props {
		data: {
			stations: FormattedStation[];
		};
	}

	let { data }: Props = $props();
</script>

<main>
	<h1>Vélocité</h1>

	<ul>
		{#each data.stations as station}
			<li>{station.formattedName}</li>
		{/each}
	</ul>
</main>
