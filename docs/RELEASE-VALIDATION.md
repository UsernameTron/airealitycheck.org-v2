# Mobile and content refresh validation

Release baseline: main at b258932d7c217e6fca925d3341cab4aeddb179ca.

- Static checks: 13 public HTML pages; local paths and anchors, canonicals, sitemap, heading/main landmarks, viewport, navigation, image dimensions and alt text, structured data and CNAME passed.
- Workspace regression suite: 8 tests passed, including removal of the last variable, literal dollar-sign values, separate A/B copy, missing/prototype variable names, empty output and clipboard failure.
- Chromium responsive checks: 60 page/width combinations spanning 320–1024px, including breakpoint edges at 600/601 and 900/901. No page-level horizontal overflow or visible button/menu controls below 44px was detected.
- Manual browser tasks: variable substitution and clipboard content, A/B editing and copy, save dialog, reload/draft restoration, mobile menu keyboard open and Escape/focus return. Homepage, article and workspace mobile views and homepage desktop screenshot reviewed.
- Axe-core 4.13: 13 page fixtures at 390px. Two initial findings (workflow-region keyboard focus and inline link distinguishability) fixed; both rechecks returned zero violations. This is automated coverage, not a complete WCAG certification.
- Four article-specific 1200×630 share cards; genuine screenshots from the linked portfolio demos. Demo metrics explicitly labeled illustrative.
- Production performance and real-device keyboard behavior require a separate documented device/network run. No Lighthouse, field Core Web Vitals, or conversion uplift is claimed. Images are sized and lazy loaded; production has no client framework or model API.

Publishing: merge the tested PR, verify checks and Pages deployment, then smoke-test the custom domain. Roll back by reverting the release merge commit, preserving subsequent unrelated work.
