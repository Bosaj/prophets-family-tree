# Changelog

All notable changes to this project are documented here. Format: [Keep a Changelog](https://keepachangelog.com/), versioning: [SemVer](https://semver.org/).

## [2.0.0] — 2026-10-20
### Added
- **Pre-Adamic Realm & Jinn Cosmological Island**: Autonomous floating celestial domain in the tree viewer highlighting earlier terrestrial creations (Jinn, Iblis / Shaytan, Hinn, Binn, Nasnas) with classical Islamic scholarly sources (Ibn Kathir, Al-Hasan al-Basri) and Qur'anic verses (18:50, 38:76, 2:34).
- **Prophetic Nature, Flora & Fauna View (`/nature`)**: Interactive showcase of 29 animals, plants, and foods cited in the Qur'an and Sunnah (hoopoe, whale, bee, camel, ant, olive, date palm, fig, pomegranate, black seed, talbinah, etc.) featuring scriptural citations, botanical/zoological profiles, and nutritional/healing benefits.
- **Celestial Sun, Moon, Dunes & Cloud Theater**: Interactive solar and lunar atmospheric stage with dynamic solar altitude calculations, astronomical moon tracking, drifting cloud layers, and wind-sculpted desert dunes.
- **Topography & Prophetic Routes (`/map`)**: Interactive Leaflet 3D historical topography maps tracing the journeys, stations, and waypoints of the Prophets across the Arabian Peninsula, Levant, Egypt, and Mesopotamia.
- **Interactive Lineage & Relational Highlighting**: Bidirectional highlighting and glow between canvas genealogical lines and the interactive legend, with specific categorization for direct lineage (parent, descendant), sacred marriages, and lateral bonds (sibling, cousin, guardian).
- **GitHub Pages Automated CI/CD Deployment**: Dedicated deployment workflow (`.github/workflows/deploy.yml`) supporting subpath base routing (`/prophets-family-tree/`) and client-side SPA routing (`404.html`).
- **Author Attribution & LinkedIn Profile Link**: Interactive footer attribution linking to Oussama Elhadji's professional profile.

### Fixed
- **UI Overlapping in Tree Canvas**: Resolved collision between the bottom floating time-space epoch ruler, the interactive legend, and the trace hint.
- **Collapsible Legend Drawer**: Replaced fixed legend with a floating toggle pill and close button, positioned safely above the bottom epoch ruler.
- **Epoch Ruler Date Representation**: Formatted epoch dates cleanly across Arabic, English, and French without truncation or awkward text wraps (`whitespace-nowrap`).
- **Organism Card Image Cropping**: Implemented dual-layer framing (blurred ambient backdrop + full uncropped foreground) to ensure zero image cut-off on hover.
- **Arabic Text Squashing**: Restructured card headers in the timeline and tree drawer to guarantee full width for Arabic typography without vertical character collapse.
- **Theological Tree Decoupling**: Completely severed the genealogical line connecting pre-Adamic entities to Adam, preserving the orthodox Islamic creed that Adam was created directly from clay without ancestors.

## [1.0.0] — 2026-10-17
### Added
- Sourced dataset of the 25 Prophets named in the Qur'an plus Shith, Azar, ‘Imran and Maryam: titles, mission, peoples, lands, scriptures, lifespans, marriages, children, signs, notes and stories in Arabic, French and English. Every fact has a source level (Qur'an, hadith, tradition, disputed) and references.
- 31 relationships (parent, descendant, nephew, sibling, cousin, guardian, possible parent), each with a level, references and an explanation.
- `npm run verify:sources`: checks all Qur'an references exist and ~200 contain an expected word; checks all 23 hadith references against their text. Runs in CI.
- Constellation tree with pan, wheel and pinch zoom, lineage tracing, family toggle, sideways layout on wide screens (right-to-left in Arabic) and auto-pan away from the details panel.
- Timeline ordered by Qur'anic anchors, with historians' estimates behind a toggle.
- Profile pages with facts, signs, notes, family, the passages to read and previous/next navigation.
- Live Qur'an sheet: Uthmani text, translation (Saheeh International / Hamidullah / al-Muyassar) and Alafasy recitation from Al Quran Cloud.
- Al-Mi‘raj seven heavens, Ulul ‘Azm, method page, search (Ctrl K), installable PWA, 19 generated landscape scenes (no depictions of people), WebP + AVIF at full 2048 px with a 960 px copy for phones.
