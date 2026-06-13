# Memory: Monitor RPIV and Superpowers Evolution

type: decision-deferred
cadence: monthly review
last-reviewed: 2026-06-13
next-review: 2026-07-13

## Decision we deferred

How should `@locksmithdon/dons-flow` track its upstream projects?

- **RPIV** (`@juicesharp/rpiv-pi`) is published to npm and declared as a normal dependency. New versions are adopted by bumping `package.json`.
- **Superpowers** (`obra/superpowers`) is not published to npm under a usable name. We vendor selected Superpowers skills directly into this package at `vendor/superpowers/skills/` and update them with `scripts/sync-upstream.sh`.

The default stance is to incorporate upstream improvements into Don's Flow unless there is a clear reason not to. We will review both projects for 2–3 months before deciding whether to:

1. Keep vendoring Superpowers skills.
2. Fork Superpowers and publish it under `@locksmithdon/superpowers` as a normal npm dependency.
3. Drop Superpowers integration entirely and rely on RPIV + Don's closeout skills.
4. Some hybrid we haven't thought of yet.

## Why we deferred

The integration is new. We want real usage data — at least 2–3 projects run through the full workflow — before committing to a maintenance-heavy fork. Premature formalization of the dependency relationship could create more work than it saves.

## What to watch

| Project | URL | What to check |
|---|---|---|
| RPIV | https://github.com/juicesharp/rpiv-mono | New skills that overlap with our closeout workflow; changes to `implement`, `validate`, `code-review`; new onboarding commands. |
| Superpowers | https://github.com/obra/superpowers | New closeout/landing skills; npm publishing; changes to `brainstorming`, `writing-plans`, `verification-before-completion`; license changes; new harness install paths. |

## Decision criteria

Fork and publish Superpowers if:
- We find ourselves needing its upstream entry points (`brainstorming`, `test-driven-development`, `subagent-driven-development`) in projects where RPIV equivalents don't fit.
- Superpowers still isn't on npm after 3 months of monitoring.
- The maintenance burden of a fork feels smaller than the friction of the harness-plugin install path.

Keep the harness-plugin arrangement if:
- The plugin install path works reliably across harnesses.
- We value staying on the upstream release channel.

Drop Superpowers integration if:
- RPIV adds equivalent closeout/landing skills.
- We stop using Superpowers entry points entirely.

## Related

- Runbook: `docs/runbooks/monitor-upstream-evolution.md`
- Skill: `sync-upstream`
- Script: `scripts/sync-upstream.sh`
- Skill: `setup-dons-flow`
- Package: `package.json` § `peerDependencies`
