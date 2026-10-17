# 1. Architecture

1. Data: one JSON file of people and relationships; each fact carries a source level and reference.
2. Tree: constellation-style lineage view with dashed edges where generations are unknown.
3. Timeline: sequence order anchored on Qur'anic statements; dates shown only where established.
4. Story pages: people sent to, miracles, family, lifespan — each with verse popovers fetched from the Qur'an API.

## Proposed stack
- React + TypeScript + Vite
- Tailwind CSS 4
- three.js / custom SVG layout
- Al Quran Cloud API
- Vercel

## Open bases to fork
- [Al Quran Cloud API](https://alquran.cloud/api) — Uthmani text and translations fetched live, so verse text is never typed by hand.
- [sunnah.com](https://sunnah.com) — Hadith references with collection and number.
- [d3/d3](https://github.com/d3/d3) — Tree layout.
- [mrdoob/three.js](https://github.com/mrdoob/three.js) — WebGL scene for the star-field tree.
