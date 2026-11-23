<script lang="ts">
	import * as Tabs from '$shadcn/tabs';
	import { BusFront, Compass, Bike } from '@lucide/svelte';
	import TabButton from './TabButton.svelte';

	interface Props {
		velocite?: boolean;
	}
	let { velocite = false }: Props = $props();
</script>

<Tabs.List class="mx-auto h-auto! bg-transparent">
	<TabButton value="times" name="Bus & tram" icon={BusFront} />
	<TabButton value="nearby" name="À proximité" icon={Compass} />
	{#if velocite}
		<TabButton value="velocite" name="Velocité" icon={Bike} />
	{/if}
</Tabs.List>
