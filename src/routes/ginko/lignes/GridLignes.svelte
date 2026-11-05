<script lang="ts">
	import { cn } from '$lib/utils';
	import { resolve } from '$app/paths';
	import { BadgeLigne } from '$lib/ui/ginko';
	import type { Ligne } from '$core/dto/ginko';

	interface Props {
		items?: Ligne[];
	}

	let { items }: Props = $props();
</script>

<ul class="grid grid-cols-[repeat(auto-fill,minmax(9rem,1fr))] gap-2">
	{#each items ?? [] as ligne (ligne.id)}
		<li>
			<a
				href={resolve('/ginko/lignes/[idLigne]', { idLigne: ligne.id })}
				class="group flex flex-col items-center gap-2 rounded-xl px-3 py-3 text-center hover:bg-secondary active:bg-foreground/20"
				data-sveltekit-preload-data="tap"
			>
				<BadgeLigne
					{ligne}
					class={cn(
						'min-w-24 rounded-xl p-4',
						ligne.numLignePublic.length < 4 ? 'text-5xl' : '',
						ligne.numLignePublic.length == 4 ? 'h-20 text-3xl' : ''
					)}
				/>
				<span class="text-sm text-balance">{ligne.libellePublic}</span>
			</a>
		</li>
	{/each}
</ul>
