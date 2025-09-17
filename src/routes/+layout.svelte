<script lang="ts">
	import '../app.css';

	import favicon from '$lib/assets/favicon.svg';
	import Header from './header.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Header />
<div class="px-8">
	{@render children?.()}
</div>
