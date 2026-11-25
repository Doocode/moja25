<script lang="ts">
	import type { FormattedArret } from '#core/dto/ginko/index.ts';

	interface Props {
		arret: FormattedArret;
	}

	let { arret }: Props = $props();
</script>

{#if arret.nomDecoupe}
	<span class="block text-xs font-normal text-muted-foreground">{arret.nomDecoupe.ville}</span>
	<span class="block">{arret.nomDecoupe.station}</span>
{:else}
	{arret.nom}
{/if}
