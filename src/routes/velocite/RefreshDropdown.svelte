<script lang="ts">
	import { Ban, RefreshCw, RefreshCwOff } from '@lucide/svelte';
	import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '$shadcn/dropdown-menu';
	import { buttonVariants } from '$shadcn/button';
	import { browser } from '$app/environment';

	interface Props {
		interval: number;
	}

	let { interval = $bindable(15_000) }: Props = $props();

	const STORAGE_KEY = 'velocite-search-refresh-interval';

	type RefreshOption =
		| { value: 0; label: string }
		| { value: number; number: string; unit: string; label: string };

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
		if (browser) localStorage.setItem(STORAGE_KEY, String(value));
	}

	const currentLabel = $derived(REFRESH_OPTIONS.find((o) => o.value === interval)?.label ?? '');
	const isNever = $derived(interval === 0);
</script>

<DropdownMenu>
	<DropdownMenuTrigger class={buttonVariants({ variant: 'outline', size: 'icon' })}>
		{#if isNever}
			<RefreshCwOff class="size-5 text-red-500" />
		{:else}
			<RefreshCw class="size-5" />
		{/if}
		<span class="sr-only">Fréquence de rafraîchissement : {currentLabel}</span>
	</DropdownMenuTrigger>

	<DropdownMenuContent
		align="end"
		class="dark; w-auto rounded-xl bg-popover/20 p-4 ring-foreground/30 backdrop-blur-lg dark:bg-popover/40"
	>
		<p class="mb-1 px-0.5 text-xs font-medium tracking-wider text-muted-foreground uppercase">
			Actualiser
		</p>
		<p class="mb-4 w-50 px-0.5 text-xs text-muted-foreground">
			Choisissez la fréquence de rafraîchissement des données
		</p>
		<div class="grid grid-cols-3 gap-1.5">
			{#each REFRESH_OPTIONS as option (option.value)}
				<button
					type="button"
					onclick={() => select(option.value)}
					aria-label={option.label}
					aria-pressed={interval === option.value}
					class="flex aspect-square w-16 flex-col items-center justify-center rounded-md border transition-colors
						{interval === option.value
						? 'border-primary bg-primary/10 text-primary'
						: 'border-border bg-background text-foreground hover:bg-muted'}"
				>
					{#if option.value === 0}
						<Ban class="size-7 text-red-500" />
					{:else}
						<span class="text-2xl leading-none font-bold">{option.number}</span>
						<span class="mt-0.5 text-xs text-muted-foreground">{option.unit}</span>
					{/if}
				</button>
			{/each}
		</div>
	</DropdownMenuContent>
</DropdownMenu>
