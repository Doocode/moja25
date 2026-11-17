<script lang="ts">
	import type { FormattedArret } from '$core/dto/ginko';

	interface Props {
		arret: FormattedArret;
	}

	let { arret }: Props = $props();
</script>

<header
	class="bg-linear-to-r from-cyan-300 to-blue-200 px-4 pt-10 pb-16 text-center dark:from-cyan-800 dark:to-blue-800"
>
	<div class="container m-auto grid justify-items-center gap-3">
		<h1 class="text-2xl font-black md:text-4xl">
			{#if arret.nomDecoupe}
				<span class="block text-sm font-normal text-foreground/70">{arret.nomDecoupe.ville}</span>
				<span class="block">{arret.nomDecoupe.station}</span>
			{:else}
				{arret.nom}
			{/if}
		</h1>
	</div>
</header>
