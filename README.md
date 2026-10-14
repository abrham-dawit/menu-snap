# MenuSnap — snap a menu, get a recommendation

This is one of my ideas: you're at a restaurant, the menu is just words on paper, and you have no idea what anything looks like or tastes like. You take a photo of the menu, and the app shows you the dishes with pictures and plain descriptions, then recommends a few based on what you're in the mood for.

## What this version does

- **Menu photo upload** — tap the box, take a photo of a printed menu (opens the camera on a phone) or upload one. You get a preview right on the page.
- **A dish catalog** — 12 dishes, each with a picture-style card, what's in it, what people usually say about it, a sample price, and tags (spicy, vegan, filling, good for sharing…).
- **A recommendation flow** — pick your spice level, diet, budget, and vibe, and it ranks the catalog and gives you a top pick plus two more matches.

Open `index.html` in a browser. No build step, no accounts, no servers.

## What's honest about this demo

I want to be straight about what it does *not* do yet:

- **The photo is not read.** In this version your menu photo is only previewed — it never leaves your device, and no AI looks at it. Real dish recognition (OCR the menu text, match it against a dish database, pull real photos) is the whole hard part of this idea and it's future work. The recommendations come from the built-in catalog plus the preferences you pick.
- **Prices are sample prices** for the demo catalog, not a real restaurant's prices.
- **The "what people say" lines are example descriptions I wrote**, not collected customer reviews.

## Where it goes next

1. OCR on the menu photo so the app knows which dishes this restaurant actually serves.
2. A bigger dish database with real photos, so a match shows the actual dish.
3. Real diner comments per dish, tied to the restaurant.
4. Allergies filter — that's the feature I'd want most as a customer.

Built with plain HTML, CSS, and JavaScript because I wanted the idea working in front of people first.
