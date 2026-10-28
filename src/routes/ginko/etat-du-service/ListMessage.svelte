<script lang="ts">
	import type { Message } from '$core/dto/ginko';
	import { resolve } from '$app/paths';
	import Etat from './Etat.svelte';

	interface Props {
		messages: Message[];
	}

	let { messages }: Props = $props();
</script>

<ul class="grid gap-1">
	{#each messages as message (message.id)}
		<li>
			<a
				href={resolve('/ginko/etat-du-service/messages/[id]', { id: String(message.id) })}
				class="flex flex-col items-start gap-1 rounded-xl border border-input/50 bg-card p-4 hover:bg-secondary"
			>
				<Etat etat={message.etat} />
				<div>{@html message.titre}</div>
			</a>
		</li>
	{/each}
</ul>
