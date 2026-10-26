<script lang="ts">
	import type { Ligne } from '$core/dto/ginko';
	import BadgeLigne from './BadgeLigne.svelte';

	interface Props {
		items?: Ligne[];
	}

	let { items }: Props = $props();
</script>

<ul class="grid grid-cols-[repeat(auto-fill,minmax(9rem,1fr))] gap-x-2 gap-y-6">
	{#each items ?? [] as ligne (ligne.id)}
		<li class="flex flex-col items-center gap-1 text-center">
			<BadgeLigne {ligne} class="min-w-24 rounded-xl p-4 text-5xl" />
			<span class="text-sm text-balance">{ligne.libellePublic}</span>
		</li>
	{/each}
</ul>
