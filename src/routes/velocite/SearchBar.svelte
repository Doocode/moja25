<script lang="ts">
	import { Search, X } from '@lucide/svelte';

	interface Props {
		class?: string;
		value: string;
		placeholder?: string;
	}

	let { value = $bindable(''), placeholder = 'Rechercher', class: className }: Props = $props();
</script>

<div class="relative {className}">
	<Search
		class="pointer-events-none absolute top-1/2 left-4 size-5.5 -translate-y-1/2 text-muted-foreground"
	/>
	<input
		type="text"
		{placeholder}
		bind:value
		class="flex w-full rounded-full border border-input bg-transparent py-3 pr-12 pl-12! text-sm shadow-xs transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 {value
			? 'pr-9'
			: ''}"
	/>
	{#if value}
		<button
			type="button"
			onclick={() => (value = '')}
			class="absolute top-1/2 right-2 -translate-y-1/2 p-2 text-muted-foreground transition-colors hover:text-foreground"
			aria-label="Vider la recherche"
		>
			<X class="size-6" />
		</button>
	{/if}
</div>
