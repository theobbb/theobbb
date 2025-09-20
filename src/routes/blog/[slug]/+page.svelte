<script>
	const { data } = $props();

	const Component = $derived(data.component);

	console.log(data);
</script>

<h1>{data.title}</h1>
<!-- <p>
	Published on: {data.meta.date}
</p> -->

<div class="md"><Component /></div>
