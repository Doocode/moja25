<script lang="ts">
	import type { Ligne } from '$core/dto/ginko';
	import BadgeLigne from './BadgeLigne.svelte';

	interface Props {
		data: {
			lignes: Ligne[];
		};
	}

	let { data }: Props = $props();

	let lignes = $derived(data.lignes);

	const typologies: Record<number, string> = {
		10: 'Tramway',
		20: 'Lianes',
		30: 'Lignes urbaines',
		40: 'Lignes complémentaires',
		50: 'Lignes périurbaines',
		60: 'Lignes scolaires',
		70: 'Services à la demande',
		80: 'Autre'
	};

	let groupes = $derived(
		Object.entries(
			Object.groupBy(
				[...lignes].sort(
					(a, b) =>
						a.typologie - b.typologie ||
						a.numLignePublic.localeCompare(b.numLignePublic, 'fr', { numeric: true })
				),
				(l) => l.typologie
			)
		)
	);
</script>

<main class="container m-auto max-w-lg p-4">
	<h1 class="mb-4 text-2xl font-bold">Lignes</h1>

	{#each groupes as [typologie, items] (typologie)}
		<section class="mb-6">
			<h2 class="mb-2 text-lg font-semibold">{typologies[Number(typologie)] ?? 'Autre'}</h2>
			<ul class="flex flex-col gap-2">
				{#each items ?? [] as ligne (ligne.id)}
					<li class="flex items-center gap-3">
						<BadgeLigne {ligne} />
						<span>{ligne.libellePublic}</span>
					</li>
				{/each}
			</ul>
		</section>
	{/each}
</main>
