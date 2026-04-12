// app.js
import { damage, loadDamageData } from "./damage.js";

await loadDamageData();

// All 18 types
const TYPES = [
  "Normal","Fire","Water","Electric","Grass","Ice","Fighting","Poison",
  "Ground","Flying","Psychic","Bug","Rock","Ghost","Dragon","Dark","Steel","Fairy"
];

// Generate all unordered dual types
function allDualTypes() {
  const pairs = [];
  for (let i = 0; i < TYPES.length; i++) {
    for (let j = i + 1; j < TYPES.length; j++) {
      pairs.push(`${TYPES[i]}/${TYPES[j]}`);
    }
  }
  return pairs;
}

const searchBox = document.getElementById("searchBox");

function matchesSearch(target, query) {
  if (!query) return true;

  const lowerTarget = target.toLowerCase();

  // Normalize target dual types (e.g., "Flying/Fairy" → "fairy/flying")
  const normalizedTarget = lowerTarget.includes("/")
    ? lowerTarget.split("/").map(t => t.trim()).sort().join("/")
    : lowerTarget;

  // Split by commas, trim spaces, remove empties
  const terms = query
    .split(",")
    .map(t => t.trim().toLowerCase())
    .filter(t => t.length > 0);

  if (terms.length === 0) return true;

  // Separate positive and negative terms
  const positives = terms.filter(t => !t.startsWith("!"));
  const negatives = terms.filter(t => t.startsWith("!")).map(t => t.slice(1));

  // Normalize each search term the same way as the target
	const normalize = (term) => {
	  // If no slash, treat as simple substring search
	  if (!term.includes("/")) return term;

	  const parts = term.split("/").map(x => x.trim()).filter(x => x.length > 0);

	  // If user typed something like "fairy/" or "/steel"
	  // treat it as a simple search for "fairy" or "steel"
	  if (parts.length === 1) return parts[0];

	  // Otherwise normalize properly
	  return parts.sort().join("/");
	};

  const normalizedPositives = positives.map(normalize);
  const normalizedNegatives = negatives.map(normalize);

  // If ANY negative term matches → exclude
  if (normalizedNegatives.some(term =>
    normalizedTarget.includes(term)
  )) {
    return false;
  }

  // If no positive terms, and we passed negatives → include everything
  if (normalizedPositives.length === 0) return true;

  // Match if ANY positive term matches
  return normalizedPositives.some(term =>
    normalizedTarget.includes(term)
  );
}

// Color class based on multiplier
function getClass(value) {
  if (value === 4) return "x4";
  if (value === 2) return "x2";
  if (value === 1) return "x1";
  if (value === 0.5) return "x0-5";
  if (value === 0.25) return "x0-25";
  if (value === 0) return "x0";
  return "";
}

// Populate dropdown
const select = document.getElementById("typeSelect");
TYPES.forEach(t => {
  const opt = document.createElement("option");
  opt.value = t;
  opt.textContent = t;
  select.appendChild(opt);
});

// Render tables
function renderTables(attacker) {
  const singleTable = document.getElementById("singleTable");
  const dualTable = document.getElementById("dualTable");

  // Clear old content
  singleTable.innerHTML = "";
  dualTable.innerHTML = "";

  // Single types
  let singleHTML = "<tr><th>Type</th><th>Multiplier</th></tr>";
  TYPES.forEach(t => {
	  if (!matchesSearch(t, searchBox.value)) return;
	  const val = damage(attacker, t);
	  singleHTML += `<tr><td>${t}</td><td class="${getClass(val)}">${val}</td></tr>`;
	});
  singleTable.innerHTML = singleHTML;

  // Dual types
  let dualHTML = "<tr><th>Type</th><th>Multiplier</th></tr>";
  allDualTypes().forEach(t => {
	  if (!matchesSearch(t, searchBox.value)) return;
	  const val = damage(attacker, t);
	  dualHTML += `<tr><td>${t}</td><td class="${getClass(val)}">${val}</td></tr>`;
	});
  dualTable.innerHTML = dualHTML;
}

// Help modal logic
const helpBtn = document.getElementById("helpBtn");
const helpModal = document.getElementById("helpModal");
const closeHelp = document.getElementById("closeHelp");

helpBtn.addEventListener("click", () => {
  helpModal.style.display = "block";
});

closeHelp.addEventListener("click", () => {
  helpModal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === helpModal) {
    helpModal.style.display = "none";
  }
});

// Initial render
renderTables("Normal");

// Update when user selects a type
select.addEventListener("change", () => {
  renderTables(select.value);
});

searchBox.addEventListener("input", () => {
  renderTables(select.value);
});