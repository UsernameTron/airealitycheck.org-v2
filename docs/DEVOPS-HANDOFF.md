# Deployment handoff

## Runtime
GitHub Pages serves the root of main at airealitycheck.org. CNAME and existing content URLs are preserved. Optional Node development scripts do not participate in production hosting. No runtime environment variables or secrets are required.

## Release
1. Run `python3 scripts/check_site.py` and `node --test scripts/workspace.test.mjs`.
2. Inspect 320–901px responsive widths and a desktop view. Check navigation and no page-level horizontal scrolling.
3. Exercise plain prompt copy, variable substitution, A/B switching, save/restore, and unavailable-storage feedback.
4. Merge the verified branch; watch both checks and the Pages build/deployment.
5. Confirm the custom domain serves the new home, articles, tool, guide, images and PDF. Test a nonexistent URL for the custom 404.
6. Revert the release merge commit if a production regression is confirmed.

## Content and performance
The site loads HTML and fonts; portfolio screenshots include intrinsic dimensions and load lazily. No analytics was installed. Establish field performance and conversion baselines before attributing improvements. Proposed goals are LCP ≤2.5s and CLS ≤0.1 under a documented mobile test profile; these are not claimed measurements.

## Data and security
Prompt drafts and templates are localStorage only. The app does not call a model. No submitted form sends user content to a server. Clipboard and localStorage errors are surfaced with recovery guidance. The save dialog stores only a name, category, and prompt text in the current browser.

## Editorial changes
Detection commentary now distinguishes evidence from authorship guesses. The LinkedIn visibility article is explicitly a conceptual scenario model; unsupported observational-study claims and exact penalty figures were removed. BPO and counterfactual examples are labeled illustrative. Keep those limits next to future metric cards.
