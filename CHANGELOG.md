# Changelog

All notable changes to this project are documented here. Format: [Keep a Changelog](https://keepachangelog.com/), versioning: [SemVer](https://semver.org/).

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
