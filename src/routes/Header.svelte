<script lang="ts">
	import favicon from '$assets/favicon.svg';
	import DarkModeToggle from './lib/DarkModeToggle.svelte';
</script>

<header class="bg-primary text-primary-foreground">
	<div class="container m-auto flex items-center justify-between p-4">
		<a href="/" class="flex items-center gap-2">
			<img src={favicon} alt="Logo de Moja Besançon" class="h-8" />
			<h1 class="text-3xl font-bold hover:underline">Moja <span class="sr-only">Besançon</span></h1>
		</a>

		<DarkModeToggle />
	</div>
</header>
