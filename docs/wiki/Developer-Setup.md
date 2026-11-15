# Developer setup & contribution

## Requirements
- Node.js 24 (the scripts import the TypeScript data files directly)
- Git 2.40+

## Run locally
```bash
git clone https://github.com/Bosaj/prophets-family-tree.git
cd prophets-family-tree
npm install
npm run dev              # http://localhost:5173
```

## Checks (all run in CI)
```bash
npm test                 # Vitest: pages, data rules, layout, fasting days, Spanish keys (104 tests)
npm run build            # type-check and production build into dist/
npm run verify:sources   # people and links against the Qur'an and Hadith sources
npm run audit:content    # every dataset: Qur'an refs, typed verses, hadith numbers, DOIs
npm run verify:duas      # every Arabic supplication and quote against its hadith (network)
```
See [[Accuracy & sources|5-Accuracy-and-Sources]] for what the audits check.

## Deploy
- **GitHub Pages:** `.github/workflows/deploy.yml` builds with the base path `/prophets-family-tree/` on every push to `main`. Public assets must use `import.meta.env.BASE_URL` (or be imported so Vite rewrites them); an absolute `/img/...` path 404s on Pages.
- **Vercel:** the mirror at <https://shajara-prophets.vercel.app> builds from `main` with the root base path.
- **Morocco month check:** `.github/workflows/morocco-month.yml` runs `scripts/check-morocco-month.mjs` every evening and opens an issue when the next month must be added to `MOROCCO_STARTS` (try it with `node scripts/check-morocco-month.mjs --dry --today=2026-12-08`).
- **Wiki:** pages live in `docs/wiki/`; `.github/workflows/wiki-sync.yml` copies them to the GitHub wiki when they change on `main`.

## Contributing
1. Branch from `main`, commit with [Conventional Commits](https://www.conventionalcommits.org/).
2. Every new fact needs a source and a source level; never upgrade a level.
3. New user-visible text goes into Arabic, English, French and Spanish: `tx(lang, en, fr, ar, es)` for interface text, `strings.ts` for shared keys.
4. **Changing an English data text?** Its Spanish version lives in `src/data/es/long/<dataset>.json` under `textKey(english)`. Move the entry to the new key (`src/data/es/long/coverage.test.ts` fails otherwise).
5. Arabic hadith wording is copied from the source, never typed, and added to `scripts/verify-duas.mjs`.
6. Releases follow Semantic Versioning: bump `package.json`, add a CHANGELOG entry, tag `vX.Y.Z` and publish the release.
