<script lang="ts">
	import { Check } from '@lucide/svelte';
	import { VelociteSortField } from '$core/enum/VelociteSortField';
	import { FIELD_CONFIG } from '../../core/sort-config';

	interface Props {
		fields: readonly VelociteSortField[];
		sortField: VelociteSortField;
		onSelect: (field: VelociteSortField) => void;
	}

	let { fields, sortField, onSelect }: Props = $props();
</script>

<ul class="flex flex-col gap-0.5">
	{#each fields as field (FIELD_CONFIG[field].label)}
		{@const { label, icon } = FIELD_CONFIG[field]}
		{@const Icon = icon}
		{@const isSelected = sortField === field}
		<li>
			<button
				class="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-muted sm:rounded-lg {isSelected
					? 'bg-muted'
					: ''}"
				onclick={() => onSelect(field)}
			>
				<Icon class="size-5 shrink-0 {isSelected ? 'text-primary' : 'text-muted-foreground'}" />
				<span class="flex-1 text-sm {isSelected ? 'font-medium text-primary' : ''}">{label}</span>
				{#if isSelected}
					<Check class="size-4 text-primary" />
				{/if}
			</button>
		</li>
	{/each}
</ul>
