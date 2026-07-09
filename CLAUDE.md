# airealitycheck.org

Static personal site for C. Pete Connor. Hand-authored HTML, no build system, no dependencies.

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

- Nav: 6 links on every page — Home, About, Articles, Portfolio, Creativity, Tools & Resources. Wraps at ≤600px (`flex-wrap`).
- Footer: identical across pages (Email + 5 social links incl. YouTube). Contact email: cpeteconnor@gmail.com.
- Every page head: charset, viewport, CSP meta, robots, canonical, OG/Twitter tags pointing at `/images/og-card.png`. Articles carry BlogPosting JSON-LD.
- Accessibility floor: one h1 + real h2s per page, skip-to-content link + `<main id="main">` landmark, `:focus-visible` outlines, `prefers-reduced-motion` guards, `--muted: #82828b` (AA on the black ground).
- Articles end with a "Work With Me" CTA section. Quantitative claims are either sourced or explicitly labeled modeled/illustrative — never fake precision.
- New pages: copy `_template/skeleton.html`, fill placeholders, add to `sitemap.xml`.

## Deploy

GitHub Pages from `main` (CNAME → airealitycheck.org). Push to main = live. Work on `fix/`/`feat/` branches, merge when verified.

## Verification

`python3 -m http.server` from repo root, click through all pages; check internal links resolve; confirm sitemap matches pages.

## Tests / coverage

None — static HTML site with one small inline JS app (prompt workspace). Verification is manual browser click-through; no test framework applies.
