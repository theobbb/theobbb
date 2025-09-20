import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';
import { visit } from 'unist-util-visit';

function preprocessor() {
	return (tree) => {
		visit(tree, 'image', (node) => {
			// Check if the image source starts with 'assets/'
			if (node.url.startsWith('assets/')) {
				// Prepend a slash to the URL
				node.url = '/' + node.url;
			}
		});
	};
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.md', '.svx'],
	preprocess: [
		vitePreprocess(),
		mdsvex({ extensions: ['.md', '.svx'], remarkPlugins: [preprocessor] })
	],

	kit: {
		// adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://svelte.dev/docs/kit/adapters for more information about adapters.
		adapter: adapter({ strict: false })
	}
};

export default config;
