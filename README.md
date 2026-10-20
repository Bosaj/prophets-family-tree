# Shajara · شجرة الأنبياء

> An interactive, source-cited family tree, topography map, nature showcase, sahaba & caliphs succession tree, scientific facts explorer, and dual timeline of the Prophets named in the Qur'an and Sunnah — lineage, migrations, organisms, celestial theater, signs, and stories — in Arabic, English, and French.

**Live Demo (GitHub Pages):** [https://bosaj.github.io/prophets-family-tree/](https://bosaj.github.io/prophets-family-tree/)  
**Mirror (Vercel):** [https://shajara-prophets.vercel.app](https://shajara-prophets.vercel.app)  
**Status:** v2.2.0 · **Author:** [Oussama EL HADJI](https://www.linkedin.com/in/oussama-elhadji/)

![Shajara home page](docs/home.webp)

---

## What it does

- **Constellation Tree (`/tree`)** — the whole lineage from Adam to Muhammad ﷺ as an interactive, zoomable cosmic star map. Select a name to trace the direct lineage back to Adam. Sideways on wide screens (right-to-left in Arabic), top-down on mobile. Includes filters for wives (Ummahat al-Mu'minin), children, and extended family.
- **Tree of Sahaba, Khulafa' & Continuous Lineages (`/sahaba`)** — comprehensive succession tree tracing from Prophet Muhammad ﷺ, Ahl al-Bayt, the 5 Rightly Guided Caliphs, the Ten Promised Paradise, historic Caliphates (Umayyads, Cordoba, Abbasids, Ottomans), down to unbroken Hasanid Sharifi lineages to the present day (Moroccan Alaouite Dynasty to King Mohammed VI, Jordanian Hashemite Dynasty to King Abdullah II).
- **Scientific Facts in Qur'an & Sunnah (`/science`)** — interactive catalog of scientific truths mentioned in scripture confirmed by modern science, backed by peer-reviewed academic papers with direct DOI links (Nature, The Lancet, PNAS, Science) across cosmology, embryology, oceanography, geology, neuroscience, and pharmacology.
- **Pre-Adamic Realm & Iblis** — an autonomous floating celestial domain above the tree canvas documenting earlier earthly creations (Jinn, Iblis / Satan, Hinn, Binn, Nasnas) cited by classical scholars (Ibn Kathir, Al-Hasan al-Basri) and the Qur'an, completely decoupled from Adam's genealogy.
- **Topography Map & Prophetic Routes (`/map`)** — interactive historical topography map tracing prophetic routes, waypoints, sanctuaries, and migration paths across Hijaz, the Levant, Egypt, and Mesopotamia with elevation layers.
- **Prophetic Nature, Flora & Fauna (`/nature`)** — catalog of 30 animals, plants, and foods mentioned in the Qur'an and Hadith (including the Hoopoe / *Upupa epops*, the Dove / *Columba livia*, the whale, camel, bee, ant, olive, fig, date palm, pomegranate, black seed, etc.) with detailed nutritional/healing benefits and live audio.
- **Celestial Sun, Moon, Dunes & Cloud Physics Theater** — interactive atmospheric simulator with direct draggable sky physics, live celestial orbit simulation loop, multi-layered drifting volumetric clouds, and real-time shadow projection on desert sand dunes.
- **Dual Timeline (`/timeline`)** — the chronological sequence of the Prophets anchored on Qur'anic synchronisms with toggles for Hijri (BH / AH) and historical BCE/CE epochs.
- **Interactive Relational Highlighting** — bidirectional focus between canvas relationship lines and the floating legend (parent, descendant, sacred marriage, sibling, cousin, legal guardianship).
- **Profiles (`/p/:id`)** — comprehensive dossiers for each Prophet: mission, people, scripture, lifespan, family links, miracles, and key Qur'anic passages.
- **Live Qur'an Sheet** — every verse reference opens the Uthmani text, translation (Saheeh International / Hamidullah / al-Tafsir al-Muyassar), and Mishary Alafasy's audio recitation streaming live from the Al Quran Cloud API. No verse is typed by hand.
- **Al-Mi‘raj** — the stations of the seven heavens (Sahih al-Bukhari 3207) and the Ulul ‘Azm messengers of firm resolve.
- **Multi-lingual & RTL** — full instant switching between Arabic, English, and French with bespoke typography (Reem Kufi, Amiri, Sora) and responsive layouts.
- **Offline PWA** — installable Progressive Web App with offline caching for visited routes.

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
1. A source level is never upgraded.
2. Qur'anic text is never typed by hand — always fetched verified via the Al Quran Cloud API.
3. Pre-Adamic creations are strictly autonomous and never connected genealogically to Adam.
4. **No human depictions or images of the Prophets** — visual representations are limited to atmospheric landscapes and botanical/zoological photography.

`npm run verify:sources` validates the entire dataset against authentic texts: 278+ Qur'an citations and 32 Hadith references.

Found a mistake? [Open an accuracy issue](https://github.com/Bosaj/prophets-family-tree/issues/new?labels=accuracy) with a primary source citation.

---

## Tech Stack

- **Framework:** React 19 + TypeScript 7 + Vite 8
- **Styling & Design:** Tailwind CSS 4, Lucide Icons, Glassmorphism, Reem Kufi & Amiri typography
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

# Build production bundle
npm run build
```

---

## License & Attribution

Open-source educational project developed by [Oussama EL HADJI](https://www.linkedin.com/in/oussama-elhadji/). Released under the MIT License.
