<script lang="ts">
	import { headerLinks } from './links';
	import { BusFront } from '@lucide/svelte';
	import DomainHeader from '$lib/ui/header/DomainHeader.svelte';
</script>

<DomainHeader
	class="bg-[#00ddff] dark:bg-[#007ab3]"
	links={headerLinks}
	icon={BusFront}
	heading="Bus & tram"
	headingHref="/ginko"
/>
