<script lang="ts">
	import type { Component } from 'svelte';

	interface Props {
		icon: Component;
		title: string;
		value: string;
		available: boolean | null;
	}

	let { icon: Icon, title, value, available }: Props = $props();
</script>

<div class="grid min-w-0 justify-items-center gap-1 text-center">
	<dt class="grid justify-items-center gap-2 text-sm font-medium">
		<span
			class={{
				'relative flex size-16 items-center justify-center rounded-full': true,
				'bg-sky-200 text-sky-700 dark:bg-sky-900 dark:text-sky-100': available !== false,
				'bg-slate-200 text-red-500 dark:bg-slate-700 dark:text-red-400': available === false
			}}
			aria-hidden="true"
		>
			<Icon class="size-8" />
		</span>
		{title}
	</dt>
	<dd
		class={{
			'text-sm font-semibold': true,
			'text-green-700 dark:text-green-400': available === true,
			'text-red-700 dark:text-red-400': available === false,
			'text-muted-foreground': available === null
		}}
	>
		{value}
	</dd>
</div>
