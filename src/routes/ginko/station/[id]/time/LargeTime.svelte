<script lang="ts">
	import type { TempsAttente } from '$core/dto/ginko';

	interface Props {
		temps: TempsAttente;
		theoretical?: boolean;
	}

	let { temps, theoretical = false }: Props = $props();

	const tempsEnMinute = $derived(Math.round(temps.tempsEnSeconde / 60));
	const tempsEnHeure = $derived(Math.round(tempsEnMinute / 60));
	const labelHeure = $derived(tempsEnHeure > 1 ? 'heures' : 'heure');
</script>

<div class="flex flex-col">
	{#if tempsEnMinute <= 99}
		{@render time(tempsEnMinute, 'min')}
	{:else}
		{@render time(tempsEnHeure, labelHeure)}
	{/if}

	{#if theoretical}
		<span class="text-xs font-semibold text-muted-foreground">Théorique</span>
	{/if}
</div>

{#snippet time(value: number, label: string)}
	<span class="text-5xl">{value}</span>
	<span class="text-xs">{label}</span>
{/snippet}
