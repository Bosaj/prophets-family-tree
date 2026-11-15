# Changelog

All notable changes to this project are documented here. Format: [Keep a Changelog](https://keepachangelog.com/), versioning: [SemVer](https://semver.org/).

## [Unreleased]

## [2.10.2] — 2026-11-15
### Fixed
- **Hadith review.** The 28 references the content audit flags were read one by one against their sources. Most are correct summaries that join or paraphrase several hadith. Corrected:
  - **Israfil:** “his eyes are like glittering stars fixed on the Throne” was stated as fact; it now says this comes from a report in al-Hakim’s Mustadrak, and that the name Israfil comes from reports other than the cited hadith.
  - **Ridwan:** the keeper of Paradise cited “Sahih Muslim (Shafa‘ah)” with no number; it now cites Muslim 197, where the keeper is not named, and says the name Ridwan comes from reports that are not authentic.
  - **Husayn:** “Husayn is a nation among nations” is now translated as “Husayn is a sibt among the asbat”, with its meaning; the French had dropped that sentence.

### Documentation
- **Wiki** brought up to date from v2.4.3: home page, roadmap with every release since v2.5.0, architecture, accuracy rules and checks, developer setup, and two new pages: worship pages (prayer, times, Hijri calendar, fasting reminders, the Moroccan monthly upkeep) and languages, offline and updates.

## [2.10.1] — 2026-11-15
### Fixed
- **Hadith references on the Nature and Science pages** are written in the reader’s language and link to sunnah.com, like the rest of the site (they were bare English labels such as “Bukhari 3320”). Musnad Ahmad has its own label.
- **The speaking wolf**: the citation was one long English sentence. It is now two references: Musnad Ahmad 11792 with its grade (Sahih, al-Albani) and the shorter account in al-Bukhari 3471, quoted from the source.
- **Second accuracy pass** on Nature and Science, in English, French and Arabic: the black seed is no longer a “panacea”; the desert truffle, costus, ginger and the pigeon’s homing range are described by what is reported and studied; the embryology, mountain, iron, pain-receptor and frontal-lobe notes say which links are modern authors’ readings and which are disputed; pain receptors are no longer said to be only in the skin.

## [2.10.0] — 2026-11-15
### Added
- **The prayer** (`/salat`). What the prayer is and its place in Islam, the conditions before it, the ablution step by step, how to pray step by step with a figure for each position, a table of the rak‘ahs of the five prayers (what is recited, aloud or silent, where one sits), what to do when unsure, the Sunnah prayers (the twelve rak‘ahs, Fajr, witr, duha, the night prayer, greeting the mosque, congregation and Friday) and the remembrance after the prayer. 42 hadith texts are copied from their sources and checked (148 in total). Where the schools differ, a note gives the Maliki practice followed in Morocco (hands, raising them, the basmalah, the tashahhud, the salam, sujud al-sahw, qunut, witr).
- **Fasting reminders** on the Hijri page. The next white days, Tasu‘a, ‘Ashura, ‘Arafah, the start of Ramadan and the Eids for your place (Morocco counted from the Ministry’s announcements), and a calendar file (.ics) with an alarm at 20:00 the evening before each day. 13 Dhu al-Hijjah (a day of tashriq) and Ramadan are left out of the white days. The home card shows today’s or tomorrow’s fasting day.
- **Posters, a lighter people dataset and sourced waypoints** (#13, #14, #15, from the owner’s commit on main). The tree and the map download as SVG posters or print to PDF; the people data is split by era and loads per page; archaeological sites carry their sources.
- **Spanish long texts** (#25). 2,165 texts across the prophets, their families and places, nature, the Companions and dynasties, the Holy Books, the righteous, the scientific notes and the pages before Adam, plus the Qur’an verse meanings of the Holy Books page. They load only for Spanish readers. A test fails if a Spanish text no longer matches its English source.
- **Morocco month check.** A daily GitHub Action opens an issue when the next Moroccan month is due, with the evening of the 29th and both possible start dates.

### Changed
- **Holy Books** use the site’s colours (gold, night, ink) instead of their own amber and purple, on the Holy Books page, its window, and the scripture blocks of the tree and the prophet pages.

### Fixed
- **Readers stuck on an old version.** The new service worker took over only after every tab was closed. It now takes over at once (also for readers on the old version). The site checks for a new version every 30 minutes and when you come back to the tab, and reloads into it when the tab is hidden or on your next page change; a bar offers to reload right away. If a page of an old version can no longer load its code, it reloads once. `index.html` and the manifest are always revalidated.
- **Overstated sources.** The long hadith of Abu Dharr in Ibn Hibban (#361) on the scrolls of Ibrahim, Idris and Shith was called sahih; it is now marked very weak, with the reason. Health claims for black seed, desert truffles, talbinah, ginger, pomegranate, ‘ajwa and honey now say what studies show. The cave spider, the speaking wolf, Musa’s father-in-law, Ayyub’s wife and Nuh’s son are attributed to their reports instead of stated as fact.
- **Offline.** A notice says when the saved copy is shown, and the first visit says when the site is ready offline.

## [2.9.0] — 2026-11-15
### Added
- **Your place and time, everywhere.**
  - The site starts from this device’s time zone: the first known city in it, else Rabat. You can change the place from the new clock in the header, or use your location.
  - The header clock shows the local time. Its panel shows the device’s time zone, today’s Hijri date (Morocco’s announced date in Morocco), and the night that begins at Maghrib. It also shows the part of the day and the next prayer.
  - The Times and Hijri pages share the same place, so changing it once changes it everywhere.
- **“Now” on the home page.** The time and city, the Hijri date, the part of the day with its first piece of guidance, and the next prayer. It links to the Times page.
- **Checklist of the signs of the Hour** (`/hour`). The ten small signs are marked as come to pass (5), seen by many scholars today (4) or still to come (1). The ten great signs are listed exactly as Muslim 2901 names them, none come to pass; the smoke is marked as disputed (Ibn Mas‘ud, Bukhari 4821). Each line jumps to its explanation. The page says the marks are the scholars’ reading, not revelation.

### Fixed
- **Sahaba: the “Ten Promised Paradise” filter showed 6.** Abu Bakr, ‘Umar, ‘Uthman and ‘Ali belong to the ten (Tirmidhi 3747), but they are filed as caliphs. The filter, its count and the tree highlight now include them: 10.
- **Empty space.**
  - The Stature detail panel stretched to the height of the list next to it and left a large empty area. It now fits its content and stays in view while the list scrolls.
  - The Hijri month cards had the same problem (up to 586 px empty).
  - A scan of every page found no other case.
- **Hadith book names in the reader’s language.** The Stature page wrote “Sahih al-Bukhari #3551” in English in every language. It now uses the site’s reference chips (البخاري ٣٥٥١, linked to sunnah.com), as does the raw `bukhari:3326` under Adam.
- **Arabic pages with English words.** The Timeline showed English names under the Arabic ones (“Noah”, “Often identified with Enoch”); it now shows only Arabic notes. The Science page’s “DOI link” is translated.
- **Times page Hijri date.** It always showed Umm al-Qura; in Morocco it now shows the Ministry’s announced date, like the Hijri page.
- **Made-up species names.** Buraq (“Celestial Trans-Dimensional Mount”) and the Ababil (“Aves Caelestes”) had invented scientific names. They now have none, since no species is named. English flourishes after real names (“Miraculous Archetype”, “Bright Golden Heifer”…) are removed, and photos use the creature’s name as their description.
- **Spanish.** Added for the Stature page (94 texts) and for the pre-Adam and angel cards (subtitles, nature, era, cautions and roles), plus the home page’s Ulul ‘Azm line.
- **Half the startup download.** The Spanish name lists loaded every dataset (Nature, Scriptures, Sahaba, Stories, pre-Adam) on the first page. Each list now loads with its own page. The prayer engine and the day guide load only when the clock panel or the home card needs them. The main bundle went from 1,183 KB to 586 KB.

### Checked
- Accessibility scan of 18 pages: no button, link, image or field without a name.
- All 45 internal links resolve.
- Tests: 89/89 pass. `verify:duas`, `verify:sources` and `audit:content` pass, with no missing references.

## [2.8.0] — 2026-11-13
### Added
- **The Hijri calendar (`/hijri`)**, in four languages, in the menu and linked from the Hijri date on the Times page:
  - **Today, live, where you are.** The Hijri date for the chosen city and its Gregorian date. The page shows when the Hijri day changes: the night comes before its day, so tonight’s Maghrib (computed for the city) begins the next date.
  - **Today, by country.**
    - Saudi Arabia uses the Umm al-Qura calendar, its official one.
    - Morocco is counted from the Ministry of Habous announcements: 1 Jumada al-Akhirah 1448 = 11 November 2026, and Bulletin officiel 7556 for Jumada al-Ula. Day 30 is shown as awaiting the announcement.
    - Turkey uses the Diyanet calendar, read from the public Aladhan API. When offline, the page shows the astronomical estimate and says so.
    - The same day is also shown by method: Umm al-Qura, astronomical and tabular.
    - A table gives who decides the month in eleven other countries, and how.
  - **How the calendar works:**
    - twelve lunar months (9:36, 2:189, 10:5);
    - year one is the Hijra (Bukhari 3934);
    - a month starts with the crescent, after 29 or 30 days (Bukhari 1909, 1913);
    - the day begins at sunset (Bukhari 1907);
    - the year is 11 days shorter than the solar year;
    - countries differ by a day (Muslim 1087, Kurayb’s hadith), with the scholars’ positions.
  - **The twelve months:** the Arabic names, their meaning according to the lexicographers, and the four sacred months (Bukhari 3197). It shows what the Sunnah says month by month: Muharram and ‘Ashura, “no Safar”, his birth on a Monday, Rajab without invented rites, Sha‘ban, Laylat al-Qadr, six days of Shawwal, his ‘Umrahs in Dhu al-Qa‘dah, and the ten days, ‘Arafah and Tashriq. The current month is highlighted.
  - **Coming up:** the New Year, ‘Ashura, 12 Rabi‘ al-Awwal (with the scholars’ difference on celebrating it), Ramadan, the 27th night, Eid al-Fitr, ‘Arafah and Eid al-Adha, each with its date and a countdown. The dates come from Umm al-Qura, and the page says that each country’s announcement decides.
  - **The two Eids:**
    - what replaced the two days of play (Abu Dawud 1134, sahih);
    - Zakat al-Fitr before the prayer, and dates before going out (Bukhari 1509, 953);
    - the sacrifice (Bukhari 5558, 22:37);
    - changing the road back, and no fasting on Eid (Bukhari 986, 1990).
  - **Three hundred years, and nine more (18:25):**
    - Ibn Kathir’s explanation: 300 solar years are 309 lunar years. A calculator lets you turn any number of solar years into lunar years.
    - Qatada’s other reading, cited by al-Qurtubi and al-Tabari, that the verse reports the People of the Book’s words. The interpretation is labelled as the commentators’ reading, not the verse’s own words.
- All 23 new Arabic hadith quotes were copied from the hadith API and are checked by `verify:duas` (106 texts in all). The date engine (`src/lib/hijri.ts`) has its own tests, including Morocco’s two official dates.
- The Content Security Policy allows `https://api.aladhan.com` for the Diyanet date.

## [2.7.0] — 2026-11-13
### Added
- **The beginning and the end (`/hour`)**, in four languages, in the menu and linked from the Islam page:
  - **The beginning of creation:** Allah before everything and His Throne over the water (Bukhari 3191), the decrees written fifty thousand years before the heavens and the earth (Muslim 2653) and the Pen (Abu Dawud 4700, sahih), the six days (21:30, 41:9-12), angels, jinn and Adam (Muslim 2996), Adam created on a Friday (Muslim 854, Bukhari 3326), the covenant (7:172) and the descent to earth.
  - **The signs of the Hour:** no one knows when (Muslim 8, 7:187), then ten signs, each marked as already happened, seen by many scholars today, or still to come. Among them his own coming (Bukhari 6504), the moon split (Bukhari 3636), the six of Bukhari 3176, the fire of the Hijaz (Bukhari 7118), shepherds competing in tall buildings (Muslim 8), trust lost (Bukhari 59), knowledge lifted (Bukhari 80), earthquakes and killing (Bukhari 1036), and the gold of the Euphrates (Bukhari 7119).
  - **The ten great signs** of Muslim 2901, each with its details: the Mahdi (Abu Dawud 4282, hasan sahih), the Dajjal (Bukhari 7131, Muslim 2937, Bukhari 1881) and the protection from him (Muslim 809, 588), the descent of ‘Isa (Bukhari 3448, Muslim 2937, 156), Gog and Magog, the smoke, the sun rising from the west (Bukhari 4635, Muslim 2703), the beast (Muslim 2941), the collapses and the last fire.
  - **The end of the world and what follows:** the wind that takes the believers (Muslim 2937, 148), the Hour coming suddenly on a Friday (Bukhari 6506), the Trumpet (Bukhari 4935), the world undone (Bukhari 4812), resurrection (Bukhari 4935), the gathering (Bukhari 6527, Muslim 2864, Bukhari 660), the intercession (Bukhari 4712), the pool (Bukhari 6579) and eternity (Bukhari 4730). It closes with “What have you prepared for it?” (Bukhari 3688).
- Where scholars differ, the page says so: whether the Throne or the Pen came first, the report of seven days of creation (Muslim 2789, which al-Bukhari and others traced to Ka‘b al-Ahbar), the order of the great signs, the smoke, the Mahdi and the reading of 43:61.
- `npm run verify:duas` now also checks this page: all 45 Arabic quotes (50 texts with their fragments) are found in the hadith they cite, and every Qur’an and hadith reference exists. 84 texts are checked in all.

### Fixed
- **Every interface text in four languages.** About 250 inline texts (Stature, Nature, both trees, the Sahaba page, Stories, Science, Scriptures, Timeline, Sources, the person page) showed English to Spanish readers, and about 140 of them to French readers too. They now have French and Spanish. Close buttons, map toggles and navigation labels are translated, and the footer has Spanish. The author’s name and its Maghribi font are unchanged.
- **Spanish names everywhere a reader looks first:** 99 data names (animals, plants, the righteous, the Qur’an’s stories, the scriptures, the angels, the pre-Adam entries and the Sahaba eras) and 152 labels (map places, filters and timeline eras). Headings, buttons and labels on every page now read in Spanish; long descriptions written before 2.5.0 still show in English until they are translated.
- **The jinn card** dated them “2,000 years before Adam” and gave them civilisations, at the Qur’an level. The Qur’an says only that they were created from fire before man (15:27). The card now says so, and it calls the rest a report, with a caution.
- **Supplications and hadith shown in full, never cut with “…”**: the Ta’if supplication (still labelled weak), the six signs of Bukhari 3176, the question about trust (Bukhari 59), and the slaughter of death (Bukhari 4730). The morning wording of the evening remembrance is written out.
- **Before Adam, honestly.** The Tree’s pre-Adam text said, in Arabic, that the Qur’an and sahih Sunnah document Hinn, Binn and Nasnas, and the Nasnas card said they “correlate with” fossil hominids. Both now say what the sources support: the jinn were created before Adam (15:27); the Hinn, Binn and Nasnas are reports from chronicles, lexicons and the Isra’iliyyat, not established. The “paleontological link” line is gone.
- **Panels that rendered see-through.** Three colours used across the site (`night-1`, `night-surface`, `ink-1`) were never defined, so the header menus, the person page cards, the modal headers and the Sahaba card had no background. They are now defined in the theme.
- **Both trees fit every screen.**
  - The Sahaba tree raised its zoom to a minimum but centred with the zoom before that, so on a phone it opened shifted to one side, with only 20 of 41 figures in view.
  - The prophets tree stopped zooming out before the whole tree fitted a phone.
  - "Fit" now shows every figure on phone (375 and 414 px), tablet (768) and laptop (1280): 41/41 and 59/59.
- **Mouse-wheel zoom on the Sahaba tree** no longer scrolls the page behind it. It called `preventDefault` inside a passive listener, which the browser ignores and reports as an error.
- **Phone, tablet and laptop check:** 8 pages × 3 widths × Arabic and Spanish (48 loads) with no sideways scroll, no control off-screen and no error.
- **One style for every dialog.** The Sahaba card uses the site’s gold-edged glass panel like the other dialogs. It is announced as a dialog, and it closes with Escape, as do the Nature card and the pre-Adam window.

## [2.6.1] — 2026-11-13
### Fixed
- **Relation names no longer cover the trees.** On both trees, each name is moved along its own line, or just beside it, until it covers no node (orb, Arabic name, Latin name, date pill) and no other name. A name with no free place stays hidden until you zoom in; the names of the selected person's lines are always shown. Checked in the browser at every zoom step: 0 names over a node, 0 names over another name.
- **One look for both trees.** The Prophets tree and the Sahaba tree draw relation names with the same component: same pill, font and size on screen, edged with the line's colour and gold for the selected person.
- **Dates checked again.** Fatimah died in Ramadan 11 AH, six months after the Prophet ﷺ (Bukhari), not on 3 Jumada al-Akhirah. Al-Hasan died in 49 or 50 AH. Sa'd ibn Abi Waqqas was born c. 27 BH (he became Muslim at 17), Sa'id ibn Zayd c. 22 BH, Hamzah c. 56 BH (two to four years before the Prophet ﷺ). Salman's year of birth is unknown and is no longer shown. Imam Muslim was born in 204 or 206 AH, Umar ibn Abd al-Aziz in 61 or 63 AH, and Idris I died in 175 or 177 AH. Arabic dates read right to left, and 'or', 'c.' and Ramadan are translated in Arabic, French and Spanish.
- **Prophetic praise, graded.** Salman's card quoted «Salman is of us, the Household», which has a weak chain; it now quotes Bukhari 4897 and Muslim 2546 («Even if faith were at the Pleiades...») and says the other one is weak. Abd al-Rahman ibn Awf's card quoted a saying whose source (Musnad Ahmad 18151) could not be checked; it now quotes Tirmidhi 3747 and Muslim 274. Sa'd's second sentence is now Tirmidhi 3751's own wording, Uthman's second hadith points to Tirmidhi 3701 (hasan), not 3700 (weak), and Hamzah's hadith keeps only the words al-Albani graded hasan. The Constantinople hadith on Mehmed II's card now says its chain is disputed (al-Hakim and adh-Dhahabi: sound; al-Albani: weak).
- The praise heading and the Sahaba tree's zoom buttons are translated in all four languages.

## [2.6.0] — 2026-11-07
### Added
- **Nine more animals of the Qur’an**: camels (88:17), the donkey (2:259, 62:5, 31:19), locusts and frogs (7:133), quails (2:57), the fly (22:73), moths (101:4), sheep (21:78, and every prophet herded them, Bukhari 2262) and the snake of Musa’s staff (20:20).
- **Six more plants**: grapes (13:4), the mustard seed (31:16, 21:47), ears of grain (2:261, 12:47), the vegetables of 2:61 (herbs, cucumbers, garlic or wheat, lentils, onions), fragrant plants (55:12) and camphor (76:5).
- Each one has its verses, any hadith checked against its text (Bukhari 1253, 2262, 2731, 3303, 3320, 5495, 6483, 855; Muslim 2253; Abu Dawud 5269, sahih), a drawing, a credited Wikimedia Commons photo, and why it is mentioned, in four languages.
- A “Reptiles & Amphibians” filter.

### Fixed
- Phones: several pages were wider than a phone screen and could be pushed sideways: the Nature category and tab bars, the Sahaba view switcher, the Stories tabs and virtue chips, the Timeline switcher, a Stature title chip, and the remembrance cards on the Times page. All 15 pages now fit a 340 px screen in all four languages.

## [2.5.0] — 2026-11-06
### Added
- **Supplications of the Prophet ﷺ (`/duas`)**: what he said at moments of his life, from Makkah (‘Umar’s Islam, Ta’if) through the Hijra, Badr, the Trench and the conquest of Makkah to his last words, and what he said in hardship. Each Arabic text is copied from the hadith it cites.
- **Prayer times and the day (`/times`)**: today’s times for 16 cities or the reader’s location (the `adhan` library, MIT). In Morocco the method follows the Ministry of Habous (Fajr 19°, ‘Isha 17°, Dhuhr +5 min, ‘Asr +1, Maghrib +5); it matches the Ministry’s Rabat table of 1–6 November 2026 to the minute, ‘Asr within one minute. A sun arc, the next prayer, the Hijri date, and a guide for each part of the day and night (the last third of the night, the adhan, Fajr to sunrise, Duha, the forbidden times, Dhuhr, ‘Asr, dusk, Maghrib, ‘Isha, before sleep, on waking, Friday) with the morning, evening and bedtime remembrances and a tap counter.
- **What is Islam? (`/islam`)** for readers who are not Muslim: one God, the prophets, why we exist, no compulsion in religion, the five pillars (what and why), the six articles of faith, ihsan, and four common questions.
- **Companions’ stories**: the Sahaba card has a “Read the story” button with the story of 18 Companions and members of the Prophet’s household, the trials they faced and what they gave up, each point sourced.
- **Stories of the righteous, step by step**: Maryam, Asiya, Luqman, al-Khidr, Dhul-Qarnayn, Talut, the People of the Cave, the believer of Ya-Sin, the believer of Pharaoh’s family and Yusha‘ ibn Nun, each step with its verses or hadith.
- **Why each animal is mentioned**: every animal’s sheet gives the lesson the Qur’an or the Sunnah draws from it, with its source and level.
- **Spanish**: the interface, every page above, the source and level names, the Qur’an translation (Julio Cortés), and the names, titles, missions and stories of the prophets and their close family. Older long texts show in English until they are translated.
- `npm run verify:duas` (also in CI): all 34 Arabic supplications are found in the hadith they cite, the grades of the Sunan are listed, and every Qur’an and hadith reference of the new pages exists.

### Fixed
- Nature: the mosquito (2:26) had no photo and fell back to the date-palm drawing. It now has its own drawing and a public-domain photo (CDC, James Gathany), and an organism without a drawing no longer borrows another one.
- Dark map: CARTO’s dark tiles now require an API key and showed “API KEY REQUIRED” on every tile. The dark style uses Esri’s Dark Gray Canvas, which needs none. The map style buttons are translated.

### Fixed — accuracy
- Prophets’ tree: the Ibrahim–Lut line was drawn and highlighted as a parent line, so Lut looked like Ibrahim’s son. Lut is his nephew (Qur’an 29:26 and the tradition); the line now has its own kind, colour and legend entry, and every line names its relation (son, daughter, wife, nephew, descendant, brothers, maternal cousins, guardian, possibly his son).
- Sahaba tree: every line names its relation in four languages, with the full relation in the figure’s card. The Ottomans were drawn as heirs of Mu‘awiyah; the line now says that the caliphate title passed to them from the Abbasids in 1517. Mohammed VI is Mohammed V’s grandson (son of Hassan II), not his successor “line”. Al-Mansur descends from the Prophet’s uncle al-‘Abbas, not from the Prophet. Al-Hasan’s cession of the caliphate to Mu‘awiyah (41 AH) is shown.
- The well-known Ta’if supplication (“O Allah, to You I complain of my weakness…”) is shown with its weak chain (al-Albani, al-Silsila al-Da‘ifa 2933), next to the authentic Ta’if words in al-Bukhari 3231.

### Changed
- Stature: the height pillars are now a faceless pictogram, drawn like the figure on a road sign (round head, rounded body and limbs, no face or features), so a height reads as a human scale without portraying anyone.
- Arabic fonts: Arabic in serif, monospace and SVG labels fell back to Windows system fonts (Times, Courier, Segoe). Every font stack now ends in Reem Kufi, the site’s Arabic typeface. Qur’an verses keep Amiri Quran everywhere (also when quoted inside a sentence, between ﴿ ﴾), quoted hadith and the supplications keep Amiri, and the author’s name keeps Bouazzi Maghribi.
- Nature: the animated sun-and-shadow stage and the moving animals are gone; cards are still and open the animal’s sheet.
- Header: the main pages stay in the bar and the rest move to a “More” menu, so the bar fits at every width.
- References can cite Sunan Abi Dawud, al-Nasa’i and Ibn Majah (sunnah.com numbering).

## [2.4.3] — 2026-10-24
### Fixed
- Map: leaving `/map` while Leaflet was still loading made the tile and marker effects add layers to a map that had already been removed (`Cannot read properties of undefined (reading 'appendChild')`). Both effects now ignore a map that is gone. This also made the GitHub Pages deploy of 2.4.2 fail its test step. Regression test added.

## [2.4.2] — 2026-10-24
### Changed
- The author's Arabic name in the footer (أسامة الحاجي) is set in the Maghribi typeface Bouazzi Maghribi by Mohamed Gallah (MIT). The font is subset to the letters of the name (5.6 KB woff2); licence in `src/assets/fonts/`.

### Fixed
- CI: the content audit retries its requests; only a real 404 counts as a missing reference, and an unreachable server is a warning, so a dropped connection no longer fails the build.

### Docs
- README and wiki updated: accuracy rules and audit numbers, new pages (stature, stories, scriptures, sources), versioning.

## [2.4.1] — 2026-10-24
### Fixed — accuracy
- Wrong or mixed-up hadith numbers corrected after checking each one against its text: Thamud and al-Hijr (Bukhari 3380), the speaking wolf (Bukhari 3471 / Musnad Ahmad), Jibril’s 600 wings and true form (Bukhari 3232, 3234; Muslim 174, 177), Malak al-Mawt (Abu Dawud 4753), Malik the gatekeeper (Bukhari 3239, 3396), Musa’s and ‘Isa’s descriptions (Bukhari 3396, 3394, 3440), the Prophet’s ﷺ description (Bukhari 3551; Tirmidhi 3637–3638), Fatimah (Bukhari 3624), Abu Hurairah (Bukhari 3648), Paradise in Adam’s form (Bukhari 3327).
- Weak reports are no longer presented as authentic: “city of knowledge”, carrying the Khaybar gate, “without Ali Umar would have perished”, doves at Cave Thawr, Mikail never laughing, pearls falling from Jibril’s wings, and the six-hour delay of the left-hand angel are now labelled with their real grade.
- Qur’an quotations typed in the data are checked against the Mushaf: fixed 71:7 and 11:85, split 2:69 and 2:71, and moved two hadith sayings (Muslim 2996, Bukhari 5417) out of Qur’an brackets ﴿﴾.
- The dove is no longer linked to Qur’an 11:44 (the Qur’an does not mention it; Noah’s dove comes from Genesis 8), and the ḥummarah of Abu Dawud 2675 is no longer called a dove.
- Stature: heights for ‘Ad, Thamud and Musa are marked as illustrative (no text gives them), invented BCE dates removed, every portrait’s “height in metres” removed, portraits rewritten from the narrations only, and the unsourced “seven cubits wide” removed.
- Pre-Adamic realm: every entity has a source level; al-Hinn, al-Binn and the Nasnas are labelled as disputed, with an explanation.
- Science page: 7 research DOIs that did not exist replaced by the real papers (all 23 now resolve), and the page presents verse–science links as interpretation (tafsir ‘ilmi), not proof.

### Fixed — media and rights
- The Buraq folk painting (with a human face) replaced by a non-figurative night scene; prophets on the stature stage are drawn as height pillars, never as human figures.
- 27 nature photos traced to their Wikimedia Commons files with author and licence, shown under each photo and listed on the Sources page; the two photos with no traceable source were replaced by generated images.

### Fixed — GitHub Pages
- Scene images and nature photos used absolute paths and returned 404 under `/prophets-family-tree/`; all assets now use the configured base.

### Performance
- Every page is its own chunk: the main bundle dropped from 1.69 MB (561 KB gzip) to 571 KB (189 KB gzip); Leaflet loads only on the map. The service-worker precache dropped from 6.1 MB to 2.3 MB.
- A static splash paints the title instantly; the footer waits with the page so lazy chunks cause no layout shift (CLS 0).
- Public source maps.

### Added
- `npm run audit:content` (runs in CI): checks every Qur’an reference, every ﴿﴾ quotation and typed Arabic verse against the Mushaf, every hadith number against its text, and every DOI.
- `npm run credits:photos`: re-traces photo credits from Wikimedia Commons.
- Tests for the new rules (illustrative heights, disputed entities, photo credits, DOI links).

## [2.4.0] — 2026-10-21
### Fixed
- **Mobile & Phone Display Tree Layout (`horizontal = false`)**:
  - Fully resolved orientation issue where genealogical descent lines turned vertical on phones but spouse/marriage connector lines remained vertically oriented or caused overlapping collisions.
  - Spouses are now arranged along the perpendicular HORIZONTAL axis on the exact same generational tier ($y = husband.y$), side-by-side with their prophet husbands.
  - Hawwa is placed horizontally beside Adam, Hajar and Sarah are placed horizontally beside Ibrahim above their respective sons Ismail and Ishaq, and Safura is placed beside Musa.
  - The wives of Prophet Muhammad ﷺ (Ummahat al-Mu'minin) are aligned along a continuous, elegant horizontal bar on the open flank of the tree, with straight horizontal marriage connector lines and clean vertical descent to the children.
- **Author Attribution**:
  - Author attribution strictly standardized to **"Oussama EL HADJI"** across English, French, and Arabic locales.

### Added
- **Divine Scriptures & Manuscript Traditions Catalog (`/scriptures` & Interactive Modals)**:
  - Comprehensive encyclopedic dataset (`src/data/scriptures.ts`) documenting all revealed divine scriptures:
    - *Al-Qur'an al-Karim* (1 Singular Preserved Text in Rasm Uthmani, the 10 Mutawatir Qira'at, and physical manuscripts from Birmingham, Sana'a, Topkapi, Samarkand, and Tübingen).
    - *At-Tawrat & Tablets* (6 major textual traditions: Masoretic MT, Samaritan Pentateuch with ~6,000 variants, Septuagint LXX, Dead Sea Scrolls, Syriac Peshitta, Aramaic Targums).
    - *Az-Zabur* (5 major textual traditions: Masoretic Tehillim 150 Psalms, Septuagint 151 Psalms, Qumran 11QPs^a, Syriac Peshitta 155 Psalms, Latin Vulgate recensions).
    - *Al-Injeel* (8 major manuscript witnesses: 4 Canonical Gospels in Greek with >500,000 variants, Codex Sinaiticus, Vaticanus, Alexandrinus, Syriac Peshitta, Diatessaron Harmony, Gospel of Barnabas, and Nag Hammadi Gnostic Codices).
    - *Suhuf Ibrahim* (4 historical traditions: Lost Divine Original, Testament of Abraham, Apocalypse of Abraham, and authentic Hadith records in Sahih Ibn Hibban).
    - *Suhuf Idris* (30 scrolls) and *Suhuf Shith* (50 scrolls) attested in Sahih Hadith.
  - **Scripture Book Medallions on the Tree**:
    - Radiant glowing book badges `📖` on prophet tree nodes with pulse aura, tooltip, and version counter badge (`١` for Quran, `6` for Tawrat, `5` for Zabur, `8` for Injeel, etc.).
    - Clicking the medallion directly opens the deep interactive `ScripturesModal`.
  - **Dedicated Full-Page View (`/scriptures`) & Navigation**:
    - Accessible via the top navigation bar, Tree toolbar, and individual prophet biography fact sheets.
    - Includes photorealistic 16:9 still-life images of the holy scriptures adhering strictly to Islamic theological rules (no humans or faces).
    - Islamic comparative analysis explaining the Divine preservation guarantee of the Qur'an vs. the textual pluriformity of earlier scriptures.


## [2.3.0] — 2026-10-20
### Added
- **Interactive Constellation Tree & Chronological Timeline for Sahaba & Caliphs (`/sahaba`)**:
  - Full 2D draggable and zoomable constellation canvas matching the Prophets' constellation tree, with pan/zoom controls (+, -, reset), SVG Bézier connecting lines, and glowing lineage/mentorship tracing.
  - Dedicated Chronological Timeline mode spanning from 53 BH (571 CE) through the Rashidun, Umayyads, Abbasids, and Ottomans down to modern living Prophetic dynasties, with era filter chips and dual Hijri/CE dates.
  - Quick multi-view switcher: Interactive Tree Canvas (`tree`), Chronological Timeline (`timeline`), and Detailed Dossiers Grid (`cards`).
- **Prophet-Level In-Depth Biographies for Hadith Masters**:
  - **Abu Hurairah (أبو هريرة عبد الرحمن بن صخر الدوسي رضي الله عنه)**: Foremost narrator of the prophetic Sunnah (5,374 Hadiths), Miracle of the Spread Cloak (*Bast ar-Rida'*), division of night into prayer thirds, governorship of Bahrain and Madinah, and resting place in Al-Baqi'.
  - **Imam al-Bukhari (الإمام محمد بن إسماعيل البخاري رحمه الله)**: Author of *Sahih al-Bukhari*, restoration of childhood sight through his mother's prayer, 16-year journey gathering 600,000 narrations, Istikharah & ghusl before every recorded Hadith, the famous Baghdad 100-swapped-hadiths test, and burial in Khartank/Samarkand.
  - **Imam Muslim (الإمام مسلم بن الحجاج النيسابوري رحمه الله)**: Author of *Sahih Muslim*, foremost student and champion of Al-Bukhari, thematic Isnad clustering and rigorous methodologies, independence as an ethical silk merchant, foundational *Muqaddimah*, and burial in Nishapur.
  - Comprehensive Prophet-grade dossiers featuring authored books, prominent teachers, foremost disciples, golden maxims & quotes, and milestone timelines across Arabic, English, and French.

## [2.2.0] — 2026-10-20
### Added
- **Tree of Sahaba, Khulafa' & Living Prophetic Dynasties (`/sahaba`)**:
  - Interactive succession tree and genealogical catalog tracing from Prophet Muhammad ﷺ and Ahl al-Bayt (Sayyidah Fatimah, Sayyiduna Ali, Al-Hasan, Al-Husayn).
  - The 5 Khulafa' ar-Rashidun (Abu Bakr, Umar, Uthman, Ali, Al-Hasan completing the 30-year Prophetic Caliphate).
  - The Ten Promised Paradise (العشرة المبشرون بالجنة) with authentic Hadith citations.
  - Eminent early Sahaba luminaries (Hamzah, Bilal, Salman al-Farsi, Khalid ibn al-Walid, Abu Ubaydah).
  - Historic caliphates: Umayyads of Damascus, Caliphate of Cordoba (Al-Andalus), Abbasids of Baghdad, and Ottomans of Istanbul.
  - Continuous unbroken Prophetic lineages to modern times: the Moroccan Alaouite Dynasty to His Majesty King Mohammed VI (Amir al-Mu'minin) and the Jordanian Hashemite Dynasty to His Majesty King Abdullah II (Custodian of Jerusalem's Holy Sites).
- **Scientific Facts in Qur'an & Hadith Proven by Peer-Reviewed Research (`/science`)**:
  - Rigorous catalog of scientific facts in scripture backed by direct peer-reviewed journal papers (authors, journals, publication years, and DOI links).
  - Covers Cosmology (*Expanding Universe* - Hubble / Perlmutter), Embryology (*Human Developmental Stages* - Keith L. Moore / Carnegie Stages), Oceanography (*Internal Waves in Deep Oceans* - Alford et al., *Nature*), Hydrology (*Halocline Barrier Between Seas* - Armi & Farmer), Earth Sciences (*Mountains as Isostatic Pegs* - Watts, *Cambridge*), Astrophysics (*Supernova Origin of Iron* - Burbidge et al.), Neuroscience (*Nociceptors in Skin* - David Julius, *Nobel 2021*; *Prefrontal Cortex in Deception* - Langleben, *NeuroImage*), Atmospheric Physics (*Hypobaric Hypoxia on High Altitude Ascent* - West, *The Lancet*), and Prophetic Medicine (*Nigella Sativa / Thymoquinone* and *Honey Defensin-1 Antimicrobial Matrix* - *FASEB Journal*).
  - Integrated Uthmani verse recitation with live audio and multilingual explanations (AR/EN/FR).
- **The Dove / Pigeon (*Columba livia* / الحمامة واليمامة)**:
  - Added the Dove to the Prophetic Fauna catalog with photorealistic imagery, authentic Qur'an (Noah's Ark return) and Hadith context (Cave of Thawr, Sanctuary birds of the Haramain), and bespoke SVG silhouette with olive branch.
- **Nature Stage Physics & Volumetric Drifting Clouds**:
  - Draggable sky dome physics: direct touch and pointer drag interaction across the celestial arc with smooth angle scrubbing.
  - Live Celestial Orbit loop (`▶️ دوران الفلك الحي`) continuously animating solar and lunar bodies with real-time shadow projection on dunes.
  - Multi-tiered procedural volumetric cloud layers drifting with realistic parallax and sun-responsive color grading.
- **Clear Explanation of "Upupa epops"**:
  - Clarified prominently that *Upupa epops* is the international scientific binomial classification for the Hoopoe (الهدهد), the wise scout bird of Prophet Sulayman (Surah An-Naml 27:20-28), eliminating user ambiguity.

## [2.0.0] — 2026-10-20
### Added
- **Pre-Adamic Realm & Jinn Cosmological Island**: Autonomous floating celestial domain in the tree viewer highlighting earlier terrestrial creations (Jinn, Iblis / Shaytan, Hinn, Binn, Nasnas) with classical Islamic scholarly sources (Ibn Kathir, Al-Hasan al-Basri) and Qur'anic verses (18:50, 38:76, 2:34).
- **Prophetic Nature, Flora & Fauna View (`/nature`)**: Interactive showcase of 29 animals, plants, and foods cited in the Qur'an and Sunnah (hoopoe, whale, bee, camel, ant, olive, date palm, fig, pomegranate, black seed, talbinah, etc.) featuring scriptural citations, botanical/zoological profiles, and nutritional/healing benefits.
- **Celestial Sun, Moon, Dunes & Cloud Theater**: Interactive solar and lunar atmospheric stage with dynamic solar altitude calculations, astronomical moon tracking, drifting cloud layers, and wind-sculpted desert dunes.
- **Topography & Prophetic Routes (`/map`)**: Interactive Leaflet 3D historical topography maps tracing the journeys, stations, and waypoints of the Prophets across the Arabian Peninsula, Levant, Egypt, and Mesopotamia.
- **Interactive Lineage & Relational Highlighting**: Bidirectional highlighting and glow between canvas genealogical lines and the interactive legend, with specific categorization for direct lineage (parent, descendant), sacred marriages, and lateral bonds (sibling, cousin, guardian).
- **GitHub Pages Automated CI/CD Deployment**: Dedicated deployment workflow (`.github/workflows/deploy.yml`) supporting subpath base routing (`/prophets-family-tree/`) and client-side SPA routing (`404.html`).
- **Author Attribution & LinkedIn Profile Link**: Interactive footer attribution linking to Oussama EL HADJI's professional profile.

### Fixed
- **UI Overlapping in Tree Canvas**: Resolved collision between the bottom floating time-space epoch ruler, the interactive legend, and the trace hint.
- **Collapsible Legend Drawer**: Replaced fixed legend with a floating toggle pill and close button, positioned safely above the bottom epoch ruler.
- **Epoch Ruler Date Representation**: Formatted epoch dates cleanly across Arabic, English, and French without truncation or awkward text wraps (`whitespace-nowrap`).
- **Organism Card Image Cropping**: Implemented dual-layer framing (blurred ambient backdrop + full uncropped foreground) to ensure zero image cut-off on hover.
- **Arabic Text Squashing**: Restructured card headers in the timeline and tree drawer to guarantee full width for Arabic typography without vertical character collapse.
- **Theological Tree Decoupling**: Completely severed the genealogical line connecting pre-Adamic entities to Adam, preserving the orthodox Islamic creed that Adam was created directly from clay without ancestors.

## [1.0.0] — 2026-10-17
### Added
- Sourced dataset of the 25 Prophets named in the Qur'an plus Shith, Azar, ‘Imran and Maryam: titles, mission, peoples, lands, scriptures, lifespans, marriages, children, signs, notes and stories in Arabic, French and English. Every fact has a source level (Qur'an, hadith, tradition, disputed) and references.
- 31 relationships (parent, descendant, nephew, sibling, cousin, guardian, possible parent), each with a level, references and an explanation.
- `npm run verify:sources`: checks all Qur'an references exist and ~200 contain an expected word; checks all 23 hadith references against their text. Runs in CI.
- Constellation tree with pan, wheel and pinch zoom, lineage tracing, family toggle, sideways layout on wide screens (right-to-left in Arabic) and auto-pan away from the details panel.
- Timeline ordered by Qur'anic anchors, with historians' estimates behind a toggle.
- Profile pages with facts, signs, notes, family, the passages to read and previous/next navigation.
- Live Qur'an sheet: Uthmani text, translation (Saheeh International / Hamidullah / al-Muyassar) and Alafasy recitation from Al Quran Cloud.
- Al-Mi‘raj seven heavens, Ulul ‘Azm, method page, search (Ctrl K), installable PWA, 19 generated landscape scenes (no depictions of people), WebP + AVIF at full 2048 px with a 960 px copy for phones.
