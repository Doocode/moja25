<script lang="ts">
	import { BadgeLigne } from '$lib/ui/ginko';
	import type { Arret, Ligne } from '$core/dto/ginko';

	interface Props {
		arret: Arret;
		lignes: Ligne[];
	}

	let { arret, lignes }: Props = $props();
</script>

<header class="bg-muted/50 px-4 py-10 text-center">
	<div class="container m-auto grid justify-items-center gap-3">
		<h1 class="text-2xl font-bold">{arret.nom}</h1>
		<ul class="flex flex-wrap justify-center gap-1">
			{#each lignes as ligne (ligne.id)}
				<li><BadgeLigne {ligne} /></li>
			{/each}
		</ul>
	</div>
</header>
