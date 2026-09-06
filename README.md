# AI Reality Check

Public site for C. Pete Connor / Connor Advisors LLC at https://airealitycheck.org.

## Architecture

GitHub Pages serves self-contained HTML from main. No production build, backend, API keys, or framework dependencies. Each page retains inline CSS; `_template/skeleton.html` is the canonical starting point. The prompt workspace is a local browser editor, not a model execution service.

## Develop and check

- `npm run dev` — optional dependency-free Node static preview on port 8000.
- `python3 -m http.server` — alternative plain static server.
- `python3 scripts/check_site.py` — internal links, sitemap, metadata, headings, image and navigation checks.
- `node --test scripts/workspace.test.mjs` — regression checks for copying, substitutions, variants, and empty input.

GitHub Actions runs checks on pull requests and pushes. Its purpose is validation; GitHub Pages continues to publish the main branch with the custom CNAME.

## Publishing checklist

1. Copy the canonical template and fill every placeholder.
2. Keep the existing mobile menu, semantic headings, footer, and focus states.
3. Add a concise summary, relevant sources, publication and actual modification dates, and a useful next link.
4. Label modeled outcomes next to the figures. Never imply example data is a client result.
5. Add a card to the appropriate hub, with visible date and reading time. Sort article cards by publication date.
6. Update canonical/social metadata, the share image if applicable, and sitemap.xml.
7. Run checks, inspect phone/tablet/desktop layouts, and verify the main task.
8. Work on a feat/ or fix/ branch; merge only after verification. Main publishes live.

## Content

- `/career-content/`: About and contact
- `/career-content/articles/`: analysis and labeled conceptual/model examples
- `/career-content/portfolio/`: live demo descriptions, screenshots, and limitations
- `/career-content/creativity/`: Studio / YouTube collection
- `/career-content/tools-and-resources/`: tools and downloads
- `/career-content/tools-and-resources/prompt-workspace.html`: mobile prompt editor
- `/career-content/tools-and-resources/claude-guide.html`: concise web companion
- `/downloads/crushin-claude.pdf`: full guide

## Workspace storage

Drafts and custom templates stay in localStorage in the current browser. No analytics or model request is sent. Private browsing, storage clearing, and browser restrictions can prevent persistence. Copy essential work out before leaving; errors are surfaced in the editor.

## Rollback

Revert the release merge commit and let Pages redeploy. Preserve existing URLs and CNAME. See docs/DEVOPS-HANDOFF.md for release checks.

Content © C. Pete Connor / Connor Advisors LLC. Code MIT.
