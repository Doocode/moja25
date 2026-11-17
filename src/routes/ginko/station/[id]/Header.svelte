<script lang="ts">
	import type { Arret } from '$core/dto/ginko';

	interface Props {
		arret: Arret;
	}

	let { arret }: Props = $props();
</script>

<header
	class="bg-linear-to-r from-cyan-300 to-blue-200 px-4 pt-10 pb-18 text-center dark:from-cyan-800 dark:to-blue-800"
>
	<div class="container m-auto grid justify-items-center gap-3">
		<h1 class="text-2xl font-black md:text-4xl">{arret.nom}</h1>
	</div>
</header>
