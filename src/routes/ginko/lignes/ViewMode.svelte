<script lang="ts">
	import { Button } from '#shadcn/button/index.ts';
	import { ButtonGroup } from '#shadcn/button-group/index.ts';
	import { TextAlignStart, LayoutGrid } from '@lucide/svelte';

	interface Props {
		viewmode: 'grid' | 'list';
	}

	let { viewmode = $bindable('grid') }: Props = $props();
</script>

<ButtonGroup>
	<Button
		class="size-auto p-3"
		variant={viewmode === 'list' ? 'default' : 'secondary'}
		size="icon"
		title="Affichage en liste"
		onclick={() => (viewmode = 'list')}
	>
		<TextAlignStart class="size-5!" />
	</Button>
	<Button
		class="size-auto p-3"
		variant={viewmode === 'grid' ? 'default' : 'secondary'}
		size="icon"
		title="Affichage en grille"
		onclick={() => (viewmode = 'grid')}
	>
		<LayoutGrid class="size-5!" />
	</Button>
</ButtonGroup>
