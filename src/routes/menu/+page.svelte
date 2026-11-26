<script>
	import Hero from './Hero.svelte';
	import ToolBar from './ToolBar.svelte';
	import { menuHubLinks } from '#lib/ui/header/links.ts';
	import ListHub from './ListHub.svelte';
	import ListSubPages from './ListSubPages.svelte';
	import { ginkoLinks, velociteLinks } from './links.ts';
</script>

<main class="pb-16">
	<Hero />
	<ToolBar />

	<ListHub links={menuHubLinks} />

	<ListSubPages links={ginkoLinks} heading="Bus & tram" kind="ginko" />
	<ListSubPages links={velociteLinks} heading="Velocite" kind="velocite" />
</main>
