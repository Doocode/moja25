<script lang="ts">
	import { CircleSlash } from '@lucide/svelte';
	import type { TempsAttente } from '#core/dto/ginko/index.ts';

	interface Props {
		temps: TempsAttente;
	}

	let { temps }: Props = $props();
</script>

<main
	class="grid place-items-center content-center items-center justify-center text-center text-orange-600 dark:text-orange-400"
>
	<CircleSlash class="size-9" stroke-width={2} />
	<p class="text-lg font-bold">{temps.temps}</p>
</main>
