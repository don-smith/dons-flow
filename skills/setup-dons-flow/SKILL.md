---
name: setup-dons-flow
description: Use when installing or onboarding @locksmithdon/dons-flow in a repo — checks dependencies, detects Superpowers, and creates repo conventions
---

# Setup Don's Flow

Onboard a repo to the integrated RPIV + Superpowers + `land` workflow. This skill checks prerequisites, detects what is already installed, creates the repo-owned conventions, and tells you what still needs to be done.

## Announce at start

> "I'm using the `setup-dons-flow` skill to onboard this repo to the integrated workflow."

## When to use

- Right after installing `@locksmithdon/dons-flow` in a repo.
- When you suspect prerequisites are missing.
- When setting up a fresh repo for this workflow.

## Process

### Step 1: Detect installed Pi packages

Run:

```bash
pi list
```

Look for:

| Package | Required? | If missing |
|---|---|---|
| `npm:@juicesharp/rpiv-pi` | Yes | `pi install npm:@juicesharp/rpiv-pi` |
| `npm:@tintinweb/pi-subagents` | Yes | `pi install npm:@tintinweb/pi-subagents` |
| `npm:@locksmithdon/dons-flow` | Yes | `pi install npm:@locksmithdon/dons-flow` |

If RPIV is installed, also run `/rpiv-setup` once and restart Pi to install RPIV's sibling plugins.

### Step 2: Detect Superpowers

Superpowers is installed via your agent harness, not as a Pi npm package. Check one of:

- **Claude Code:** `/plugin list` should show `superpowers`
- **Codex CLI:** `/plugins` should list Superpowers
- **Gemini CLI:** `gemini extensions list` should show it
- **Skills directory:** `ls ~/.pi/agent/skills/` may contain Superpowers skills if they were copied manually

If Superpowers is not installed, ask the user which path they prefer:

1. **Harness plugin** (recommended for most users)
2. **Git URL** — `pi install github:obra/superpowers` if their Pi supports git URLs
3. **Skip for now** — the closeout workflow still works without Superpowers entry points

Record the choice in `docs/memory/MEMORY.md` if this is a long-lived project.

### Step 3: Check repo conventions

Check whether these project-owned files and folders exist:

```bash
ls docs/tabled.md docs/status.md docs/memory/MEMORY.md docs/changes docs/retros docs/runbooks AGENTS.md 2>/dev/null
```

Expected:

| Path | Purpose |
|---|---|
| `docs/tabled.md` | Working memory for deferred ideas |
| `docs/tabled/` | Optional per-item tabled docs |
| `docs/status.md` | Living status |
| `docs/memory/` | Persistent memory + `MEMORY.md` index |
| `docs/changes/` | As-built documentation |
| `docs/retros/` | Frozen retrospectives |
| `docs/runbooks/` | Multi-skill processes |
| `AGENTS.md` | Repo-level agent guidance |

### Step 4: Create missing conventions

If the user approves, create missing conventions:

```bash
mkdir -p docs/{tabled,memory,changes,retros,runbooks}
touch docs/tabled.md docs/status.md docs/memory/MEMORY.md AGENTS.md
```

Seed `docs/status.md` with:

```markdown
# Status

## Active Work

- Onboarding `@locksmithdon/dons-flow`

## Recently Completed

_None yet._

## What's Next

_None yet._
```

Seed `docs/memory/MEMORY.md` with:

```markdown
# Memory Index

Cross-session context for this project.

## Entries

_None yet._
```

Seed `AGENTS.md` with a minimal entry pointing at this workflow:

```markdown
# AGENTS.md

This project uses the `@locksmithdon/dons-flow` workflow:
- RPIV pipeline for discovery, research, design/plan, implement, validate, review, commit.
- Superpowers-style scope control and verification discipline.
- `land` skill for 10-step cycle closeout.

See `docs/runbooks/` for detailed processes and `docs/memory/` for project context.
```

### Step 5: Report status and next steps

Present a concise summary:

```
Setup status for <repo>:

✓ RPIV installed
✗ @tintinweb/pi-subagents missing — run: pi install npm:@tintinweb/pi-subagents
✓ Repo conventions created
? Superpowers — not detected; install via harness plugin if desired

Next step: /skill:dons-flow to see the workflow map.
```

## Anti-patterns

- **Creating conventions without asking.** The repo belongs to the team; don't mutate its doc structure unilaterally.
- **Assuming Superpowers is installed.** It is optional and harness-specific. Always detect or ask.
- **Installing packages without confirmation.** Present the install commands; let the human run them.

## Integration

- Called automatically on first install if an extension hook is added later.
- Should be re-run after major RPIV or Superpowers updates to refresh conventions.
