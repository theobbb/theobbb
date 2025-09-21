<script>
	import { onMount } from 'svelte';
	import Control from './control.svelte';
	import SpeedCounter from './speed-counter.svelte';
	import { play_sprite } from '$lib/sprite-player.svelte';

	let clicked = $state(false);

	const cols_n = 5;
	const total_frames = 20;

	let gif_explosion = null;

	let key = $state(-1);

	const explosion_sprite = { key: 'explosion', fps: 24, frame_count: 20, looping: false };
	const explosion_sprite_player = $state({ id: 0, frame: -1 });

	//$inspect(explosion_sprite_player);

	function on_button_click(ev) {
		play_sprite(explosion_sprite_player, explosion_sprite);
	}

	const frame_size = 10;
	const sprite_size = frame_size * 5;

	let button_pressed = $state(false);

	let switch_on = $state(false);
	function on_toggle_switch() {
		switch_on = !switch_on;
	}
</script>

<section class="grid grid-cols-12">
	<div><Control onclick={on_toggle_switch} index={switch_on ? 2 : 1} /></div>
	<div>
		<Control
			onpointerdown={() => (button_pressed = true)}
			onpointerup={() => (button_pressed = false)}
			onclick={on_button_click}
			index={button_pressed ? 4 : 3}
		/>
	</div>
	<div class="col-span-4">
		<SpeedCounter />
	</div>
</section>
<div>NE PAS CLIQUER</div>

<div
	id="sprite-container"
	class={[
		' pointer-events-none fixed z-20',
		clicked ? 'scale-[10]-' : '',
		'ease-in- duration-400 transition ease-in'
	]}
></div>

<div class="pointer-events-none fixed inset-0 z-50">
	<div class="absolute inset-0 flex items-center justify-center overflow-hidden">
		<div
			class="sprite aspect-square h-full"
			style="width: 100svmax; height: 100svmax; background-size: {explosion_sprite.frame_count *
				100}svmax 100svmax; background-position: -{explosion_sprite_player.frame *
				100}svmax 0; background-image: url('/explosion.png')"
		></div>
	</div>
	<!--{explosion_sprite_player.frame *
				-100 *
				0} <SpritePlayer src="/explosion.png" frame_size={[36, 36]} frame_count={20} /> -->
	<!-- <img class="h-full w-full object-cover" src="/explosion.gif?{key}" /> -->
	<!-- <h1>APOCALYSE</h1> -->
</div>
