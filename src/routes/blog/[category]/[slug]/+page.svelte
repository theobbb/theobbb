<script>
	const { data } = $props();

	const post = $derived(data.post);
	const Component = $derived(data.component);
</script>

<h1>{post.title}</h1>
<!-- <p>
	Published on: {data.meta.date}
</p> -->

<div class="md"><Component /></div>
