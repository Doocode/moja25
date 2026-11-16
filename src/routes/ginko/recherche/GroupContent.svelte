<script lang="ts">
	import type { FormattedArret } from '$core/dto/ginko';
	import ResultItem from './ResultItem.svelte';
	import ResultList from './ResultList.svelte';

	interface Props {
		arret: FormattedArret;
	}

	let { arret }: Props = $props();
</script>

{#if arret.children?.length}
	<ResultItem {arret} recommended />
	<ResultList arrets={arret.children} class="mt-4" />
{/if}
