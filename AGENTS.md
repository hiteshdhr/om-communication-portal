# OM Communication Portal — Agent Instructions

## Anti-Slop Enforcement (MANDATORY)

After **every turn** in which you create, edit, or refactor any file inside
`frontend/src/`, you MUST run the anti-slop quality checker before completing
your response. No exceptions.

### Command to run (from the `frontend/` directory):

```
npm run anti-slop
```

### Rules:

1. If the checker passes (exit code 0) — you are done.
2. If the checker fails (exit code 1) — you MUST:
   a. Read every violation in the output
   b. Fix all violations in the flagged files
   c. Re-run `npm run anti-slop`
   d. Repeat until the checker passes cleanly
   e. Only then complete your turn

### What the checker enforces:

**Code Rot (anti-slop-writing.js)**
- No placeholder strings like "// TODO: implement later", "// logic goes here", "// ...rest of code stays the same"
- Comment-to-code ratio must stay below 35%
- No nesting deeper than 3 levels

**Design Slop (anti-slop-design.js)**
- No generic AI gradient combos (e.g., from-purple-500 to-indigo-600)
- No lazy centered full-screen layout wrappers (flex items-center justify-center min-h-screen)
- No single JSX element with more than 15 utility classes on one line

### Script locations:
- `frontend/scripts/anti-slop-writing.js`
- `frontend/scripts/anti-slop-design.js`

You must treat a failing anti-slop check the same as a failing build:
**the task is NOT complete until it passes.**
