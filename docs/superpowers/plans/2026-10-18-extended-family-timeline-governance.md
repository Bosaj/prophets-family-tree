# Extended Family Tree, Dual Timeline, and Repository Governance Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform Shajara into an expansive, cinematic Islamic genealogical atlas featuring detailed parent/mother/father/brother relationships, wives/spouses, sons/children, birth/death dates (Hijri BH/AH and BCE/CE), life milestone events, an interactive dual timeline, and automated repository governance with wiki synchronization.

**Architecture:** 
1. Extend domain models in `src/data/types.ts` with structured `parents`, `siblings`, `spouses`, `allChildren`, `dates` (dual calendar), and `events`.
2. Expand `src/data/people.ts` and `src/data/links.ts` with authenticated historical family members (Hawwa, Sarah, Hajar, Aminah, Abdullah, Khadijah, Aisha, Fatimah, Seth, Yam, Sam, Ham, Yafith, Benjamin, etc.) with 100% Arabic, English, and French localized text and strict source levels.
3. Enhance `src/lib/layout.ts` and `src/components/Tree.tsx` with dynamic family filters (Show Wives, Show Sons/Children, Show Extended Family), micro-animations, glowing celestial paths, and an interactive lineage scrubber.
4. Elevate `src/components/Timeline.tsx` with dual-mode timeline rendering (Hijri vs. Gregorian vs. Dual synchronized), era filtering, and milestone event cards.
5. Enrich `src/components/Person.tsx` with dedicated Parents, Spouses, Children, Siblings, Dates, and Chronological Life Events sections.
6. Establish GitHub repository governance, issue/PR workflow rules, and automated bidirectional wiki synchronization workflow utilizing the `chef` PAT.

**Tech Stack:** React 19, TypeScript 7, Vite 8, Tailwind CSS 4, d3-hierarchy, Lucide React, Vitest.

---

## Global Constraints

- **No depictions of Prophets:** Under no circumstance may any human depiction, avatar, or portrait of a Prophet be introduced. Only landscapes, calligraphy, celestial geometries, and light.
- **Source Level Integrity:** Every fact must declare its level (`quran`, `hadith`, `tradition`, `disputed`). Never upgrade levels.
- **Trilingual Completeness:** All new strings and facts must provide complete, polished translations in Arabic (`ar`), English (`en`), and French (`fr`).
- **Zero Test Regressions:** `npm test`, `npm run typecheck`, and `npm run build` must pass cleanly at every stage.

---

## Review Focus

1. **Cycle Prevention in Extended Graph:** Adding wives, siblings, and child nodes must preserve the acyclic tree hierarchy anchored at Adam.
2. **Missing Translation Trap:** Vitest `data.test.ts` scans every property of every person and link for non-empty `en`, `fr`, and `ar` strings.
3. **Reference Verification:** Any Qur'an or Hadith references added must be valid and conform to `refUrl` and `parseRef` specifications.
4. **Responsive Tree Canvas on Mobile vs. Desktop:** Multi-node family expansion must maintain touch-panning, pinch-zooming, and proper bounds.
5. **Timeline Date Discrepancies:** Pre-Islamic dates are approximations and must be explicitly identified with source attribution.

---

## Tasks

### Task 1: Domain Type & Data Schema Expansion
**Files:**
- Modify: `src/data/types.ts`
- Modify: `src/data/sources.ts`
- Modify: `src/i18n/strings.ts`
- Test: `src/data/data.test.ts`

- [ ] **Step 1: Update `types.ts` with new family, dates, and event models**
  - Add `LifeEvent` interface with `id`, `title: L3`, `era?: L3`, `yearHijri?: string`, `yearBceCe?: string`, `desc: L3`, `refs?: Ref[]`.
  - Add `dates?: { born?: Fact; died?: Fact; hijriBorn?: string; hijriDied?: string; gregorianBorn?: string; gregorianDied?: string }` to `Person`.
  - Add `parents?: { father?: Fact; mother?: Fact; fosterMother?: Fact }` to `Person`.
  - Add `siblings?: Fact[]` to `Person`.
  - Add `spouses?: Fact[]` to `Person`.
  - Add `allChildren?: Fact[]` to `Person`.
  - Add `events?: LifeEvent[]` to `Person`.
  - Add `'spouse' | 'child'` to `Kind` type.
  - Add `'spouse' | 'child'` to `LinkType`.

- [ ] **Step 2: Add i18n translation keys in `src/i18n/strings.ts`**
  - Add keys: `father`, `mother`, `fosterMother`, `brothers`, `spouses`, `allChildren`, `born`, `died`, `hijriEra`, `gregorianEra`, `lifeEvents`, `showWives`, `showChildren`, `showExtendedFamily`, `timelineHijri`, `timelineGregorian`, `timelineDual`, `filterAll`, `filterProphets`, `filterWives`, `filterChildren`.
  - Provide accurate translations across `en`, `fr`, and `ar`.

- [ ] **Step 3: Run `npm run typecheck` to verify interface validity**
  - Verify zero TypeScript compiler errors.

---

### Task 2: Enrich Prophet Family Profiles & Authentic Extended Kinship Dataset
**Files:**
- Modify: `src/data/people.ts`
- Modify: `src/data/links.ts`
- Test: `src/data/data.test.ts`

- [ ] **Step 1: Add detailed dates, parents, siblings, wives, children, and life events for key Prophets**
  - Prophet Muhammad ﷺ:
    - Father: Abdullah ibn Abd al-Muttalib, Mother: Aminah bint Wahb, Foster Mother: Halimah al-Sa'diyyah.
    - Wives: Khadijah bint Khuwaylid, Aisha bint Abi Bakr, Sawdah, Hafsa, Umm Salamah, etc.
    - Children: Al-Qasim, Abd Allah, Ibrahim, Zaynab, Ruqayyah, Umm Kulthum, Fatima.
    - Dates: ~570 CE / 53 BH to 632 CE / 11 AH.
    - Events: Year of the Elephant, First Revelation (Cave Hira 13 BH), Year of Sorrow, Isra & Mi'raj, Hijrah (1 AH), Badr (2 AH), Uhud (3 AH), Hudaybiyyah (6 AH), Conquest of Makkah (8 AH), Farewell Hajj (10 AH).
  - Prophet Musa:
    - Father: Imran, Mother: Yukhabad (Mother of Musa), Brother: Harun, Sister: Maryam, Wife: Safura, Sons: Gershom & Eliezer.
    - Dates: ~1392-1272 BCE.
    - Events: Cast in the Nile in an Ark, Defense in Egypt, Flight to Madyan, Mount Tuwa & Fire, 9 Signs before Pharaoh, Parting of the Red Sea, Revelation of Torah on Sinai, Journey with Al-Khidr.
  - Prophet Ibrahim:
    - Father: Azar, Wives: Sarah & Hajar, Sons: Ismail & Ishaq, Nephew: Lut.
    - Dates: ~2166-1991 BCE.
    - Events: Smashing the Idols, Saved from Nimrod's Fire, Migration to Holy Land, Settlement in Makkah, Sacrifice Vision, Raising the Ka'bah Foundations.
  - Prophet Isa:
    - Mother: Maryam, Guardian: Zakariya, Cousin: Yahya.
    - Dates: ~4 BCE - 33 CE.
    - Events: Annunciation, Miraculous Birth under Palm Tree, Speech in the Cradle, Healing Lepers & Blind, The Heavenly Table (Ma'idah), Ascension to Heaven.
  - Prophet Nuh:
    - Wife: Disbelieving wife, Sons: Sam, Ham, Yafith, and Yam (drowned).
    - Events: 950 Years of Calling, Construction of the Ark, The Great Deluge, Ark Landing on Judi.
  - Prophet Yusuf:
    - Father: Yaqub, Mother: Rahil, Brother: Binyamin, 10 half-brothers.
    - Events: Dream of the Sun & Stars, The Well, Palace of Aziz, Prison & Dream Interpretation, Governor of Egypt's Granaries, Reunion with Parents and Brothers.
  - Prophet Dawud & Sulayman:
    - Slaying Goliath, Psalms (Zabur), Softening Iron, Judgment of Disputants, Wisdom of Birds & Ants, Subjugation of Winds and Jinn, Queen of Sheba's Throne.
  - Prophet Adam:
    - Creation from Clay, Teaching of All Names, Angellic Prostration, Hawwa and the Garden, Earthly Descent, First Sacrifice.

- [ ] **Step 2: Add extended family member nodes and links**
  - Add nodes: `hawwa`, `sarah`, `hajar`, `aminah`, `abdullah`, `khadijah`, `aisha`, `fatimah`, `safura`, `binyamin`, `sam`, `ham`, `yafith`.
  - Add corresponding links in `links.ts` so all nodes connect coherently into the genealogical tree.

- [ ] **Step 3: Run `npm test` to verify dataset integrity**
  - Ensure all 8 data tests in `data.test.ts` pass with zero failures.

---

### Task 3: Interactive Family Tree with Dynamic Family Toggles & Celestial Animations
**Files:**
- Modify: `src/lib/layout.ts`
- Modify: `src/components/Tree.tsx`
- Modify: `src/index.css`
- Test: `src/lib/lib.test.ts`
- Test: `src/App.test.tsx`

- [ ] **Step 1: Enhance `buildLayout` in `layout.ts`**
  - Accept expanded options: `{ showFamily?: boolean; showSpouses?: boolean; showChildren?: boolean; horizontal?: boolean; rtl?: boolean }`.
  - Position spouse nodes adjacent to their husbands and child branches clustered gracefully.
  - Return distinct node kinds and styling metadata.

- [ ] **Step 2: Upgrade `Tree.tsx` with filter toolbar, glow animations, and lineage energy flow**
  - Add filter pills:
    - [الكل (All)]
    - [الأنبياء (Prophets)]
    - [الزوجات (Wives / Spouses)]
    - [الأبناء (Children)]
    - [الآباء والأقارب (Extended Kinship)]
  - Add visual node styling:
    - Golden halo & pulse for Prophets
    - Emerald / rose ethereal rings for Spouses
    - Cyan / sapphire constellation dots for Children
    - Warm bronze rings for Ancestors & Kin
  - Add animated energy beam along selected lineage path (SVG animated stroke-dashoffset).
  - Add interactive side card / quick preview drawer upon clicking a node with:
    - Father, Mother, Brothers, Wives, Children, Lifespan/Dates, and Quick Event badges.

- [ ] **Step 3: Run `npm test` to verify layout and component rendering**

---

### Task 4: Dual Timeline (Hijri & Gregorian) with Era Navigation
**Files:**
- Modify: `src/components/Timeline.tsx`
- Modify: `src/i18n/strings.ts`
- Test: `src/App.test.tsx`

- [ ] **Step 1: Enhance `Timeline.tsx` with Dual-scale switcher and era groups**
  - Add timeline mode selector: `Hijri (BH/AH)` | `Gregorian (BCE/CE)` | `Dual Synchronized`.
  - Implement era segments:
    - 1. Dawn of Humanity (بداية البشرية)
    - 2. The Ancient Arabian Prophets (الأنبياء العرب القدماء)
    - 3. The Patriarchal Era (عصر الآباء وإبراهيم الخليل)
    - 4. The Mosaic & Exodus Era (عصر موسى والخروج)
    - 5. The Royal Israelite Prophets (عصر الملوك وأنprophets بني إسرائيل)
    - 6. The Messianic Transition (عصر عيسى ابن مريم والتبشير)
    - 7. The Final Prophetic Mission (عصر الرسالة المحمدية الخاتمة)
  - Display key milestone events on cards with animated pulse indicators and Qur'anic references.
  - Display birth and death dates formatted in both Hijri and BCE/CE.

- [ ] **Step 2: Add interactive scrubber / era jump controls**
  - Quick jump buttons for each era that smoothly scroll or filter the view.

- [ ] **Step 3: Run `npm test` and verify Timeline tests pass**

---

### Task 5: Person Profile Detail & Life Events Section
**Files:**
- Modify: `src/components/Person.tsx`
- Modify: `src/i18n/strings.ts`

- [ ] **Step 1: Add Parents, Siblings, Spouses, and Children sections in `Person.tsx`**
  - Render parents card (Father & Mother) with direct jump links if they exist as nodes in the tree.
  - Render siblings section.
  - Render spouses section with names, marriage details, and Qur'an/Hadith references.
  - Render children section with details.
  - Render dates card (Born & Died in Hijri BH/AH and BCE/CE).

- [ ] **Step 2: Add Life Milestones / Events Timeline section**
  - Render a vertical/horizontal interactive event trail for each prophet detailing their key historical events (e.g. Call, Miracles, Migration, Passing).

- [ ] **Step 3: Run `npm test` and `npm run typecheck`**

---

### Task 6: Repository Governance & Automated Wiki Sync with Chef PAT
**Files:**
- Create: `.github/CODEOWNERS`
- Create: `.github/workflows/wiki-sync.yml`
- Update: `README.md`
- Update: `prophets-family-tree.wiki` documentation files (`Home.md`, `1-Architecture.md`, `2-Roadmap.md`)
- Update GitHub repository settings/topics via GitHub API using Chef PAT

- [ ] **Step 1: Create repository governance and CODEOWNERS files**
  - Add `.github/CODEOWNERS` referencing `@Bosaj`.
  - Verify issue templates and PR templates.

- [ ] **Step 2: Create automated wiki sync GitHub Action**
  - Create `.github/workflows/wiki-sync.yml` that automatically mirrors wiki files from `wiki/` directory to the `prophets-family-tree.wiki.git` repository on push to `main`.
  - Maintain a mirrored copy in `prophets-family-tree/wiki/` so documentation is tracked in git.

- [ ] **Step 3: Update wiki repository in `C:\Users\ROG FLOW\Desktop\Projects\Github_Projects\prophets-family-tree.wiki`**
  - Update `Home.md`, `1-Architecture.md`, `2-Roadmap.md` to reflect the expanded family tree, dual timeline, and new capabilities.
  - Commit and push to `prophets-family-tree.wiki` via git using the authenticated remote.

- [ ] **Step 4: Update GitHub repo rules/topics using GitHub API with Chef PAT**
  - Set topics, description, and repository metadata via GitHub API.

---

### Task 7: Comprehensive Verification & Build
**Files:**
- Run: `npm test`
- Run: `npm run typecheck`
- Run: `npm run build`
- Run: `git status`

- [ ] **Step 1: Execute full test suite and type check**
- [ ] **Step 2: Execute Vite production build**
- [ ] **Step 3: Commit and push changes to git origin**
