<script lang="ts">
	import type { Ligne, Message } from '$core/dto/ginko';
	import { resolve } from '$app/paths';
	import { BadgeLigne } from '$lib/ui/ginko';
	import Etat from '../../Etat.svelte';

	interface Props {
		messages: Message[];
		lignes: Ligne[];
	}

	let { messages, lignes }: Props = $props();

	const getLignes = (message: Message) =>
		message.lignes
			.map((id) => lignes.find((l) => l.id === id))
			.filter((l): l is Ligne => l !== undefined);
</script>

<p class="mb-2 text-sm text-muted-foreground">
	{messages.length} message{messages.length > 1 ? 's' : ''}
</p>
<ul class="grid gap-1">
	{#each messages as message (message.id)}
		<li>
			<a
				href={resolve('/ginko/infos-trafic/message/[id]', { id: String(message.id) })}
				class="flex flex-col items-start gap-2 rounded-xl border border-input/50 bg-card p-4 hover:bg-secondary"
			>
				<div class="flex flex-wrap items-center gap-1">
					<Etat etat={message.etat} />
				</div>
				<div>{@html message.titre}</div>
				<div>
					{#each getLignes(message) as ligne (ligne.id)}
						<BadgeLigne {ligne} />
					{/each}
				</div>
			</a>
		</li>
	{/each}
</ul>
