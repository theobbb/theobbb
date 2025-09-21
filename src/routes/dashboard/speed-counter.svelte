<script lang="ts">
	import { onMount } from 'svelte';

	let speed = $state(0);
	const digits = $derived(String(speed).padStart(3, '0').split('').map(Number));

	let current_speed = 0;
	let last_scroll = 0;
	let target_speed = 0;
	let last_time: number = 0;

	let raf: number | null = null;

	function update(time: float) {
		const current_scroll = window.scrollY;
		const delta_time = time - last_time;

		let target_speed = 0;

		if (current_scroll !== last_scroll && delta_time > 0) {
			const delta_scroll = Math.abs(current_scroll - last_scroll);
			target_speed = (delta_scroll / delta_time) * 100;
		}

		current_speed += (target_speed - current_speed) * 0.05;

		if (Math.abs(current_speed) < 1) {
			current_speed = 0;
		}

		speed = Math.round(current_speed);

		last_scroll = current_scroll;
		last_time = time;
		requestAnimationFrame(update);
	}

	//$inspect(speed);

	function onscroll(ev) {
		raf = requestAnimationFrame(update);
	}

	onMount(() => {
		raf = requestAnimationFrame(update);
		// document.addEventListener('scroll', onscroll);
		// return () => {
		// 	document.removeEventListener('scroll', onscroll);
		// };
	});
</script>

<div class="">
	<div
		style="filter: blur(1px)-; font-family: alarm-clock;"
		class="rounded border-4 border-amber-400/20 px-3 py-3 text-amber-400/80"
	>
		<div class="text-sm">
			<div class="opacity-0">0</div>
			<div class="flex gap-1">
				{#each { length: 48 }, i}
					<div>
						{#if i % 2 == 0}
							<div class="absolute -translate-y-full">{(i + 1) * 5}</div>
						{/if}
						<div class={['h-6 w-2', i * 10 < speed ? 'bg-amber-400/90' : 'bg-amber-400/10']}></div>
					</div>
				{/each}
			</div>
		</div>
		<div class="grid w-fit grid-cols-3 gap-1.5">
			{#each { length: 3 }, i}
				<div style="line-height: 1;" class="relative flex items-center justify-center text-4xl">
					<div style="transform: skew(-8deg)" class="absolute inset-0 bg-amber-400/30"></div>
					<div class="absolute">{digits[i]}</div>
					<div class="opacity-0">0</div>
				</div>
			{/each}
		</div>
	</div>
</div>
