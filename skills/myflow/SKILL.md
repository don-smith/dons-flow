---
name: myflow
description: Use when starting or navigating a major piece of work — applies the 5-stage myflow pipeline with clear artifact handoffs between stages
---

# myflow

A single 5-stage pipeline for AI-assisted software development — from discovery through landing. Each stage produces a clear handoff artifact, so you always know what's next.

Each stage produces an artifact consumed by the next. Each stage has a clear set of skills. There are no modes to choose from — the pipeline adapts to work size via `blueprint` (small) or `design` → `plan` (complex).

## Announce at start

> "I'm using the `myflow` skill to run the 5-stage myflow pipeline."

## When to use this skill

- At the **start** of a new piece of work, to follow the pipeline from Discover through Land.
- When you are **mid-work** and unsure which stage comes next.
- At the **end** of a validated implementation, to begin the Land closeout (stage 5).
- When onboarding a fresh repo to this workflow.

## Prerequisites

Clone this repo and run `pi install <path-to-clone>`. Dependencies install automatically — there are no separate installs.

## Before you start

If this repo has not been onboarded yet, run:

```bash
/skill:setup-myflow
```

If you haven't cloned myflow yet:

```bash
git clone https://github.com/don-smith/myflow.git
pi install ./myflow
```

## The 5-Stage Pipeline

```
Stage 1: Discover & Align → Stage 2: Research & Design → Stage 3: Implement
→ Stage 4: Validate & Review → Stage 5: Land & Learn
```

Each stage produces an artifact that gates the next. The presence of the artifact determines what can run next — no ambiguity about "what's next."

### Stage 1 — Discover & Align

Shape the work. Capture intent.

**Skills:**
- `brainstorming` — free-form ideation when the concept is fuzzy
- `discover` — structured interview, produces a Feature Requirements Document
- `explore` — weight solution options when multiple approaches exist

**Typical flow:** `brainstorming` → `discover` (formalize output) → `explore` (if multiple valid paths). Or skip straight to `discover` if the work is already well-shaped.

**Artifact:** `.rpiv/artifacts/discover/` (FRD) or `.rpiv/artifacts/solutions/` (Solutions doc)

**Checkpoint:** Run `capturing-learnings` after the artifact is accepted.

**Skill invocations:**
| I want to... | Invoke |
|---|---|
| Ideate freely | `brainstorming` |
| Capture structured intent | `/skill:discover "[description]"` |
| Compare solution options | `/skill:explore "[problem]"` |

### Stage 2 — Research & Design

Ground intent in codebase reality. Design the solution. Stress-test the architecture.

**Skills:**
- `research` — codebase analysis, produces Research doc
- `design` — decompose into vertical slices, produces Design doc
- `architecture-review` — stress-test the design against existing architecture (moved from Land)
- `blueprint` — fused design+plan in one pass (fast path for smaller work)
- `plan` — turn design into phased implementation steps (complex path)

**Two paths:**
- **Complex:** `design` → `architecture-review` → `plan` (for large or cross-cutting work)
- **Fast:** `blueprint` (single pass → implement-ready plan)

**Artifact:** `.rpiv/artifacts/plans/` — canonical format. `implement` consumes this.

**Checkpoint:** Run `capturing-learnings` after the plan is accepted.

**Cross-cutting:** `epiphany-tabling` active. Any realization not trivially in-scope → `docs/tabled.md`.

**Skill invocations:**
| I want to... | Invoke |
|---|---|
| Analyze the codebase | `/skill:research <artifact-or-topic>` |
| Design + plan separately | `/skill:design <research>` → `/skill:plan <design>` |
| Design + plan together (fast) | `/skill:blueprint <research>` |
| Stress-test architecture | `/skill:architecture-review` |

### Stage 3 — Implement

Execute the plan. Write the code.

**Skills:**
- `implement` — primary executor. Fans out plan phases, gates each on success criteria
- `test-driven-development` — red/green TDD within each phase
- `subagent-driven-development` — fresh subagent per phase task, two-stage review
- `dispatching-parallel-agents` — for independent phase tasks
- `verification-before-completion` (myflow) — no success claim without fresh evidence

**Inner loop:** `implement` is the primary. TDD, subagents, and parallel dispatch are strategies used _inside_ each phase — not replacements for `implement`.

**Artifact:** Working tree changes.

**Cross-cutting:** `epiphany-tabling` active. `create-handoff` / `resume-handoff` for multi-session work.

**Skill invocations:**
| I want to... | Invoke |
|---|---|
| Execute the plan | `/skill:implement <plan> [Phase N]` |
| Run TDD discipline | `test-driven-development` |
| Dispatch subagents | `subagent-driven-development` |
| Parallel independent tasks | `dispatching-parallel-agents` |
| Save mid-work state | `/skill:create-handoff` |
| Resume saved state | `/skill:resume-handoff <handoff-path>` |

### Stage 4 — Validate & Review

Verify the work. Gate the commit.

**Skills:**
- `validate` — re-check each phase against its success criteria
- `code-review` — structured audit across quality, security, and dependencies. Emits `blockers_count`.
- `receiving-code-review` — process review findings with technical rigor
- `revise` — surgically update the plan from review feedback

**Gate:** `code-review` loops until zero blockers (max 3 passes). Blockers → `revise` → re-implement → re-validate. Zero blockers → proceed to stage 5. Three loops with remaining blockers → stops for human decision.

**Artifact:** `.rpiv/artifacts/validation/` + `.rpiv/artifacts/reviews/`

**Checkpoint:** Run `capturing-learnings` after validate + review pass.

**Skill invocations:**
| I want to... | Invoke |
|---|---|
| Verify implementation | `/skill:validate <plan>` |
| Review changes | `/skill:code-review [scope]` |
| Process review feedback | `receiving-code-review` |
| Update plan from review | `/skill:revise <plan-path>` |

### Stage 5 — Land & Learn

Close the cycle. Document. Reflect. Prepare for next.

**Skill:** `/skill:land`

**What it does:** 9 steps in 3 groups:
- **Group 1 — Commit & Document:** `commit` → `as-built-documentation`
- **Group 2 — Reflect & Reconcile:** `writing-retros` → `capturing-learnings`
- **Group 3 — Update & Close:** Doc/knowledge-graph review → AGENTS.md → memory reconcile → status review + resolve `docs/tabled.md` → `finishing-a-development-branch`

**Artifacts:** `docs/changes/`, `docs/retros/`, `docs/memory/`, `docs/status.md`, git commits.

**Skill invocation:**
| I want to... | Invoke |
|---|---|
| Close out the cycle | `/skill:land` |

## Cross-cutting practices

These practices run continuously across the pipeline, not at a single stage.

### Epiphany tabling (`epiphany-tabling`)

Use `epiphany-tabling` whenever an unexpected realization surfaces mid-task during stages 2-4. Add it to `docs/tabled.md`. Never lose it, never let it derail current work. Resolve tabled items at end-of-artifact checkpoints and during Land step 8.

### Capturing learnings (`capturing-learnings`)

After each approved artifact (stages 1, 2, 4, and 5), run `capturing-learnings`. Apply the rule: **once is a moment; twice is a pattern.** Promote tabled observations to skills, runbooks, or memory only on the second sighting.

### Verification before completion (`verification-before-completion`)

Before any completion claim — a test passing, a phase done, a feature working — run the verification command fresh, read the output, and cite the evidence. No shortcuts.

### Handoffs (`create-handoff` / `resume-handoff`)

If you must stop mid-work at any stage, use `/skill:create-handoff`. Resume with `/skill:resume-handoff <handoff-path>` in a fresh session.

## Upstream awareness

Upstream projects that contribute skills to myflow evolve independently. The `sync-upstream` skill lets you check for changes — see `docs/runbooks/monitor-upstream-evolution.md` for the process. The default stance is **observe, don't integrate.**

## Repo conventions this workflow expects

Your codebase should contain these documents and folders. They are owned by the team, not by any package:

| Path | Purpose |
|---|---|
| `docs/tabled.md` | Working memory for epiphanies and deferred work |
| `docs/status.md` | Living status: Recently Completed, What's Next |
| `docs/memory/` | Persistent project/session memory entries |
| `docs/memory/MEMORY.md` | Index of memory entries |
| `docs/changes/` | As-built documentation: what shipped and why |
| `docs/retros/` | Frozen retrospective documents |
| `docs/runbooks/` | Multi-skill processes and practices |
| `AGENTS.md` | Repo-level agent guidance |

## Anti-patterns

- **Skipping `land`.** Stage 4 is not the finish line. Close the cycle.
- **Carrying `docs/tabled.md` across cycles.** Resolve every entry during Land step 8.
- **Editing source files during stages 1-2.** Discover, research, design, and blueprint produce artifacts; `implement` (stage 3) edits code.
- **Recomposing slice boundaries.** `design`/`blueprint` owns decomposition; `plan` inherits slices 1:1.
- **Letting verification become a rubber stamp.** Evidence first, claims second.
- **Holding review findings for Land.** Code review happens in stage 4. Land is for closeout, not re-review.

## Quick reference

| Stage | Primary Skill(s) | Artifact Produced |
|---|---|---|
| 1. Discover & Align | `discover`, `brainstorming`, `explore` | FRD or Solutions |
| 2. Research & Design | `research`, `design`/`blueprint`, `plan` | Plan (`.rpiv/artifacts/plans/`) |
| 3. Implement | `implement` + TDD, subagents | Working tree changes |
| 4. Validate & Review | `validate`, `code-review`, `revise` | Validation + Review |
| 5. Land & Learn | `land` (→ commit, as-built, retro...) | `docs/changes/`, retros, memory |

| I want to... | Invoke |
|---|---|
| Onboard a repo | `/skill:setup-myflow` |
| See the pipeline | `/skill:myflow` |
| Ideate / refine a design | `brainstorming` |
| Capture intent | `/skill:discover "..."` |
| Understand the codebase | `/skill:research <artifact-or-topic>` |
| Compare options | `/skill:explore "..."` |
| Design + plan separately | `/skill:design <research>` → `/skill:plan <design>` |
| Design + plan together | `/skill:blueprint <research>` |
| Execute the plan | `/skill:implement <plan> [Phase N]` |
| Execute with subagents | `subagent-driven-development` |
| Run TDD | `test-driven-development` |
| Verify implementation | `/skill:validate <plan>` |
| Review changes | `/skill:code-review [scope]` |
| Process review feedback | `receiving-code-review` |
| Update plan from review | `/skill:revise <plan-path>` |
| Commit changes | `/skill:commit` |
| Close out the cycle | `/skill:land` |
| Table a mid-flight realization | `/skill:epiphany-tabling` |
| Run end-of-artifact checkpoint | `/skill:capturing-learnings` |
| Create a handoff | `/skill:create-handoff` |
| Resume a handoff | `/skill:resume-handoff <handoff-path>` |

## See also

- `setup-myflow` — onboarding skill
- `land` — stage 5 closeout (9 steps in 3 groups)
- `epiphany-tabling` — scope control
- `capturing-learnings` — promotion rule and end-of-artifact checkpoints
- `verification-before-completion` — evidence-first discipline
- `docs/runbooks/monitor-upstream-evolution.md` — upstream tracking
- Pipeline visual: `docs/myflow-v3-pipeline.html`
- Pipeline spec: `docs/superpowers/specs/2026-06-14-myflow-v3-pipeline-design.md`
