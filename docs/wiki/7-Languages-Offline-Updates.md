# Languages, offline and updates

## Four languages
Arabic, English, French and Spanish. Arabic switches the page to right-to-left.
- **Interface text:** `tx(lang, en, fr, ar, es)` for inline text, `src/i18n/strings.ts` for shared keys.
- **Data:** each text is `{ en, fr, ar, es? }`; `pick()` falls back to English when a language is missing.
- **Spanish names** (short fields) are added per page by `src/data/es/*.es.ts`, imported by the page that needs them, so the first page stays small.
- **Spanish long texts** (stories, places, notes: 2,165 texts) live in `src/data/es/long/<dataset>.json`, keyed by `textKey(english)` (`src/lib/textKey.ts`, FNV-1a). They are loaded only when the reader chooses Spanish (`src/i18n/index.tsx`), and the people chunks get theirs as `src/data/people/loader.ts` loads them.
- **When an English text changes**, its Spanish entry must move to the new key; `src/data/es/long/coverage.test.ts` fails if a Spanish entry no longer matches any English text.

## Phones
Every page is checked at 375 pixels wide in the four languages, including the open states: the tree with a person open, the header menus, the place panel and the verse sheet. Popups that open from the header use a fixed position on phones (`fixed inset-x-3`), because a panel anchored to the end of a button runs off the screen in right-to-left Arabic. Chips that hold a long grade wrap (`.chip` in `src/index.css`).

**Automatic check.** `npm run audit:layout` (`scripts/layout-audit.mjs`, Playwright) opens every page of the built site on a 375 × 812 phone in the four languages and fails when text runs off the screen, two floating surfaces overlap, a header popup opens off screen, or a French, Spanish or Arabic page shows a text left in English (names, scientific names and citations are allowed). It covers all 87 pages (main pages, every person, every Holy Book) and, on the main pages, opens one button of each kind to check the opened state. It also fails on text cut by its box, text drawn over other text (line by line; text under a dialog or scrolled out of view is ignored) and buttons with no name. It runs in CI as the `layout` job on every pull request (about 15 minutes); `AUDIT_ROUTES`, `AUDIT_LANGS`, `AUDIT_CLICKS=0` and `AUDIT_URL` narrow a local run (in Git Bash set `MSYS_NO_PATHCONV=1`). Floating controls must stack in one flow container, never at fixed heights that assume one line.

## Qur'an and hadith fonts
Supplication cards and verses use Amiri and Amiri Quran. Inside other texts, `q()` (`src/components/ui.tsx`) wraps Arabic Qur'an quotes (﴿…﴾) and Arabic hadith quotes («…», three words or more) in those fonts; components render data texts as `{q(pick(text))}`.

## Offline
The service worker (vite-plugin-pwa / Workbox) precaches the app, the fonts and the data on the first visit. After that, the site opens without internet: prayer times, the Hijri date and the supplications are computed in the browser. A notice says when the saved copy is shown, and the first visit says when the site is ready offline. Images, the Qur'an audio and the Turkish Diyanet date need the network.

## How readers get a new version
Before v2.10.0 a new version waited until every tab of the site was closed, so readers stayed on old versions. Since v2.10.0:
1. The worker uses `skipWaiting` and `clientsClaim`: a new version takes over as soon as it is downloaded, also for readers still on an old one.
2. `src/components/UpdatePrompt.tsx` checks for a new version every 30 minutes and whenever the tab comes back.
3. When one is in place, the page reloads into it when the tab is in the background or on the reader's next page change; a bar offers to reload right away.
4. If a page of an old version can no longer load one of its files (a deploy replaced it), the page reloads once instead of failing.
5. `index.html`, `sw.js` and the manifest are served with `max-age=0, must-revalidate` (`vercel.json`); built assets are immutable.

A phone that still runs a version older than v2.10.0 needs one refresh to download the new worker and a second refresh (or closing the tab) to show it.
