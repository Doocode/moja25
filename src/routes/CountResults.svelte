<script lang="ts">
	interface Props {
		totalLength: number;
		filteredLength: number;
	}

	let { totalLength, filteredLength }: Props = $props();
</script>

{#if filteredLength !== totalLength}
	<p>
		<strong>{filteredLength} stations trouvées</strong>
		<br /><span class="-mt-0 block text-xs text-muted-foreground">sur {totalLength} stations</span>
	</p>
{:else}
	<p>{totalLength} stations</p>
{/if}
