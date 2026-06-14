# myflow v3 — Unified Pipeline

**Date:** 2026-06-14
**Type:** workflow redesign

## What Changed

Replaced the v2 three-mode approach (Superpowers-led / RPIV-led / Mixed) with a single 5-stage unified pipeline:

```
1. Discover & Align → 2. Research & Design → 3. Implement → 4. Validate & Review → 5. Land & Learn
```

Each stage has clearly assigned skills, produces an artifact consumed by the next, and includes checkpoint notes for cross-cutting practices.

## Why

v2's three modes created ambiguity about which path to take. Skills coexisted but didn't compose into a clear flow. There was never a clear answer to "what's next." v3 adopts RPIV's pipeline philosophy — artifact-driven gating, clear handoffs — while keeping all the same skills.

## Key Changes

### Skills removed
- `writing-plans` (Superpowers) — superseded by RPIV's `blueprint` / `plan`
- `executing-plans` (Superpowers) — superseded by RPIV's `implement` + subagents
- `requesting-code-review` (Superpowers) — RPIV's `code-review` is the request
- Security review (Land step 3) — RPIV's `code-review` already covers security

### Land redistributed
- Architecture review → stage 2 (after design)
- Code review → stage 4 (before commit)
- Remaining 7 closeout steps → 3 sub-groups in stage 5

### Files touched
- `skills/myflow/SKILL.md` — rewritten as v3 5-stage pipeline
- `skills/land/SKILL.md` — rewired as stage 5 closeout (9 steps, 3 groups)
- `skills/setup-myflow/SKILL.md` — cross-references updated
- `README.md` — v3 branding, 5-stage pipeline table
- `package.json` — bumped to 3.0.0
- `scripts/sync-upstream.sh` — removed 3 vendored skills
- `docs/conventions.md` — land step numbers updated
- `vendor/superpowers/skills/{brainstorming,subagent-driven-development}/SKILL.md` — stale refs patched

### Vendored skills deleted
- `vendor/superpowers/skills/writing-plans/`
- `vendor/superpowers/skills/executing-plans/`
- `vendor/superpowers/skills/requesting-code-review/`

## Learnings

- **Documentation-only changes don't need code review subagents.** The blueprint verification step dispatched subagent reviewers per slice on markdown files, adding significant latency for no value. Future documentation changes should skip the review subagents.
- **The workflow needs real-world testing.** This pipeline design was informed by experience but hasn't been stress-tested end-to-end. The next cycle of refinement should come from using it on a full feature.

## References

- Design spec: `docs/superpowers/specs/2026-06-14-myflow-v3-pipeline-design.md`
- Pipeline visual: `docs/myflow-v3-pipeline.html`
