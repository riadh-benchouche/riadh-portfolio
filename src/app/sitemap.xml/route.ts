import { getPostsForFeed } from '@/sanity/queries'

let posts = await getPostsForFeed()

function getSitemap() {
  const map = [
    {
      url: 'https://riadhben.com',
      lastModified: new Date(),
    },
    {
      url: 'https://riadhben.com/about',
      lastModified: new Date(),
    },
    {
      url: 'https://riadhben.com/projects',
      lastModified: new Date(),
    },
    {
      url: 'https://riadhben.com/blog',
      lastModified: new Date(),
    },
    {
      url: 'https://riadhben.com/resume',
      lastModified: new Date(),
    },
    ...posts.map((post) => ({
      url: `https://riadhben.com/blog/${post.slug}`,
      // @ts-ignore
      lastModified: new Date(post.publishedAt),
    })),
  ]

  return `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${map
      .map(
        (item) => `
            <url>
              <loc>${item?.url}</loc>
              <lastmod>${item?.lastModified.toISOString()}</lastmod>
            </url>
          `,
      )
      .join('')}
    </urlset>
  `
}

export async function GET() {
  return new Response(getSitemap(), {
    headers: {
      'Content-Type': 'text/xml',
    },
  })
}
