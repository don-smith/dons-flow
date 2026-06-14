# Runbook: Monitor Upstream Evolution

Check Superpowers and RPIV monthly to stay aware of upstream changes. Superpowers skills are vendored in `vendor/superpowers/skills/`; RPIV is an npm dependency. Both upstream repos are tracked in `vendor/`. The default stance is **observe, don't integrate.**

## Schedule

- **Cadence:** Monthly, or after every 2–3 projects completed with this workflow.
- **Duration:** 30–60 minutes.
- **Owner:** Don Smith.

## Trigger

- Calendar reminder on the 13th of each month.
- After any project closeout where upstream behavior felt different.
- Before a major myflow update.

## Steps

### 1. Run the upstream sync script

From the root of the myflow repo:

```bash
./scripts/sync-upstream.sh
```

This clones or pulls:

- `https://github.com/obra/superpowers` → `vendor/superpowers-source`
- `https://github.com/juicesharp/rpiv-mono` → `vendor/rpiv-mono`

It then copies selected Superpowers skills into `vendor/superpowers/skills/`, compares each repo's current HEAD against the last-synced hash stored in `docs/memory/.upstream-last-sync.json`, and writes a dated report to `docs/memory/upstream-sync-YYYY-MM-DD.md`.

If `jq` is missing, install it first:

```bash
brew install jq        # macOS
apt-get install jq     # Debian/Ubuntu
```

### 2. Review the generated report

Open the latest report:

```bash
ls docs/memory/upstream-sync-*.md | tail -1
```

For each upstream project, the report shows:

- Last-synced and current commit hashes.
- Commits since the last sync.
- Files changed and diff stats.
- Empty **Decisions** sections.

### 3. Review what changed

Default stance: **observe, don't integrate.** myflow is intentionally decoupled from upstream velocity.

For each change, note:

- **Notable** — interesting new skill, breaking change, or workflow shift worth remembering.
- **No action** — nothing myflow needs to do.

If something is compelling enough to incorporate, make a deliberate decision and document it. But that should be the exception.

Edit the report in place with your observations.

### 4. Update long-term memory

Open `docs/memory/monitor_upstream_evolution.md` and:

- Update `last-reviewed` and `next-review` dates.
- Add a paragraph summarizing this month's sync and any notable observations.

### 5. Commit

1. Commit the new sync report and updated memory.
2. Push.

No version bumps, no publishing, no applying changes — just awareness.

## Outputs

- Updated `docs/memory/upstream-sync-YYYY-MM-DD.md`.
- Updated `docs/memory/monitor_upstream_evolution.md`.
- Updated `docs/memory/.upstream-last-sync.json`.

## Anti-patterns

- **Syncing without reviewing.** The script surfaces changes; at minimum skim the report.
- **Incorporating by default.** The default is observe. Integrate only with a deliberate, documented decision.
- **Letting upstream velocity drive myflow.** myflow has its own rhythm. Upstream changes are interesting data, not action items.
