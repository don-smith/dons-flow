# Runbook: Monitor Upstream Evolution

Check RPIV and Superpowers monthly to decide how `@locksmithdon/dons-flow` should track them.

## Schedule

- **Cadence:** Monthly, or after every 2–3 projects completed with this workflow.
- **Duration:** 15–30 minutes.
- **Owner:** @locksmithdon.

## Trigger

- Calendar reminder on the 13th of each month.
- After any project closeout where the dependency relationship felt awkward.

## Steps

### 1. Check RPIV

Visit https://github.com/juicesharp/rpiv-mono and look at:

- **Releases / CHANGELOG** — new versions of `@juicesharp/rpiv-pi`.
- **Skills** — has RPIV added a `land`, `closeout`, `retro`, or `as-built` skill? If so, evaluate whether our port is still needed.
- **Implement / validate / code-review** — have these skills changed in ways that affect our closeout sequence?
- **Onboarding** — has RPIV added smoother setup commands we should mirror?

Record findings in `docs/memory/monitor_upstream_evolution.md` under a dated heading.

### 2. Check Superpowers

Visit https://github.com/obra/superpowers and look at:

- **Releases / RELEASE-NOTES.md** — new versions.
- **Skills** — has Superpowers added a `land`, `closeout`, or `as-built` skill? Has it published to npm?
- **Brainstorming / writing-plans / subagent-driven-development** — have these changed in ways that make them more or less attractive than RPIV equivalents?
- **License** — still MIT and forkable?

Record findings in `docs/memory/monitor_upstream_evolution.md` under the same dated heading.

### 3. Check our own usage

Review recent projects that used this workflow:

- Did we use Superpowers-specific entry points (`brainstorming`, `writing-plans`, `subagent-driven-development`) or RPIV entry points (`discover`, `blueprint`, `implement`)?
- Did the optional git peer dependency cause install friction?
- Did RPIV's pipeline cover everything we needed?
- Did our `land` skill feel like the right cycle boundary?

Sources:
- Recent `docs/retros/` files.
- Recent `docs/changes/` files.
- `docs/tabled.md` history.

### 4. Decide or defer

Ask:

1. Is Superpowers on npm yet?
2. Does RPIV now provide closeout/landing?
3. Are we actively hurt by the current dependency setup?
4. Would a fork save more friction than it costs?

If the answer to any of 1–3 is **yes**, consider updating `package.json` and the workflow.

If the answer is **no**, bump `next-review` by one month and keep monitoring.

### 5. Capture the decision

If you make a change:
- Update `docs/memory/monitor_upstream_evolution.md`.
- Write a brief note in `docs/changes/` if the package behavior changed.
- Update `README.md` and `skills/dons-flow/SKILL.md` if install instructions changed.

If you defer:
- Update `last-reviewed` and `next-review` in `docs/memory/monitor_upstream_evolution.md`.
- Add one paragraph summarizing the month's observations.

## Outputs

- Updated `docs/memory/monitor_upstream_evolution.md`.
- Optional `docs/changes/` entry if the package changed.
- Optional update to install docs.
