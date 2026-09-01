<script lang="ts">
	import type { GroupedTempsByLine } from '$core/helper/ginko/groupTemps';
	import LineBadge from './LineBadge.svelte';
	import LineDestination from './LineDestination.svelte';

	interface Props {
		group: GroupedTempsByLine;
	}

	let { group }: Props = $props();
</script>

<header class="flex items-center gap-3">
	<LineBadge
		numLignePublic={group.numLignePublic}
		couleurFond={group.couleurFond}
		couleurTexte={group.couleurTexte}
		modeTransport={group.modeTransport}
	/>
	<LineDestination
		destination={group.destination}
		precisionDestination={group.precisionDestination}
	/>
</header>
