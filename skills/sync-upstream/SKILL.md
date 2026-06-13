---
name: sync-upstream
description: Run the upstream sync script to clone/pull Superpowers and RPIV, diff against last-synced hashes, and produce a decision report
---

# Sync Upstream

Keep Don's Flow current with its two upstream partners: **Superpowers** and **RPIV**. This skill runs a script that:

1. Clones or pulls `obra/superpowers` into `vendor/superpowers-source/`.
2. Copies selected Superpowers skills into `vendor/superpowers/skills/` (the vendored copy that ships with the package).
3. Clones or pulls `juicesharp/rpiv-mono` to review RPIV changes.
4. Compares the current HEAD of each repo against the last-synced hash.
5. Emits a dated report in `docs/memory/upstream-sync-YYYY-MM-DD.md`.
6. Updates `docs/memory/.upstream-last-sync.json` so the next run only shows new changes.

## Announce at start

> "I'm using the `sync-upstream` skill to pull the latest Superpowers and RPIV changes and decide what to incorporate into Don's Flow."

## When to use

- Monthly, per `docs/runbooks/monitor-upstream-evolution.md`.
- After a project closeout where upstream behavior felt different.
- Before a new release of `@locksmithdon/dons-flow`.

## Process

### Step 1: Run the sync script

```bash
./scripts/sync-upstream.sh
```

The script requires:
- `git`
- `jq`
- network access to GitHub

If `jq` is missing, install it (`brew install jq` on macOS, `apt-get install jq` on Debian/Ubuntu).

### Step 2: Read the report

Open the generated report:

```bash
ls docs/memory/upstream-sync-*.md | tail -1
```

The report contains:
- Last-synced and current commit hashes for both repos.
- Commit log since last sync.
- Diff stat since last sync.
- Empty **Decisions** sections for Superpowers and RPIV.

### Step 3: Decide what to incorporate

For each upstream change, choose:

- **Incorporate** — pull the change into Don's Flow now.
- **Defer** — relevant but not urgent; note it for next cycle.
- **Skip** — not relevant to Don's Flow.

Edit the report in place with your decisions and impact notes.

### Step 4: Apply incorporated changes

Typical changes to make:

- **Superpowers skills changed** — the sync script already copies the selected skills into `vendor/superpowers/skills/`. Review the diff and commit the updated vendored skills.
- **Superpowers adds a new skill** — decide whether to add it to the vendored list in `scripts/sync-upstream.sh`.
- **RPIV version changed** — bump the RPIV dependency versions in `package.json`.
- **Workflow instructions changed** — update `README.md`, `skills/setup-dons-flow/SKILL.md`, and `skills/dons-flow/SKILL.md`.

### Step 5: Release

After applying changes:

1. Update `docs/memory/monitor_upstream_evolution.md` with the decision summary.
2. Bump `package.json` version.
3. Commit and push.
4. Publish to npm.

## Anti-patterns

- **Syncing without reviewing.** The script only surfaces changes; a human must decide what to do with them.
- **Updating hashes without applying changes.** If you bump `.last-sync.json` but do not act on the diff, you lose track of what you skipped.
- **Incorporating blindly.** Upstream changes may conflict with Don's Flow conventions. Review before copying.

## See also

- `docs/runbooks/monitor-upstream-evolution.md` — the monthly runbook
- `docs/memory/monitor_upstream_evolution.md` — long-term decision context
- `scripts/sync-upstream.sh` — the underlying script
