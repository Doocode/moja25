<script lang="ts">
	import {
		CircleCheckBig,
		CreditCard,
		Star,
		StarOff,
		TriangleAlert,
		Wifi,
		ThumbsUp,
		GlobeOff,
		Ban
	} from '@lucide/svelte';
	import type { FormattedStation } from '$core/dto/jcdecaux';
	import Indicator from './Indicator.svelte';
	import { cn } from '$lib/utils.js';

	interface Props {
		station: FormattedStation;
		class?: string;
	}

	let { station, class: className }: Props = $props();

	const isOpen = $derived(station.status === 'OPEN');
</script>

<div class={cn('m-auto grid max-w-80 grid-cols-4 gap-1 sm:max-w-110 sm:gap-4', className)}>
	<Indicator
		icon={isOpen ? CircleCheckBig : Ban}
		text={isOpen ? 'Station ouverte' : 'Station fermée'}
		enabled={isOpen}
	/>
	<Indicator
		icon={station.connected ? Wifi : GlobeOff}
		text={station.connected ? 'Station en ligne' : 'Station hors ligne'}
		enabled={station.connected}
	/>
	<Indicator
		slash
		icon={CreditCard}
		text={station.banking ? 'Paiement CB disponible' : 'Paiement CB indisponible'}
		enabled={station.banking}
	/>
	<Indicator
		icon={station.bonus ? Star : StarOff}
		text={station.bonus ? 'Station bonus' : 'Station non bonus'}
		enabled={station.bonus}
		kind="warning"
	/>
	<!--
	<Indicator
		icon={station.overflow ? TriangleAlert : ThumbsUp}
		text={station.overflow ? 'Station pleine' : 'Station non pleine'}
		kind={station.overflow ? 'danger' : 'success'}
		enabled
	/>
	-->
</div>
