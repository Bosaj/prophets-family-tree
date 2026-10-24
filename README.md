# Shajara · شجرة الأنبياء

> An interactive, source-cited family tree, topography map, nature showcase, sahaba & caliphs succession tree, scientific facts explorer, and dual timeline of the Prophets named in the Qur'an and Sunnah — lineage, migrations, organisms, celestial theater, signs, and stories — in Arabic, English, and French.

**Live Demo (GitHub Pages):** [https://bosaj.github.io/prophets-family-tree/](https://bosaj.github.io/prophets-family-tree/)  
**Mirror (Vercel):** [https://shajara-prophets.vercel.app](https://shajara-prophets.vercel.app)  
**Status:** v2.4.2 · **Author:** [Oussama EL HADJI](https://www.linkedin.com/in/oussama-elhadji/)

[![CI](https://github.com/Bosaj/prophets-family-tree/actions/workflows/ci.yml/badge.svg)](https://github.com/Bosaj/prophets-family-tree/actions/workflows/ci.yml)
[![Pages](https://github.com/Bosaj/prophets-family-tree/actions/workflows/deploy.yml/badge.svg)](https://bosaj.github.io/prophets-family-tree/)
[![Latest release](https://img.shields.io/github/v/release/Bosaj/prophets-family-tree?sort=semver)](https://github.com/Bosaj/prophets-family-tree/releases/latest)
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

![Shajara home page](docs/home.webp)

---

## What it does

- **Constellation Tree (`/tree`)** — the whole lineage from Adam to Muhammad ﷺ as an interactive, zoomable cosmic star map. Select a name to trace the direct lineage back to Adam. Sideways on wide screens (right-to-left in Arabic), top-down on mobile. Includes filters for wives (Ummahat al-Mu'minin), children, and extended family.
- **Tree of Sahaba, Khulafa' & Continuous Lineages (`/sahaba`)** — comprehensive succession tree tracing from Prophet Muhammad ﷺ, Ahl al-Bayt, the 5 Rightly Guided Caliphs, the Ten Promised Paradise, historic Caliphates (Umayyads, Cordoba, Abbasids, Ottomans), down to unbroken Hasanid Sharifi lineages to the present day (Moroccan Alaouite Dynasty to King Mohammed VI, Jordanian Hashemite Dynasty to King Abdullah II).
- **The Qur'an, the Sunnah and Modern Science (`/science`)** — verses and hadith placed next to peer-reviewed research in cosmology, embryology, oceanography, geology, neuroscience and pharmacology, with every paper's DOI checked. Linking a verse to a discovery is presented as an interpretation by scholars and researchers, not as proof.
- **Pre-Adamic Realm & Iblis** — an autonomous floating celestial domain above the tree canvas documenting earlier earthly creations (Jinn, Iblis / Satan, Hinn, Binn, Nasnas) cited by classical scholars (Ibn Kathir, Al-Hasan al-Basri) and the Qur'an, completely decoupled from Adam's genealogy.
- **Topography Map & Prophetic Routes (`/map`)** — interactive historical topography map tracing prophetic routes, waypoints, sanctuaries, and migration paths across Hijaz, the Levant, Egypt, and Mesopotamia with elevation layers.
- **Prophetic Nature, Flora & Fauna (`/nature`)** — 30 animals, plants and foods mentioned in the Qur'an and Hadith (the hoopoe / *Upupa epops*, the whale, camel, bee, ant, olive, fig, date palm, pomegranate, black seed…), each with its source level, its benefits and a credited photo (Wikimedia Commons author and licence, traced by `npm run credits:photos`).
- **Stature, Stories and Scriptures (`/stature`, `/stories`, `/scriptures`)** — heights given in the texts (illustrative ones are marked as such and drawn as pillars, never as human figures), the stories of the Qur'an and the righteous, and the revealed books.
- **Sources (`/sources`)** — every reference, the source-level rules and the photo credits in one place.
- **Celestial Sun, Moon, Dunes & Cloud Physics Theater** — interactive atmospheric simulator with direct draggable sky physics, live celestial orbit simulation loop, multi-layered drifting volumetric clouds, and real-time shadow projection on desert sand dunes.
- **Dual Timeline (`/timeline`)** — the chronological sequence of the Prophets anchored on Qur'anic synchronisms with toggles for Hijri (BH / AH) and historical BCE/CE epochs.
- **Interactive Relational Highlighting** — bidirectional focus between canvas relationship lines and the floating legend (parent, descendant, sacred marriage, sibling, cousin, legal guardianship).
- **Profiles (`/p/:id`)** — comprehensive dossiers for each Prophet: mission, people, scripture, lifespan, family links, miracles, and key Qur'anic passages.
- **Live Qur'an Sheet** — every verse reference opens the Uthmani text, translation (Saheeh International / Hamidullah / al-Tafsir al-Muyassar), and Mishary Alafasy's audio recitation streaming live from the Al Quran Cloud API. The few verses quoted inside the data are checked word for word against the Mushaf in CI.
- **Al-Mi‘raj** — the stations of the seven heavens (Sahih al-Bukhari 3207) and the Ulul ‘Azm messengers of firm resolve.
- **Multi-lingual & RTL** — full instant switching between Arabic, English, and French with bespoke typography (Reem Kufi, Amiri, Sora) and responsive layouts.
- **Offline PWA** — installable Progressive Web App with offline caching for visited routes. Pages load as separate chunks behind a static splash, so the first screen paints fast with no layout shift.

---

## Accuracy is the product

Every fact and relationship carries a strict **source level**:

| Level | Meaning |
|---|---|
| **Qur'an** | Stated explicitly in the Qur'an; reference cites surah:verse |
| **Hadith** | From an authentic hadith (sunnah.com numbering) or established Sunnah |
| **Tradition** | From classical historians (Ibn Kathir, al-Tabari) or historical accounts |
| **Disputed** | Scholarly disagreement or uncertain historical traditions |

Rules:
1. A source level is never upgraded, and weak reports are labelled with their real grade.
2. The Qur'an brackets ﴿ ﴾ are used only for text of the Mushaf; hadith wording uses « ».
3. Qur'anic text in the sheet is always fetched live; any verse typed in the data must match the Mushaf exactly.
4. Pre-Adamic creations are strictly autonomous and never connected genealogically to Adam.
5. **No human depictions or images of the Prophets** — visual representations are limited to atmospheric landscapes, botanical/zoological photography and abstract shapes.

Two checks run in CI on every push:
- `npm run verify:sources` — the people and links datasets against the Qur'an and Hadith sources.
- `npm run audit:content` — every dataset: 544 Qur'an references, 43 typed verses and 161 ﴿ ﴾ quotations compared with the Mushaf, 213 hadith numbers looked up in their collections, and 23 research DOIs resolved. Hard failures stop the build; paraphrases are listed for review.

Found a mistake? [Open an accuracy issue](https://github.com/Bosaj/prophets-family-tree/issues/new?labels=accuracy) with a primary source citation.

---

## Tech Stack

- **Framework:** React 19 + TypeScript 7 + Vite 8
- **Styling & Design:** Tailwind CSS 4, Lucide Icons, Glassmorphism, Reem Kufi & Amiri typography; the author's Arabic name in the footer uses Bouazzi Maghribi by Mohamed Gallah (MIT), subset to 5.6 KB
- **Data & Visualization:** d3-hierarchy, custom SVG canvas, Leaflet 3D topography maps
- **PWA & Offline:** vite-plugin-pwa, Workbox service workers
- **Testing & Verification:** Vitest, automated Qur'an & Hadith source verifier script
- **CI/CD & Deployment:** GitHub Actions (`.github/workflows/deploy.yml`), GitHub Pages SPA (`404.html`), Vercel

```
src/data/people.ts        25 Prophets + extended family (every fact sourced)
src/data/preAdam.ts       Pre-Adamic creations & Iblis dataset with classical sources
src/data/nature.ts        29 Qur'anic and Sunnah organisms with scriptural benefits
src/data/links.ts         Genealogical, marital, and lateral relationship bonds
src/data/sources.ts       Reference parsing, labels, and sunnah.com / quran.com links
src/lib/layout.ts         Multi-generational tree layout algorithm with zero collisions
src/lib/router.ts         Base-path-aware client router supporting GitHub Pages & subdomains
src/components/NatureView.tsx   Organism catalog & celestial Sun/Moon/Dunes theater
src/components/TopographyMap.tsx Interactive historical topography and migration routes
src/components/Tree.tsx   Constellation family tree viewer & collapsible legend
```

---

## Getting Started

```bash
# Clone the repository
git clone https://github.com/Bosaj/prophets-family-tree.git
cd prophets-family-tree

# Install dependencies
npm install

# Start local development server
npm run dev

# Run unit tests and layout collision validation
npm test

# Verify all Qur'anic and Hadith citations against API endpoints
npm run verify:sources

# Audit every dataset: Qur'an refs, typed verses, hadith numbers, DOIs
npm run audit:content

# Build production bundle
npm run build
```

---

## Versioning

[Semantic Versioning](https://semver.org/): content corrections and fixes are PATCH releases (`2.4.2`), new pages or datasets are MINOR (`2.5.0`), and breaking URL or data changes are MAJOR. Tags are `vX.Y.Z`; GitHub milestones and releases use the same names. See the [CHANGELOG](CHANGELOG.md) and the [wiki](https://github.com/Bosaj/prophets-family-tree/wiki).

---

## License & Attribution

Open-source educational project developed by [Oussama EL HADJI](https://www.linkedin.com/in/oussama-elhadji/). Released under the MIT License.
