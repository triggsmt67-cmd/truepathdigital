import fs from 'fs';
import path from 'path';

const WP_API_URL = 'https://admin.truepath406.com/wp-json/wp/v2/posts?per_page=100';
const SITE_URL = 'https://truepath406.com';

const STATIC_ROUTES = [
  { url: '', priority: '1.0', changefreq: 'daily' },
  { url: '/blog', priority: '0.8', changefreq: 'daily' },
  { url: '/solutions', priority: '1.0', changefreq: 'weekly' },
  { url: '/solutions/logic-engine', priority: '0.9', changefreq: 'weekly' },
  { url: '/solutions/lead-velocity', priority: '0.9', changefreq: 'weekly' },
  { url: '/solutions/review-system', priority: '0.9', changefreq: 'weekly' },
  { url: '/solutions/website-conversion', priority: '0.9', changefreq: 'weekly' },
  { url: '/solutions/demand-audit', priority: '0.9', changefreq: 'weekly' },
  { url: '/solutions/estimate-follow-up', priority: '0.9', changefreq: 'weekly' },
  { url: '/solutions/local-services-ads', priority: '0.9', changefreq: 'weekly' }
];

async function generateSitemap() {
  console.log('Generating dynamic sitemap...');

  let posts = [];
  try {
    const res = await fetch(WP_API_URL);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    posts = await res.json();
    console.log(`Fetched ${posts.length} posts from WordPress.`);
  } catch (error) {
    console.error('Error fetching posts:', error.message);
    // Continue building sitemap even if fetch fails
  }

  const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${STATIC_ROUTES.map(route => `
  <url>
    <loc>${SITE_URL}${route.url}</loc>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`).join('')}
  ${posts.map(post => `
  <url>
    <loc>${SITE_URL}/blog/${post.slug}</loc>
    <lastmod>${new Date(post.modified).toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`).join('')}
</urlset>`;

  const outDir = path.resolve(process.cwd(), 'public');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  fs.writeFileSync(path.join(outDir, 'sitemap.xml'), sitemapContent.trim());
  console.log('Successfully generated public/sitemap.xml');
}

generateSitemap();
