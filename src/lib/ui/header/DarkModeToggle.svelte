<script lang="ts">
	import { toggleMode } from 'mode-watcher';
	import SunIcon from '@lucide/svelte/icons/sun';
	import MoonIcon from '@lucide/svelte/icons/moon';
	import { Button } from '#shadcn/button/index.ts';
</script>

<Button
	onclick={toggleMode}
	variant="ghost"
	size="icon"
	class="h-11.25 w-11.25 rounded-lg dark:hover:bg-input/50"
	title="Changer d'ambiance"
>
	<SunIcon class="size-6! scale-100 rotate-0 transition-all! dark:scale-0 dark:-rotate-90" />
	<MoonIcon
		class="absolute size-6! scale-0 rotate-90 transition-all! dark:scale-100 dark:rotate-0"
	/>
	<span class="sr-only">Changer d'ambiance</span>
</Button>
