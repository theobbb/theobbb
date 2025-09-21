<script>
	import { onDestroy } from 'svelte';

	const { src, frame_size, frame_count, fps = 12 } = $props();

	let current_frame = $state(0);
	let playing = false;
	let last_time = 0;
	let raf_id;

	const [frame_width, frame_height] = frame_size;

	function play() {
		if (!playing) {
			playing = true;
			last_time = performance.now();
			raf_id = requestAnimationFrame(loop);
		}
	}

	function pause() {
		playing = false;
		cancelAnimationFrame(raf_id);
	}

	function toggle() {
		playing ? pause() : play();
	}

	function gotoFrame(n) {
		current_frame = Math.max(0, Math.min(frame_count - 1, n));
	}

	function loop(time) {
		const frameDuration = 1000 / fps;

		if (time - last_time >= frameDuration) {
			current_frame = (current_frame + 1) % frame_count;
			last_time = time;
		}

		if (playing) raf_id = requestAnimationFrame(loop);
	}

	onDestroy(() => {
		if (raf_id) cancelAnimationFrame(raf_id);
	});
</script>

<div
	class="sprite"
	style="
    width: {frame_width}px;
    height: {frame_height}px;
    background-image: url({src});
    background-position: -{current_frame * frame_width}px 0;
  "
></div>

<style>
	.sprite {
		image-rendering: pixelated; /* optional, good for retro art */
		background-repeat: no-repeat;
	}
</style>
