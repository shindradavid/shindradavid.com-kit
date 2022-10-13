import type { RequestHandler } from './$types';

export const GET: RequestHandler = () => {
	const siteUrl = 'https://shindradavid.vercel.app/';
	const pages = [
		'',
		'portfolio',
		'contact',
		'FAQ',
		'blog',
		'courses'
		// ...(await getPostsData()).map((post) => post.slug),
	];
	const sitemap = `
    <?xml version="1.0" encoding="UTF-8" ?>
    <urlset
      xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:xhtml="https://www.w3.org/1999/xhtml"
      xmlns:mobile="https://www.google.com/schemas/sitemap-mobile/1.0"
      xmlns:news="https://www.google.com/schemas/sitemap-news/0.9"
      xmlns:image="https://www.google.com/schemas/sitemap-image/1.1"
      xmlns:video="https://www.google.com/schemas/sitemap-video/1.1"
    >
      ${pages
				.map((page) => {
					return `
            <url>
              <loc>${siteUrl}${page}</loc>
              <lastmod>${new Date().toISOString()}</lastmod>
            </url>
          `;
				})
				.join('')}
    </urlset>
  `.trim();

	return new Response(sitemap, {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': `public, max-age=${60 * 60 * 24}, s-maxage=${60 * 60 * 24}`
		}
	});
};
