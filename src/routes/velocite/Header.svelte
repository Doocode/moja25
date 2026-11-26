<script lang="ts">
	import { Bike } from '@lucide/svelte';
	import DomainHeader from '#lib/ui/header/DomainHeader.svelte';
	import { headerLinks as links } from './links.ts';
</script>

<DomainHeader
	{links}
	class="bg-[#ff9add] dark:bg-[#b7007a]"
	icon={Bike}
	heading="Vélocité"
	headingHref="/velocite"
/>
