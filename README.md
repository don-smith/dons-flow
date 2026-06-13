# @locksmithdon/dons-flow

**Don's Flow v2** is a way of composing three distinct approaches to agentic software development into one developer-owned workflow:

1. **[Superpowers](https://github.com/obra/superpowers)** — the methodology you already trust. Socratic design (`brainstorming`), bite-sized plans (`writing-plans`), red/green TDD (`test-driven-development`), and subagent-driven execution (`subagent-driven-development`). It is fast, opinionated, and proven.
2. **[RPIV](https://www.npmjs.com/package/@juicesharp/rpiv-pi)** — Juice Sharp's observable, artifact-chained delivery pipeline: `discover → research → design → plan → implement → validate → review → commit`. It adds deliberate checkpoints, self-reflection, and a durable paper trail.
3. **Don's closeout discipline** — the `land` ritual, `epiphany-tabling`, as-built documentation, retros, and memory reconciliation. It closes the cycle so the next one starts clean.

None of these replaces the others. Superpowers excels at the inner loop of design and execution. RPIV excels at observable, reviewable delivery. Don's discipline excels at cycle boundaries and learning capture. Together they form a workflow that is fast *and* reflective *and* humane.

> **Why v2?** The first iteration of Don's Flow was Superpowers plus a custom landing ritual. v2 keeps that landing ritual and adds RPIV's pipeline as a first-class partner rather than a replacement.

## What each system contributes

| System | Core gift | Typical entry points |
|---|---|---|
| **Superpowers** | Auto-triggering, opinionated software development methodology | `brainstorming`, `writing-plans`, `test-driven-development`, `subagent-driven-development`, `verification-before-completion` |
| **RPIV** | Observable, artifact-chained delivery pipeline with built-in reflection | `discover`, `research`, `blueprint`, `implement`, `validate`, `code-review` |
| **Don's Flow** | Cycle boundaries, scope control, and learning capture | `land`, `epiphany-tabling`, `capturing-learnings`, `as-built-documentation`, `writing-retros` |

## Installation

Install in each repo where you want the workflow, or install once in your global Pi configuration if you want it everywhere.

### 1. Install Superpowers (required)

Superpowers is a harness plugin, not an npm package. Install it for the agent you are using before installing Don's Flow:

**Claude Code**
```bash
/plugin install superpowers@claude-plugins-official
```
Or register the Superpowers marketplace first:
```bash
/plugin marketplace add obra/superpowers-marketplace
/plugin install superpowers@superpowers-marketplace
```

**Codex CLI / Codex App**
```bash
/plugins
# search "Superpowers" and select Install Plugin
```

**Gemini CLI**
```bash
gemini extensions install https://github.com/obra/superpowers
```

**Factory Droid**
```bash
droid plugin marketplace add https://github.com/obra/superpowers
droid plugin install superpowers@superpowers
```

**OpenCode**
```bash
# Fetch and follow instructions from:
# https://raw.githubusercontent.com/obra/superpowers/refs/heads/main/.opencode/INSTALL.md
```

**Cursor**
```bash
/add-plugin superpowers
# or search "superpowers" in the plugin marketplace
```

**GitHub Copilot CLI**
```bash
copilot plugin marketplace add obra/superpowers-marketplace
copilot plugin install superpowers@superpowers-marketplace
```

Full instructions are at [obra/superpowers](https://github.com/obra/superpowers).

### 2. Install RPIV and this package

RPIV and the Pi subagent runtime are declared as peer dependencies of this package. With npm 7+, they are installed automatically when you install `@locksmithdon/dons-flow`:

```bash
pi install npm:@locksmithdon/dons-flow
```

If your Pi setup does not auto-install peer dependencies, install them explicitly:

```bash
pi install npm:@juicesharp/rpiv-pi
pi install npm:@tintinweb/pi-subagents
pi install npm:@locksmithdon/dons-flow
```

If RPIV's `/rpiv-setup` command is available, `/skill:setup-dons-flow` runs it automatically to install RPIV's sibling plugins. Restart Pi when prompted so the new extensions load.

### 3. Onboard the repo

```bash
/skill:setup-dons-flow
```

This checks prerequisites, detects Superpowers, and creates the repo-owned conventions listed below.

## Three ways to work

Don's Flow is not a single mandatory pipeline. It is a score you can conduct in different ways depending on the work.

### Mode A — Superpowers-led

Best when the problem is well-shaped and you want autonomous, TDD-driven execution.

```
brainstorming → writing-plans → subagent-driven-development → verification-before-completion → land
```

Use RPIV only if you hit a research or validation gap that Superpowers does not cover on its own.

### Mode B — RPIV-led

Best when the problem needs discovery, research, or a durable decision trail.

```
discover → research → blueprint → implement → validate → code-review → commit → land
```

Use Superpowers inside `implement` for TDD and subagent execution if you want its inner-loop discipline.

### Mode C — The mixed default

Best for substantial work where you want both reflection and autonomy.

```
discover → research → blueprint → implement (with Superpowers TDD + subagents) → validate → code-review → commit → land
```

Between every major artifact, run `capturing-learnings`. During execution, keep `epiphany-tabling` active. If you stop mid-work, use `create-handoff` / `resume-handoff`.

## What this package adds

This package provides the seams between the three systems:

| Skill | Purpose |
|---|---|
| `dons-flow` | The map. Helps you choose Mode A, B, or C for a given piece of work. |
| `setup-dons-flow` | Onboarding: checks prerequisites, detects Superpowers, creates repo conventions. |
| `land` | The 10-step cycle closeout: code review → architectural review → security review → as-built docs → doc/knowledge-graph review → AGENTS.md updates → memory reconcile → retro → status review → integrate. |
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

1. Install Superpowers for your harness.
2. Install `npm:@juicesharp/rpiv-pi`, `npm:@tintinweb/pi-subagents`, and `npm:@locksmithdon/dons-flow`.
3. Run `/skill:setup-dons-flow` to scaffold repo conventions.
4. Choose a mode:
   - Superpowers-led: start with `brainstorming`.
   - RPIV-led: start with `/skill:discover "[feature description]"`.
   - Mixed: start with `discover`, then use Superpowers inside `implement`.
5. Close the cycle with `/skill:land`.
6. After 2–3 projects, run the upstream monitoring runbook.

## License

MIT
