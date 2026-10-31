<script lang="ts">
	interface Props {
		queryInput: string;
		totalLength: number;
		filteredLength: number;
	}

	let { queryInput, totalLength, filteredLength }: Props = $props();
</script>

{#if queryInput.length > 0}
	<p class="text-sm">
		<strong>{filteredLength} stations</strong>
		<span class="text-muted-foreground">sur {totalLength}</span>
	</p>
{:else}
	<p class="text-sm text-muted-foreground">{filteredLength} stations</p>
{/if}
