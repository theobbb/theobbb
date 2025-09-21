<script>
	import Dashboard from './dashboard/dashboard.svelte';

	const links = [
		{
			name: 'accueil',
			href: '/'
		},
		{
			name: 'blog',
			href: '/blog'
		},
		{
			name: 'jeux',
			href: '/jeux'
		},
		{
			name: 'idées',
			href: '/idees'
		},
		{
			name: 'contact',
			href: '/contact'
		}
	];
</script>

<header class="sticky top-0 border-b border-white/20 bg-black px-4 py-3">
	<Dashboard />
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
