<script lang="ts">
	import { scale, fade } from 'svelte/transition';
</script>

<svelte:head>
	<title>Terminus Besançon</title>
</svelte:head>

<main class="mx-auto max-w-150 p-8 text-center sm:p-12">
	<div class="inline-flex flex-wrap items-center justify-center gap-6 md:mt-6">
		<img
			src="/assets/favicon.svg"
			class="mx-auto size-50 rounded-full"
			alt="Logo de Terminus Besançon"
			in:scale|global
		/>

		<h1
			class="heading-font text-4xl leading-none font-black tracking-tight md:text-start"
			in:fade|global={{ delay: 150 }}
		>
			Terminus
			<span class="block font-light text-blue-600 dark:text-blue-400">Besançon</span>
		</h1>
	</div>
</main>
