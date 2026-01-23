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
