<script lang="ts">
	import { resolve } from '$app/paths';
	import type { Arret } from '$core/dto/ginko';
	import { Accessibility } from '@lucide/svelte';

	interface Props {
		arret: Arret;
	}

	let { arret }: Props = $props();
</script>

<li class="border-b border-muted-foreground/40">
	<a
		href={resolve('/ginko/station/[id]', { id: arret.id })}
		class="flex items-center gap-2 py-3 hover:underline"
	>
		<span class="flex-1">{arret.nom}</span>
		{#if arret.accessibilite > 0}
			<Accessibility
				class="size-4 text-muted-foreground"
				title="Station accessible aux PMR (Personnes à Mobilité Réduite)"
			/>
		{/if}
	</a>
</li>
