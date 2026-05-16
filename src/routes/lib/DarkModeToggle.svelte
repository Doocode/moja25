<script lang="ts">
	import SunIcon from '@lucide/svelte/icons/sun';
	import MoonIcon from '@lucide/svelte/icons/moon';

	import { toggleMode } from 'mode-watcher';
	import { Button } from '$shadcn/button';
</script>

<Button onclick={toggleMode} variant="ghost" size="icon" class="-my-5 size-11 rounded-full">
	<SunIcon class="size-6! scale-100 rotate-0 transition-all! dark:scale-0 dark:-rotate-90" />
	<MoonIcon
		class="absolute size-6! scale-0 rotate-90 transition-all! dark:scale-100 dark:rotate-0"
	/>
	<span class="sr-only">Changer de contraste</span>
</Button>
