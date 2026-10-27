<script lang="ts">
	import type { Arret, Ligne } from '$core/dto/ginko';
	import { Accessibility } from '@lucide/svelte';

	interface Props {
		stops: Arret[];
		ligne: Ligne;
	}

	let { stops, ligne }: Props = $props();
</script>

<ol class="relative mx-auto grid max-w-75">
	{#each stops ?? [] as arret, ii (arret.id + ii)}
		<li
			class={{
				'relative flex items-center py-2': true,
				'gap-2': ii !== 0 && ii !== (stops?.length ?? 0) - 1,
				'gap-0.5': ii === 0 || ii === (stops?.length ?? 0) - 1
			}}
		>
			<span
				class={{
					'relative z-1 shrink-0 rounded-full border-3 border-background': true,
					'-left-2 size-7 rounded-sm': ii === 0 || ii === (stops?.length ?? 0) - 1,
					'-left-1 size-5 rounded-full': ii !== 0 && ii !== (stops?.length ?? 0) - 1
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
				{:else if ii == (stops?.length ?? 0) - 1}
					<p class="text-xs font-bold tracking-widest text-muted-foreground uppercase">Terminus</p>
				{/if}
				<span>{arret.nom}</span>
			</div>
			{#if arret.accessibilite > 0}
				<Accessibility
					class="size-4 text-muted-foreground"
					title="Station accessible aux PMR (Personnes à Mobilité Réduite)"
				/>
			{/if}
		</li>
	{:else}
		<li class="text-center text-muted-foreground">Aucun arrêt.</li>
	{/each}
</ol>
