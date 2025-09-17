<script>
	const links = [
		{
			name: 'accueil * home',
			href: '/'
		},
		{
			name: 'blog',
			href: '/blog'
		},
		{
			name: 'contact',
			href: '/contact'
		}
	];
</script>

<header class="sticky top-0 border-b border-white/20 bg-black px-4 py-3">
	<nav class="">
		<ul class="flex gap-4 text-lg uppercase">
			{#each links as { name, href }}
				<li>
					<a
						class="border-yellow-800- border border-white px-2 py-2 text-orange-400 transition hover:bg-orange-500/20"
						{href}>[{name}]</a
					>
				</li>
			{/each}
		</ul>
	</nav>
</header>
<!-- 
<div class="">
	<img style="width: 64px; height: 64px;" src="/images/sprites/button2.png" />
</div> -->
