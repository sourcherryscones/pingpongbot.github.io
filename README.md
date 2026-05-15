# Ping-Pong UR7e — Project Website

Static scaffold for an EECS 106A final-project website. Plain HTML / CSS / JS — no build step, no Jekyll, no npm. Just push to GitHub and turn on Pages.

## Files

```
.
├── index.html      ← the entire page; all content lives here
├── styles.css      ← visual styling (colors, layout, type)
├── script.js       ← sticky-nav active-section highlighting
├── .nojekyll       ← tells GitHub Pages to skip Jekyll processing
└── README.md
```

## What to edit

Open `index.html` and search for `[PLACEHOLDER`, `[INSERT`, `[PHOTO`, or `[TITLE` — every spot you need to fill in is marked. The page is divided into the sections required by the course rubric:

1. Introduction
2. Design
3. Implementation (hardware + software + how it all works)
4. Results (with a YouTube embed slot)
5. Conclusion
6. Team
7. Additional materials

To swap the YouTube video: find `VIDEO_ID` in `index.html` and replace it with the ID portion of your YouTube URL (e.g., for `https://youtu.be/abc123XYZ`, the ID is `abc123XYZ`).

To change the accent color: edit `--accent` near the top of `styles.css`.

Math: KaTeX is loaded from a CDN. Inline math uses `$ ... $`; display math uses `$$ ... $$`. Remove the two KaTeX `<script>` and `<link>` tags in `index.html` if you don't need equations.

## Deploying to GitHub Pages — zero-hassle path

1. Create a new public GitHub repo (e.g., `pingpong-site`).
2. Push these files to the `main` branch:
   ```
   git init
   git add .
   git commit -m "Initial site"
   git branch -M main
   git remote add origin https://github.com/<your-user>/<repo-name>.git
   git push -u origin main
   ```
3. On GitHub: **Settings → Pages**. Under **Source**, pick **Deploy from a branch**, choose **`main`** and **`/ (root)`**, then **Save**.
4. Wait ~1 minute. Your site goes live at:
   ```
   https://<your-user>.github.io/<repo-name>/
   ```

That's it. Every future `git push` to `main` redeploys automatically.

### Custom domain (optional)

If you want `yourdomain.org` instead of the `github.io` URL, add a file named `CNAME` at the repo root containing only your domain (e.g., `pingpong.org`), then point a DNS `CNAME` record at `<your-user>.github.io`.

## Local preview

Just double-click `index.html` to open it in a browser. For better behavior (clean URLs, no CORS quirks with KaTeX), run a tiny local server:

```powershell
# from this folder, in PowerShell:
python -m http.server 8000
# then open http://localhost:8000
```
