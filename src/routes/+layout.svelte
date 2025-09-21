<script lang="ts">
	import '$lib/css/app.css';

	import favicon from '$lib/assets/favicon.svg';
	import Header from './header.svelte';
	import Footer from './footer.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Header />
<div class="bg-neutral-900">
	<div class="max-w-244 mx-auto px-8">
		{@render children?.()}
	</div>
</div>
<Footer />
