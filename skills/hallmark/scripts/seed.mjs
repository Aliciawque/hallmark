#!/usr/bin/env node
// The custom path's draw (references/direction.md R.4). From a seed made of the brief, the date and the re-roll count it
// picks which of the model's seven slate lines gets built, so the model never builds its own favourite, and deals one
// discipline: a system rule (colour, grid, type steps, pictures, motion) the page adopts unless its material refuses it.
// A discipline never brings a device, a material or a face: it can only make the page plainer and more exact. It also
// deals one display face per class and one body face of each kind from references/fonts.md, so the model starts from a
// dealt face instead of its favourite (left alone it set four custom pages of eight in the same grotesk).
//   node seed.mjs --brief "<the brief>" [--n 7] [--reroll 0] [--material photo|product|words]
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

function fnv1a(str) {
  let h = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h >>> 0;
}

// [the rule, the material it suits: any, photo, product or words]
const DISCIPLINES = [
  ['One field colour: a single colour carries about a third of the page as whole sections edge to edge, never as boxes; everything else sits on the ground.', 'any'],
  ['The ground is the colour: one deep or saturated ground for the whole page, ink and one accent on it, nothing else.', 'any'],
  ['One family: display and body come from one type family, and hierarchy comes from size and weight alone.', 'any'],
  ['Three sizes carry the page: display, section head and body, far apart (the display at least five times the body); titles take the one small step above the body and nothing else gets a size of its own.', 'any'],
  ['No boxes: no cards and no shadows, and no border except on an input; space and alignment part every group.', 'any'],
  ['Flush left: no centred head and no centred block; every left edge sits on one of three lines down the page.', 'any'],
  ['Dense, then empty: every dense section is followed by one that holds a single line in a lot of air.', 'any'],
  ['One rule system: hairlines are the only structure (under the nav, between rows, above the footer), one weight and one colour.', 'any'],
  ['Still: nothing moves except the signature; no reveal, no lift on hover, only colour changes on hover.', 'any'],
  ['The grid shows: every element starts and ends on the twelve columns, and the page breaks the grid exactly once, on purpose.', 'any'],
  ['Photographs bleed: every picture runs to the edge of its column or of the screen; none is framed, rounded or shadowed.', 'photo'],
  ['One decisive photograph: the page shows a single picture, very large, and lets type carry everything else.', 'photo'],
  ['Pictures in pairs: below the hero, photographs come two at a time at unequal sizes, each pair making one point.', 'photo'],
  ['The product at full width: the interface runs the width of the container with real data, no device frame and no tilt.', 'product'],
  ['The product up close: each section crops one part of the interface large enough to read, with one line beside it.', 'product'],
  ['A reading page: one long measure of 60 to 70 characters, generous leading, few sections, the type doing the work.', 'words'],
  ['Type is the picture: the first screen is set in type alone, and the largest line on it is the offer itself.', 'words'],
];

const args = process.argv.slice(2);
const flag = (name, dflt) => {
  const i = args.indexOf(`--${name}`);
  return i !== -1 && args[i + 1] !== undefined && !String(args[i + 1]).startsWith('--') ? args[i + 1] : dflt;
};
const ASK = new Set(['build', 'make', 'create', 'design', 'need', 'want', 'please', 'page', 'site', 'website', 'landing', 'called', 'for', 'and', 'the', 'with', 'that', 'this', 'our', 'your', 'custom', 'theme']);
const briefFlag = flag('brief', null);
if (!briefFlag && (args.length === 0 || args[0].startsWith('--'))) {
  console.error('usage: node seed.mjs --brief "<the brief>" [--n 7] [--reroll 0] [--material photo|product|words]');
  process.exit(2);
}
const slug = briefFlag
  ? briefFlag.toLowerCase().replace(/[^a-z0-9\s-]/g, ' ').split(/\s+/).filter((w) => w.length > 2 && !ASK.has(w)).slice(0, 4).join('-') || 'brief'
  : args[0].toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

const n = Math.max(2, parseInt(flag('n', '7'), 10) || 7);
const reroll = Math.max(0, parseInt(flag('reroll', '0'), 10) || 0);
const material = flag('material', '');
if (material && !['photo', 'product', 'words'].includes(material)) { console.error('--material is photo, product or words'); process.exit(2); }
const date = new Date().toISOString().slice(0, 10);

const seedKey = `${slug}·${date}·r${reroll}`;
const index = (fnv1a(seedKey) % n) + 1;
const pool = DISCIPLINES.filter(([, m]) => m === 'any' || !material || m === material);
const discipline = pool[fnv1a(`${seedKey}·discipline`) % pool.length][0];

// fonts.md is the one list: its display table (class | faces) and its body paragraph (Sans: ... Serif: ...)
const names = (txt) => txt.replace(/\([^)]*\)/g, '').split(/[;,]/).map((f) => f.trim()).filter((f) => f && !/only with an argument/.test(f));
let faces = [];
try {
  const src = readFileSync(join(dirname(fileURLToPath(import.meta.url)), '..', 'references', 'fonts.md'), 'utf8');
  const table = (src.split('## Display faces the catalog does not use')[1] || '').split('\n## ')[0];
  for (const line of table.split('\n')) {
    const m = /^\|\s*([^|]+?)\s*\|\s*([^|]+?)\s*\|\s*$/.exec(line);
    if (!m || m[1] === 'Class' || /^-+$/.test(m[1])) continue;
    const list = names(m[2]);
    if (list.length) faces.push(`${m[1].toLowerCase()} ${list[fnv1a(`${seedKey}·${m[1]}`) % list.length]}`);
  }
  const body = (src.split('## Body faces')[1] || '').split('\n## ')[0];
  for (const [kind, re] of [['sans', /Sans:([^.]*)\./], ['serif', /Serif:([^.]*)\./]]) {
    const list = names((re.exec(body) || [])[1] || '');
    if (list.length) faces.push(`body ${kind} ${list[fnv1a(`${seedKey}·body ${kind}`) % list.length]}`);
  }
} catch { faces = []; }

console.log(`draw: ${index}/${n} (seed ${seedKey})`);
console.log(`discipline: ${discipline}`);
if (faces.length) console.log(`faces: ${faces.join(' · ')}`);
