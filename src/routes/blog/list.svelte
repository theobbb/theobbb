<script>
	const { posts } = $props();
</script>

{#each posts as post}
	<div class="my-12">
		<a class="hover:underline" href="/blog/{post.category.slug}/{post.slug}">
			<h3>{post.title}</h3>
		</a>
		<div>{post.meta.date}</div>
		<div>{post.category.name}</div>
	</div>
{/each}
