<script lang="ts">
	import { Ghost, X } from '@lucide/svelte';
	import { Button } from '$shadcn/button';

	interface Props {
		queryInput?: string;
	}

	let { queryInput = $bindable('') }: Props = $props();

	function clearInput() {
		queryInput = '';
	}
</script>

<div
	class="flex flex-col items-center gap-3 rounded-xl border-3 border-dashed border-input py-12 text-center"
>
	<Ghost class="size-30 text-amber-600 dark:text-amber-400" />
	<div>
		<p class="heading-font mb-4 text-2xl font-light text-red-700 dark:text-red-400">
			¡ Ay, caramba !
		</p>
		<p class="mb-1 font-medium">Nous n’avons rien trouvé</p>
		<p class="mb-4 text-sm text-muted-foreground">
			Aucun résultat pour <span class="font-medium text-foreground">"{queryInput}"</span>
		</p>

		<Button onclick={clearInput}>
			<X class="size-5" />
			<span>Effacer la recherche</span>
		</Button>
	</div>
</div>
