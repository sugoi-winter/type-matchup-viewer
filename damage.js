// damage.js

// List of all JSON files to load
const FILES = [
  "normal-out.json",
  "fire-out.json",
  "water-out.json",
  "electric-out.json",
  "grass-out.json",
  "ice-out.json",
  "fighting-out.json",
  "poison-out.json",
  "ground-out.json",
  "flying-out.json",
  "psychic-out.json",
  "bug-out.json",
  "rock-out.json",
  "ghost-out.json",
  "dragon-out.json",
  "dark-out.json",
  "steel-out.json",
  "fairy-out.json"
];

export const OUTGOING = {};

// Load all JSON files before the app runs
export async function loadDamageData() {
  for (const file of FILES) {
    const res = await fetch(`./Outgoing/${file}`);
    const json = await res.json();
    Object.assign(OUTGOING, json);
  }
}

// Universal lookup
export function damage(attacker, target) {
  const table = OUTGOING[attacker]?.Outgoing;
  if (!table) return 1;

  const parts = target.split("/");
  const key = parts.length === 1 ? parts[0] : parts.sort().join("/");

  return table[key] ?? 1;
}