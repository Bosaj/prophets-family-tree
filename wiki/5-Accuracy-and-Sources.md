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

## Automated checks
| Command | What it checks |
|---|---|
| `npm run verify:sources` | The people and links datasets against Qur'an and Hadith sources |
| `npm run audit:content` | Every dataset (nature, science, angels, stature, sahaba, scriptures): 544 Qur'an references, 43 typed verses and 161 ﴿ ﴾ quotations against the Mushaf (`quran-simple-clean`), 213 hadith numbers in their collections (fawazahmed0/hadith-api; Sahih Muslim by Abd al-Baqi numbering), 23 DOIs via `doi.org` |
| `npm run credits:photos` | Traces each nature photo to its Commons file, author and licence by matching the image bytes |

`audit:content` fails the build on a missing reference, a mistyped verse, a ﴿ ﴾ quotation that is not in the Mushaf, or a DOI that does not resolve. Paraphrased hadith wording only produces "review" lines. Requests are retried, and a server that stays unreachable is a warning, not a failure. About 39 references (Musnad Ahmad, al-Tabarani, tafsir works) cannot be checked automatically and are reviewed by hand.

## Report a mistake
[Open an accuracy issue](https://github.com/Bosaj/prophets-family-tree/issues/new?labels=accuracy) with a primary source citation.
