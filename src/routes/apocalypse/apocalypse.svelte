<script>
	import { onMount } from 'svelte';
	import Control from './control.svelte';

	let clicked = $state(false);

	const cols_n = 5;
	const total_frames = 20;

	let gif_explosion = null;

	let key = $state(-1);

	function onclick(ev) {
		//clicked = true;
		key = Math.random();
		console.log(key);
		return;

		const interval = setInterval(() => {
			clicked = false;
		}, 400); // 100ms per frame (~10fps)
	}

	const frame_size = 10;
	const sprite_size = frame_size * 5;

	let switch_on = $state(false);
	function toggle_switch() {
		switch_on = !switch_on;
	}
</script>

<div>NE PAS CLIQUER</div>

<Control onclick={toggle_switch} index={switch_on ? 2 : 1} />
<Control index={1} />
<Control index={2} />
<Control index={4} />
<!-- <button class="bg-transparent" {onclick}>
	<img alt="button control" style="width: 66px; height: 66px;" src="/images/controls/button.png" />
</button>
<button class="bg-transparent" onclick={toggle_switch}>
	<img
		alt="switch control"
		style="width: 66px; height: 66px;"
		src="/images/controls/switch-on.png"
	/>
	<img
		alt="switch control"
		style="width: 66px; height: 66px;"
		src="/images/controls/switch-off.png"
	/>
</button> -->
<div
	id="sprite-container"
	class={[
		' pointer-events-none fixed z-20',
		clicked ? 'scale-[10]-' : '',
		'ease-in- transition duration-400 ease-in'
	]}
>
	<!-- <div
		id="sprite"
		class={[clicked ? 'scale-[20]' : '', 'ease-in- transition duration-400 ease-in']}
		style="width: Max({frame_size}svh, {frame_size}vw); height: Max({frame_size}svh, {frame_size}vw); background-size: Max({sprite_size}svh, {sprite_size}vw) Max({sprite_size}svh, {sprite_size}vw);"
	></div> -->
</div>
{#key clicked}
	<div class="pointer-events-none fixed inset-0">
		<img class="h-full w-full object-cover" src="/explosion.gif?{key}" />
		<!-- <h1>APOCALYSE</h1> -->
	</div>
{/key}

<style>
	img {
		image-rendering: pixelated;
	}
	#sprite {
		background-image: url('/images/explosion.png');
		background-repeat: no-repeat;
		background-position: -100% -100%;

		/*background-position: -100% -100%;*/
	}
</style>
