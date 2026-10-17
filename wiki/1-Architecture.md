# 1. Architecture

- **Data** — `src/data/people.ts` (people, every fact with a level and refs), `src/data/links.ts` (relationships), `src/data/sources.ts` (ref parsing, labels, quran.com / sunnah.com links).
- **Verification** — `scripts/verify-sources.mjs` loads the Saheeh International translation and the hadith texts (fawazahmed0/hadith-api) and checks every reference. CI job `sources`.
- **Tree** — `src/lib/layout.ts` builds a d3-hierarchy layout from the first parent link of each person; arcs draw sibling, cousin and guardian links. `src/components/Tree.tsx` renders SVG with pointer pan, wheel and pinch zoom.
- **Verses** — `src/lib/quran.ts` fetches `api.alquran.cloud/v1/surah/{s}/editions/quran-uthmani,{translation}?offset&limit`; recitation from `cdn.islamic.network` (ar.alafasy).
- **UI** — React 19, Tailwind 4, own router (`src/lib/router.ts`), i18n ar/fr/en with RTL (`src/i18n`).
- **Scenes** — generated landscapes (Higgsfield z_image), encoded by `scripts/images.mjs`; never a depiction of a prophet.

## Source levels
| Level | Meaning |
|---|---|
| quran | Stated in the Qur'an |
| hadith | Authentic hadith or established sira |
| tradition | Scholars, historians, Biblical account |
| disputed | Scholars disagree / uncertain |
