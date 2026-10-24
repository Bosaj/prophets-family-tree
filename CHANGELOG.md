# Changelog

All notable changes to this project are documented here. Format: [Keep a Changelog](https://keepachangelog.com/), versioning: [SemVer](https://semver.org/).

## [Unreleased]

## [2.4.3] — 2026-10-24
### Fixed
- Map: leaving `/map` while Leaflet was still loading made the tile and marker effects add layers to a map that had already been removed (`Cannot read properties of undefined (reading 'appendChild')`). Both effects now ignore a map that is gone. This also made the GitHub Pages deploy of 2.4.2 fail its test step. Regression test added.

## [2.4.2] — 2026-10-24
### Changed
- The author's Arabic name in the footer (أسامة الحاجي) is set in the Maghribi typeface Bouazzi Maghribi by Mohamed Gallah (MIT). The font is subset to the letters of the name (5.6 KB woff2); licence in `src/assets/fonts/`.

### Fixed
- CI: the content audit retries its requests; only a real 404 counts as a missing reference, and an unreachable server is a warning, so a dropped connection no longer fails the build.

### Docs
- README and wiki updated: accuracy rules and audit numbers, new pages (stature, stories, scriptures, sources), versioning.

## [2.4.1] — 2026-10-24
### Fixed — accuracy
- Wrong or mixed-up hadith numbers corrected after checking each one against its text: Thamud and al-Hijr (Bukhari 3380), the speaking wolf (Bukhari 3471 / Musnad Ahmad), Jibril’s 600 wings and true form (Bukhari 3232, 3234; Muslim 174, 177), Malak al-Mawt (Abu Dawud 4753), Malik the gatekeeper (Bukhari 3239, 3396), Musa’s and ‘Isa’s descriptions (Bukhari 3396, 3394, 3440), the Prophet’s ﷺ description (Bukhari 3551; Tirmidhi 3637–3638), Fatimah (Bukhari 3624), Abu Hurairah (Bukhari 3648), Paradise in Adam’s form (Bukhari 3327).
- Weak reports are no longer presented as authentic: “city of knowledge”, carrying the Khaybar gate, “without Ali Umar would have perished”, doves at Cave Thawr, Mikail never laughing, pearls falling from Jibril’s wings, and the six-hour delay of the left-hand angel are now labelled with their real grade.
- Qur’an quotations typed in the data are checked against the Mushaf: fixed 71:7 and 11:85, split 2:69 and 2:71, and moved two hadith sayings (Muslim 2996, Bukhari 5417) out of Qur’an brackets ﴿﴾.
- The dove is no longer linked to Qur’an 11:44 (the Qur’an does not mention it; Noah’s dove comes from Genesis 8), and the ḥummarah of Abu Dawud 2675 is no longer called a dove.
- Stature: heights for ‘Ad, Thamud and Musa are marked as illustrative (no text gives them), invented BCE dates removed, every portrait’s “height in metres” removed, portraits rewritten from the narrations only, and the unsourced “seven cubits wide” removed.
- Pre-Adamic realm: every entity has a source level; al-Hinn, al-Binn and the Nasnas are labelled as disputed, with an explanation.
- Science page: 7 research DOIs that did not exist replaced by the real papers (all 23 now resolve), and the page presents verse–science links as interpretation (tafsir ‘ilmi), not proof.

### Fixed — media and rights
- The Buraq folk painting (with a human face) replaced by a non-figurative night scene; prophets on the stature stage are drawn as height pillars, never as human figures.
- 27 nature photos traced to their Wikimedia Commons files with author and licence, shown under each photo and listed on the Sources page; the two photos with no traceable source were replaced by generated images.

### Fixed — GitHub Pages
- Scene images and nature photos used absolute paths and returned 404 under `/prophets-family-tree/`; all assets now use the configured base.

### Performance
- Every page is its own chunk: the main bundle dropped from 1.69 MB (561 KB gzip) to 571 KB (189 KB gzip); Leaflet loads only on the map. The service-worker precache dropped from 6.1 MB to 2.3 MB.
- A static splash paints the title instantly; the footer waits with the page so lazy chunks cause no layout shift (CLS 0).
- Public source maps.

### Added
- `npm run audit:content` (runs in CI): checks every Qur’an reference, every ﴿﴾ quotation and typed Arabic verse against the Mushaf, every hadith number against its text, and every DOI.
- `npm run credits:photos`: re-traces photo credits from Wikimedia Commons.
- Tests for the new rules (illustrative heights, disputed entities, photo credits, DOI links).

## [2.4.0] — 2026-10-21
### Fixed
- **Mobile & Phone Display Tree Layout (`horizontal = false`)**:
  - Fully resolved orientation issue where genealogical descent lines turned vertical on phones but spouse/marriage connector lines remained vertically oriented or caused overlapping collisions.
  - Spouses are now arranged along the perpendicular HORIZONTAL axis on the exact same generational tier ($y = husband.y$), side-by-side with their prophet husbands.
  - Hawwa is placed horizontally beside Adam, Hajar and Sarah are placed horizontally beside Ibrahim above their respective sons Ismail and Ishaq, and Safura is placed beside Musa.
  - The wives of Prophet Muhammad ﷺ (Ummahat al-Mu'minin) are aligned along a continuous, elegant horizontal bar on the open flank of the tree, with straight horizontal marriage connector lines and clean vertical descent to the children.
- **Author Attribution**:
  - Author attribution strictly standardized to **"Oussama EL HADJI"** across English, French, and Arabic locales.

### Added
- **Divine Scriptures & Manuscript Traditions Catalog (`/scriptures` & Interactive Modals)**:
  - Comprehensive encyclopedic dataset (`src/data/scriptures.ts`) documenting all revealed divine scriptures:
    - *Al-Qur'an al-Karim* (1 Singular Preserved Text in Rasm Uthmani, the 10 Mutawatir Qira'at, and physical manuscripts from Birmingham, Sana'a, Topkapi, Samarkand, and Tübingen).
    - *At-Tawrat & Tablets* (6 major textual traditions: Masoretic MT, Samaritan Pentateuch with ~6,000 variants, Septuagint LXX, Dead Sea Scrolls, Syriac Peshitta, Aramaic Targums).
    - *Az-Zabur* (5 major textual traditions: Masoretic Tehillim 150 Psalms, Septuagint 151 Psalms, Qumran 11QPs^a, Syriac Peshitta 155 Psalms, Latin Vulgate recensions).
    - *Al-Injeel* (8 major manuscript witnesses: 4 Canonical Gospels in Greek with >500,000 variants, Codex Sinaiticus, Vaticanus, Alexandrinus, Syriac Peshitta, Diatessaron Harmony, Gospel of Barnabas, and Nag Hammadi Gnostic Codices).
    - *Suhuf Ibrahim* (4 historical traditions: Lost Divine Original, Testament of Abraham, Apocalypse of Abraham, and authentic Hadith records in Sahih Ibn Hibban).
    - *Suhuf Idris* (30 scrolls) and *Suhuf Shith* (50 scrolls) attested in Sahih Hadith.
  - **Scripture Book Medallions on the Tree**:
    - Radiant glowing book badges `📖` on prophet tree nodes with pulse aura, tooltip, and version counter badge (`١` for Quran, `6` for Tawrat, `5` for Zabur, `8` for Injeel, etc.).
    - Clicking the medallion directly opens the deep interactive `ScripturesModal`.
  - **Dedicated Full-Page View (`/scriptures`) & Navigation**:
    - Accessible via the top navigation bar, Tree toolbar, and individual prophet biography fact sheets.
    - Includes photorealistic 16:9 still-life images of the holy scriptures adhering strictly to Islamic theological rules (no humans or faces).
    - Islamic comparative analysis explaining the Divine preservation guarantee of the Qur'an vs. the textual pluriformity of earlier scriptures.


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
- **Author Attribution & LinkedIn Profile Link**: Interactive footer attribution linking to Oussama EL HADJI's professional profile.

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
