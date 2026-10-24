<script lang="ts">
	import { Ban, RefreshCw, RefreshCwOff } from '@lucide/svelte';
	import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '$shadcn/dropdown-menu';
	import { buttonVariants } from '$shadcn/button';
	import { cn } from '$lib/utils';

	interface Props {
		interval: number;
		size?: 'md' | 'lg';
	}

	let { interval = $bindable(15_000), size = 'md' }: Props = $props();

	type RefreshOption =
		{ value: 0; label: string } | { value: number; number: string; unit: string; label: string };

	const REFRESH_OPTIONS: RefreshOption[] = [
		{ value: 0, label: 'Jamais' },
		{ value: 15_000, number: '15', unit: 'sec', label: '15 secondes' },
		{ value: 60_000, number: '1', unit: 'min', label: '1 minute' },
		{ value: 300_000, number: '5', unit: 'min', label: '5 minutes' },
		{ value: 600_000, number: '10', unit: 'min', label: '10 minutes' },
		{ value: 1_800_000, number: '30', unit: 'min', label: '30 minutes' }
	];

	function select(value: number) {
		interval = value;
	}

	const currentLabel = $derived(REFRESH_OPTIONS.find((o) => o.value === interval)?.label ?? '');
	const isNever = $derived(interval === 0);
	const iconSize = $derived(size === 'md' ? 'size-5' : 'size-6');
</script>

<DropdownMenu>
	<DropdownMenuTrigger
		title="Fréquence d'actualisation des informations"
		class={cn(
			buttonVariants({
				variant: isNever ? 'ghost' : 'outline',
				size: 'icon'
			}),
			size === 'md' ? 'size-9 rounded-md' : '',
			size === 'lg' ? 'size-11.25 rounded-lg' : ''
		)}
	>
		{#if isNever}
			<RefreshCwOff class={iconSize} />
		{:else}
			<RefreshCw class={iconSize} />
		{/if}
		<span class="sr-only">Fréquence de rafraîchissement : {currentLabel}</span>
	</DropdownMenuTrigger>

	<DropdownMenuContent
		align="end"
		class="w-auto rounded-xl bg-popover/70 p-4 ring-foreground/30 backdrop-blur-lg dark:bg-popover/70"
	>
		<p class="mb-1 px-0.5 text-xs font-bold">Données en temps-réel</p>
		<p class="mb-4 w-50 px-0.5 text-xs">Fréquence de rafraîchissement des données en temps-réel</p>

		{#if isNever}
			<p class="my-4 text-xs">
				<span class="mr-2 -mb-0.75 inline-block size-4 rounded-xl bg-red-500"></span>
				Actualisation désactivée
			</p>
		{/if}

		<div class="grid grid-cols-3 gap-1.5">
			{#each REFRESH_OPTIONS as option (option.value)}
				<button
					type="button"
					onclick={() => select(option.value)}
					aria-label={option.label}
					aria-pressed={interval === option.value}
					class={{
						'flex aspect-square w-16 flex-col items-center justify-center rounded-md border transition-colors': true,
						'border-primary bg-primary text-primary-foreground': interval === option.value,
						'border-border bg-background text-foreground hover:bg-muted': interval !== option.value
					}}
				>
					{#if option.value === 0}
						<span class:text-red-500={!isNever}>
							<Ban class="size-7" />
						</span>
					{:else}
						<span class="text-2xl leading-none font-bold">{option.number}</span>
						<span class="mt-0.5 text-xs">{option.unit}</span>
					{/if}
				</button>
			{/each}
		</div>
	</DropdownMenuContent>
</DropdownMenu>
