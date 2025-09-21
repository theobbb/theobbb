<script>
	const { index = 0, ...props } = $props();

	const frame_count = 8;
</script>

<button {...props} class="cursor-pointer bg-transparent">
	<div
		class="control"
		style="background-size: {frame_count * 66}px 66px; background-position: {index * -66}px 0;"
	></div>
</button>

<style>
	button .control {
		image-rendering: pixelated;
		background-image: url('/images/controls.png');
		background-repeat: no-repeat;
		width: 66px;
		height: 66px;
	}
</style>
