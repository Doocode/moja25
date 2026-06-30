<script lang="ts">
	import type { GroupedTempsByLine } from '$core/helper/ginko/groupTemps';
	import ArrivalHead from './ArrivalHead.svelte';
	import ArrivalEstimations from './ArrivalEstimations.svelte';

	interface Props {
		group: GroupedTempsByLine;
	}

	let { group }: Props = $props();
</script>

<article
	class="grid gap-3 rounded-2xl bg-card p-3 hover:bg-secondary sm:p-4 md:grid-cols-[1fr_300px]"
>
	<ArrivalHead {group} />
	<ArrivalEstimations estimations={group.estimations} />
</article>
