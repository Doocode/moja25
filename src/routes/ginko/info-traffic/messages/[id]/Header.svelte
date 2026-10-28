<script lang="ts">
	import type { Message } from '$core/dto/ginko';
	import Etat from '../../Etat.svelte';

	interface Props {
		message: Message;
	}

	let { message }: Props = $props();
</script>

<header class="grid justify-items-start gap-3">
	<Etat etat={message.etat} />
	<h1 class="text-2xl font-bold">{@html message.titre}</h1>
</header>
