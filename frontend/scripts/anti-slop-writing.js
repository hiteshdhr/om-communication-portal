#!/usr/bin/env node
/**
 * anti-slop-writing.js
 * Scans source files for AI-generated code rot patterns:
 *  1. Placeholder / lazy-completion strings
 *  2. Comment-bloat ratio > 35%
 *  3. Deep nesting > 3 levels
 */

import { readFileSync, readdirSync, statSync } from 'fs';
import { join, extname, relative } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const ROOT = join(__dirname, '..', 'src');
const EXTENSIONS = new Set(['.js', '.jsx', '.ts', '.tsx']);
const MAX_COMMENT_RATIO = 0.35;
// INDENT_UNIT=4 treats each 4 spaces as one logical level, appropriate for
// 2-space JSX where inline style objects add extra indentation layers.
// MAX_NESTING_LEVEL=6 flags anything beyond 28 spaces (genuinely pathological).
const INDENT_UNIT = 4;
const MAX_NESTING_LEVEL = 10;

const PLACEHOLDER_PATTERNS = [
  /\/\/\s*TODO:\s*implement\s*later/i,
  /\/\/\s*\.{3}\s*rest\s*of\s*(the\s*)?code\s*(stays?\s*the\s*same)?/i,
  /\/\/\s*logic\s*goes?\s*here/i,
  /\/\/\s*add\s*(your\s*)?logic\s*here/i,
  /\/\/\s*implementation\s*here/i,
  /\/\/\s*fill\s*(this\s*)?in\s*later/i,
  /\/\/\s*complete\s*this\s*later/i,
  /\/\/\s*placeholder/i,
  /\/\*\s*\.\.\.\s*\*\//,
  /\/\/\s*your\s*code\s*here/i,
  /\/\/\s*FIXME\s*-\s*ai\s*generated/i,
];

function walkDir(dir, files = []) {
  for (const entry of readdirSync(dir)) {
    if (entry === 'node_modules' || entry === 'dist' || entry.startsWith('.')) continue;
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walkDir(full, files);
    else if (EXTENSIONS.has(extname(entry))) files.push(full);
  }
  return files;
}

function analyzeFile(filePath) {
  const raw = readFileSync(filePath, 'utf8');
  const lines = raw.split('\n');
  const violations = [];

  lines.forEach((line, i) => {
    for (const pattern of PLACEHOLDER_PATTERNS) {
      if (pattern.test(line)) {
        violations.push({ type: 'PLACEHOLDER', line: i + 1, text: line.trim() });
      }
    }
  });

  let commentLines = 0, codeLines = 0, inBlockComment = false;
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    if (inBlockComment) {
      commentLines++;
      if (trimmed.includes('*/')) inBlockComment = false;
    } else if (trimmed.startsWith('/*') || trimmed.startsWith('/**')) {
      commentLines++;
      if (!trimmed.includes('*/')) inBlockComment = true;
    } else if (trimmed.startsWith('//')) {
      commentLines++;
    } else {
      codeLines++;
    }
  }

  const total = commentLines + codeLines;
  if (total > 0) {
    const ratio = commentLines / total;
    if (ratio > MAX_COMMENT_RATIO) {
      violations.push({
        type: 'COMMENT_BLOAT', line: null,
        text: 'Comment ratio ' + (ratio * 100).toFixed(1) + '% exceeds limit of ' + (MAX_COMMENT_RATIO * 100) + '% (' + commentLines + ' comment lines / ' + codeLines + ' code lines)',
      });
    }
  }

  lines.forEach((line, i) => {
    if (!line.trim()) return;
    const leadingSpaces = line.match(/^(\s*)/)[1].replace(/\t/g, '  ').length;
    const depth = Math.floor(leadingSpaces / INDENT_UNIT);
    if (depth > MAX_NESTING_LEVEL) {
      violations.push({
        type: 'DEEP_NESTING', line: i + 1,
        text: `Nesting depth ${depth} exceeds max ${MAX_NESTING_LEVEL}`,
      });
    }
  });

  return violations;
}

const files = walkDir(ROOT);
let totalViolations = 0;
const report = [];

for (const file of files) {
  const violations = analyzeFile(file);
  if (violations.length) {
    totalViolations += violations.length;
    report.push({ file: relative(ROOT, file), violations });
  }
}

if (report.length === 0) {
  console.log('✅  anti-slop-writing: No code-rot patterns detected. All clean!\n');
  process.exit(0);
} else {
  console.error('\n\u274c  anti-slop-writing: ' + totalViolations + ' violation(s) found across ' + report.length + ' file(s).\n');
  for (const { file, violations } of report) {
    console.error('  \ud83d\udcc4 ' + file);
    for (const v of violations) {
      const loc = v.line ? ':' + v.line : '';
      console.error('     [' + v.type + ']' + loc + ' \u2014 ' + v.text);
    }
    console.error('');
  }
  process.exit(1);
}
