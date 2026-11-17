# Worship pages

Pages that help a reader pray, fast and follow the calendar. Every Arabic hadith on them is copied from the hadith it cites and checked by `npm run verify:duas` in CI; Qur'an verses open in the Mushaf.

| Page | What it shows | Data |
|---|---|---|
| `/salat` The prayer | What the prayer is, its conditions, the ablution step by step, how to pray step by step (posture figures), the rak‘ahs of the five prayers, fixing the prayer (sujud al-sahw), praying behind an imam and arriving late, the Sunnah prayers, the funeral prayer, istikharah, the two Eids, Friday, the traveller’s and the eclipse prayers, the remembrance after the prayer | `src/data/salat.ts`, `src/data/salatMore.ts` |
| `/times` Prayer times | Today's times for the reader's place, the next prayer, the parts of the day with their guidance, Friday | `src/data/awqat.ts`, `src/lib/prayerTimes.ts` |
| `/duas` Supplications | What to say at each moment of the day, by occasion (morning and evening, sleep, home, mosque, food and fasting, travel, sickness, worry, weather, people), in full with grades | `src/data/hisn.ts` (new texts; morning, sleep and prayer remembrances come from `awqat.ts`, hardship from `duas.ts`) |
| `/hijri` The Hijri calendar | Today's date by country, how the calendar works, the twelve months, the Eids, al-Kahf 300/309, fasting reminders | `src/data/hijri.ts`, `src/lib/hijri.ts`, `src/data/fasting.ts`, `src/lib/fastDays.ts` |
| `/islam` What is Islam? | The pillars, the articles of faith, common questions, more about Islam and Muslims, and the Prophet's supplications through his life (`#life`) | `src/data/islam.ts`, `src/data/duas.ts` |
| `/hour` The beginning and the end | Creation, the signs of the Hour (with a checklist), the end | `src/data/hour.ts` |

## The prayer and the schools
The steps follow the hadith (al-Bukhari 757 "pray as you have seen me pray", 789, 812, 828, 831, Muslim 772…). Where the four Sunni schools differ, a note gives the **Maliki** practice followed in Morocco: arms at the sides (sadl) in the obligatory prayers, raising the hands only at the opening takbir, no opening supplication or basmalah before al-Fatihah in the obligatory prayers, ‘Umar's tashahhud, one salam for the imam and the one praying alone, sujud al-sahw before the salam for an omission and after it for an addition, silent qunut in Fajr, witr as one rak‘ah after two. The page says every authentic way is valid.

## Place and time
`src/lib/place.tsx` (`PlaceProvider`) starts from the device's time zone and is shared by the header clock, `/times`, `/hijri` and the home card. Morocco uses the Ministry of Habous method (Fajr 19°, ‘Isha 17°, with its minute adjustments).

## Hijri dates by country
- **Morocco:** counted from the Ministry's announcements in `MOROCCO_STARTS` (`src/lib/hijri.ts`). Day 30 shows "awaiting the announcement"; after it, an estimate.
- **Saudi Arabia:** Umm al-Qura (the browser's `islamic-umalqura` calendar).
- **Turkey:** Diyanet, from the Aladhan API.
- Elsewhere: Umm al-Qura, marked as an estimate.

## Fasting reminders
`/hijri#reminders` lists the next white days (13–15 of each month, except Ramadan and 13 Dhu al-Hijjah, a day of tashriq), Tasu‘a and ‘Ashura, ‘Arafah, the start of Ramadan and the two Eids for the reader's place. The **calendar file** (`.ics`) adds them to a phone's calendar with an alarm at 20:00 the evening before; dates after the last announced month are marked as estimates. The home card shows today's or tomorrow's fasting day.

## Monthly upkeep (Morocco)
After each crescent announcement, add the new month to `MOROCCO_STARTS` with its source in four languages and release a patch version. The workflow `.github/workflows/morocco-month.yml` runs every evening and, from day 28 of the last recorded month, opens one issue with the evening of the 29th and both possible start dates. Next: **Rajab 1448**, announced on the evening of 9 December 2026.
