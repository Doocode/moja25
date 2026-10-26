<script lang="ts">
	import type { Ligne } from '$core/dto/ginko';
	import { cn } from '$lib/utils';

	interface Props {
		ligne: Ligne;
		class?: string;
	}

	let { ligne, class: className }: Props = $props();
</script>

<div
	class={cn('inline-flex min-w-10 justify-center rounded-sm px-2 py-1 font-bold', className)}
	style:background={`#${ligne.couleurFond}`}
	style:color={`#${ligne.couleurTexte}`}
>
	{ligne.numLignePublic}
</div>
