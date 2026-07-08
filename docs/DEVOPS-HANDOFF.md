# DevOps Handoff — airealitycheck.org

## Summary

Static personal site (hand-authored HTML, zero build step, zero dependencies) served by **GitHub Pages** from the `main` branch of this repo. Custom domain via `CNAME` file (`airealitycheck.org`); HTTPS/HSTS handled by GitHub Pages.

## Environment requirements

None. No runtime, no package manager, no CI pipeline. Any static file server can host the repo root.

## How to run locally

```bash
python3 -m http.server   # from repo root, then open http://localhost:8000
```

## Deploy

Push/merge to `main` → GitHub Pages auto-deploys (typically <1 min). No secrets, no environment variables, no infrastructure to manage.

## Configuration reference

| File | Purpose |
|---|---|
| `CNAME` | Custom domain binding for GitHub Pages |
| `robots.txt` | Allows all; points to sitemap |
| `sitemap.xml` | Hand-maintained; update `lastmod` + entries when pages change |
| `favicon.svg` | Site icon, referenced by every page |
| `images/og-card.png` | 1200×630 social share image, referenced by every page's OG tags |

## Security notes

- Every page ships a CSP `<meta>` tag (self + Google Fonts; creativity page additionally allows YouTube thumbnail hosts).
- No forms, no cookies, no server-side code, no stored data. Attack surface is static content only.
- The prompt workspace runs entirely client-side (localStorage only).

## Deployment maturity

Production, live. Manual verification (browser click-through + link check) before merge; no automated tests — appropriate for a static site of this size.

## Known tech debt

- Inline CSS duplicated per page (~10–14KB each) — deliberate trade-off for the drop-a-file publishing model; revisit only on a full redesign.
- Card radius/hover metrics drift slightly between components (8/10/12px) — cosmetic, invisible across page boundaries.
