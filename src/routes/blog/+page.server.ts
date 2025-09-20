const MAX_POSTS = 10;

export async function load() {
	const modules = import.meta.glob('/src/obsidian/blog/*.md');

	const tags = {};

	const promises = Object.entries(modules).map(([path, resolver]) =>
		resolver().then((post) => {
			const title = path.split('/').pop()?.replace('.md', '');
			const slug = title?.replace(' ', '-').toLowerCase();
			return {
				title,
				slug,
				meta: post.metadata
			};
		})
	);
	const posts = await Promise.all(promises);

	posts.forEach((post) => {
		if (!post.meta?.tags?.length) return;
		post.meta.tags.forEach((tag) => {
			if (!tags[tag]) tags[tag] = 1;
			else tags[tag]++;
		});
	});
	console.log(tags);
	return {
		posts
	};
}
