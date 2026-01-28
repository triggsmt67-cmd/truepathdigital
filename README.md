<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1woZ_6f-zlaZBjDau2VCLD11WZrY3sIQ2

## Run Locally

**Prerequisites:**  Node.js

1. Install dependencies:
   `npm install`
2. Set your environment variables in `.env.local`:
   * `VITE_WP_GRAPHQL_ENDPOINT`: Your WordPress GraphQL endpoint (e.g., `https://your-wp-site.com/graphql`)
   * `GEMINI_API_KEY`: Your Gemini API key
3. Run the app:
   `npm run dev`

## Deployment to Vercel

This project is optimized for deployment on Vercel as a high-performance headless WordPress frontend.

### Environment Variables
When deploying to Vercel, ensure you set the following environment variables in the Vercel Dashboard:
- `VITE_WP_GRAPHQL_ENDPOINT`: Your live WordPress GraphQL URL.
- `VITE_WORDPRESS_API_URL`: (Alternative) Also supported for compatibility with standard Vercel WP templates.

### Automated Builds
Vercel will automatically detect the Vite build settings. The `vercel.json` file ensures that all client-side routes are correctly handled.

## Content Guidelines

### Blog Article Images
To maintain visual consistency and high performance across the **Insights** vault, follow these specifications for featured images:

*   **Optimal Size:** 1600 x 900 px (16:9 aspect ratio).
*   **Safe Zone:** Keep focal points centered or slightly to the right to avoid overlap with the bottom-left text overlay.
*   **Format:** WebP is preferred for superior compression and fast loading.
*   **Aesthetic:** High-contrast images with distinct textures work best with the site's grayscale/dark-mode filters.

### WordPress Article Structure
The "Intelligence Vault" uses an **Advanced Render-Layer Normalization** agent to transform WordPress HTML into a technical protocol layout. Follow this formula for perfect rendering:

1.  **Hero Lead:** The very first paragraph in the WP editor is automatically extracted and used as the sub-heading in the Hero section. Write a strong 1-2 sentence lead here.
2.  **Protocol Summary (AI SEO):** Populate the `aiOverviews` ACF fields instead of writing manual TLDRs in the body:
    *   `ai_quick_answer`: Short executive summary.
    *   `ai_takeaways`: Bulleted list of key points.
    *   `ai_faqs`: Format as `Q: ...` and `A: ...` blocks.
3.  **Headings:** Use **H2** for primary sections and **H3** for sub-sections.
4.  **Emphasis Blocks:** Paragraphs containing trigger words (e.g., *must*, *crucial*, *!*) are automatically detected and wrapped in an orange-bordered emphasis box.
5.  **What to Avoid:**
    *   ❌ **Manual TLDRs:** Don't write manual summaries in the post body.
    *   ❌ **Title Duplication:** Don't repeat the post title inside the body content.
    *   ❌ **Manual Read Times:** Read time and dates are calculated dynamically.

