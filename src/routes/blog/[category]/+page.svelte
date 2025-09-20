<script>
	import List from '../list.svelte';

	const { data } = $props();
	console.log(data);
</script>

<List posts={data.filtered_posts} />
