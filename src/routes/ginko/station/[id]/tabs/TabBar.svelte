<script lang="ts">
	import * as Tabs from '#shadcn/tabs/index.ts';
	import { BusFront, Compass, Bike } from '@lucide/svelte';
	import TabButton from './TabButton.svelte';

	interface Props {
		velocite?: boolean;
	}
	let { velocite = false }: Props = $props();
</script>

<div class="flex flex-1 items-center justify-center">
	<Tabs.List class="mx-auto flex h-auto! items-center justify-center bg-transparent">
		<TabButton value="times" name="Bus & tram" icon={BusFront} />
		<TabButton value="nearby" name="À proximité" icon={Compass} />
		{#if velocite}
			<TabButton value="velocite" name="Velocité" icon={Bike} />
		{/if}
	</Tabs.List>
</div>
