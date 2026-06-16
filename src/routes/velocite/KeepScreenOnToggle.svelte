<script lang="ts">
	import { Button } from '$lib/shadcn/ui/button';
	import { Lightbulb, LightbulbOff } from '@lucide/svelte';
	import { onMount } from 'svelte';

	interface Props {
		lightOn?: boolean;
	}

	let { lightOn = $bindable(false) }: Props = $props();
	let wakeLock: WakeLockSentinel | null = $state(null);

	function toggle() {
		lightOn = !lightOn;
		if (lightOn) {
			requestWakeLock();
		} else {
			wakeLock?.release();
			wakeLock = null;
			localStorage.removeItem('velocite-keep-screen-on');
		}
	}

	async function requestWakeLock() {
		try {
			// Enable the wake lock
			wakeLock = await navigator.wakeLock.request('screen');
			wakeLock.addEventListener('release', () => {
				console.log('Wake Lock désactivé');
			});
			localStorage.setItem('velocite-keep-screen-on', 'true');
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
		const storedValue = localStorage.getItem('velocite-keep-screen-on');
		if (storedValue !== null) {
			lightOn = storedValue === 'true';
			if (lightOn) {
				requestWakeLock();
			}
		}
	});
</script>

<Button variant={lightOn ? 'outline' : 'ghost'} size="icon" onclick={toggle}>
	{#if lightOn}
		<Lightbulb class="size-5" />
	{:else}
		<LightbulbOff class="size-5" />
	{/if}
</Button>
