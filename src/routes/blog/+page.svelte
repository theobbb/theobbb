<script>
	const { data } = $props();
</script>

<h1>Blog</h1>

{#each data.posts as post}
	<div class="my-12">
		<a class="hover:underline" href="/blog/{post.slug}">
			<h3>{post.title}</h3>
		</a>
	</div>
{/each}
