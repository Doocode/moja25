<script lang="ts">
	import * as Tabs from '$shadcn/tabs';
	import { Bus, Compass } from '@lucide/svelte';
</script>

<Tabs.List class="sticky top-4 z-10 mx-auto h-auto! rounded-2xl backdrop-blur-2xl sm:bg-muted/50">
	<Tabs.Trigger value="times" class="flex-1 gap-2 rounded-xl p-3">
		<Bus class="size-5" />
		Bus &amp; tram
	</Tabs.Trigger>
	<Tabs.Trigger value="nearby" class="flex-1 gap-2 rounded-xl p-3">
		<Compass class="size-5" />
		À proximité
	</Tabs.Trigger>
</Tabs.List>
