<script lang="ts">
	import { Button } from '$lib/shadcn/ui/button';
	import { Lightbulb, LightbulbOff } from '@lucide/svelte';

	interface Props {
		lightOn?: boolean;
	}

	let { lightOn = $bindable(false) }: Props = $props();
	let wakeLock: WakeLockSentinel | null = $state(null);

	function toggle() {
		lightOn = !lightOn;
		if (lightOn) {
			requestWakeLock();
		}
	}

	async function requestWakeLock() {
		try {
			// Enable the wake lock
			wakeLock = await navigator.wakeLock.request('screen');
			wakeLock.addEventListener('release', () => {
				console.log('Wake Lock désactivé');
			});
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
</script>

<Button variant={lightOn ? 'outline' : 'ghost'} size="icon" onclick={toggle}>
	{#if lightOn}
		<Lightbulb class="size-5" />
	{:else}
		<LightbulbOff class="size-5" />
	{/if}
</Button>
