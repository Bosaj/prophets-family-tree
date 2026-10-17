# 2. Roadmap

- v0.1 — sourced dataset of the 25 Prophets + relationship graph ✅ (v1.0.0)
- v0.2 — interactive constellation tree + profiles ✅ (v1.0.0)
- v0.3 — timeline view + miracles and stories ✅ (v1.0.0)
- v0.4 — Arabic/French/English, search, share, PWA ✅ (v1.0.0)

## Next
- Review of the dataset by a qualified scholar.
- Share cards per prophet and a printable poster of the tree.
- More family nodes (Hajar, Sarah, Asiya, Khadijah, Fatimah…).
- A light "manuscript" theme.

## Notes for contributors / LLM agents
- No images or depictions of Prophets, ever.
- Every fact needs a `source` level. If a source is not certain, mark it `tradition` or `disputed` — never upgrade it.
- Do not type Qur'an text by hand; fetch it from the API by surah:ayah.
- Add a keyword check in `scripts/verify-sources.mjs` for every new reference.
