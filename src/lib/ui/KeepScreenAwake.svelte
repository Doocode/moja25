<script lang="ts">
	import { Button } from '$shadcn/button';
	import { Lightbulb, LightbulbOff } from '@lucide/svelte';
	import { onMount } from 'svelte';
	import { LocalStorageHelper, LocalStorageKey } from '$lib/core/helper/local_storage';

	interface Props {
		enabled?: boolean;
		size?: 'md' | 'lg';
		localStorageKey?: LocalStorageKey;
	}

	let { enabled = $bindable(false), size = 'md', localStorageKey = undefined }: Props = $props();

	let supported = $derived('wakeLock' in navigator);
	let wakeLock: WakeLockSentinel | null = $state(null);
	const iconSize = $derived(size === 'md' ? 'size-5' : 'size-6');

	function toggle() {
		enabled = !enabled;
		if (enabled) {
			requestWakeLock();
		} else {
			wakeLock?.release();
			wakeLock = null;
			if (localStorageKey) {
				LocalStorageHelper.removeValue(localStorageKey);
			}
		}
	}

	async function requestWakeLock() {
		if (!supported) {
			console.error('Wake Lock not supported');
			return;
		}

		try {
			// Enable the wake lock
			wakeLock = await navigator.wakeLock.request('screen');
			if (localStorageKey) {
				LocalStorageHelper.setValue(localStorageKey, 'true');
			}
		} catch (err) {
			console.error('Wake Lock Error :', err);
		}
	}

	function onVisible() {
		if (document.visibilityState === 'visible' && enabled) {
			requestWakeLock();
		}
	}

	$effect(() => {
		document.addEventListener('visibilitychange', onVisible);

		return () => {
			document.removeEventListener('visibilitychange', onVisible);
			wakeLock?.release();
			wakeLock = null;
		};
	});

	onMount(() => {
		const storedValue = localStorageKey ? LocalStorageHelper.getValue(localStorageKey, '') : '';
		if (storedValue !== '') {
			enabled = storedValue === 'true';
			if (enabled) {
				requestWakeLock();
			}
		}
	});
</script>

{#if supported}
	<Button
		title="Garder l'écran allumé"
		variant={enabled ? 'outline' : 'ghost'}
		size="icon"
		class={{
			'rounded-lg backdrop-blur-xl': true,
			'size-9': size === 'md',
			'size-11.25': size === 'lg'
		}}
		onclick={toggle}
	>
		{#if enabled}
			<Lightbulb class={iconSize} />
		{:else}
			<LightbulbOff class={iconSize} />
		{/if}
	</Button>
{/if}
