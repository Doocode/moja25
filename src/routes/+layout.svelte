<script lang="ts">
	import './layout.css';
	import './fonts.css';
	import { ModeWatcher } from 'mode-watcher';
	import favicon from '$lib/assets/favicon.svg';
	import Header from '$lib/ui/header/Header.svelte';
	import BottomNavBar from '$lib/ui/header/BottomNavBar.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<title>Moja25</title>
</svelte:head>

<main>
	<Header />
	<BottomNavBar />
	<ModeWatcher />

	{@render children()}
</main>
