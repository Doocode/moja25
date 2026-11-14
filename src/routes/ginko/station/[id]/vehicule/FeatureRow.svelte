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

<div class="relative grid min-h-11 content-center gap-0.5 pl-14">
	<dt class="font-medium">
		<span
			class={{
				'absolute top-1/2 left-0 flex size-11 -translate-y-1/2 items-center justify-center rounded-full': true,
				'border-2 border-dashed border-red-500 text-red-500 dark:border-red-400 dark:text-red-400':
					available === false,
				'bg-sky-200 text-sky-700 dark:bg-sky-900 dark:text-sky-100': available !== false
			}}
			aria-hidden="true"
		>
			<Icon class="size-5.5" />
		</span>
		{title}
	</dt>
	<dd
		class={{
			'font-semibold': true,
			'text-green-600 dark:text-green-400': available === true,
			'text-red-600 dark:text-red-400': available === false,
			'text-muted-foreground': available === null
		}}
	>
		{value}
	</dd>
</div>
