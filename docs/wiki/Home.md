# Welcome to Shajara (شجرة الأنبياء) · Interactive Prophets Family Tree Wiki

Welcome to the official documentation for **Shajara** (`@Bosaj/prophets-family-tree`), an open-source, interactive genealogical, geographic, and natural history visualization of the 25 Prophets named in the Holy Qur'an, their sacred lineages, migrations, and cosmic environments.

**Live Deployment (GitHub Pages):** [https://bosaj.github.io/prophets-family-tree/](https://bosaj.github.io/prophets-family-tree/)  
**Mirror (Vercel):** [https://shajara-prophets.vercel.app](https://shajara-prophets.vercel.app)

---

## 🌟 Key Features

1. **Complete Quranic Lineage & Kinship (`/tree`):**
   - 25 Prophets named in the Qur'an from Adam (peace be upon him) to Muhammad ﷺ.
   - Extended family graph: Spouses (Ummahat al-Mu'minin, Sarah, Hajar, Safura, Hawwa), children (Qabil, Habil, Shith, Sam, Ham, Yafith, Yam, Ismail, Ishaq, Yaqub, Yusuf, Binyamin, Fatimah, etc.), siblings, and ancestors.
   - Interactive family filters allowing viewers to isolate Prophets, reveal Spouses, display all Children, or explore the entire extended family network.
   - Interactive Relational Legend & Highlighting: Bidirectional highlighting between canvas edges and the interactive legend (parent, descendant, marriage, sibling, cousin, guardian).

2. **Pre-Adamic Realm & Iblis:**
   - Autonomous floating celestial realm positioned above Adam documenting earlier earthly creations (Jinn, Iblis / Satan, Hinn, Binn, Nasnas) cited in classical Islamic scholarship (Ibn Kathir, Al-Hasan al-Basri) and the Qur'an (18:50, 38:76, 2:34).
   - Strictly decoupled from Adam's lineage, reflecting orthodox Islamic theology that Adam was created directly from clay without ancestors.

3. **Topography Map & Prophetic Routes (`/map`):**
   - Interactive 3D Leaflet historical topography maps tracing migration routes, sanctuaries, and waypoints across the Hijaz, Levant, Egypt, and Mesopotamia with elevation layers.

4. **Prophetic Nature, Flora & Fauna (`/nature`):**
   - Showcase of 29 animals, plants, and foods cited in the Qur'an and Sunnah (hoopoe, whale, camel, bee, ant, olive, fig, date palm, pomegranate, black seed, talbinah, etc.) with detailed nutritional/healing benefits, zoological classifications, and scriptural occurrences.
   - Celestial Sun, Moon, Dunes & Cloud Theater: Real-time dynamic solar altitude calculations, astronomical moon tracking with craters, drifting atmospheric clouds, and wind-carved desert dunes.

5. **Dual Synchronized Timeline (`/timeline`):**
   - **Hijri (BH / AH):** Calculated prophetic chronology anchored in classical Islamic historiography.
   - **Historical (BCE / CE):** Historians' comparative chronological estimates.
   - **Qur'anic Anchors:** Strict scriptural anchor verses (e.g., 7:69, 7:74, 40:34, 2:246, 5:46, 33:40) that fix sequence and contemporaries.

6. **Authenticity & Source-Level Integrity:**
   - Strict 4-tier evidentiary classification:
     - 🟢 **Qur'an:** Explicit scriptural text with live Uthmani script loading from the Al Quran Cloud API and Mishary Alafasy audio recitation.
     - 🔵 **Hadith:** Verified authentic narrations linked to Sunnah.com.
     - 🟡 **Tradition (Sira / Qisas):** Classical scholarly historiography (Ibn Kathir, Al-Tabari).
     - 🟣 **Disputed / Historians:** Comparative chronology and external estimates clearly noted.
   - Zero human depictions of any prophet: Respecting Islamic theology, representations strictly use celestial geometry, calligraphy, and atmospheric landscape scenes.

7. **Trilingual Parity:**
   - Full native support for Arabic (العربية), English, and French (Français) across every profile, event, kinship link, and citation.

---

## 📚 Documentation Navigation

* **[Architecture & System Design](1-Architecture)** — Component structure, layout graph algorithm, API integration, and rendering pipeline.
* **[Roadmap & Milestones](2-Roadmap)** — Evolution from initial dataset to full interactive genealogical engine and future phases.
* **[Kinship & Household Model](3-Kinship-and-Lineage)** — Deep dive into the family graph, spouses, children, siblings, and theological rules.
* **[Dual Timeline & Chronology](4-Dual-Timeline)** — Mathematical alignment of Hijri and BCE/CE timelines and Qur'anic chronological anchors.
* **[Developer Setup & Contribution](Developer-Setup)** — Local environment setup, test execution, automated source verifications, and CI/CD pipelines.

---

## 🛡️ Governance & Principles

- **Deterministic Verification:** Every Qur'an and Hadith reference is continuously checked against upstream API sources using automated CI scripts (`scripts/verify-sources.mjs`).
- **Scholarship First:** Content changes must cite authoritative sources. No unverified folkloric claims are merged into canonical profiles.
- **Open Collaboration:** Maintained with excellence by [Oussama EL HADJI](https://www.linkedin.com/in/oussama-elhadji/) ([@Bosaj](https://github.com/Bosaj)).
