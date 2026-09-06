# airealitycheck.org

Static personal site for C. Pete Connor. Hand-authored HTML, no production build or runtime dependencies. Optional Node preview and validation scripts are development-only.

## Architecture

- Every page is a **self-contained HTML file** with its own inline `<style>` block. This is deliberate: publishing = drop an HTML file in a directory, add a card, push. Do not extract a shared stylesheet.
- Design system: "Obsidian Showcase" — zinc-black `#09090b` ground, emerald `#34d399` accent, Plus Jakarta Sans display + JetBrains Mono. Canon lives in `_template/skeleton.html`.
- Exception: `career-content/tools-and-resources/prompt-workspace.html` uses a deliberate VS Code/IDE theme (dark `#1e1e1e`, emerald accent via `--accent`).

## Structure

```
index.html                      # home
career-content/                 # about hub
  articles/                     # 4 long-form articles + index
  portfolio/                    # live demos
  creativity/                   # YouTube video hub
  tools-and-resources/          # tools + downloads index, prompt workspace
downloads/                      # downloadable files (PDFs)
images/                         # og-card.png (social share image)
_template/skeleton.html         # page template (not deployed/linked)
```

## Conventions

- Nav: Home, About, Articles, Portfolio, Studio, Tools, and Work with me. Native details menu on widths ≤900px; full navigation above that. Preserve no-JavaScript navigation.
- Footer: shared contact/social pattern; the workspace uses a compact tool footer. Contact email: cpeteconnor@gmail.com.
- Every page head: charset, viewport, CSP meta, robots, canonical, OG/Twitter tags pointing at `/images/og-card.png`. Articles carry BlogPosting JSON-LD.
- Accessibility floor: one h1 + real h2s per page, skip-to-content link + `<main id="main">` landmark, `:focus-visible` outlines, `prefers-reduced-motion` guards, `--muted: #82828b` (AA on the black ground).
- Articles end with a "Work With Me" CTA section. Quantitative claims are either sourced or explicitly labeled modeled/illustrative — never fake precision.
- New pages: copy `_template/skeleton.html`, fill placeholders, add to `sitemap.xml`.

## Deploy

GitHub Pages from `main` (CNAME → airealitycheck.org). Push to main = live. Work on `fix/`/`feat/` branches, merge when verified.

## Verification

Run `python3 scripts/check_site.py` and `node --test scripts/workspace.test.mjs`. For local visual QA use `npm run dev` (or `python3 -m http.server`). Verify mobile navigation, articles, and template-to-copy tasks before merging.

## Tests / coverage

> Last verified: 2026-09-06 <!-- no test framework applies; marker present so the staleness guard stays quiet. Guarded by ~/.claude/hooks/claude-md-staleness.js -->

Static link/metadata checks and focused Node regression tests run in GitHub Actions. Browser QA covers responsive reflow and workspace behavior. No production framework or build step is required.
