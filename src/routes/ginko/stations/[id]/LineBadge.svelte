<script lang="ts">
	import { cn } from '$lib/utils';

	interface Props {
		numLignePublic: string;
		couleurFond: string;
		couleurTexte: string;
		modeTransport: number;
		class?: string;
	}

	let {
		numLignePublic,
		couleurFond,
		couleurTexte,
		modeTransport,
		class: className
	}: Props = $props();
</script>

<div
	class={cn(
		'relative inline-flex aspect-square w-10 items-center justify-center gap-1 overflow-clip rounded-md px-2 py-1 text-2xl font-bold whitespace-nowrap',
		className
	)}
	style:background-color={`#${couleurFond}` || '#111827'}
	style:color={`#${couleurTexte}` || '#ffffff'}
>
	<span>{numLignePublic}</span>
</div>
