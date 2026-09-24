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

<div
	class="grid gap-0.5 pt-2"
	class:grid-cols-2={fields.length === 2}
	class:grid-cols-3={fields.length === 3}
	class:grid-cols-4={fields.length === 4}
	class:grid-cols-5={fields.length === 5}
	class:grid-cols-6={fields.length === 6}
>
	{#each fields as field (field.label)}
		{@const { shortLabel, label, icon } = FIELD_CONFIG[field]}
		{@const Icon = icon}
		{@const isSelected = sortField === field}
		<button
			class="group flex flex-col items-center gap-2 rounded-xl text-center transition-colors"
			onclick={() => onSelect(field)}
		>
			<div
				class="rounded-full p-3 duration-150 {isSelected
					? 'bg-primary text-primary-foreground'
					: 'bg-muted text-muted-foreground group-hover:bg-chart-2 group-hover:text-primary-foreground'}"
			>
				<Icon class="size-7" />
			</div>
			<span class="text-xs leading-tight {isSelected ? 'font-semibold text-primary' : ''}">
				{shortLabel ?? label}
			</span>
		</button>
	{/each}
</div>
