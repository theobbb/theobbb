import { error } from '@sveltejs/kit';

export const load = async ({ params }) => {
	const modules = import.meta.glob(`/src/posts/blog/*.md`, { eager: true });

	let title: string = '';
	let slug: strin = '';

	const post = Object.entries(modules).find(([path, post]) => {
		// Extract the slug from the file path
		title = path.split('/').pop()?.replace('.md', '');
		slug = title?.replace(' ', '-').toLowerCase();

		return slug === params.slug;
	});

	if (!post) {
		throw error(404); // Couldn't resolve the post
	}

	const [path, post_module] = post;

	return {
		component: post_module.default,
		meta: post_module.metadata,
		title,
		slug
	};
};
