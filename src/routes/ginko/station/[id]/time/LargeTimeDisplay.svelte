<script lang="ts">
	interface Props {
		time: number;
		label: string;
		theoretical?: boolean;
	}

	let { time, label, theoretical = false }: Props = $props();
</script>

<div class="flex flex-col">
	<span class="text-5xl">{time}</span>
	<span class="text-xs">{label}</span>
	{#if theoretical}
		<span class="text-xs text-muted-foreground">Théorique</span>
	{/if}
</div>
