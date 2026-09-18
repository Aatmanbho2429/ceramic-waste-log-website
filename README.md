# Ceramic Waste Log — download website

The single-page download site for [Ceramic Waste Log](https://github.com/Aatmanbho2429/worker-log),
hosted free on GitHub Pages. Plain HTML/CSS/JS, no build step, no framework.

Live at: `https://aatmanbho2429.github.io/ceramic-waste-log-website/` (once
Pages is enabled — see below).

## Structure

```
index.html    the whole page
styles.css    all styling (tokens → layout → components → dark mode)
script.js     points the download buttons at the latest GitHub release
assets/       logo, favicon, social-preview image, screenshots
PLAN.md       the original build plan / spec this site was built from
```

## How the download buttons work

The two buttons' `href` default to the GitHub releases page. On load,
`script.js` asks the GitHub API for the latest release of
`Aatmanbho2429/worker-log` and repoints each button at that release's
`.dmg` (macOS) or `-setup.exe` (Windows) asset, showing the version and file
size underneath. If that call fails for any reason, the buttons simply keep
the fallback link — nothing breaks.

**This means: publishing a new release on the app repo is enough. The
website needs no edit.**

## Editing locally

No install needed — it's static files.

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Publishing / updating on GitHub Pages

First time:

```bash
git init
git add .
git commit -m "Website"
git branch -M main
git remote add origin https://github.com/Aatmanbho2429/ceramic-waste-log-website.git
git push -u origin main
```

Then in the repo on GitHub: **Settings → Pages → Source → Deploy from a
branch → `main` / `(root)` → Save**. The site goes live at
`https://aatmanbho2429.github.io/ceramic-waste-log-website/` within a
minute or two.

To update the site later, just edit the files, commit, and push — Pages
redeploys automatically.

## Screenshots

`assets/screenshots/month-sheet.jpg` was captured from the running app with
seeded demo data (not real factory data). Swap it for a fresh capture any
time the Month sheet screen changes — same filename, same place.
