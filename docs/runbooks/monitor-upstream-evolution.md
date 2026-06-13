# Runbook: Monitor Upstream Evolution

Check Superpowers and RPIV monthly to keep Don's Flow current with its upstream partners. Superpowers is a harness plugin; RPIV is an npm package. Both are tracked as git repositories in `vendor/`.

## Schedule

- **Cadence:** Monthly, or after every 2–3 projects completed with this workflow.
- **Duration:** 30–60 minutes.
- **Owner:** Don Smith.

## Trigger

- Calendar reminder on the 13th of each month.
- After any project closeout where upstream behavior felt different.
- Before publishing a new version of `@locksmithdon/dons-flow`.

## Steps

### 1. Run the upstream sync script

From the root of the Don's Flow repo:

```bash
./scripts/sync-upstream.sh
```

This clones or pulls:

- `https://github.com/obra/superpowers` → `vendor/superpowers`
- `https://github.com/juicesharp/rpiv-mono` → `vendor/rpiv-mono`

It then compares each repo's current HEAD against the last-synced hash stored in `docs/memory/.upstream-last-sync.json` and writes a dated report to `docs/memory/upstream-sync-YYYY-MM-DD.md`.

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

### 3. Decide what to incorporate

Default stance: **incorporate upstream improvements** unless there is a clear reason not to.

For each change, label it:

- **Incorporate** — pull it into Don's Flow now.
- **Defer** — relevant, but wait for the next cycle or a triggering project.
- **Skip** — not relevant to Don's Flow.

Edit the report in place with your decisions and any impact notes.

### 4. Apply incorporated changes

Common actions:

- **Superpowers skill changed** — update the mirrored or wrapped skill in `skills/`.
- **RPIV skill changed** — update the peer dependency range in `package.json` or adjust workflow instructions.
- **Install instructions changed** — update `README.md`, `skills/setup-dons-flow/SKILL.md`, and `skills/dons-flow/SKILL.md`.
- **New upstream skill added** — decide whether to wrap it, replace an existing Don's Flow skill with it, or ignore it.

### 5. Update long-term memory

Open `docs/memory/monitor_upstream_evolution.md` and:

- Update `last-reviewed` and `next-review` dates.
- Add a paragraph summarizing this month's sync and any deferred decisions.
- Update decision criteria if your thinking has changed.

### 6. Release Don's Flow

If you applied changes:

1. Bump the version in `package.json`.
2. Write a brief `docs/changes/` entry if the package behavior changed.
3. Commit and push.
4. Publish to npm.

If you deferred everything:

1. Still commit the new sync report so the next run has a baseline.
2. Update `last-reviewed` and `next-review`.

## Outputs

- Updated `docs/memory/upstream-sync-YYYY-MM-DD.md`.
- Updated `docs/memory/monitor_upstream_evolution.md`.
- Updated `docs/memory/.upstream-last-sync.json`.
- Optional `docs/changes/` entry.
- Optional new version of `@locksmithdon/dons-flow` on npm.

## Anti-patterns

- **Syncing without deciding.** The script surfaces changes; a human must decide what to do.
- **Updating `.last-sync.json` without applying changes.** This hides skipped changes from future diffs.
- **Incorporating blindly.** Upstream changes may conflict with Don's Flow conventions. Review first.
