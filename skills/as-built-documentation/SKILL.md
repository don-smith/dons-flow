---
name: as-built-documentation
description: Use at the end of a feature branch to create permanent as-built documentation - distills planning docs, git history, and code changes into a single reference document, then cleans up superseded plans
---

# As-Built Documentation

Create a permanent "as-built" document that captures what changed, why, and what future agents/humans need to know. This replaces all planning documents with one high-signal reference.

## When to Use

At the end of a major piece of work, after:
- All implementation is complete
- Tests pass

Typically invoked by the **land** skill, which determines whether as-built documentation is warranted and whether to create a new document or update an existing one.

## The Process

### Phase 1: Automated Discovery

Gather source material from the completed work:

1. **Git history**: Understand the arc of work — what was built, in what order, and any pivots or reversals.
   - On a feature branch: `git log main..HEAD --oneline`
   - On main: `git log --oneline` for the relevant range of commits (use planning docs and commit messages to identify the boundary)
2. **Planning documents**: Read all docs in `docs/plans/` that relate to the completed work. These are the primary source material for synthesis.
3. **Code changes**: Identify scope from the git history, then read the key files to understand the current architecture. Prioritize repo-level AGENTS.md files — they often capture the implementation's shape already.
4. **Existing documentation**: Check for any other docs, comments, or READMEs that were created or modified as part of this work.
5. **Existing as-built docs**: Check `docs/changes/` for related documents. If one exists for this area, consider updating it rather than creating a new one.

### Phase 2: Synthesis

Draft the as-built document following the template below. Key principles:

- **Write "How It Works Now" from the code, not from plans.** Plans may be outdated. The code is the source of truth.
- **Assess regression risk for each decision.** Ask: "How likely is it that a future agent re-proposes the rejected approach?" Rate as low/medium/high.
  - **Low risk**: Brief rationale is sufficient
  - **Medium risk**: Document what was rejected and why
  - **High risk**: Explicit "why not" section with enough detail to prevent the regression
- **Be concise.** This document should be shorter than the sum of the plans it replaces. Every sentence should earn its place.
- **Use terms consistently.** Key concepts in the Quick Reference should match the terminology used throughout the document.

### Phase 3: Clarification (if needed)

If you have gaps or uncertainties that can't be resolved from code and docs alone, ask the developer targeted questions. This should be rare - most branches will have sufficient material for synthesis without intervention.

### Phase 4: Write & Clean Up

**Where does the as-built document go?**

Documents live where their scope lives:
- **Repo-specific work** (transforms, adapters, features within one repo) → the repo's `docs/changes/` folder
- **Cross-repo or project-level changes** (architecture, shared conventions, infrastructure that affects all repos) → root `docs/changes/`

Most as-built docs will be repo-specific. Ask: "does this document primarily help agents working in one repo, or across multiple repos?"

**Creating a new document:**
1. **Write** to `docs/changes/YYYY-MM-DD-<topic>.md` (in the appropriate repo or root)
   - Use today's date
   - Use a short, descriptive kebab-case topic name

**Updating an existing document:**
1. **Edit** the existing document in `docs/changes/` to incorporate the new work
   - Update the date and Quick Reference section
   - Revise "How It Works Now" from the current code
   - Add any new Key Decisions

**Retiring planning documents:**

Planning documents from root `docs/plans/` that are repo-specific should be either:
- **Deleted** if fully consumed into the as-built doc
- **Moved** to the repo's `docs/` folder if they contain standing rationale that agents may need (e.g., "why we chose X over Y") but aren't linked from navigational documents

Cross-repo planning documents in root `docs/plans/` should only be deleted if they've been fully superseded.

**Then:**
2. **Stage** all changes (new/updated files + deletions) with `git add`
3. **Do NOT commit.** Leave the staged changes for the developer to review and commit.

Inform the developer what was created/updated and what was deleted/moved, so they can review before committing.

## Document Template

```markdown
# <Title: concise name of the change>

## Quick Reference
- **Date:** YYYY-MM-DD
- **Key files:** <list of primary files added/modified>
- **Key concepts:** <3-5 searchable terms>
- **One-line summary:** <what changed and why, in one sentence>

## How It Works Now

<The current architectural contracts. How the pieces fit together.
This is the section an agent reads when it needs to modify this area.
Write from the actual code, not from planning documents.>

## Key Decisions

<For each major decision made during this branch:

### <Decision title>

**What:** <What was decided>
**Why:** <The motivation>
**Regression risk:** low | medium | high

If medium or high risk:
**Rejected alternative:** <What was considered and rejected>
**Why rejected:** <Specific reasons it won't work or is worse>>

## Constraints & Gotchas

<Things that will bite you if you don't know about them.
Edge cases, ordering dependencies, things that look wrong but are intentional.
If there are none, omit this section.>

## Background Context

<Brief context on why this project happened at all.
Goals, personas, acceptance criteria - only what's needed to understand the "why."
Keep this short - a few sentences to a short paragraph.>
```

## Key Principles

- **Audience is 85% AI agents, 15% humans.** Optimize for structured, parseable content with explicit terminology.
- **Current state first, history second.** An agent reading this is usually about to modify something and needs to understand the current architecture before the backstory.
- **Every section earns its place.** If a section would be empty or trivial, omit it.
- **The git history of this file traces back to the original branch work.** If deeper commit-level context is ever needed, the file's own history provides the path.
- **Plans are scaffolding, as-builts are permanent.** Don't preserve planning language or structure out of habit. Rewrite for the document's actual purpose.

## Common Pitfalls

| Pitfall | Instead |
|---------|---------|
| Copying plan content verbatim | Rewrite from the code's perspective - plans may be outdated |
| Documenting every small decision | Focus on decisions that affect future work or have regression risk |
| Writing for a human narrative | Structure for quick scanning - headers, lists, tables over prose |
| Including implementation steps | The code is the implementation; document the "what" and "why," not the "how to build it" |
| Forgetting to delete old plans | Always check `docs/plans/` for branch-related documents to remove |
