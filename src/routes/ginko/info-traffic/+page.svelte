<script lang="ts">
	import type { Message } from '$core/dto/ginko';
	import ListMessage from './ListMessage.svelte';

	interface Props {
		data: {
			messages: Message[];
		};
	}

	let { data }: Props = $props();

	let messages = $derived<Message[]>(data.messages);
</script>

<div class="container m-auto max-w-lg p-4">
	<h1 class="mb-4 text-2xl font-bold">Info-traffic</h1>
	<ListMessage {messages} />
</div>
