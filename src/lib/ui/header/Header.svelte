<script lang="ts">
	import { resolve } from '$app/paths';
	import DarkModeToggle from './DarkModeToggle.svelte';
	import TopNavBar from './TopNavBar.svelte';

	function enableAbsolutePositioning() {
		//return page.route.id === '/velocite/stations/[id]';
		return false;
	}

	function enableTransparentBackground() {
		//return page.route.id === '/velocite/stations/[id]';
		return false;
	}
</script>

<header
	class={{
		'border-b border-[#00000077] bg-background dark:border-[#ffffff77]':
			!enableTransparentBackground(),
		'absolute inset-[0_0_auto] z-10': enableAbsolutePositioning()
	}}
>
	<div class="container mx-auto flex items-center justify-between gap-4 p-2 pl-4">
		<h1 class="flex-1 text-2xl font-black">
			<a
				href={resolve('/')}
				class="whitespace-nowrap underline-offset-3 hover:text-primary hover:underline"
			>
				Terminus
				<span class="font-light text-primary">Besançon</span>
			</a>
		</h1>

		<TopNavBar />

		<div class="flex flex-1 items-center justify-end gap-0">
			<DarkModeToggle />
		</div>
	</div>
</header>
