import { error } from '@sveltejs/kit';

export async function load({ params }) {
	const modules = import.meta.glob(`/src/obsidian/blog/*.md`, { eager: true });

	const entry = Object.entries(modules).find(([path]) => {
		// Extract the slug from the file path
		const title = path.split('/').pop()?.replace('.md', '');
		const slug = title?.replace(' ', '-').toLowerCase();

		return slug === params.slug;
	});

	if (!entry) {
		throw error(404, 'Post not found'); // Couldn't resolve the post
	}

	const [path, post_module] = entry;

	return {
		component: post_module.default,
		meta: post_module.metadata,
		title: path.split('/').pop()?.replace('.md', ''),
		slug: params.slug
	};
}
