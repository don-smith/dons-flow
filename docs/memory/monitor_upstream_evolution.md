# Memory: Monitor RPIV and Superpowers Evolution

type: decision-deferred
cadence: monthly review
last-reviewed: 2026-06-13
next-review: 2026-07-13

## Decision we deferred

How should `@locksmithdon/dons-flow` track its upstream projects?

- **RPIV** (`@juicesharp/rpiv-pi`) is published to npm and already declared as a normal peer dependency.
- **Superpowers** (`obra/superpowers`) is a GitHub-only skills framework, not published to npm under a resolvable name. The `superpowers` name on npm is taken by an unrelated package.

We are not forking or publishing Superpowers yet. Instead, we declared it as an optional git peer dependency (`github:obra/superpowers`) and will monitor both projects for 2–3 months before deciding whether to:

1. Keep the optional git peer dependency.
2. Fork Superpowers and publish it under `@locksmithdon/superpowers` as a normal npm peer dependency.
3. Remove the Superpowers peer dependency entirely and rely on this package's ported closeout skills + RPIV's pipeline.
4. Some hybrid we haven't thought of yet.

## Why we deferred

The integration is new. We want real usage data — at least 2–3 projects run through the full workflow — before committing to a maintenance-heavy fork. Premature formalization of the dependency relationship could create more work than it saves.

## What to watch

| Project | URL | What to check |
|---|---|---|
| RPIV | https://github.com/juicesharp/rpiv-mono | New skills that overlap with our closeout workflow; changes to `implement`, `validate`, `code-review`; new onboarding commands. |
| Superpowers | https://github.com/obra/superpowers | New closeout/landing skills; npm publishing; changes to `brainstorming`, `writing-plans`, `verification-before-completion`; license changes. |

## Decision criteria

Fork and publish Superpowers if:
- We find ourselves needing its upstream entry points (`brainstorming`, `test-driven-development`, `subagent-driven-development`) in projects where RPIV equivalents don't fit.
- Superpowers still isn't on npm after 3 months of monitoring.
- The maintenance burden of a fork feels smaller than the friction of the git dependency.

Keep the git peer dependency if:
- The optional install path works reliably across harnesses.
- We rarely need Superpowers-specific entry points because RPIV covers the pipeline.

Remove it if:
- RPIV adds equivalent closeout/landing skills.
- We stop using Superpowers entry points entirely.

## Related

- Runbook: `docs/runbooks/monitor-upstream-evolution.md`
- Skill: `setup-dons-flow`
- Package: `package.json` § `peerDependencies`
