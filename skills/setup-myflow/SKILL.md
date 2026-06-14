---
name: setup-myflow
description: Use when onboarding myflow in a repo — checks that the workflow is available and creates repo conventions
---

# Setup myflow

Onboard a repo to myflow. This skill checks that the workflow is available and creates the repo-owned conventions.

## Announce at start

> "I'm using the `setup-myflow` skill to onboard this repo to myflow."

## When to use

- Right after installing myflow in a repo.
- When setting up a fresh repo for this workflow.

## What myflow provides

Cloning myflow and running `pi install ./myflow` brings everything with it:

- **Pipeline skills** — discover, research, blueprint, implement, validate, code-review, and more.
- **Execution skills** — brainstorming, TDD, subagent-driven development, parallel dispatch.
- **Closeout skills** — landing, documentation, retros, learning capture.

The full workflow comes with the clone — no separate installs needed.

## Process

### Step 1: Verify myflow is available

Check that myflow skills are discoverable:

```bash
ls skills/myflow/SKILL.md 2>/dev/null || echo "myflow not found"
```

1. Clone and install: `git clone https://github.com/don-smith/myflow.git && pi install ./myflow`.

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

- Onboarding myflow

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

This project uses the myflow workflow:
- 5-stage pipeline: Discover & Align → Research & Design → Implement → Validate & Review → Land & Learn.
- Skills for brainstorming, TDD, subagent-driven development, and parallel dispatch.
- `land` skill for 9-step closeout in 3 groups (Commit & Document, Reflect & Reconcile, Update & Close).

See `docs/runbooks/` for detailed processes and `docs/memory/` for project context.
```

### Step 4: Report status and next steps

Present a concise summary:

```
Setup status for <repo>:

✓ myflow skills available
✓ Repo conventions created

Next step: /skill:myflow to see the workflow map.
```

## Anti-patterns

- **Creating conventions without asking.** The repo belongs to the team; don't mutate its doc structure unilaterally.
- **Trying to install components separately.** Everything ships with myflow.

## Integration

- Should be re-run after major myflow updates to refresh conventions.
