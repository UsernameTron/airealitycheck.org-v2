# Lessons

## Active Rules

### Learned Rules
- [2026-07-08] [Completeness]: When removing an author-facing pattern (scaffold sections, placeholder cards), grep the WHOLE site for the pattern before declaring done — the tools-page scaffold had an identical sibling on the creativity page. Triggered by: cleaned one scaffold section, shipped, user found the second.
- [2026-07-08] [YouTube]: Never use maxresdefault.jpg with an onerror fallback — YouTube serves its gray placeholder as the 404 response body, so onerror never fires. Use hqdefault.jpg (exists for every video) with the 16:9 object-fit:cover crop. Triggered by: two gray video cards in production.
- [2026-07-08] [Identity]: Pete's LinkedIn is https://www.linkedin.com/in/petecconnor/ (double c). Verify personal profile URLs with Pete rather than trusting whatever the repo already has. Triggered by: site shipped with /in/peteconnor in 14 places.
- [2026-07-08] [Verification]: The Claude Preview panel can open at a 0×0 viewport — layout collapses and lazy images never load, mimicking real bugs. Check window.innerWidth before diagnosing; resize + reload first. Triggered by: 30 minutes chasing a phantom thumbnail failure.
- [2026-07-08] [Git]: This repo's hooks evaluate state BEFORE compound commands run — branch-protection sees the current branch and the push-gate sees uncommitted files pre-execution. Run checkout, commit, and merge+push as separate Bash calls. Pushes need the UsernameTron gh identity: git push "https://x-access-token:$(gh auth token -u UsernameTron)@github.com/UsernameTron/airealitycheck.org-v2.git" main.

## Archived
