<script lang="ts">
	import { cn } from 'tailwind-variants';
	import type { Ligne } from '$core/dto/ginko';
	import BadgeLigne from '../BadgeLigne.svelte';
	import { getTypologie, type Typologie } from '../typologies';

	interface Props {
		ligne: Ligne;
	}

	let { ligne }: Props = $props();

	let typologie: Typologie = $derived.by(() => {
		return getTypologie(ligne.typologie);
	});
</script>

<header
	class="px-4 py-10 text-center"
	style:background={`#${ligne.couleurFond}`}
	style:color={`#${ligne.couleurTexte}`}
>
	<div class="container m-auto grid justify-items-center gap-3">
		<!-- TODO: Add back button -->
		<BadgeLigne
			{ligne}
			invertColors
			class={cn(
				'min-w-24 rounded-xl p-4',
				ligne.numLignePublic.length < 4 ? 'text-5xl' : '',
				ligne.numLignePublic.length == 4 ? 'h-20 text-3xl' : ''
			)}
		/>
		<h1 class="text-2xl font-bold">{ligne.libellePublic}</h1>
		<p class="flex items-center justify-center gap-1 text-sm opacity-80">
			{#if typologie.icon}
				{@const Icon = typologie.icon}
				<Icon class="size-5" />
			{/if}
			<span>{typologie.label}</span>
		</p>
	</div>
</header>
