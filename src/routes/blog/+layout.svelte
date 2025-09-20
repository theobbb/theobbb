<script>
	import { page } from '$app/state';

	const { data, children } = $props();

	console.log(data);
	const active_category = $derived(
		data.categories.find((category) => category.slug == page.params.slug)
	);
</script>

<div>
	<header>
		<nav>
			<ul class="flex gap-4">
				{#each data.categories as category}
					<li>
						<a
							class="flex flex-col items-center gap-1 px-2 py-1 text-lg whitespace-nowrap uppercase hover:underline"
							href="/blog/{category.slug}"
						>
							{#if category.slug == page.params.category}
								<img class="size-10" src="/icons/directory_open_cool-1.png" />
							{:else}
								<img class="size-10" src="/icons/directory_closed_cool-1.png" />
							{/if}
							<span>{category.name}</span>
						</a>
					</li>
				{/each}
			</ul>
		</nav>
	</header>
</div>

{@render children?.()}
