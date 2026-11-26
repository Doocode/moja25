<script lang="ts">
	import './layout.css';
	import './fonts.css';
	import { ModeWatcher } from 'mode-watcher';
	import favicon from '#assets/favicon.svg';
	import Header from '#lib/ui/header/Header.svelte';
	import BottomNavBar from '#lib/ui/header/BottomNavBar.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<!-- <link rel="icon" href={favicon} /> -->
	<link rel="icon" href="/assets/favicon.svg" type="image/svg+xml" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<title>Asap Besançon</title>
</svelte:head>

<main>
	<Header />
	<BottomNavBar />
	<ModeWatcher />

	{@render children()}
</main>
