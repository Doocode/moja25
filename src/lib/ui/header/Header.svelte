<script lang="ts">
	import { resolve } from '$app/paths';
	import DarkModeToggle from './DarkModeToggle.svelte';
	import TopNavBar from './TopNavBar.svelte';
</script>

<header class="bg-[#91bdff] dark:bg-[#0e3877]">
	<div class="container mx-auto flex items-center justify-between gap-4 p-2 pl-4 md:p-3 lg:p-4">
		<h1 class="text-2xl font-bold">
			<a href={resolve('/')} class="hover:text-primary hover:underline">Moja25</a>
		</h1>

		<TopNavBar />

		<div class="flex items-center gap-0">
			<DarkModeToggle />
		</div>
	</div>
</header>
