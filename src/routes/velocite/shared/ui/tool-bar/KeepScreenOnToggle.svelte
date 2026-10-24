<script lang="ts">
	import { Button } from '$lib/shadcn/ui/button';
	import { Lightbulb, LightbulbOff } from '@lucide/svelte';
	import { onMount } from 'svelte';
	import { LocalStorageHelper, LocalStorageKey } from '$lib/core/helper/local_storage';

	interface Props {
		lightOn?: boolean;
		size?: 'md' | 'lg';
	}

	let { lightOn = $bindable(false), size = 'md' }: Props = $props();
	let wakeLock: WakeLockSentinel | null = $state(null);
	const iconSize = $derived(size === 'md' ? 'size-5' : 'size-6');

	function toggle() {
		lightOn = !lightOn;
		if (lightOn) {
			requestWakeLock();
		} else {
			wakeLock?.release();
			wakeLock = null;
			LocalStorageHelper.removeValue(LocalStorageKey.VELOCITE_KEEP_SCREEN_ON);
		}
	}

	async function requestWakeLock() {
		try {
			// Enable the wake lock
			wakeLock = await navigator.wakeLock.request('screen');
			wakeLock.addEventListener('release', () => {
				console.log('Wake Lock désactivé');
			});
			LocalStorageHelper.setValue(LocalStorageKey.VELOCITE_KEEP_SCREEN_ON, 'true');
		} catch (err) {
			console.error('Wake Lock Error :', err);
		}
	}

	function onVisible() {
		if (document.visibilityState === 'visible' && lightOn) {
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
		const storedValue = LocalStorageHelper.getValue(LocalStorageKey.VELOCITE_KEEP_SCREEN_ON, '');
		if (storedValue !== '') {
			lightOn = storedValue === 'true';
			if (lightOn) {
				requestWakeLock();
			}
		}
	});
</script>

<Button
	title="Garder l'écran allumé"
	variant={lightOn ? 'outline' : 'ghost'}
	size="icon"
	class={{
		'rounded-lg': true,
		'size-9': size === 'md',
		'size-11.25': size === 'lg'
	}}
	onclick={toggle}
>
	{#if lightOn}
		<Lightbulb class={iconSize} />
	{:else}
		<LightbulbOff class={iconSize} />
	{/if}
</Button>
