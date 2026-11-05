<script lang="ts">
	import { BadgeLigne } from '$lib/ui/ginko';
	import type { Arret, Ligne } from '$core/dto/ginko';

	interface Props {
		arret: Arret;
		lignes: Ligne[];
	}

	let { arret, lignes }: Props = $props();
</script>

<header
	class="bg-linear-to-r from-cyan-300 to-blue-200 px-4 pt-10 pb-18 text-center dark:from-cyan-800 dark:to-blue-800"
>
	<div class="container m-auto grid justify-items-center gap-3">
		<h1 class="text-2xl font-black">{arret.nom}</h1>
		<ul class="flex flex-wrap justify-center gap-1">
			{#each lignes as ligne (ligne.id)}
				<li><BadgeLigne {ligne} /></li>
			{/each}
		</ul>
	</div>
</header>
