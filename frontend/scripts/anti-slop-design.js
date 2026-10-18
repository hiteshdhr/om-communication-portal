#!/usr/bin/env node
/**
 * anti-slop-design.js
 * Scans frontend files for generic AI-template design patterns:
 *  1. Banned lazy gradient combos not from project theme
 *  2. Lazy centered full-screen wrapper divs
 *  3. Single elements with > 15 utility classes on one line
 */

import { readFileSync, readdirSync, statSync } from 'fs';
import { join, extname, relative } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const ROOT = join(__dirname, '..', 'src');
const EXTENSIONS = new Set(['.jsx', '.tsx', '.html']);
const MAX_UTILITY_CLASSES = 15;

// Generic AI gradient combos that indicate lazy "purple to indigo" default patterns
const BANNED_GRADIENT_PATTERNS = [
  /from-purple-500\s+to-indigo-600/,
  /from-purple-600\s+to-blue-500/,
  /from-blue-500\s+to-purple-600/,
  /from-indigo-500\s+to-purple-500/,
  /from-pink-500\s+to-purple-500/,
  /gradient-to-r[^"']*from-purple[^"']*to-(?:indigo|blue|pink)/,
  /gradient-to-br[^"']*from-purple[^"']*to-(?:indigo|blue|pink)/,
];

// Lazy full-screen centered layout that AI defaults to for every page
const LAZY_CENTER_PATTERNS = [
  /flex\s+items-center\s+justify-center\s+min-h-screen/,
  /min-h-screen\s+flex\s+items-center\s+justify-center/,
  /className=["'][^"']*flex[^"']*items-center[^"']*justify-center[^"']*min-h-screen[^"']*["']/,
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

function countUtilityClasses(classStr) {
  return classStr.trim().split(/\s+/).filter(Boolean).length;
}

function analyzeFile(filePath) {
  const raw = readFileSync(filePath, 'utf8');
  const lines = raw.split('\n');
  const violations = [];

  lines.forEach((line, i) => {
    const lineNum = i + 1;

    // 1. Banned gradient patterns
    for (const pattern of BANNED_GRADIENT_PATTERNS) {
      if (pattern.test(line)) {
        violations.push({
          type: 'LAZY_GRADIENT',
          line: lineNum,
          text: 'Generic AI gradient detected: "' + line.trim().slice(0, 80) + '" — use project theme tokens instead',
        });
        break;
      }
    }

    // 2. Lazy centered full-screen layout
    for (const pattern of LAZY_CENTER_PATTERNS) {
      if (pattern.test(line)) {
        violations.push({
          type: 'LAZY_LAYOUT',
          line: lineNum,
          text: 'Generic centered min-h-screen layout detected. Use semantic layout components instead.',
        });
        break;
      }
    }

    // 3. Utility class count per className attribute
    const classNameMatches = line.matchAll(/className=["']([^"']+)["']/g);
    for (const match of classNameMatches) {
      const classes = match[1];
      const count = countUtilityClasses(classes);
      if (count > MAX_UTILITY_CLASSES) {
        violations.push({
          type: 'CLASS_BLOAT',
          line: lineNum,
          text: count + ' utility classes on a single element (max: ' + MAX_UTILITY_CLASSES + '). Extract to a component or CSS class.',
        });
      }
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
  console.log('✅  anti-slop-design: No design-slop patterns detected. All clean!\n');
  process.exit(0);
} else {
  console.error('\n❌  anti-slop-design: ' + totalViolations + ' violation(s) found across ' + report.length + ' file(s).\n');
  for (const { file, violations } of report) {
    console.error('  📄 ' + file);
    for (const v of violations) {
      console.error('     [' + v.type + ']:' + v.line + ' — ' + v.text);
    }
    console.error('');
  }
  process.exit(1);
}
