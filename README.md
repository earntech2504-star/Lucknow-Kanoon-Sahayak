# Lucknow Kanoon Sahayak 9.0

Free legal-information assistant (Hinglish) with Gemini + Google Search grounding, deployable to Vercel's free tier.

## What was fixed from your original code

- **`@google/generative-ai` + `gemini-1.5-flash` are both shut down** (as of 2026, calls to them return 404). Rewrote `api/ask.js` to use the current `@google/genai` SDK with `gemini-flash-latest` (an alias Google keeps pointed at their current default Flash model, so you won't have to keep chasing model renames).
- `api/feed.js`: used `Promise.all` on two RSS feeds, so if either one failed (or didn't exist, like `main.sci.gov.in/rss`), the whole ticker broke. Switched to `Promise.allSettled` on the working feed with a safe fallback string, and added a timeout so a slow feed doesn't hang the function.
- `index.html`: the "Junior" tab (mock court / quiz) had no dedicated input, so it accidentally read whatever was typed in the Draft tab's box. Gave it its own textarea and two explicit buttons (Mock Court / Quiz). Also fixed a couple of mismatched element IDs (`rto-input` vs `rto-rti-input`, `courts-ans` vs `all-courts-ans`) that meant those tabs would silently fail, and added basic fetch error handling so a network hiccup shows a message instead of nothing.

## Deploy to Vercel (copy-paste steps)

### 1. Get a free Gemini API key
Go to [aistudio.google.com/apikey](https://aistudio.google.com/apikey), sign in, click "Create API key". Copy it.

### 2. Push this folder to GitHub
```bash
cd lucknow-kanoon-sahayak
git init
git add .
git commit -m "Lucknow Kanoon Sahayak 9.0"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

### 3. Import into Vercel
1. Go to [vercel.com/new](https://vercel.com/new)
2. Import the GitHub repo you just pushed
3. Framework preset: **Other** (it's plain static HTML + serverless functions, no build step needed)
4. Before clicking Deploy, open **Environment Variables** and add:
   - `GEMINI_API_KEY` = *(the key from step 1)*
5. Click **Deploy**

### 4. Test it
Once deployed, open your `https://your-project.vercel.app` URL, try the Voice AI tab with a sample question, and confirm you get an answer with source links.

## Local testing (optional)
```bash
npm install -g vercel
cd lucknow-kanoon-sahayak
npm install
cp .env.example .env   # then paste your real key into .env
vercel dev
```

## If Gemini gives a "model not found" error later
Google retires model versions every few months. If `gemini-flash-latest` ever 404s:
1. Check https://ai.google.dev/gemini-api/docs/models for the current model name
2. Set it as an environment variable `GEMINI_MODEL` in Vercel (no code change needed — `api/ask.js` already reads this if present)

## Important note on the legal content itself
This app answers with BNS/BNSS/BSA (India's 2023 criminal law codes) and points to government sources (indiankanoon.org, sci.gov.in, cybercrime.gov.in, etc.) but it is **not a substitute for a lawyer** — the app's own disclaimer says this on every screen, and that's worth keeping exactly as-is. AI-generated legal information can be wrong or outdated even with search grounding, especially for anything with real deadlines (bail, limitation periods, court dates).
