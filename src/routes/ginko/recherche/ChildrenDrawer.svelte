<script lang="ts">
	import * as Drawer from '$shadcn/drawer';
	import type { FormattedArret } from '$core/dto/ginko';
	import GroupContent from './GroupContent.svelte';

	interface Props {
		open: boolean;
		arret: FormattedArret | null;
	}

	let { open = $bindable(false), arret }: Props = $props();
</script>

<Drawer.Root bind:open>
	<Drawer.Content class="mx-auto max-w-150 pb-18 md:pb-6">
		<Drawer.Header>
			<Drawer.Title class="font-bold">{arret?.nom}</Drawer.Title>
		</Drawer.Header>

		{#if arret?.children?.length}
			<div class="overflow-y-auto px-4 pb-4 md:px-10">
				<GroupContent {arret} />
			</div>
		{/if}
	</Drawer.Content>
</Drawer.Root>
