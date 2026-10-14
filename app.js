// MenuSnap demo catalog. Prices are sample prices for the demo.
// "say" lines are the kind of thing people say about the dish — written as
// example descriptions, not collected reviews.
const DISHES = [
  { id: 1, name: "Zigni with Injera", emoji: "🍛", art: "linear-gradient(135deg,#f6c177,#d3542a)",
    desc: "Slow-cooked beef stew in berbere-spiced sauce, scooped up with soft, spongy injera flatbread.",
    say: "The one to order if you want the full experience.", price: 19, spice: "hot",
    tags: ["meat", "filling", "popular", "share"] },
  { id: 2, name: "Beyaynetu (Veggie Combo)", emoji: "🥗", art: "linear-gradient(135deg,#b7d77a,#5d8a3c)",
    desc: "A spread of lentils, cabbage, beets, greens, and potatoes on injera. All plant-based, all flavor.",
    say: "Order this when you can't decide — you get a bit of everything.", price: 16, spice: "mild",
    tags: ["vegan", "vegetarian", "share", "popular"] },
  { id: 3, name: "Chicken Doro Wat", emoji: "🍗", art: "linear-gradient(135deg,#e8a13a,#b3541e)",
    desc: "Chicken simmered in a rich, spicy onion sauce with a boiled egg. A celebration dish.",
    say: "Rich and warming. Ask for extra injera.", price: 21, spice: "hot",
    tags: ["meat", "filling", "popular"] },
  { id: 4, name: "Misir Wat (Spiced Lentils)", emoji: "🍲", art: "linear-gradient(135deg,#e07b4c,#9c4a1f)",
    desc: "Red lentils cooked down with berbere and garlic until thick and scoopable.",
    say: "Cheap, filling, and somehow tastes like it cooked all day.", price: 11, spice: "mild",
    tags: ["vegan", "vegetarian", "filling"] },
  { id: 5, name: "Tibs (Sautéed Beef)", emoji: "🥩", art: "linear-gradient(135deg,#d98c5f,#8a4b23)",
    desc: "Cubed beef seared with onion, jalapeño, and rosemary, served sizzling.",
    say: "Get it medium-spicy the first time.", price: 20, spice: "mild",
    tags: ["meat", "popular"] },
  { id: 6, name: "Shiro Wat", emoji: "🫕", art: "linear-gradient(135deg,#f0cf8a,#c98f35)",
    desc: "A smooth stew of ground chickpeas with garlic and mild spice. Comfort food.",
    say: "Gentle on the heat, heavy on the comfort.", price: 10, spice: "none",
    tags: ["vegan", "vegetarian", "light"] },
  { id: 7, name: "Sambusa (2 pc)", emoji: "🥟", art: "linear-gradient(135deg,#f2d492,#d9a441)",
    desc: "Crisp fried pastry pockets filled with spiced lentils or seasoned beef.",
    say: "Start with these while you decide on mains.", price: 7, spice: "none",
    tags: ["vegetarian", "light", "share"] },
  { id: 8, name: "Ful Special", emoji: "🍳", art: "linear-gradient(135deg,#e8b06a,#b5772e)",
    desc: "Mashed fava beans with egg, tomato, onion, and a drizzle of oil, eaten with warm bread.",
    say: "Breakfast energy at any hour.", price: 12, spice: "none",
    tags: ["vegetarian", "filling"] },
  { id: 9, name: "Kitfo", emoji: "🔥", art: "linear-gradient(135deg,#e06a5a,#93321f)",
    desc: "Minced beef warmed with spiced butter and mitmita chili. For the brave — can be ordered cooked through.",
    say: "Ask for it leb leb (warmed) if it's your first time.", price: 22, spice: "hot",
    tags: ["meat"] },
  { id: 10, name: "Alicha (Mild Veggie Stew)", emoji: "🥕", art: "linear-gradient(135deg,#f4e2a0,#cfa64e)",
    desc: "Cabbage, carrots, and potatoes in a turmeric sauce with zero chili heat.",
    say: "The safe pick for anyone who can't do spice.", price: 11, spice: "none",
    tags: ["vegan", "vegetarian", "light"] },
  { id: 11, name: "Coffee Ceremony (Bun)", emoji: "☕", art: "linear-gradient(135deg,#a97c50,#5f4023)",
    desc: "Coffee roasted, ground, and brewed in front of you in a jebena pot, served with popcorn.",
    say: "Don't rush it — the ceremony is the point.", price: 9, spice: "none",
    tags: ["vegan", "vegetarian", "share", "popular", "light"] },
  { id: 12, name: "Firfir", emoji: "🍞", art: "linear-gradient(135deg,#e59a68,#a85b28)",
    desc: "Torn injera soaked in spicy wat sauce until it absorbs all of it. Maximum flavor per bite.",
    say: "Messy in the best way.", price: 14, spice: "hot",
    tags: ["meat", "filling"] },
];

const dishGrid = document.getElementById("dishGrid");
const resultsEl = document.getElementById("results");

function tagHTML(dish, extra) {
  const tags = dish.tags.map(t => `<span class="tag">${t}</span>`).join("");
  const heat = dish.spice !== "none" ? `<span class="tag heat">${dish.spice}</span>` : "";
  return `<div class="tags">${extra || ""}${tags}${heat}</div>`;
}

function dishCard(dish, badge) {
  return `
  <article class="dish-card">
    <div class="dish-art" style="background:${dish.art}">${dish.emoji}</div>
    <div class="dish-body">
      <h4>${dish.name}</h4>
      <p class="desc">${dish.desc}</p>
      <p class="say">“${dish.say}”</p>
      <div class="dish-meta">
        <span class="price">$${dish.price}</span>
        ${tagHTML(dish, badge ? `<span class="match-badge">${badge}</span>` : "")}
      </div>
    </div>
  </article>`;
}

function renderCatalog() {
  dishGrid.innerHTML = DISHES.map(d => dishCard(d)).join("");
}

function score(dish, prefs) {
  let s = 0;
  if (prefs.spice !== "any") {
    if (dish.spice === prefs.spice) s += 3;
    else if (prefs.spice === "none" && dish.spice !== "none") return -1;
    else if (prefs.spice === "hot" && dish.spice === "none") s -= 1;
  }
  if (prefs.diet === "vegan" && !dish.tags.includes("vegan")) return -1;
  if (prefs.diet === "vegetarian" && !(dish.tags.includes("vegetarian") || dish.tags.includes("vegan"))) return -1;
  if (prefs.diet === "meat" && dish.tags.includes("meat")) s += 3;
  if (prefs.budget !== "any" && dish.price > Number(prefs.budget)) return -1;
  if (prefs.vibe !== "any" && dish.tags.includes(prefs.vibe)) s += 3;
  if (dish.tags.includes("popular")) s += 1;
  return s;
}

document.getElementById("prefsForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const prefs = {
    spice: document.getElementById("prefSpice").value,
    diet: document.getElementById("prefDiet").value,
    budget: document.getElementById("prefBudget").value,
    vibe: document.getElementById("prefVibe").value,
  };
  const ranked = DISHES
    .map(d => ({ dish: d, s: score(d, prefs) }))
    .filter(x => x.s >= 0)
    .sort((a, b) => b.s - a.s)
    .slice(0, 3);

  if (!ranked.length) {
    resultsEl.innerHTML = `<h3>No matches</h3><p class="rec-note">Nothing in the catalog fits all of those picks together. Try loosening one — the budget filter knocks out the most dishes.</p>`;
    return;
  }
  resultsEl.innerHTML = `<h3>Your top ${ranked.length} pick${ranked.length > 1 ? "s" : ""}</h3>
    <div class="dish-grid">${ranked.map((x, i) => dishCard(x.dish, i === 0 ? "★ Top pick" : "Match")).join("")}</div>
    <p class="rec-note">Matched from the built-in dish catalog using your picks. A future version would read the dishes straight off your menu photo — this demo is honest about not doing that yet.</p>`;
  resultsEl.scrollIntoView({ behavior: "smooth", block: "start" });
});

// --- Menu photo upload (preview only in this demo) ---
const photoInput = document.getElementById("menuPhoto");
photoInput.addEventListener("change", () => {
  const file = photoInput.files && photoInput.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    document.getElementById("previewImg").src = reader.result;
    document.getElementById("photoPreview").hidden = false;
  };
  reader.readAsDataURL(file);
});

renderCatalog();
