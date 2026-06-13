# Don's Flow v3 — Pipeline Design

**Date:** 2026-06-14
**Status:** approved

## Summary

Evolve Don's Flow from a loose federation of three systems (Superpowers, RPIV, Don's closeout) into a single unified 5-stage pipeline with clear artifact handoffs, explicit skill assignments, and no ambiguous alternatives.

## Motivation

The v2 "three modes" approach (Superpowers-led, RPIV-led, Mixed) creates ambiguity about which path to take. Skills coexist but don't compose. It's never clear which skill to invoke next. The tool doesn't enforce the flow — the human has to remember.

RPIV's pipeline design offers the pattern: clear stages, artifact-driven gating, validated handoffs, JSONL audit. This design adopts that philosophy while incorporating Superpowers and Don's closeout skills into their natural homes within the pipeline.

## The Pipeline

Five stages. Each produces an artifact consumed by the next. Cross-cutting practices run alongside, not at a single stage.

```
Stage 1 → Stage 2 → Stage 3 → Stage 4 → Stage 5
  │          │          │          │          │
  ▼          ▼          ▼          ▼          ▼
artifact   artifact   artifact   artifact   artifact
```

### Stage 1: Discover & Align

Shape the work. Capture intent.

**Skills:**
- `brainstorming` (Superpowers) — free-form ideation
- `discover` (RPIV) — structured interview, produces FRD
- `explore` (RPIV) — compare solution options, produces Solutions doc

**Typical flow:** brainstorm → discover (formalize the output) → explore (if multiple valid approaches)

**Artifact:** `.rpiv/artifacts/discover/` or `.rpiv/artifacts/solutions/`

**Checkpoint:** `capturing-learnings` after artifact accepted.

### Stage 2: Research & Design

Ground intent in codebase reality. Design the solution. Stress-test the architecture.

**Skills:**
- `research` (RPIV) — codebase analysis, produces Research doc
- `design` (RPIV) — decompose into vertical slices, produces Design doc
- `architecture-review` (RPIV) — stress-test design against existing architecture (moved from Land step 2)
- `blueprint` (RPIV) — fused design+plan in one pass (fast path for smaller work)
- `plan` (RPIV) — turn design into phased implementation steps (complex path)

**Two paths:**
- Complex: `design` → `architecture-review` → `plan`
- Fast: `blueprint` (skips separate design+plan)

**Artifact:** `.rpiv/artifacts/plans/` — canonical. `implement` consumes this format.

**Checkpoint:** `capturing-learnings` after plan accepted.

**Cross-cutting:** `epiphany-tabling` active. Any realization not trivially in-scope → `docs/tabled.md`.

### Stage 3: Implement

Execute the plan. Write the code.

**Skills:**
- `implement` (RPIV) — primary executor. Fans out plan phases, gates each on success criteria.
- `test-driven-development` (Superpowers) — red/green TDD discipline within each phase
- `subagent-driven-development` (Superpowers) — fresh subagent per phase task, two-stage review
- `dispatching-parallel-agents` (Superpowers) — for independent phase tasks
- `verification-before-completion` (Don's Flow) — execution discipline: no success claim without fresh evidence

**Inner loop:** `implement` is the primary. TDD, subagents, and parallel dispatch are strategies used *inside* each phase — not replacements for `implement`.

**Artifact:** Working tree changes.

**Cross-cutting:** `epiphany-tabling` active. `create-handoff` / `resume-handoff` for multi-session implementation.

### Stage 4: Validate & Review

Verify the work. Gate the commit.

**Skills:**
- `validate` (RPIV) — re-check each phase against its success criteria
- `code-review` (RPIV) — structured audit across quality, security, and dependencies. Emits `blockers_count`.
- `receiving-code-review` (Superpowers) — process review findings with technical rigor
- `revise` (RPIV) — surgically update the plan from review feedback

**Gate:** `code-review` loops until zero blockers (max 3 passes). Blockers → `revise` → re-implement → re-validate. Zero blockers → proceed to stage 5. Three loops with remaining blockers → stops for human decision.

**Artifact:** Validation report + Review (`.rpiv/artifacts/validation/`, `.rpiv/artifacts/reviews/`)

**Checkpoint:** `capturing-learnings` after validate + review pass.

### Stage 5: Land & Learn

Close the cycle. Document what shipped. Capture lessons. Prepare for next.

Three sub-groups that flow in order:

**Group 1 — Commit & Document:**
- `commit` (RPIV) — structured atomic commits
- `as-built-documentation` (Don's Flow) — permanent record in `docs/changes/`

**Group 2 — Reflect & Reconcile:**
- `writing-retros` (Don's Flow) — frozen retro in `docs/retros/`
- `capturing-learnings` (Don's Flow) — promote twice-seen patterns

**Group 3 — Update & Close:**
- AGENTS.md updates
- Memory reconcile (`docs/memory/`)
- Status review (`docs/status.md`)
- Resolve `docs/tabled.md` entries (aim: empty or near-empty)
- `finishing-a-development-branch` (Don's Flow) — merge/PR/cleanup decisions

**Removed from Land:** Architecture review → stage 2. Code review → stage 4. Security review → dropped (covered by RPIV's `code-review`).

**Artifacts:** `docs/changes/`, `docs/retros/`, `docs/memory/`, `docs/status.md`, git commits.

## Cross-Cutting Practices

These run *across* the pipeline, not at a single stage.

| Practice | Active During | Description |
|---|---|---|
| `epiphany-tabling` | Stages 2–4 | Capture realizations in `docs/tabled.md` without derailing current work |
| `capturing-learnings` | After stages 1, 2, 4, 5 | End-of-artifact checkpoint. Promote twice-seen patterns. |
| `create-handoff` / `resume-handoff` | Any stage | Save state mid-pipeline, resume in a fresh session |

## Skills Removed (from v2)

| Skill | Origin | Reason |
|---|---|---|
| `writing-plans` | Superpowers | Muddy the water — RPIV's `blueprint`/`plan` is the canonical plan format. No alternatives. |
| `executing-plans` | Superpowers | Superseded by `implement` + subagent combo |
| `requesting-code-review` | Superpowers | RPIV's `code-review` *is* the request |
| Security review (Land step 3) | Don's Flow | RPIV's `code-review` already audits security alongside quality and dependencies |

## Subagent Architecture

No conflict between RPIV and Superpowers on subagents. They serve different layers:

- **RPIV** provides specialized agent *types* (13 across 4 tiers: locators, analyzers, code-review specialists, web-search). These are the agents available for dispatch.
- **Superpowers** provides the *orchestration methodology* (`subagent-driven-development`, `dispatching-parallel-agents`). These skills decide when and how to dispatch agents.

They compose: Superpowers orchestration dispatches RPIV agent types when the task calls for them.

## Upstream Integration

This design documents exactly which skills come from which upstream:

- **RPIV skills used:** discover, explore, research, design, blueprint, plan, architecture-review, implement, validate, code-review, revise, commit
- **Superpowers skills used:** brainstorming, test-driven-development, subagent-driven-development, dispatching-parallel-agents, receiving-code-review
- **Don's Flow skills used:** verification-before-completion, epiphany-tabling, capturing-learnings, as-built-documentation, writing-retros, finishing-a-development-branch

When upstreams (RPIV, Superpowers) release updates, sync diffs against this baseline. Integrate changes by updating the affected stage's skill list.

## Design Decisions

1. **One pipeline, not three modes.** The length adapts to work size (`blueprint` for small, `design`→`plan` for complex), but the path is single and unambiguous.
2. **RPIV plan format is canonical.** All plans consumed by `implement` must be `.rpiv/artifacts/plans/`. No alternative plan formats.
3. **Land steps distributed to natural homes.** Architecture review moves to where design happens. Code review stays with validation. Only closeout concerns remain in stage 5.
4. **No separate security review.** RPIV's `code-review` covers it. If a deeper security pass is ever needed, it becomes its own skill — but for now it's redundant.
5. **Artifact-driven gating.** The presence of an artifact determines what can run next. No ambiguous "what should I do now?" — if the plan artifact exists, you're ready for implement.

## Non-Goals (for v3)

- **WF automation.** The `/wf` command is a future upgrade path, not part of this design. v3 is skill-by-skill with clear stage boundaries.
- **Additional observability.** RPIV's existing JSONL audit log and artifact chain are sufficient. The retro catches process-level insights.
- **Progressive autonomy mechanisms.** No per-stage toggles or behavior-watching. Autonomy emerges naturally as the developer internalizes the pipeline.
- **Workflow runner modifications.** This design documents skill placement and handoffs. It does not modify RPIV's workflow runner or create new workflow definitions.
