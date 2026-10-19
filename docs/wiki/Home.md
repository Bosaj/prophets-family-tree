# Welcome to Shajara (شجرة الأنبياء) · Interactive Prophets Family Tree Wiki

Welcome to the official documentation for **Shajara** (`@Bosaj/prophets-family-tree`), an open-source, interactive genealogical and historical visualization of the 25 Prophets named in the Holy Qur'an, their extended households, and sacred lineages.

---

## 🌟 Key Features

1. **Complete Quranic Lineage & Kinship:**
   - 25 Prophets named in the Qur'an from Adam (peace be upon him) to Muhammad ﷺ.
   - Extended family graph: Spouses (Hawwa, Sarah, Hajar, Safura, Khadijah, Aisha), children (Qabil, Habil, Shith, Sam, Ham, Yafith, Yam, Ismail, Ishaq, Yaqub, Yusuf, Binyamin, Fatimah), siblings, and ancestors.
   - Interactive family filters allowing viewers to isolate Prophets, reveal Spouses, display all Children, or explore the entire extended family network.

2. **Dual Synchronized Timeline:**
   - **Hijri (BH / AH):** Calculated prophetic chronology anchored in classical Islamic historiography.
   - **Historical (BCE / CE):** Historians' comparative archaeological and chronological estimates.
   - **Qur'anic Anchors:** Strict scriptural anchor verses (e.g., 7:69, 7:74, 40:34, 2:246, 5:46, 33:40) that fix sequence and contemporaries.
   - Seven thematic eras: *Dawn of Humankind*, *Ancient Arab Prophets*, *The Patriarchal Era*, *Exodus & Prophethood*, *Kingdom of Israel*, *The Messianic Dawn*, and *The Seal of Prophecy*.

3. **Authenticity & Source-Level Integrity:**
   - Strict 4-tier evidentiary classification:
     - 🟢 **Qur'an:** Explicit scriptural text with live Uthmani script loading from the Al Quran Cloud API and Mishary Alafasy audio recitation.
     - 🔵 **Hadith:** Verified authentic narrations linked to Sunnah.com.
     - 🟡 **Tradition (Sira / Qisas):** Classical scholarly historiography (Ibn Kathir, Al-Tabari).
     - 🟣 **Disputed / Historians:** Comparative chronology and external estimates clearly noted.
   - Zero human depictions of any prophet: Respecting Islamic theology, representations strictly use celestial geometry, calligraphy, and atmospheric landscape scenes.

4. **Trilingual Parity:**
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
- **Open Collaboration:** Maintained with excellence by [@Bosaj](https://github.com/Bosaj).
