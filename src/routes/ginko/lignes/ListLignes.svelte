<script lang="ts">
	import type { Ligne } from '$core/dto/ginko';
	import BadgeLigne from './BadgeLigne.svelte';

	interface Props {
		items?: Ligne[];
	}

	let { items }: Props = $props();
</script>

<ul class="flex flex-col gap-2">
	{#each items ?? [] as ligne (ligne.id)}
		<li class="flex items-center gap-3">
			<BadgeLigne {ligne} />
			<span>{ligne.libellePublic}</span>
		</li>
	{/each}
</ul>
