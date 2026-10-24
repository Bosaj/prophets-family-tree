# Developer setup & contribution

## Requirements
- Node.js 22+
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
npm test                 # Vitest: pages, data rules, layout collisions (59 tests)
npm run build            # type-check and production build into dist/
npm run verify:sources   # people and links against the Qur'an and Hadith sources
npm run audit:content    # every dataset: Qur'an refs, typed verses, hadith numbers, DOIs
```
See [[Accuracy & sources|5-Accuracy-and-Sources]] for what the audits check.

## Deploy
- **GitHub Pages:** `.github/workflows/deploy.yml` builds with the base path `/prophets-family-tree/` on every push to `main`. Public assets must use `import.meta.env.BASE_URL` (or be imported so Vite rewrites them); an absolute `/img/...` path 404s on Pages.
- **Vercel:** the mirror at <https://shajara-prophets.vercel.app> builds from `main` with the root base path.
- **Wiki:** pages live in `docs/wiki/`; `.github/workflows/wiki-sync.yml` copies them to the GitHub wiki when they change on `main`.

## Contributing
1. Branch from `main`, commit with [Conventional Commits](https://www.conventionalcommits.org/).
2. Every new fact needs a source and a source level; never upgrade a level.
3. New user-visible text goes into Arabic, English and French (`src/i18n/strings.ts`).
4. Releases follow Semantic Versioning: bump `package.json`, add a CHANGELOG entry, tag `vX.Y.Z` and publish the release.
