# Ceramic Waste Log — Download Website: Build Plan

> Handoff document for the builder (Sonnet). Everything needed is here; the app
> source lives at `/Users/aatmanbhoraniya/Desktop/Coding playground/GoodsLog/worker-log`
> (read its `README.md` if you need more detail — treat it as the source of truth
> for what the app does).

## 1. Goal

A single-page, static website for the desktop app **Ceramic Waste Log** that:

1. Opens with a short, meaningful description of the app (Section 1).
2. Offers two download buttons — **macOS** and **Windows** (Section 2).
3. Explains properly how to install and use the app (Sections 3+).

Hosted **free on GitHub Pages** — no server, no custom domain. The public URL
will be `https://aatmanbho2429.github.io/<repo-name>/`.

## 2. Hard constraints

- **Plain static files only**: `index.html`, `styles.css`, `script.js`, `assets/`.
  No framework, no bundler, no `npm`, no build step. GitHub Pages serves the
  folder as-is.
- **All paths relative** (`assets/logo.png`, not `/assets/logo.png`) — the site
  lives under `/<repo-name>/`, so root-absolute paths would break.
- Works with JavaScript disabled (download buttons still work via fallback links).
- Responsive: looks right from 360px phones to wide desktops, no horizontal scroll.
- No trackers, no analytics, no cookies, no external fonts required
  (a system font stack is fine; Inter from Google Fonts is optional).
- Build everything inside this folder:
  `/Users/aatmanbhoraniya/Desktop/Coding playground/Worker-log website/`

## 3. Facts about the app (use these; don't invent features)

| Item | Value |
| --- | --- |
| Product name | **Ceramic Waste Log** (in-app brand: "Waste Log") |
| What it is | Desktop replacement for the paper waste register on a ceramic sanitaryware line — records who lost a piece, where (reason), and which grade it came off as; prints the month sheet back out |
| Platforms | macOS (**Apple Silicon only**, `.dmg`, signed + notarized) and Windows 10/11 64-bit (NSIS `-setup.exe`, **not code-signed** → SmartScreen warning) |
| Releases repo | `https://github.com/Aatmanbho2429/worker-log` (public) |
| Current release | `v0.8.0` — assets `Ceramic.Waste.Log_0.8.0_aarch64.dmg`, `Ceramic.Waste.Log_0.8.0_x64-setup.exe` |
| Updates | App updates itself automatically (signed updater) — users download only once |
| Data | One local SQLite file on the PC; works offline. Backup = copy that file (path shown in Settings) |
| Account | Sign-up with email + 4-digit email code; **14-day free trial**; licence is bound to **one PC**; paid plans (Razorpay) from the Profile screen when the trial ends |
| Logo | `GoodsLog/worker-log/design/logo.png` (also `web/public/logo.png`, `web/public/favicon.ico`) |

Screens in the app: **Waste log**, **Month sheet**, **Reports**, **Scanning sheet**,
**Masters** (Workers, Series, Reasons, Grades), **Settings**, **Profile**.

## 4. Download buttons — how they must work

Version numbers are baked into asset filenames, so hard-coded links would go
stale on every release. Do this instead:

1. **HTML fallback (no JS):** both buttons' `href` =
   `https://github.com/Aatmanbho2429/worker-log/releases/latest`.
2. **JS enhancement** (`script.js`): on load, fetch
   `https://api.github.com/repos/Aatmanbho2429/worker-log/releases/latest`, then:
   - macOS button → asset whose name ends with `.dmg`
   - Windows button → asset whose name ends with `-setup.exe` (NOT the `.sig`)
   - set each button's `href` to that asset's `browser_download_url`
   - show version (`tag_name`) and file size (`size` → "12.3 MB") under each button
   - if the fetch fails / rate-limited / asset missing → silently keep the fallback link
3. **OS detection (nice-to-have):** highlight the button matching the visitor's
   OS (`navigator.userAgentData?.platform` or `navigator.userAgent`). Never hide
   the other one.
4. Under the buttons, small print: "macOS 11+ on Apple Silicon (M1 or newer) ·
   Windows 10/11 64-bit" and a link "All releases & release notes →" to the
   releases page.

Result: publishing a new GitHub release updates the website automatically —
nothing to edit.

## 5. Page structure (in this order)

### Top bar (sticky, slim)
Logo + "Ceramic Waste Log" on the left; anchor links right: *Download · How to use · Features · FAQ*.
Collapses to just logo + a "Download" button on mobile.

### Section 1 — Hero / About (first thing seen)
- Headline (one line), e.g. **"Your factory's waste register — without the paper."**
- 2–3 sentence description: tap or scan to record each lost piece against the
  worker, reason and grade; the month sheet builds itself and prints exactly
  like the register you already use. Runs on one PC, works offline.
- Three short value chips/points: *Tap or scan to log* · *Month sheet in one click (PDF/CSV)* · *Works offline, data stays on your PC*.
- A primary button "Download free trial" scrolling to Section 2.
- A screenshot of the app (see §7) on the right (below on mobile).

### Section 2 — Download
- Heading "Download Ceramic Waste Log", sub-line "14-day free trial. No card needed to start."
- Two big cards side by side (stacked on mobile): **macOS** (Apple icon) and **Windows** (Windows icon), each with button, version, size (per §4).
- Requirements line + releases link.
- Use inline SVG for the Apple/Windows icons (simple generic glyphs).

### Section 3 — Install (short, tabbed or two columns: macOS | Windows)
- **macOS:** open the `.dmg` → drag *Ceramic Waste Log* into *Applications* → open from Applications/Launchpad.
- **Windows:** run `…-setup.exe`. If Windows shows "Windows protected your PC", click **More info → Run anyway** (the installer isn't code-signed yet; it is the official build from GitHub). Follow the installer; launch from the Start menu.

### Section 4 — How to use (the main guide; numbered steps with a screenshot each)
1. **Create your account** — enter your details, type the 4-digit code emailed to you, then sign in. Your 14-day trial starts; the account is tied to this PC.
2. **Set up your masters** — add **Series** (product series), then **Workers** (each with a series). **Reasons** come pre-filled with the paper sheet's columns (Karigar, Loader, Bhatthi, Handling, Kachu, Repair, Glazing, Pressure, Sorting, Other) — rename or reorder them to match yours. **Grades** ship as Grade 3 (salvage) and Grade 4 (scrap); add your own if needed (max 9).
   - Tip: *Settings → Load demo data* fills a sample register so you can try everything first; *Replace everything with demo data* resets it.
3. **Log waste** — on **Waste log**, pick the reason, then tap the grade button against the worker. Counts update instantly; the **−** button undoes a mis-tap.
4. **Or scan barcodes** — open **Scanning sheet**, print it (PDF, A3) and put it beside the line. Any USB barcode scanner in keyboard mode works — no drivers. One scan = one entry. Reprint after adding workers/grades.
5. **Check the month** — **Month sheet** shows the register on screen: workers down, reasons × grades across, totals on every edge. Use the date range (defaults to this month; "Last month" preset) and series filter.
6. **Reports & export** — **Reports** gives totals, breakdown by reason, the workers with most waste, and full entry history. Export **PDF** (prints like the paper sheet) or **CSV** (Excel). Use CSV if names are typed in Gujarati — PDF prints Latin letters only.
7. **Back up your data** — **Settings** shows where the database file is. Copy that one file to back up or move to another machine.

### Section 5 — Features (grid of 6 cards, icon + title + one line)
Tap-to-log · Barcode scanning · Month sheet PDF/CSV · Reports & history · Custom reasons & grades · Offline & private (local file) · Auto-updates.

### Section 6 — FAQ (native `<details>`/`<summary>` accordions, no JS)
- Does it need internet? — Only for sign-in/licence checks and updates; logging works on the local file.
- Can I use it on two PCs? — One licence = one PC.
- What happens after the trial? — Choose a plan from the Profile screen; your data stays.
- Which scanner should I buy? — Any Code 128 USB scanner in keyboard (HID) mode.
- Intel Mac? — Not currently; Apple Silicon only.
- How do I update? — Automatic; the app shows a banner when a new version is ready.
- Where is my data? — macOS `~/Library/Application Support/com.aatman.ceramicwastelog/worker-log.db`, Windows `%APPDATA%\com.aatman.ceramicwastelog\worker-log.db`.

### Footer
Logo, "© 2026 Ceramic Waste Log", link to GitHub releases, a contact email placeholder (`<!-- TODO: contact email -->`).

## 6. Visual design

Match the app so the site feels like the same product (from the app's theme):
- Page background soft grey `#f0f2f5`, cards white, text dark grey (`#1f2937`-ish, not pure black).
- Accent **blue** for buttons/links; medium **slate** for header bands / dark sections.
- Red only as the "scrap grade" accent in illustrations — never for buttons.
- Font: system stack (`-apple-system, "Segoe UI", Inter, Roboto, sans-serif`).
- Generous spacing, rounded 12px cards, subtle shadows. Max content width ~1120px, 16px side gutters on mobile.
- Define colours as CSS custom properties in `:root`; add a `prefers-color-scheme: dark` variant.
- Smooth scroll for anchor links; visible focus styles; alt text on all images; AA contrast.

## 7. Screenshots

Real screenshots sell the app more than anything else. Needed (PNG/WebP, ~1600px wide, demo data loaded):
`hero.png` (Waste log screen), `waste-log.png`, `masters.png`, `scanning-sheet.png`, `month-sheet.png`, `reports.png`, `signup.png`.

- Put them in `assets/screenshots/`.
- **Until the owner provides them**, render a neutral placeholder box with the
  intended caption (so the layout is final and swapping files needs no code
  change). Keep the `<img>` tags pointing at the final filenames.
- Compress images (target < 300 KB each); use `loading="lazy"` below the fold and width/height attributes to avoid layout shift.

## 8. File layout

```
Worker-log website/
├── index.html
├── styles.css
├── script.js
├── .nojekyll              (empty — tells Pages to serve files as-is)
├── README.md              (what the site is + how to update/publish it)
├── PLAN.md                (this file)
└── assets/
    ├── logo.png           (copy from GoodsLog/worker-log/design/logo.png)
    ├── favicon.ico        (copy from GoodsLog/worker-log/web/public/favicon.ico)
    ├── og-image.png       (1200×630 social preview — logo + headline)
    └── screenshots/
```

`<head>` must include: `<title>Ceramic Waste Log — Download for Mac & Windows</title>`,
meta description, viewport, favicon, Open Graph + Twitter card tags (title,
description, `og:image` — use the absolute Pages URL once the repo name is known).

## 9. Build steps (for the builder)

1. Copy logo + favicon into `assets/`.
2. Write `index.html` with all sections in §5 order, semantic tags (`header`, `main`, `section[id]`, `footer`).
3. Write `styles.css` (tokens → layout → components → responsive → dark mode).
4. Write `script.js` (release fetch per §4, OS highlight, footer year). Keep < 100 lines, no dependencies.
5. Add `.nojekyll` and `README.md`.
6. Test locally: `python3 -m http.server 8000` in the folder → open `http://localhost:8000`. Check: downloads resolve to the real `.dmg`/`.exe` URLs, JS-off fallback, 375px mobile width, dark mode, all anchor links, no console errors.

## 10. Publishing on GitHub Pages (owner does this, or builder with permission)

1. Create a **new public repo** (suggested name: `ceramic-waste-log`) under `Aatmanbho2429`. Keep it separate from the app repo `worker-log`.
2. In this folder:
   ```bash
   git init && git add . && git commit -m "Website" && git branch -M main
   git remote add origin https://github.com/Aatmanbho2429/ceramic-waste-log.git
   git push -u origin main
   ```
3. Repo → **Settings → Pages** → Source: *Deploy from a branch* → `main` / `(root)` → Save.
4. After ~1 minute the site is live at `https://aatmanbho2429.github.io/ceramic-waste-log/`. Share that link.
5. Updating the site later = edit files, commit, push. New app releases need **no** site change.

## 11. Done when

- [ ] Section order: About → Download → Install → How to use → Features → FAQ → Footer
- [ ] Mac button downloads the latest `.dmg`, Windows button the latest `-setup.exe` (not `.sig`)
- [ ] Buttons still work with JS disabled or when the GitHub API fails
- [ ] Looks correct at 375px, 768px, 1440px; light and dark
- [ ] No console errors; all images have alt text; Lighthouse accessibility ≥ 95
- [ ] Live on GitHub Pages and the shared link works in a private window

## 12. Open questions for the owner

1. Public name on the site: **"Ceramic Waste Log"** (the app's product name) — or "GoodsLog" / "Waste Log"?
Answer-Ceramic Waste Log
2. Repo name for the site (decides the URL) — default `ceramic-waste-log`.
Answer-eramic-waste-log-website
3. Contact email / WhatsApp for the footer and support.
Answer-aatmanbhoraniya12@gmail.com , 9428291222
4. Show plan prices on the site, or just "14-day free trial, plans in the app"?
Answer-No plans should be visible.
5. Will you supply the screenshots, or should the builder capture them from the running app with demo data?
Answer-You and take control to laptop and run the app
