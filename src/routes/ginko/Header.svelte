<script lang="ts">
	import { mainLinks } from './links';
	import { BusFront } from '@lucide/svelte';
	import DomainHeader from '$lib/ui/header/DomainHeader.svelte';
</script>

<DomainHeader
	class="bg-[#00ddff] dark:bg-[#007ab3]"
	links={mainLinks}
	icon={BusFront}
	heading="Bus & tram"
	headingHref="/ginko"
/>
