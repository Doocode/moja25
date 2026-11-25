<script lang="ts">
	import type { Ligne, Message } from '#core/dto/ginko/index.ts';
	import { resolve } from '$app/paths';
	import { BadgeLigne } from '#lib/ui/ginko/index.ts';
	import Etat from '../../Etat.svelte';
	import { Etat as EtatEnum } from '../../enums';

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
<ul class="grid">
	{#each messages as message (message.id)}
		<li>
			<a
				href={resolve('/ginko/infos-trafic/message/[id]', { id: String(message.id) })}
				class="grid rounded-xl border border-transparent py-4 hover:border-input/70 hover:bg-secondary/50 active:bg-secondary"
			>
				<div
					class={{
						'-ml-0.75 flex flex-col items-start gap-2 border-l-5 px-4': true,
						'border-green-500 dark:border-green-400': message.etat === EtatEnum.Aucune_perturbation,
						'border-blue-500 dark:border-blue-400': message.etat === EtatEnum.Information_réseau,
						'border-slate-500 dark:border-slate-400': message.etat === EtatEnum.Perturbation_future,
						'border-amber-500 dark:border-amber-400':
							message.etat === EtatEnum.Perturbation_en_cours,
						'border-red-500 dark:border-red-400': message.etat === EtatEnum.Circulation_interrompue
					}}
				>
					<Etat etat={message.etat} />
					<div class="text-lg font-bold">{@html message.titre}</div>
					<div class="flex flex-wrap gap-1">
						{#each getLignes(message) as ligne (ligne.id)}
							<BadgeLigne {ligne} />
						{/each}
					</div>
				</div>
			</a>
		</li>
	{/each}
</ul>
