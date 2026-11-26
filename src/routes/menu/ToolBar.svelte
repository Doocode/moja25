<script lang="ts">
	import { toggleMode } from 'mode-watcher';
	import SunIcon from '@lucide/svelte/icons/sun';
	import MoonIcon from '@lucide/svelte/icons/moon';
	import { Button } from '#shadcn/button/index.ts';
</script>

<div class="mx-auto -mt-6 flex max-w-150 justify-end gap-2 px-4">
	<Button
		onclick={toggleMode}
		variant="secondary"
		size="icon"
		class="size-12 rounded-full"
		title="Changer d'ambiance"
	>
		<SunIcon class="size-6 scale-100 rotate-0 transition-all! dark:scale-0 dark:-rotate-90" />
		<MoonIcon
			class="absolute size-6 scale-0 rotate-90 transition-all! dark:scale-100 dark:rotate-0"
		/>
		<span class="sr-only">Changer d'ambiance</span>
	</Button>
</div>
