---
name: writing-retros
description: Use at milestone close to produce a retrospective — four-section format (keep doing / stop or change / promote to artifact / commit to memory) with concrete, owned action items
---

# Writing Retros

## Overview

A retrospective at milestone close is the culmination of continuous reflection, not a replacement for it. Tabled entries have been processed throughout execution; end-of-artifact checkpoints have fed back into the next artifact. The retro captures what the milestone *as a whole* teaches us, and converts it into concrete, owned action items.

**Announce at start:** "I'm using the writing-retros skill to produce the retro for `<milestone>`."

## Output

One file: `docs/retros/YYYY-MM-DD-<milestone>.md`. **Frozen at commit.** Future amendments go into a new retro, not this one — inline edits to a retro erode its value as an episodic record.

## The four sections

Every retro has exactly these sections, in this order:

1. **Keep doing.** What worked and should continue. Name the practice, not just the outcome. ("Epiphany-tabling to `tabled.md`" is actionable; "M1 went well" is not.)
2. **Stop or change.** What did not work and should adjust. Be specific about the pain and the proposed change.
3. **Promote to artifact.** Patterns worth extracting into skills, runbooks, scripts, memory entries, or as-built sections. Cross-reference the **promotion rule** (see `capturing-learnings`) — each item here should have at least one prior sighting the retro can point at.
4. **Commit to memory.** What, if anything, belongs in the cross-conversation memory system at `docs/memory/`. Often a subset of §3; sometimes its own distinct item. Announce writes (see AGENTS.md).

Optional lightweight sections at the end (appendix-style): headline stats, acknowledgements, historical context. Keep them short.

## Action items

Every retro ends with **concrete, owned action items** — not essays. Each item has:

- A specific outcome (a file to change, an artifact to create, a decision to make).
- An owner (a session, a date, a person) — or an explicit "by next milestone."
- Enough context for someone who didn't run the retro to execute the item.

If the action-item list is large enough to risk the retro becoming a working document rather than an episodic record, **split the execution into a separate closeout doc** (e.g., `docs/m1-closeout.md`) and reference it from §5. The retro stays frozen; the closeout doc is the working artifact.

## Process

1. **Gather inputs.**
   - `docs/tabled.md` — every entry is a candidate for one of the four sections or for processing during retro review.
   - The as-built (if already drafted) or the spec + plan + git log (if not).
   - Memory writes made during the milestone.
   - Any explicit "save this for retro" notes from the user during execution.

2. **Draft top-to-bottom.** Short, specific bullets under each section. Avoid the urge to write prose paragraphs — retros are scannable lists.

3. **Review with the user before committing.** Retros are frozen at commit, so the review *must* happen first. Expect the user to expand the action-item set — that is normal; the retro is a conversation starter, not a monologue.

4. **Commit.** One file, one commit. After this point, do **not** rewrite the retro inline; if paths or references later need updating, add a note at the top and point at the source of truth.

## Common failure modes

- **Meta-theater.** Reflection that produces more reflection rather than better work. If a section has no concrete output, either it does not belong in the retro or the work to produce the output hasn't happened. Name the missing action item; don't paper over it.
- **Silent drift.** Practices on paper diverging from practices in use. The retro only catches this if honest — don't smooth over what went wrong.
- **Stale references.** A frozen retro loses value when the paths it references move. Either update the paths at the close *before* commit, or add a dated note at the top after commit — never rewrite inline.
- **Undifferentiated "stop or change."** Generic complaints without a proposed change aren't retro content. If you can't name what to try differently, that's a candidate for §3 "promote to artifact" or for a deliberate drop.

## Related practices

- `capturing-learnings` — promotion rule; how §3 items become skills/runbooks/memory.
- `epiphany-tabling` — the in-flight practice that feeds retro content.
- `as-built-documentation` — the permanent record of what shipped (retros and as-builts are complementary: retros capture *how* we worked; as-builts capture *what* we built).
