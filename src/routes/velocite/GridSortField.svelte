<script lang="ts">
	import { VelociteSortField } from '$core/enum/VelociteSortField';
	import { FIELD_CONFIG } from './sort-config';

	interface Props {
		fields: readonly VelociteSortField[];
		sortField: VelociteSortField;
		onSelect: (field: VelociteSortField) => void;
	}

	let { fields, sortField, onSelect }: Props = $props();
</script>

<div class="grid grid-cols-4 gap-0.5 pt-2">
	{#each fields as field}
		{@const { shortLabel, label, Icon } = FIELD_CONFIG[field]}
		{@const isSelected = sortField === field}
		<button
			class="group flex flex-col items-center gap-2 rounded-xl text-center transition-colors"
			onclick={() => onSelect(field)}
		>
			<div
				class="rounded-full p-3 duration-150 {isSelected
					? 'bg-primary text-primary-foreground'
					: 'bg-muted text-muted-foreground group-hover:bg-primary/50 group-hover:text-primary-foreground'}"
			>
				<Icon class="size-7" />
			</div>
			<span class="text-xs leading-tight {isSelected ? 'font-semibold text-primary' : ''}">
				{shortLabel ?? label}
			</span>
		</button>
	{/each}
</div>
