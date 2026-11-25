<script lang="ts">
	import type { Arret, Ligne } from '#core/dto/ginko/index.ts';
	import { Accessibility } from '@lucide/svelte';
	import { resolve } from '$app/paths';

	interface Props {
		stops: Arret[];
		ligne: Ligne;
	}

	let { stops, ligne }: Props = $props();

	const transportHubs = [
		{ nom: 'Gare Viotte' },
		{ nom: 'Gare de la Mouillière' },
		{ nom: 'Chamars' },
		{ nom: 'Chamars Esplanade' },
		{ nom: 'Temis' },
		{ nom: 'République' },
		{ nom: 'Orchamps' },
		{ nom: 'Micropolis' },
		{ nom: 'Hauts du Chazal' }
	];

	function isFirstOrLast(index: number) {
		return index === 0 || index === (stops?.length ?? 0) - 1;
	}

	function isTransportHub(arret: Arret) {
		return transportHubs.some((hub) => hub.nom === arret.nom);
	}
</script>

<ol class="relative mx-auto grid max-w-85">
	{#each stops ?? [] as arret, ii (arret.id + ii)}
		<li>
			<a
				class={{
					'group relative flex items-center border-b border-muted-foreground/40 py-2 hover:border-transparent hover:bg-muted-foreground/30': true,
					'gap-2': !isFirstOrLast(ii) && !isTransportHub(arret),
					'gap-0.5': isFirstOrLast(ii) || isTransportHub(arret)
				}}
				href={resolve('/ginko/station/[id]', { id: arret.id }) +
					`?${new URLSearchParams({ nom: arret.nom })}`}
				data-sveltekit-preload-data="tap"
			>
				<span
					class={{
						'relative z-1 shrink-0 rounded-full border-3 border-background group-hover:border-foreground! group-hover:bg-background!': true,
						'-left-2 size-7 rounded-sm': isFirstOrLast(ii) || isTransportHub(arret),
						'-left-1 size-5 rounded-full': !isFirstOrLast(ii) && !isTransportHub(arret)
					}}
					style:background={`#${ligne.couleurFond}`}
				></span>
				{#if ii < (stops?.length ?? 0) - 1}
					<span
						class="absolute top-1/2 left-1.25 h-full w-0.5"
						style:background={`#${ligne.couleurFond}`}
					></span>
				{/if}
				<div class="grid flex-1">
					{#if ii === 0}
						<p class="text-xs font-bold tracking-widest text-muted-foreground uppercase">Départ</p>
					{:else if isFirstOrLast(ii)}
						<p class="text-xs font-bold tracking-widest text-muted-foreground uppercase">
							Terminus
						</p>
					{/if}
					<span class="sm:text-base">{arret.nom}</span>
				</div>
				{#if arret.accessibilite > 0}
					<Accessibility
						class="size-4 text-muted-foreground"
						title="Station accessible aux PMR (Personnes à Mobilité Réduite)"
					/>
				{/if}
			</a>
		</li>
	{:else}
		<li class="text-center text-muted-foreground">Aucun arrêt.</li>
	{/each}
</ol>
