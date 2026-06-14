# Memory: Upstream Awareness

type: practice
cadence: monthly review
last-reviewed: 2026-06-13
next-review: 2026-07-13

## Current stance

myflow is intentionally decoupled from upstream velocity. The default stance is **observe, don't integrate.**

- **RPIV** (`@juicesharp/rpiv-pi`) — npm dependency. Watch for breaking changes or new skills that might be useful. Version bumps are deliberate, not automatic.
- **Superpowers** (`obra/superpowers`) — vendored in `vendor/superpowers/skills/`. Tracked via `scripts/sync-upstream.sh`. Changes are noted but not automatically pulled in.

## Why decoupled

myflow has its own rhythm. Upstream projects evolve on their own schedules. Trying to keep pace creates maintenance churn without corresponding value. Awareness is sufficient — if something upstream is truly compelling, it becomes a deliberate decision.

## What to watch

| Project | URL | What to note |
|---|---|---|
| RPIV | https://github.com/juicesharp/rpiv-mono | Breaking changes, new skills, workflow shifts |
| Superpowers | https://github.com/obra/superpowers | New skills, behavioral changes in vendored skills, license changes |

## Related

- Runbook: `docs/runbooks/monitor-upstream-evolution.md`
- Skill: `sync-upstream`
- Script: `scripts/sync-upstream.sh`
