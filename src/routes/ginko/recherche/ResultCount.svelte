<script lang="ts">
	interface Props {
		count: number;
	}

	let { count }: Props = $props();
</script>

<p class="mt-8 mb-2 text-sm text-muted-foreground">
	{count}
	{count > 1 ? 'stations trouvées' : 'station trouvée'}
</p>
