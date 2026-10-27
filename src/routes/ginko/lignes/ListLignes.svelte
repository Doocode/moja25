<script lang="ts">
	import { resolve } from '$app/paths';
	import type { Ligne } from '$core/dto/ginko';
	import BadgeLigne from './BadgeLigne.svelte';

	interface Props {
		items?: Ligne[];
	}

	let { items }: Props = $props();
</script>

<ul class="flex flex-col">
	{#each items ?? [] as ligne (ligne.id)}
		<li>
			<a
				href={resolve('/ginko/lignes/[idLigne]', { idLigne: ligne.id })}
				class="group flex items-center gap-3 rounded-lg py-1.5 transition-[padding] hover:bg-green-300 hover:px-1.5 dark:hover:bg-green-800"
				data-sveltekit-preload-data="tap"
			>
				<BadgeLigne {ligne} />
				<span class="group-hover:underline">{ligne.libellePublic}</span>
			</a>
		</li>
	{/each}
</ul>
