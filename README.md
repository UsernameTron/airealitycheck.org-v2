# airealitycheck.org

Source for [airealitycheck.org](https://airealitycheck.org) — the public face of Connor Advisors LLC and the AI/ML CX consulting practice of C. Pete Connor.

Built as static HTML with the Obsidian Showcase design system. No build step, no framework dependencies. Hosted on GitHub Pages.

## Structure

```
/
├── index.html                                 # Homepage — three doors
├── CNAME                                      # GitHub Pages custom domain
├── sitemap.xml
├── robots.txt
├── favicon.svg
├── /career-content/
│   ├── index.html                             # About / the practice
│   ├── /articles/
│   │   ├── index.html                         # Articles hub
│   │   ├── detection.html
│   │   ├── counterfactual-reasoning-html.html
│   │   ├── ml-bpo-turnover.html
│   │   └── linkedin-visibility-google-style.html
│   ├── /portfolio/
│   │   └── index.html                         # Live demos + repos
│   └── /tools-and-resources/
│       ├── index.html                         # Tools hub
│       └── prompt-workspace.html              # Interactive tool
├── /downloads/
│   └── crushin-claude.pdf
├── /images/
│   └── profile.jpeg                           # (add this — see notes)
└── /_template/
    └── skeleton.html                          # Page template reference
```

## Adding new content

**A new article:** copy any file from `/career-content/articles/`, rename it, replace the prose. Then add a card to `/career-content/articles/index.html` and a `<url>` block to `sitemap.xml`.

**A new download:** drop the file into `/downloads/`, then in `/career-content/tools-and-resources/index.html` find the `<!-- TEMPLATE — DOWNLOAD CARD -->` comment and copy that card pattern. Add the URL to `sitemap.xml`.

**A new interactive tool:** drop the HTML file into `/career-content/tools-and-resources/`, then in that hub's `index.html` copy the `<!-- TEMPLATE — INTERACTIVE TOOL CARD -->` block. Update `sitemap.xml`.

## Design system

The visual aesthetic is locked to the obsidian-showcase-page skill: dark mode (#09090b), Plus Jakarta Sans + JetBrains Mono, green accent (#34d399), cyan secondary (#22d3ee). Every page imports the same CSS variable set.

`/_template/skeleton.html` is the canonical reference. New pages should start from a copy.

## Deployment

GitHub Pages auto-deploys from `main`. Custom domain (airealitycheck.org) is set in repo Settings → Pages.

## License

Content © C. Pete Connor / Connor Advisors LLC. Code MIT.
