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

  if (parts.length === 1) {
    return table[parts[0]] ?? 1;
  }

  const [a, b] = parts;
  const key1 = `${a}/${b}`;
  const key2 = `${b}/${a}`;

  if (table[key1] !== undefined) return table[key1];
  if (table[key2] !== undefined) return table[key2];

  return 1;
}