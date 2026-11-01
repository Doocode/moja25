<script lang="ts">
	import ResultItem from './ResultItem.svelte';
	import type { Arret } from '$core/dto/ginko';

	interface Props {
		arrets: Arret[];
	}

	let { arrets }: Props = $props();
</script>

<ul class="grid gap-0.5">
	{#each arrets as arret (arret.id)}
		<li>
			<ResultItem {arret} />
		</li>
	{/each}
</ul>
