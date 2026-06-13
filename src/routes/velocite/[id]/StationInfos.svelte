<script lang="ts">
	import { CheckCircle, CreditCard, Star, TriangleAlert, Wifi, XCircle } from '@lucide/svelte';
	import type { FormattedStation } from '$core/dto/jcdecaux';
	import InfoCard from './InfoCard.svelte';

	interface Props {
		station: FormattedStation;
		class?: string;
	}

	let { station, class: className }: Props = $props();

	const isOpen = $derived(station.status === 'OPEN');

	const attributes = $derived([
		{ Icon: CheckCircle, label: 'Ouverte', active: isOpen, activeClass: 'text-green-500' },
		{ Icon: Wifi, label: 'Connectée', active: station.connected, activeClass: 'text-green-500' },
		{
			Icon: CreditCard,
			label: 'Carte bancaire',
			active: station.banking,
			activeClass: 'text-green-500'
		},
		{ Icon: Star, label: 'Bonus', active: station.bonus, activeClass: 'text-yellow-500' },
		{
			Icon: TriangleAlert,
			label: 'Débordement',
			active: station.overflow,
			activeClass: 'text-orange-500'
		}
	]);
</script>

<InfoCard title="Informations" class={className}>
	<div class="grid grid-cols-2 gap-2">
		{#each attributes as { Icon, label, active, activeClass }}
			<div class="flex items-center gap-2 text-sm">
				{#if active}
					<Icon class="size-4 {activeClass}" />
				{:else}
					<XCircle class="size-4 text-muted-foreground/40" />
				{/if}
				<span class={active ? 'text-foreground' : 'text-muted-foreground/60'}>{label}</span>
			</div>
		{/each}
	</div>
</InfoCard>
