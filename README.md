# Shajara · شجرة الأنبياء

> An interactive, source-cited family tree and timeline of the Prophets mentioned in the Qur'an: lineage, peoples, miracles and stories.

**Status:** pre-alpha scaffold (no code yet). **Feasibility rating:** 7/10 — strong educational value; accuracy and sourcing are the whole product.
**Idea:** #18 in the owner's ideas backlog. **Author:** Oussama EL HADJI. Part of the Bosaj ideas portfolio (sibling repo: `dual_portfolio_hub`).

---

## Problem

Families and students want to see how the Prophets are related, who each was sent to, and what happened in their stories. Books scatter this information, and many online trees mix tradition with fact without saying so.

## Why build it (gap analysis)

Existing charts rarely cite sources and present uncertain lineages and dates as fact. This project tags every relationship and fact with its source level: Qur'an (with verse), authentic hadith (with reference), scholarly tradition, or disputed/unknown.

## Prior art & open bases to fork

- [Al Quran Cloud API](https://alquran.cloud/api) — Uthmani text and translations fetched live, so verse text is never typed by hand.
- [sunnah.com](https://sunnah.com) — Hadith references with collection and number.
- [d3/d3](https://github.com/d3/d3) — Tree layout.
- [mrdoob/three.js](https://github.com/mrdoob/three.js) — WebGL scene for the star-field tree.

## Proposed architecture

1. Data: one JSON file of people and relationships; each fact carries a source level and reference.
2. Tree: constellation-style lineage view with dashed edges where generations are unknown.
3. Timeline: sequence order anchored on Qur'anic statements; dates shown only where established.
4. Story pages: people sent to, miracles, family, lifespan — each with verse popovers fetched from the Qur'an API.

## Tech stack (proposed)

- React + TypeScript + Vite
- Tailwind CSS 4
- three.js / custom SVG layout
- Al Quran Cloud API
- Vercel

## Roadmap

- v0.1 — Sourced dataset of the 25 Prophets + relationship graph.
- v0.2 — Interactive constellation tree + profiles.
- v0.3 — Timeline view + miracles and stories.
- v0.4 — Arabic/French/English, search, share cards, PWA.

---

## For LLM agents & contributors continuing this project

This repo is a **scaffold**: README + standard files, no implementation yet. If you are an AI agent asked to "continue developing", read this section first.

- No images or depictions of Prophets, ever. Use calligraphy, light, landscapes and geometry.
- Every fact needs a `source` field. If a source is not certain, mark it `tradition` or `disputed` — never upgrade it.
- Do not type Qur'an text by hand; fetch it from the API by surah:ayah.

**Ground rules:** keep this README in sync with reality as you build; prefer forking/reusing the bases above over greenfield code; write tests for anything correctness-critical; never commit secrets (see `.gitignore`); follow Conventional Commits (see `CONTRIBUTING.md`).

## Getting started

```bash
# nothing to run yet — this is a scaffold.
```

## License

[MIT](LICENSE) — © 2026 Oussama EL HADJI
