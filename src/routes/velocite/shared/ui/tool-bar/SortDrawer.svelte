<script lang="ts">
	import { VelociteSortField } from '#core/enum/VelociteSortField.ts';
	import * as Drawer from '#shadcn/drawer/index.ts';
	import { SortForm } from './index';

	interface Props {
		sortField: VelociteSortField;
		open: boolean;
	}

	let { sortField = $bindable(), open = $bindable() }: Props = $props();
</script>

<Drawer.Root bind:open>
	<Drawer.Content class="pb-safe mx-auto max-w-150">
		<Drawer.Header>
			<Drawer.Title>Trier par</Drawer.Title>
		</Drawer.Header>

		<div class="overflow-y-auto pb-8">
			<div class="mx-auto w-full max-w-125">
				<SortForm bind:sortField onSelect={() => (open = false)} />
			</div>
		</div>
	</Drawer.Content>
</Drawer.Root>
