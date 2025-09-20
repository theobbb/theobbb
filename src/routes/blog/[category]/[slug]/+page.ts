import { error } from '@sveltejs/kit';

export async function load({ parent, params }) {
	const data = await parent();

	const post = data.posts.find(
		(post) => post.slug == params.slug && post.category.slug == params.category
	);
	if (!post) {
		error(404, 'Post not found');
	}
	const modules = import.meta.glob('/src/obsidian/blog/**/*.md', { eager: true });
	const post_module = modules[post.path];

	if (!post_module) {
		throw error(404, 'Post not found'); // Couldn't resolve the post
	}

	return {
		post,
		component: post_module.default
	};
}

/*import { error } from '@sveltejs/kit';

export async function load({ parent, params }) {
	const data = await parent()
	
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
*/
