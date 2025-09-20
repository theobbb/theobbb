export function slugify(text: string) {
	return text
		.toString()
		.normalize('NFD') // Normalize Unicode characters
		.replace(/[\u0300-\u036f]/g, '') // Remove diacritics (accents)
		.toLowerCase() // Convert to lowercase
		.trim() // Trim leading/trailing whitespace
		.replace(/\s+/g, '-') // Replace spaces with hyphens
		.replace(/[^\w-]+/g, '') // Remove all non-word characters (except hyphens)
		.replace(/--+/g, '-'); // Replace multiple hyphens with a single hyphen
}
