<script lang="ts">
	import { Button } from '$shadcn/button';
	import { CircleChevronDown, CircleChevronUp, MessageCircleQuestionMark } from '@lucide/svelte';
	import { slide } from 'svelte/transition';

	interface Props {
		open?: boolean;
	}
	let { open = $bindable(false) }: Props = $props();
	let pageWidth = $state(500);
	let limitWidth = 640;

	function toggle() {
		open = !open;
	}
</script>

<svelte:window bind:innerWidth={pageWidth} />

<div class="grid rounded-2xl bg-slate-200 text-sm dark:bg-slate-800">
	{#if pageWidth >= limitWidth}
		<h3 class="px-4 pt-4 text-lg font-bold text-balance">
			<MessageCircleQuestionMark class="float-right size-12 text-primary md:size-10" /> Pourquoi certaines
			bornes sont indisponibles ?
		</h3>
	{:else}
		<Button
			class="h-auto w-full gap-4 p-4 wrap-normal whitespace-normal"
			variant="secondary"
			onclick={toggle}
		>
			<MessageCircleQuestionMark class="size-5" />
			<h2 class="flex-1 text-balance">Pourquoi certaines bornes sont indisponibles ?</h2>
			{#if open}
				<CircleChevronUp class="size-5" />
			{:else}
				<CircleChevronDown class="size-5" />
			{/if}
		</Button>
	{/if}

	{#if open || pageWidth >= limitWidth}
		<div class="p-4" transition:slide>
			<p>
				Ces bornes indisponibles (de manière temporaire) peuvent l'être pour l'une de ces raisons :
			</p>
			<ul class="mt-3 grid list-inside list-disc gap-1.25">
				<li>borne mise hors-service pour des travaux ou une maintenance</li>
				<li>borne occupée par un vélo électrique en cours de rechargement</li>
				<li>borne avec un vélo mal raccordé ou un faux contact</li>
				<li>borne avec un vélo réservé par un utilisateur</li>
			</ul>
		</div>
	{/if}
</div>
