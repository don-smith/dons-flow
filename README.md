# myflow

**myflow** is a single 5-stage pipeline for AI-assisted software development — from discovery through landing. Every stage produces a clear handoff artifact, so you always know what's next. No modes, no choices between systems, no ambiguity.

myflow draws skills from **[Superpowers](https://github.com/obra/superpowers)** (brainstorming, TDD, subagents) and **[RPIV](https://www.npmjs.com/package/@juicesharp/rpiv-pi)** (discover, blueprint, implement, validate, review), plus its own closeout and cross-cutting practices. But from the developer's perspective, there is one workflow with one name.

## Installation

Clone the repo and point Pi at the local directory:

```bash
git clone https://github.com/don-smith/myflow.git
pi install ./myflow
```

Restart Pi and the workflow is active — all skills are discovered from `skills/` and `vendor/superpowers/skills/`.

To update, `git pull` in the cloned repo and restart Pi. No npm reinstall needed.

### Onboard a project repo

```bash
/skill:setup-myflow
```

This creates the repo-owned conventions listed below.

## The 5-stage pipeline

myflow is a single pipeline that adapts to work size. No modes to choose from — follow the stages, and the artifacts guide what comes next.

```
1. Discover & Align → 2. Research & Design → 3. Implement → 4. Validate & Review → 5. Land & Learn
```

| Stage | What happens | Key skills |
|---|---|---|
| 1. **Discover & Align** | Shape the work, capture intent | `brainstorming`, `discover`, `explore` |
| 2. **Research & Design** | Ground in code, design the solution | `research`, `design`, `architecture-review`, `blueprint`/`plan` |
| 3. **Implement** | Execute the plan, write the code | `implement` + TDD, subagents, `verification-before-completion` |
| 4. **Validate & Review** | Verify the work, gate the commit | `validate`, `code-review`, `receiving-code-review`, `revise` |
| 5. **Land & Learn** | Close the cycle, document, reflect | `land` (→ commit, as-built, retro, memory reconcile) |

Between stages, artifacts hand off: FRD → Plan → Working tree → Validation → As-built docs.

`epiphany-tabling` runs across stages 2-4. `capturing-learnings` checks in after stages 1, 2, 4, and 5. `create-handoff` / `resume-handoff` bridge sessions at any stage.

## What this workflow provides

myflow provides the full workflow:

| Skill | Purpose |
|---|---|
| `myflow` | The map. Guides you through the 5-stage pipeline for any piece of work. |
| `setup-myflow` | Onboarding: creates repo conventions for the myflow workflow. |
| `land` | The 9-step closeout in 3 groups: Commit & Document, Reflect & Reconcile, Update & Close. |
| `epiphany-tabling` | Capture mid-flight realizations in `docs/tabled.md` without derailing current work. |
| `as-built-documentation` | Replace spec/plan scaffolding with a permanent `docs/changes/` record of what shipped. |
| `capturing-learnings` | End-of-artifact checkpoints + the "once is a moment; twice is a pattern" promotion rule. |
| `writing-retros` | Produce frozen retrospective documents at milestone close. |
| `verification-before-completion` | Evidence-before-claims discipline embedded in execution. |
| `finishing-a-development-branch` | Merge / PR / cleanup decisions at cycle end. |
| `using-git-worktrees` | Isolated workspaces for parallel workstreams. |

## Repo conventions

These documents live in the codebase because they are shared context for the whole team. The skills that produce and maintain them live in this package.

| Path | Purpose |
|---|---|
| `docs/tabled.md` | Working memory for deferred ideas and follow-ups |
| `docs/status.md` | Living status: Recently Completed, What's Next |
| `docs/memory/` | Persistent memory entries + `MEMORY.md` index |
| `docs/changes/` | As-built documentation: what shipped and why |
| `docs/retros/` | Frozen retrospective documents |
| `docs/runbooks/` | Multi-skill processes |
| `AGENTS.md` | Repo-level agent guidance |

## Philosophy: what lives where

**In the codebase (shared):**
- The code changes.
- As-built docs (`docs/changes/`).
- Retros (`docs/retros/`).
- Status, memory, and runbooks.

**In this repo (developer-owned):**
- The skills and workflow conventions.
- The closeout ritual (`land`).
- The promotion rules for turning observations into durable artifacts.

Clone this repo anywhere you want the workflow. It travels with you across codebases while keeping each project's shared knowledge in the project.

## Tracking upstream changes

Superpowers and RPIV evolve independently. The `sync-upstream` skill surfaces what changed so you're aware — but myflow does not automatically incorporate upstream changes. The default stance is **observe, don't integrate.**

- Skill: `/skill:sync-upstream`
- Script: `scripts/sync-upstream.sh`
- Runbook: `docs/runbooks/monitor-upstream-evolution.md`
- Memory: `docs/memory/monitor_upstream_evolution.md`

Run the sync monthly or after every 2–3 projects to stay informed.

## Typical first use

1. Clone the repo: `git clone https://github.com/don-smith/myflow.git && pi install ./myflow`.
2. Run `/skill:setup-myflow` to scaffold repo conventions.
3. Start with `/skill:myflow` to see the 5-stage pipeline. Begin at stage 1 (Discover & Align) with `brainstorming` or `/skill:discover`.
4. Close the cycle with `/skill:land`.
5. After 2–3 projects, run `/skill:sync-upstream`.

## License

MIT
