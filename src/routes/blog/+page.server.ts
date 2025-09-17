const MAX_POSTS = 10;

export async function load({ fetch }) {
	const modules = import.meta.glob('/src/posts/blog/*.md');

	const promises = Object.entries(modules).map(([path, resolver]) =>
		resolver().then((post) => {
			const title = path.split('/').pop()?.replace('.md', '');
			const slug = title?.replace(' ', '-').toLowerCase();
			return {
				title,
				slug,
				...post.metadata
			};
		})
	);
	const posts = await Promise.all(promises);

	return {
		posts
	};
}
