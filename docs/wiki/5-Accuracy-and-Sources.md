# Accuracy & sources

Accuracy is the product. Every fact, relationship and quotation carries a **source level**, and two automated checks run in CI on every push.

## Source levels
| Level | Meaning |
|---|---|
| 🟢 **Qur'an** | Stated in the Qur'an; the reference cites surah:verse |
| 🔵 **Hadith** | An authentic narration, cited by collection and number |
| 🟡 **Tradition** | Classical historians and exegetes (Ibn Kathir, al-Tabari…) |
| 🟣 **Disputed** | Scholarly disagreement, weak chains or uncertain chronology |

## Rules
1. A source level is never upgraded. Weak reports are shown with their real grade (for example "city of knowledge", carrying the Khaybar gate).
2. The Qur'an brackets ﴿ ﴾ are reserved for text of the Mushaf. Hadith wording uses « ».
3. Verses in the Qur'an sheet stream live from the Al Quran Cloud API; any verse typed in the data must match the Mushaf letter for letter.
4. No images or figures of the Prophets. Heights the texts do not give are marked *illustrative* and drawn as pillars.
5. Linking a verse to a scientific discovery is presented as an interpretation, with the paper's DOI, never as proof.
6. Every photo is credited: Wikimedia Commons author and licence, or "generated for Shajara".
7. Arabic hadith texts are never typed: they are copied from the hadith API with an anchor-based extractor and checked word by word in CI. Collections other than al-Bukhari and Muslim show their grade (for example “Hasan sahih (al-Albani)”).
8. A weak report is never called sahih. Example: the long hadith of Abu Dharr in Ibn Hibban (#361) about the 104 books and the scrolls of Ibrahim, Idris and Shith is marked very weak, with the reason (Ibrahim ibn Hisham al-Ghassani in its chain).
9. Names and details that come only from later reports are attributed to them (the name Ridwan, Musa’s father-in-law as Shu‘ayb, the cave spider, Nuh’s son Yam).
10. Health claims say what the hadith says and what studies show, never “proven” or “cures”; scientific links are “a reading of modern authors” and may be disputed.
11. Where the four schools differ on how to pray or fast, the page gives the Maliki practice followed in Morocco and says the others are valid.

**Outside books and PDFs** (sira books, du‘a booklets) are used as checklists only: every text shown comes from the Qur’an or the hadith collection it cites, author-composed du‘as are not shown as the Prophet’s, and a book’s own prose is not copied.

## Automated checks
| Command | What it checks |
|---|---|
| `npm run verify:sources` | The people and links datasets against Qur'an and Hadith sources |
| `npm run audit:content` | Every dataset (nature, science, angels, stature, sahaba, scriptures): 544 Qur'an references, 43 typed verses and 161 ﴿ ﴾ quotations against the Mushaf (`quran-simple-clean`), 213 hadith numbers in their collections (fawazahmed0/hadith-api; Sahih Muslim by Abd al-Baqi numbering), 23 DOIs via `doi.org` |
| `npm run verify:duas` | Every Arabic supplication and quote (duas and their etiquette, the day guide, the Hour, the Hijri calendar, the prayer and the other prayers, fasting, the hadith page): 233 texts found word for word in the hadith they cite; every reference exists; Abu Dawud, al-Tirmidhi, al-Nasa’i and Ibn Majah entries carry a grade |
| `npm run audit:layout` | Every page (87 per language, with the opened tabs, cards and dialogs) on a 375-pixel phone in the four languages: no overlap, no text off screen or cut, no unnamed button, nothing left in English. Runs as the `layout` job (about 14 minutes) |
| `npm run credits:photos` | Traces each nature photo to its Commons file, author and licence by matching the image bytes |

`audit:content` fails the build on a missing reference, a mistyped verse, a ﴿ ﴾ quotation that is not in the Mushaf, or a DOI that does not resolve. Paraphrased hadith wording only produces "review" lines. Requests are retried, and a server that stays unreachable is a warning, not a failure. About 33 references (Musnad Ahmad, al-Tabarani, tafsir works, biographical dictionaries) cannot be checked automatically and are reviewed by hand. The “review” lines (28 on 2026-11-15) were read one by one: most are summaries that join several hadith or paraphrase them; the ones that were wrong were corrected in v2.10.2.

## Report a mistake
[Open an accuracy issue](https://github.com/Bosaj/prophets-family-tree/issues/new?labels=accuracy) with a primary source citation.
