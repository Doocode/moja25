<script lang="ts">
	import type { Ligne } from '$core/dto/ginko';
	import type { Component } from 'svelte';
	import ListLignes from './ListLignes.svelte';

	interface Props {
		icon?: Component;
		label: string;
		items: Ligne[];
	}

	let { icon, label, items }: Props = $props();
</script>

<section>
	<header class="flex items-center gap-2 py-2">
		{#if icon}
			{@const Icon = icon}
			<Icon class="size-6" />
		{/if}
		<h2 class="text-lg font-semibold">{label}</h2>
	</header>
	<ListLignes {items} />
</section>
