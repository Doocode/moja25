<script lang="ts">
	import { TriangleAlert, CircleCheckBig } from '@lucide/svelte';
	import type { FormattedStation } from '$core/dto/jcdecaux';
	import * as Drawer from '$shadcn/drawer';

	interface Props {
		station: FormattedStation;
		open: boolean;
	}

	let { station, open = $bindable(false) }: Props = $props();

	const unavailableStands = $derived(station.unavailableStands);
</script>

<Drawer.Root bind:open>
	<Drawer.Content class="pb-safe mx-auto max-w-150">
		<Drawer.Header>
			<Drawer.Title>Bornes indisponibles</Drawer.Title>
		</Drawer.Header>

		<div class="overflow-y-auto px-4 pb-8 md:px-10">
			{#if unavailableStands < 1}
				<div class="m-auto mb-6 grid max-w-70 gap-2 text-center">
					<CircleCheckBig class="mx-auto size-20 text-green-600 dark:text-green-400" />
					<p class="text-balance">
						La station "{station.formattedName}" ne possède pas de borne indisponible.
					</p>
				</div>
				<p>
					Les bornes indisponibles sont des bornes qui se retrouvent dans une des situations
					suivantes :
				</p>
			{/if}

			{#if unavailableStands > 0}
				<div class="m-auto mb-6 grid max-w-70 gap-2 text-center">
					<TriangleAlert class="mx-auto size-20 text-orange-600 dark:text-orange-400" />
					<p class="text-balance">
						La station "{station.formattedName}" possède
						<strong class="font-bold text-orange-700 dark:text-orange-300">
							{unavailableStands}
							{unavailableStands > 1 ? 'bornes indisponibles' : 'borne indisponible'}
						</strong>.
					</p>
				</div>

				<p>
					Les bornes indisponibles le sont généralement de manière temporaire. Il s'agit de bornes
					qui se retrouvent dans une des situations suivantes :
				</p>
			{/if}

			<ul class="mt-3 grid list-inside list-disc gap-1.25">
				<li>borne mise hors-service pour des travaux ou une maintenance ;</li>
				<li>borne occupée par un vélo électrique en cours de rechargement ;</li>
				<li>borne occupée par un vélo mal raccordé ou avec un faux contact ;</li>
				<li>borne occupée par un vélo réservé par un utilisateur ;</li>
			</ul>
		</div>
	</Drawer.Content>
</Drawer.Root>
