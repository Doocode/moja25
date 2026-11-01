<script lang="ts">
	import { afterNavigate, goto } from '$app/navigation';
	import { ArrowLeft } from '@lucide/svelte';
	import { resolve } from '$app/paths';

	const fallbackHref = resolve('/ginko/infos-trafic');
	let canGoBack = $state(false);

	// `from` is null when this page is the first one of the session
	afterNavigate(({ from }) => {
		canGoBack = from !== null;
	});

	function goBack(event: MouseEvent) {
		event.preventDefault();
		if (canGoBack) {
			history.back();
		} else {
			goto(fallbackHref);
		}
	}
</script>

<div class="relative container mx-auto flex max-w-6xl items-center justify-between md:mt-6">
	<a
		href={fallbackHref}
		onclick={goBack}
		class="inline-flex items-center gap-2 px-4 py-4 text-sm text-muted-foreground hover:text-foreground hover:underline"
	>
		<ArrowLeft class="size-5" />
		Retour
	</a>
</div>
