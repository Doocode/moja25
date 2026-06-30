<script lang="ts">
	interface Props {
		numLignePublic: string;
		couleurFond: string;
		couleurTexte: string;
		modeTransport: number;
	}

	let { numLignePublic, couleurFond, couleurTexte, modeTransport }: Props = $props();
</script>

<div
	class="relative inline-flex aspect-square w-10 items-center justify-center gap-1 overflow-clip rounded-md px-2 py-1 text-2xl font-bold"
	style:background-color={`#${couleurFond}` || '#111827'}
	style:color={`#${couleurTexte}` || '#ffffff'}
>
	<span>{numLignePublic}</span>
</div>
