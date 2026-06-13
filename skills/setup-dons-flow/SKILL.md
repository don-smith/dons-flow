---
name: setup-dons-flow
description: Use when installing or onboarding @locksmithdon/dons-flow in a repo — checks the package and creates repo conventions
---

# Setup Don's Flow

Onboard a repo to Don's Flow. This skill checks that the package is installed and creates the repo-owned conventions.

## Announce at start

> "I'm using the `setup-dons-flow` skill to onboard this repo to Don's Flow."

## When to use

- Right after installing `@locksmithdon/dons-flow` in a repo.
- When setting up a fresh repo for this workflow.

## What Don's Flow installs

`pi install npm:@locksmithdon/dons-flow` brings everything with it:

- **RPIV** skills (`discover`, `research`, `blueprint`, `implement`, `validate`, `code-review`, etc.)
- **RPIV runtime extensions** (`rpiv-todo`, `rpiv-workflow`, etc.)
- **Superpowers** skills (`brainstorming`, `writing-plans`, `test-driven-development`, `subagent-driven-development`, etc.)
- **Don's Flow** skills (`land`, `epiphany-tabling`, `capturing-learnings`, etc.)

There are no separate installs for RPIV or Superpowers.

## Process

### Step 1: Verify the package is installed

Run:

```bash
pi list
```

Look for `npm:@locksmithdon/dons-flow`. If it is missing, install it:

```bash
pi install npm:@locksmithdon/dons-flow
```

If RPIV emits a warning about missing sibling extensions, wait for the install to finish and then restart Pi. The package declares all required RPIV extensions as dependencies, so they install automatically.

### Step 2: Check repo conventions

Check whether these project-owned files and folders exist:

```bash
ls docs/tabled.md docs/status.md docs/memory/MEMORY.md docs/changes docs/retros docs/runbooks AGENTS.md 2>/dev/null
```

Expected:

| Path | Purpose |
|---|---|
| `docs/tabled.md` | Working memory for deferred ideas |
| `docs/status.md` | Living status |
| `docs/memory/` | Persistent memory + `MEMORY.md` index |
| `docs/changes/` | As-built documentation |
| `docs/retros/` | Frozen retrospectives |
| `docs/runbooks/` | Multi-skill processes |
| `AGENTS.md` | Repo-level agent guidance |

### Step 3: Create missing conventions

If the user approves, create missing conventions:

```bash
mkdir -p docs/{memory,changes,retros,runbooks}
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

Seed `AGENTS.md` with a minimal entry:

```markdown
# AGENTS.md

This project uses the `@locksmithdon/dons-flow` workflow:
- RPIV pipeline for discovery, research, design/plan, implement, validate, review, commit.
- Superpowers skills for brainstorming, planning, TDD, and subagent-driven development.
- `land` skill for 10-step cycle closeout.

See `docs/runbooks/` for detailed processes and `docs/memory/` for project context.
```

### Step 4: Report status and next steps

Present a concise summary:

```
Setup status for <repo>:

✓ @locksmithdon/dons-flow installed
✓ Repo conventions created

Next step: /skill:dons-flow to see the workflow map.
```

## Anti-patterns

- **Creating conventions without asking.** The repo belongs to the team; don't mutate its doc structure unilaterally.
- **Trying to install Superpowers or RPIV separately.** They ship with this package.

## Integration

- Called automatically on first install if an extension hook is added later.
- Should be re-run after major Don's Flow updates to refresh conventions.
