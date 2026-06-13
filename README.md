# @locksmithdon/dons-flow

**Don's Flow v2** — a developer-specific Pi Agent workflow package that combines:

- **[RPIV](https://www.npmjs.com/package/@juicesharp/rpiv-pi)** — the observable, artifact-chained delivery pipeline (`discover → research → design → plan → implement → validate → review → commit`).
- **[Superpowers](https://github.com/obra/superpowers)** — scope control, verification-before-claims, and TDD/subagent execution patterns.
- **A structured cycle closeout (`land`)** — the 10-step ritual that turns a verified branch into a clean, navigable, documented codebase ready for the next cycle.

This package is opinionated. It assumes a particular doc layout and a particular philosophy about what belongs in the codebase vs. what belongs in the developer's tooling.

> **Why v2?** The first iteration of Don's Flow was a Superpowers-based workflow with a custom landing ritual. This version integrates RPIV's observable delivery pipeline while keeping the closeout, scope-control, and learning-capture practices that made v1 work.

## Install

```bash
pi install npm:@locksmithdon/dons-flow
```

This package peer-depends on RPIV, the Pi subagent runtime, and Superpowers:

```bash
pi install npm:@juicesharp/rpiv-pi
pi install npm:@tintinweb/pi-subagents
```

Superpowers is not published to npm under a name we can resolve cleanly, so it is declared as an **optional git peer dependency** (`github:obra/superpowers`). You have three ways to satisfy it:

1. **Install via your agent harness's plugin system** (most common):
   - Claude Code: `/plugin install superpowers@superpowers-marketplace`
   - Codex CLI: `/plugins` → search "Superpowers"
   - Gemini CLI: `gemini extensions install https://github.com/obra/superpowers`
   - See [obra/superpowers](https://github.com/obra/superpowers) for other harnesses.

2. **Install from GitHub directly** (if your Pi/npm setup supports git URLs):
   ```bash
   pi install github:obra/superpowers
   # or
   npm install github:obra/superpowers
   ```

3. **Fork and publish under your own scope** (cleanest long-term):
   Fork `obra/superpowers`, publish it as `@locksmithdon/superpowers`, then update this package's `peerDependencies` to point at your scoped package. This is the closest analog to how we track RPIV.

If RPIV's `/rpiv-setup` command is available, it can install the RPIV sibling plugins in one go.

## Relationship to Superpowers

This package does not replace Superpowers. It treats Superpowers as the upstream methodology for:

- `brainstorming` — Socratic design refinement before code.
- `writing-plans` — bite-sized, code-complete implementation plans.
- `subagent-driven-development` / `executing-plans` — task execution with review.
- `test-driven-development` — red/green/refactor discipline.
- `verification-before-completion` — evidence-before-claims.

Where RPIV provides an equivalent or stronger mechanism, this package routes through RPIV (e.g., `discover`/`research`/`blueprint` for design and planning, `implement`/`validate` for execution). Where Superpowers has no RPIV equivalent, this package ports or keeps the Superpowers skill (e.g., `land`, `epiphany-tabling`, `capturing-learnings`).

## What this package adds to RPIV

RPIV gives you a strong delivery pipeline. This package adds the seams around it:

| Skill | Purpose |
|---|---|
| `dons-flow` | The map. Tells you which skill to invoke when, and how the workflow fits together. |
| `setup-dons-flow` | Onboarding: checks prerequisites, detects Superpowers, creates repo conventions. |
| `land` | The 10-step cycle closeout: code review → arch review → security review → as-built docs → doc/knowledge-graph review → AGENTS.md updates → memory reconcile → retro → status review → integrate. |
| `epiphany-tabling` | Capture mid-flight realizations in `docs/tabled.md` without derailing current work. |
| `as-built-documentation` | Replace spec/plan scaffolding with a permanent `docs/changes/` record of what shipped. |
| `capturing-learnings` | End-of-artifact checkpoints + the "once is a moment; twice is a pattern" promotion rule. |
| `writing-retros` | Produce frozen retrospective documents at milestone close. |
| `verification-before-completion` | Evidence-before-claims discipline embedded in execution. |
| `finishing-a-development-branch` | Merge / PR / cleanup decisions at cycle end. |
| `using-git-worktrees` | Isolated workspaces for parallel workstreams. |

## The integrated workflow

```
/skill:discover "..."
/skill:research .rpiv/artifacts/discover/<latest>.md
/skill:blueprint .rpiv/artifacts/research/<latest>.md   # or design → plan
/skill:implement .rpiv/artifacts/plans/<latest>.md
/skill:validate .rpiv/artifacts/plans/<latest>.md
/skill:code-review
/skill:commit
/skill:land
```

Between every major artifact, run `capturing-learnings`. During execution, keep `epiphany-tabling` active. If you stop mid-work, use `create-handoff` / `resume-handoff`.

## Repo conventions

This workflow expects the following project-owned files and folders in the codebase:

| Path | Purpose |
|---|---|
| `docs/tabled.md` | Working memory for deferred ideas and follow-ups |
| `docs/status.md` | Living status: Recently Completed, What's Next |
| `docs/memory/` | Persistent memory entries + `MEMORY.md` index |
| `docs/changes/` | As-built documentation: what shipped and why |
| `docs/retros/` | Frozen retrospective documents |
| `docs/runbooks/` | Multi-skill processes |
| `AGENTS.md` | Repo-level agent guidance |

These documents live in the codebase because they are shared context for the whole team. The skills that produce and maintain them live in this package.

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

The dependency relationship with Superpowers is intentionally deferred. We review monthly whether to keep the git peer dependency, fork Superpowers, or drop it.

- Memory: `docs/memory/monitor_upstream_evolution.md`
- Runbook: `docs/runbooks/monitor-upstream-evolution.md`

Set a monthly calendar reminder for the 13th, or run the runbook after every 2–3 completed projects.

## Typical first use

1. Install this package and its peer dependencies in a repo.
2. Run `/skill:setup-dons-flow` to check prerequisites and scaffold repo conventions.
3. Start a feature with `/skill:discover "[feature description]"`.
4. When implementation is validated and reviewed, run `/skill:land` to close the cycle.
5. After 2–3 projects, run `docs/runbooks/monitor-upstream-evolution.md` and decide whether to fork Superpowers.

## License

MIT
