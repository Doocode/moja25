<script lang="ts">
	import { resolve } from '$app/paths';
	import { Route } from '@lucide/svelte';
	import Section from './Section.svelte';
	import { BadgeLigne } from '$lib/ui/ginko';
	import type { Ligne } from '$core/dto/ginko';

	interface Props {
		lignes: Ligne[];
	}

	let { lignes }: Props = $props();
</script>

<Section title="Lignes concernées" icon={Route}>
	<ul class="flex flex-wrap gap-2">
		{#each lignes as ligne (ligne.id)}
			<li>
				<a
					href={resolve('/ginko/lignes/[idLigne]', { idLigne: ligne.id })}
					title={ligne.libellePublic}
				>
					<BadgeLigne {ligne} />
				</a>
			</li>
		{/each}
	</ul>
</Section>
