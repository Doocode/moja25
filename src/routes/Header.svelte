<script lang="ts">
	import favicon from '$assets/favicon.svg';
	import DarkModeToggle from './lib/DarkModeToggle.svelte';
</script>

<header class="flex items-center justify-between bg-blue-400 p-4 dark:bg-blue-600">
	<div class="flex items-center gap-2">
		<img src={favicon} alt="Logo de Moja Besançon" class="h-8" />
		<h1 class="text-3xl font-bold">Moja <span class="sr-only">Besançon</span></h1>
	</div>

	<DarkModeToggle />
</header>
