<script lang="ts">
	import { CircleSlash } from '@lucide/svelte';

	interface Props {
		tempsAttente: TempsAttente;
	}

	let { tempsAttente }: Props = $props();
</script>

<main
	class="grid place-items-center content-center items-center justify-center text-center text-orange-600 dark:text-orange-400"
>
	<CircleSlash class="size-9" stroke-width={2} />
	<p class="text-lg font-bold">{tempsAttente.temps}</p>
</main>
