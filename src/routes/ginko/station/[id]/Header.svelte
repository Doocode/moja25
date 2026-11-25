<script lang="ts">
	import type { FormattedArret } from '#core/dto/ginko/index.ts';
	import TabBar from './tabs/TabBar.svelte';

	interface Props {
		arret: FormattedArret;
	}

	let { arret }: Props = $props();
</script>

<header
	class="bg-linear-to-b from-cyan-300 to-transparent px-4 py-8 text-center md:py-4 md:text-start dark:from-cyan-800"
>
	<div
		class="container m-auto grid justify-items-center gap-3 md:flex md:items-center md:justify-between md:px-4"
	>
		<h1 class="flex-2 text-2xl font-black md:text-4xl">
			{#if arret.nomDecoupe}
				<span class="block text-sm font-normal text-foreground/70">{arret.nomDecoupe.ville}</span>
				<span class="block">{arret.nomDecoupe.station}</span>
			{:else}
				{arret.nom}
			{/if}
		</h1>

		<TabBar />

		<div class="flex flex-2 justify-end"></div>
	</div>
</header>
