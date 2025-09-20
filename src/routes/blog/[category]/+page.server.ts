import { error } from '@sveltejs/kit';

export async function load({ params, parent }) {
	const data = await parent();

	const category = data.categories.find((category) => category.slug == params.category);
	if (!category) {
		error(404, 'Oh non! catégorie introuvable');
	}
	const filtered_posts = data.posts.filter((post) => post.category.slug == params.category);

	return { filtered_posts };
}
