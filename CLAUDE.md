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

- Nav: 6 links on every page — Home, About, Articles, Portfolio, Creativity, Tools & Resources.
- Footer: identical across pages (5 social links incl. YouTube).
- Every page head: charset, viewport, CSP meta, robots, canonical, OG/Twitter tags pointing at `/images/og-card.png`.
- Accessibility floor: one h1 + real h2s per page, `prefers-reduced-motion` guards on infinite animations, `--muted: #82828b` (AA on the black ground), visible focus states.
- New pages: copy `_template/skeleton.html`, fill placeholders, add to `sitemap.xml`.

## Deploy

GitHub Pages from `main` (CNAME → airealitycheck.org). Push to main = live. Work on `fix/`/`feat/` branches, merge when verified.

## Verification

`python3 -m http.server` from repo root, click through all pages; check internal links resolve; confirm sitemap matches pages.

## Tests / coverage

None — static HTML site with one small inline JS app (prompt workspace). Verification is manual browser click-through; no test framework applies.
