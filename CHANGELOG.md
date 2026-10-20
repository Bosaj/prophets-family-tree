# Changelog

All notable changes to this project are documented here. Format: [Keep a Changelog](https://keepachangelog.com/), versioning: [SemVer](https://semver.org/).

## [2.3.0] — 2026-10-20
### Added
- **Interactive Constellation Tree & Chronological Timeline for Sahaba & Caliphs (`/sahaba`)**:
  - Full 2D draggable and zoomable constellation canvas matching the Prophets' constellation tree, with pan/zoom controls (+, -, reset), SVG Bézier connecting lines, and glowing lineage/mentorship tracing.
  - Dedicated Chronological Timeline mode spanning from 53 BH (571 CE) through the Rashidun, Umayyads, Abbasids, and Ottomans down to modern living Prophetic dynasties, with era filter chips and dual Hijri/CE dates.
  - Quick multi-view switcher: Interactive Tree Canvas (`tree`), Chronological Timeline (`timeline`), and Detailed Dossiers Grid (`cards`).
- **Prophet-Level In-Depth Biographies for Hadith Masters**:
  - **Abu Hurairah (أبو هريرة عبد الرحمن بن صخر الدوسي رضي الله عنه)**: Foremost narrator of the prophetic Sunnah (5,374 Hadiths), Miracle of the Spread Cloak (*Bast ar-Rida'*), division of night into prayer thirds, governorship of Bahrain and Madinah, and resting place in Al-Baqi'.
  - **Imam al-Bukhari (الإمام محمد بن إسماعيل البخاري رحمه الله)**: Author of *Sahih al-Bukhari*, restoration of childhood sight through his mother's prayer, 16-year journey gathering 600,000 narrations, Istikharah & ghusl before every recorded Hadith, the famous Baghdad 100-swapped-hadiths test, and burial in Khartank/Samarkand.
  - **Imam Muslim (الإمام مسلم بن الحجاج النيسابوري رحمه الله)**: Author of *Sahih Muslim*, foremost student and champion of Al-Bukhari, thematic Isnad clustering and rigorous methodologies, independence as an ethical silk merchant, foundational *Muqaddimah*, and burial in Nishapur.
  - Comprehensive Prophet-grade dossiers featuring authored books, prominent teachers, foremost disciples, golden maxims & quotes, and milestone timelines across Arabic, English, and French.

## [2.2.0] — 2026-10-20
### Added
- **Tree of Sahaba, Khulafa' & Living Prophetic Dynasties (`/sahaba`)**:
  - Interactive succession tree and genealogical catalog tracing from Prophet Muhammad ﷺ and Ahl al-Bayt (Sayyidah Fatimah, Sayyiduna Ali, Al-Hasan, Al-Husayn).
  - The 5 Khulafa' ar-Rashidun (Abu Bakr, Umar, Uthman, Ali, Al-Hasan completing the 30-year Prophetic Caliphate).
  - The Ten Promised Paradise (العشرة المبشرون بالجنة) with authentic Hadith citations.
  - Eminent early Sahaba luminaries (Hamzah, Bilal, Salman al-Farsi, Khalid ibn al-Walid, Abu Ubaydah).
  - Historic caliphates: Umayyads of Damascus, Caliphate of Cordoba (Al-Andalus), Abbasids of Baghdad, and Ottomans of Istanbul.
  - Continuous unbroken Prophetic lineages to modern times: the Moroccan Alaouite Dynasty to His Majesty King Mohammed VI (Amir al-Mu'minin) and the Jordanian Hashemite Dynasty to His Majesty King Abdullah II (Custodian of Jerusalem's Holy Sites).
- **Scientific Facts in Qur'an & Hadith Proven by Peer-Reviewed Research (`/science`)**:
  - Rigorous catalog of scientific facts in scripture backed by direct peer-reviewed journal papers (authors, journals, publication years, and DOI links).
  - Covers Cosmology (*Expanding Universe* - Hubble / Perlmutter), Embryology (*Human Developmental Stages* - Keith L. Moore / Carnegie Stages), Oceanography (*Internal Waves in Deep Oceans* - Alford et al., *Nature*), Hydrology (*Halocline Barrier Between Seas* - Armi & Farmer), Earth Sciences (*Mountains as Isostatic Pegs* - Watts, *Cambridge*), Astrophysics (*Supernova Origin of Iron* - Burbidge et al.), Neuroscience (*Nociceptors in Skin* - David Julius, *Nobel 2021*; *Prefrontal Cortex in Deception* - Langleben, *NeuroImage*), Atmospheric Physics (*Hypobaric Hypoxia on High Altitude Ascent* - West, *The Lancet*), and Prophetic Medicine (*Nigella Sativa / Thymoquinone* and *Honey Defensin-1 Antimicrobial Matrix* - *FASEB Journal*).
  - Integrated Uthmani verse recitation with live audio and multilingual explanations (AR/EN/FR).
- **The Dove / Pigeon (*Columba livia* / الحمامة واليمامة)**:
  - Added the Dove to the Prophetic Fauna catalog with photorealistic imagery, authentic Qur'an (Noah's Ark return) and Hadith context (Cave of Thawr, Sanctuary birds of the Haramain), and bespoke SVG silhouette with olive branch.
- **Nature Stage Physics & Volumetric Drifting Clouds**:
  - Draggable sky dome physics: direct touch and pointer drag interaction across the celestial arc with smooth angle scrubbing.
  - Live Celestial Orbit loop (`▶️ دوران الفلك الحي`) continuously animating solar and lunar bodies with real-time shadow projection on dunes.
  - Multi-tiered procedural volumetric cloud layers drifting with realistic parallax and sun-responsive color grading.
- **Clear Explanation of "Upupa epops"**:
  - Clarified prominently that *Upupa epops* is the international scientific binomial classification for the Hoopoe (الهدهد), the wise scout bird of Prophet Sulayman (Surah An-Naml 27:20-28), eliminating user ambiguity.

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
