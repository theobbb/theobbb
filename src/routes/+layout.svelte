<script lang="ts">
	import '../app.css';

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
	<div class="mx-auto max-w-244 px-8">
		{@render children?.()}
	</div>
</div>
<Footer />
