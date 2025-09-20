<script>
	const { data, children } = $props();

	console.log(data);
</script>

<h1>Blog</h1>
<div>
	<header>
		<nav>
			<ul>
				{#each data.categories as category}
					<li>
						<a href="/blog/{category.slug}">{category.name}</a>
					</li>
				{/each}
			</ul>
		</nav>
	</header>
</div>

{@render children?.()}
