// Build guard: a business fact changed in src/data/claims.json must not survive
// as a stale phrase anywhere in the copy. Fails the build with file:line hits.
import fs from "node:fs";
import path from "node:path";
const claims = JSON.parse(fs.readFileSync(new URL("../src/data/claims.json", import.meta.url)));
const banned = claims.bannedStale || [];
const roots = ["src", "scripts", "index.html"];
const exts = new Set([".ts", ".tsx", ".js", ".jsx", ".mjs", ".html", ".json"]);
let hits = [];
function walk(p) {
  const st = fs.statSync(p);
  if (st.isDirectory()) { for (const f of fs.readdirSync(p)) walk(path.join(p, f)); return; }
  if (!exts.has(path.extname(p)) || p.endsWith("claims.json") || p.endsWith("check-claims.mjs")) return;
  const lines = fs.readFileSync(p, "utf8").split("\n");
  lines.forEach((line, i) => { for (const b of banned) if (line.includes(b)) hits.push(`${p}:${i + 1}: ${b}`); });
}
for (const r of roots) if (fs.existsSync(r)) walk(r);
if (hits.length) { console.error("STALE CLAIMS FOUND (update these to match src/data/claims.json):\n" + hits.join("\n")); process.exit(1); }
console.log(`check-claims: clean (${banned.length} stale phrases checked)`);
