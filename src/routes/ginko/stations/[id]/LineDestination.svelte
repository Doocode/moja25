<script lang="ts">
	interface Props {
		destination: string;
		precisionDestination?: string;
	}

	let { destination, precisionDestination = '' }: Props = $props();
</script>

<div class="min-w-0">
	<p class="truncate font-semibold">{destination}</p>
	{#if precisionDestination}
		<p class="truncate text-xs text-muted-foreground">{precisionDestination}</p>
	{/if}
</div>
