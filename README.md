# @locksmithdon/dons-flow

**Don's Flow v3** is a single 5-stage pipeline that composes RPIV's observable delivery chain, Superpowers' execution discipline, and Don's closeout practices into one unified flow:

1. **[Superpowers](https://github.com/obra/superpowers)** — the methodology you already trust. Socratic design (`brainstorming`), red/green TDD (`test-driven-development`), and subagent-driven execution (`subagent-driven-development`). It is fast, opinionated, and proven.
2. **[RPIV](https://www.npmjs.com/package/@juicesharp/rpiv-pi)** — Juice Sharp's observable, artifact-chained delivery pipeline: `discover → research → design → plan → implement → validate → review → commit`. It adds deliberate checkpoints, self-reflection, and a durable paper trail.
3. **Don's closeout discipline** — the `land` ritual, `epiphany-tabling`, as-built documentation, retros, and memory reconciliation. It closes the cycle so the next one starts clean.

None of these replaces the others. Superpowers excels at the inner loop of design and execution. RPIV excels at observable, reviewable delivery. Don's discipline excels at cycle boundaries and learning capture. Together they form a workflow that is fast *and* reflective *and* humane.

> **Why v3?** v2 was a loose federation of three systems. v3 unifies them into a single 5-stage pipeline with clear artifact handoffs — same skills, better orchestration.

## What each system contributes

| System | Core gift | Typical entry points |
|---|---|---|
| **Superpowers** | Auto-triggering, opinionated execution discipline | `brainstorming`, `test-driven-development`, `subagent-driven-development`, `dispatching-parallel-agents`, `receiving-code-review` |
| **RPIV** | Observable, artifact-chained delivery pipeline with built-in reflection | `discover`, `research`, `blueprint`, `implement`, `validate`, `code-review` |
| **Don's Flow** | Cycle boundaries, scope control, execution discipline, and learning capture | `land`, `epiphany-tabling`, `capturing-learnings`, `verification-before-completion`, `as-built-documentation`, `writing-retros` |

## Installation

Install in each repo where you want the workflow, or install once in your global Pi configuration if you want it everywhere.

### Install

One command installs the entire workflow:

```bash
pi install npm:@locksmithdon/dons-flow
```

This single package includes:

- **RPIV** skills and runtime extensions as npm dependencies.
- **Superpowers** skills vendored directly into the package at `vendor/superpowers/skills/` (MIT licensed; see `vendor/superpowers/LICENSE`).
- **Don's Flow** skills for closeout, scope control, and learning capture.

If RPIV warns about missing sibling extensions during install, restart Pi once the install completes; the dependencies are already declared.

### Onboard the repo

```bash
/skill:setup-dons-flow
```

This creates the repo-owned conventions listed below.

## The 5-stage pipeline

Don's Flow is a single pipeline that adapts to work size. No modes to choose from — follow the stages, and the artifacts guide what comes next.

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

## What this package adds

This package provides the seams between the three systems:

| Skill | Purpose |
|---|---|
| `dons-flow` | The map. Guides you through the 5-stage pipeline for any piece of work. |
| `setup-dons-flow` | Onboarding: checks prerequisites, detects Superpowers, creates repo conventions. |
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

**In this package (developer-owned):**
- The skills and workflow conventions.
- The closeout ritual.
- The promotion rules for turning observations into durable artifacts.

This separation lets the same workflow travel with you across repos while keeping each repo's shared knowledge in the repo.

## Monitoring upstream evolution

Superpowers, RPIV, and Don's Flow will evolve independently. The `sync-upstream` skill clones the Superpowers and RPIV repositories, diffs them against the last-synced hashes, and produces a decision report so you can choose what to incorporate into Don's Flow.

- Skill: `/skill:sync-upstream`
- Script: `scripts/sync-upstream.sh`
- Runbook: `docs/runbooks/monitor-upstream-evolution.md`
- Memory: `docs/memory/monitor_upstream_evolution.md`

The default stance is to incorporate upstream improvements unless there is a clear reason not to. Run the sync monthly or after every 2–3 projects.

## Typical first use

1. `pi install npm:@locksmithdon/dons-flow`.
2. Run `/skill:setup-dons-flow` to scaffold repo conventions.
3. Start with `/skill:dons-flow` to see the 5-stage pipeline. Begin at stage 1 (Discover & Align) with `brainstorming` or `/skill:discover`.
4. Close the cycle with `/skill:land`.
5. After 2–3 projects, run `/skill:sync-upstream`.

## License

MIT
