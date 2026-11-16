<script lang="ts">
	import ResultItem from './ResultItem.svelte';
	import type { FormattedArret } from '$core/dto/ginko';
	import { cn } from '$lib/utils';

	interface Props {
		class?: string;
		arrets: FormattedArret[];
		onchildren?: (arret: FormattedArret) => void;
	}

	let { arrets, onchildren, class: className }: Props = $props();
</script>

<ul class={cn('grid gap-0.5', className)}>
	{#each arrets as arret (arret.id)}
		<li>
			<ResultItem {arret} {onchildren} />
		</li>
	{/each}
</ul>
