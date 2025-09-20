import { slugify } from '$lib/utils/slugify';

const MAX_POSTS = 10;

export async function load() {
	const modules = import.meta.glob('/src/obsidian/blog/**/*.md');

	const promises = Object.entries(modules).map(async ([path, resolver]) => {
		const post = await resolver();

		const path_parts = path.split('/');
		const filename = path_parts.pop()?.replace('.md', '');

		const category_name = path_parts[path_parts.length - 1];
		const slug = filename?.replace(/\s+/g, '-').toLowerCase();

		const category = {
			name: category_name,
			slug: slugify(category_name)
		};
		return {
			title: filename,
			slug,
			category,
			meta: post.metadata,
			path
		};
	});
	const posts = await Promise.all(promises);

	const categories = posts
		.map((post) => post.category)
		.filter((category, index, arr) => arr.findIndex((c) => c.name === category.name) === index);

	const ordered_posts = posts.sort((a, b) => b.meta?.date - a.meta?.date);

	return {
		posts: ordered_posts,
		categories
	};
}

/*
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
*/
