<script lang="ts">
	import type { Ligne } from '$core/dto/ginko';
	import { cn } from '$lib/utils';

	interface Props {
		ligne: Ligne;
		class?: string;
		invertColors?: boolean;
	}

	let { ligne, class: className, invertColors = false }: Props = $props();
</script>

<div
	class={cn(
		'inline-flex min-w-10 items-center justify-center rounded-sm px-2 py-1 font-bold',
		className
	)}
	style:background={invertColors ? `#${ligne.couleurTexte}` : `#${ligne.couleurFond}`}
	style:color={invertColors ? `#${ligne.couleurFond}` : `#${ligne.couleurTexte}`}
>
	{ligne.numLignePublic}
</div>
