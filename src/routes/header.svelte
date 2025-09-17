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

<header class=" px-4 py-2">
	<nav class="">
		<ul class="flex gap-8 text-lg uppercase">
			{#each links as { name, href }}
				<li>
					<a class="border border-yellow-800 px-3 py-2 transition hover:bg-orange-500/20" {href}
						>[{name}]</a
					>
				</li>
			{/each}
		</ul>
	</nav>
</header>
