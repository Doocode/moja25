<script lang="ts">
	import Header from './Header.svelte';
	import * as Tabs from '$lib/shadcn/ui/tabs';
	import type { Ligne, Arret } from '$core/dto/ginko';
	import { Accessibility, ArrowRight } from '@lucide/svelte';

	interface Props {
		data: {
			ligne: Ligne;
			variantes: Arret[][];
		};
	}

	let { data }: Props = $props();

	let ligne = $derived(data.ligne);
	let selected = $state('');
	let current = $derived(
		ligne.variantes.some((v) => v.id === selected) ? selected : (ligne.variantes[0]?.id ?? '')
	);
</script>

<Header {ligne} />

<!-- TODO: Display info traffic -->

<main class="container m-auto max-w-2xl p-4">
	{#if ligne.variantes.length === 0}
		<p class="text-center text-muted-foreground">Aucune variante disponible pour cette ligne.</p>
	{:else}
		<Tabs.Root value={current} onValueChange={(v) => (selected = v)}>
			<Tabs.List class="h-auto! w-full flex-wrap">
				{#each ligne.variantes as variante (variante.id)}
					<Tabs.Trigger value={variante.id} class="h-auto flex-1 p-4">
						<ArrowRight class="size-5" />
						{variante.destination}
					</Tabs.Trigger>
				{/each}
			</Tabs.List>

			{#each ligne.variantes as variante, i (variante.id)}
				<Tabs.Content value={variante.id} class="mt-4">
					{#if variante.precisionDestination}
						<p class="mb-3 text-sm text-muted-foreground">{variante.precisionDestination}</p>
					{/if}

					<ol class="relative mx-auto grid max-w-75">
						{#each data.variantes[i] ?? [] as arret, j (arret.id + j)}
							<li class="relative flex items-center gap-4 py-2">
								<span
									class="relative z-10 size-3 shrink-0 rounded-full border-2 bg-background"
									style:border-color={`#${ligne.couleurFond}`}
								></span>
								{#if j < (data.variantes[i]?.length ?? 0) - 1}
									<span
										class="absolute top-1/2 left-1.25 h-full w-0.5"
										style:background={`#${ligne.couleurFond}`}
									></span>
								{/if}
								<span class="flex-1">{arret.nom}</span>
								{#if arret.accessibilite > 0}
									<Accessibility class="size-4 text-muted-foreground" />
								{/if}
							</li>
						{:else}
							<li class="text-center text-muted-foreground">Aucun arrêt.</li>
						{/each}
					</ol>
				</Tabs.Content>
			{/each}
		</Tabs.Root>
	{/if}
</main>
