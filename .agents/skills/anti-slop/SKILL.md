---
name: anti-slop
description: >
  Runs the local anti-slop quality guardrails after any frontend component is
  generated or modified. Catches AI code rot (placeholders, comment bloat,
  deep nesting) and design slop (lazy gradients, generic layouts, class bloat).
---

# Anti-Slop Skill

## When to Activate

Activate this skill automatically **after every turn in which you**:
- Create or modify a `.jsx`, `.tsx`, `.js`, or `.ts` file inside `frontend/src/`
- Generate a new UI component, page, or layout
- Refactor existing frontend code

## Execution Steps

1. **Run the anti-slop checker** from the `frontend/` directory:
   Run: npm run anti-slop
   This executes both checkers back-to-back:
   - node ./scripts/anti-slop-design.js (design slop guard)
   - node ./scripts/anti-slop-writing.js (code rot guard)

2. **If the command exits with code 0** (clean): your turn is complete.

3. **If the command exits with code 1** (violations found):
   - Read the violation report printed to stderr
   - Fix ALL flagged violations in the relevant files immediately
   - Re-run npm run anti-slop to confirm the fix
   - Only complete your turn after a clean pass

## Violation Types You Must Fix

### Code Rot (anti-slop-writing)

PLACEHOLDER: Replace stub comment with actual implementation
COMMENT_BLOAT: Remove redundant/obvious comments; keep only non-obvious rationale
DEEP_NESTING: Extract deeply nested logic into named functions or components

### Design Slop (anti-slop-design)

LAZY_GRADIENT: Replace generic from-purple-500 to-indigo-600 combos with project CSS variables or explicit, intentional color choices
LAZY_LAYOUT: Replace the flex items-center justify-center min-h-screen wrapper with a semantic layout component
CLASS_BLOAT: Extract long className strings (more than 15 classes) into a CSS class or a dedicated component

## Important Notes

- Run from the frontend/ directory, not workspace root
- Scripts use ES module syntax (import), ensure Node version >= 16
- Scripts scan frontend/src/ recursively, excluding node_modules and dist
