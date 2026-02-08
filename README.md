<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1c5BDQBsNiDAYekwV9IgcdUrnMuE9TqnR

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Deploy to Vercel

Quick steps to deploy this Vite app to Vercel:

1. Push this repository to GitHub (already done).
2. Go to https://vercel.com and create/import a new project from your GitHub repo.
3. In the Vercel project settings, add the environment variable `GEMINI_API_KEY` with your Gemini API key.
4. Vercel will use the `build` script (`npm run build`) and the output directory `dist` (configured in `vercel.json`).
5. Deploy the project — Vercel will build and publish your site.

Local preview and tips:

Install dependencies and run locally:
```bash
npm install
npm run dev
```

To test a production build locally:
```bash
npm run build
npm run preview
```

Notes:
- Keep sensitive keys out of the repo; use Vercel Environment Variables for secrets.
- If you want to use the Vercel CLI for local development, install it globally: `npm i -g vercel` and run `vercel dev`.

