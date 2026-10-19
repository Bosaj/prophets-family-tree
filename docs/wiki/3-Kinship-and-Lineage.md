# Kinship & Household Data Model

This document specifies the genealogical taxonomy, extended kinship structures, and scholarly sourcing rules in **Shajara**.

---

## 👨‍👩‍👧‍👦 Extended Kinship Categories

In addition to the 25 Prophets named in the Qur'an, the graph incorporates family members essential to understanding their households, sacrifices, and continuity of lineage:

### 1. Wives & Spouses (`kind: 'spouse'`)
- **Hawwa (Eve):** Created as Adam's mate and companion, mother of humankind (`4:1`, `7:189`, `bukhari:3330`).
- **Sarah:** Righteous wife of Ibrahim, rejoiced at the news of Ishaq and Yaqub (`11:71`, `bukhari:3358`).
- **Hajar (Hagar):** Wife of Ibrahim, mother of Ismail who ran between Safa and Marwah (`14:37`, `bukhari:3364`).
- **Safura (Zipporah):** Wife of Musa, daughter of the righteous elder of Madyan (`28:25-28`).
- **Khadijah bint Khuwaylid:** First to believe, devoted wife of Muhammad ﷺ for 25 years, mother of his children (`bukhari:3818`).
- **‘A’ishah bint Abi Bakr:** Mother of the Believers, scholar of the companions, narrator of over two thousand hadiths (`bukhari:3818`).

### 2. Children (`kind: 'child'`)
- **Qabil & Habil (Cain & Abel):** Sons of Adam whose sacrifices and confrontation are recorded in Surah al-Ma'idah (`5:27-31`).
- **Shith (Seth):** Righteous son of Adam from whom later prophetic generations descended (`book:qisas`).
- **Sam, Ham, Yafith (Shem, Ham, Japheth):** The surviving sons of Nuh aboard the Ark (`37:77`, `tirmidhi:3230`).
- **Yam (Canaan):** The son of Nuh who refused to board the Ark and drowned (`11:42-43`).
- **Fatimah al-Zahra:** Beloved daughter of Muhammad ﷺ and Khadijah, mother of al-Hasan and al-Husayn (`bukhari:3714`).

### 3. Siblings & Ancestors (`kind: 'family'`)
- **Binyamin (Benjamin):** Full brother of Yusuf, beloved son of Yaqub (`12:59`, `12:69-79`).
- **Harun (Aaron):** Brother and vizier of Musa, prophet of the Children of Israel (`20:29-32`).
- **Azar / Terah:** Father of Ibrahim named in the Qur'an (`6:74`).
- **Imran:** Father of Maryam, pious patriarch of the family of Imran (`3:33-36`).
- **Maryam (Mary):** Mother of ‘Isa, chosen above the women of the worlds (`3:42`, `19:16-34`).

---

## 🔍 Sourcing & Authenticity Rules

Every node and relationship link in the graph must satisfy the 4-tier evidentiary rules:

| Level | Identifier | Criteria | Example Citation |
| :--- | :--- | :--- | :--- |
| **Qur'an** | `'quran'` | Explicitly named or described in the Qur'an | `4:1`, `11:42-43`, `28:27` |
| **Hadith** | `'hadith'` | Sahih or Hasan narrations in canonical Hadith collections | `bukhari:3818`, `bukhari:3364` |
| **Tradition** | `'tradition'` | Classical historical consensus (Ibn Kathir, Al-Tabari) | `book:qisas`, `book:sira` |
| **Disputed** | `'disputed'` | Conflicting reports or external historian estimates | `book:historians` |
