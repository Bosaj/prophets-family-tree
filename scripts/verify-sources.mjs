// Checks every source reference in the dataset against the real texts.
//  1. Every Qur'an reference points at verses that exist.
//  2. Key Qur'an references contain the expected word (Saheeh International translation).
//  3. Every hadith reference exists and contains the expected word (English, fawazahmed0/hadith-api).
// Run: npm run verify:sources   (needs network)
import { people, ululAzm } from '../src/data/people.ts'
import { links } from '../src/data/links.ts'
import { parseRef } from '../src/data/sources.ts'

/** ref -> regex that must match somewhere in the verse range. */
const QURAN_CHECKS = {
  '2:30-37': /successive authority|names/i, '2:31-33': /names/i, '2:34': /prostrate/i, '4:1': /mate/i, '7:189': /mate/i,
  '5:27-31': /Adam's two sons/i, '19:56': /Idrees/i, '19:57': /high station/i, '26:107': /messenger/i,
  '71:23': /Wadd/i, '11:44': /Judiyy/i, '29:14': /fifty/i, '66:10': /Noah.*Lot|Lot/i, '11:42-43': /son/i,
  '37:77': /descendants/i, '26:125': /messenger/i, '7:69': /Noah/i, '7:65': /Aad/i, '46:21': /AhqAf|sand|Ahqaf/i,
  '89:6-8': /Iram/i, '69:6-7': /seven nights/i, '26:143': /messenger/i, '7:74': /Aad/i, '7:73': /camel/i,
  '7:73-74': /Thamud/i, '15:80-82': /Thamud|Hijr/i, '26:155-158': /she-camel|drink/i, '54:27-31': /camel/i, '6:74': /Azar/i,
  '4:125': /friend/i, '19:41': /prophet/i, '2:124': /leader/i, '21:71': /blessed/i, '14:37': /valley/i,
  '2:127': /foundations/i, '87:18-19': /Abraham/i, '53:36-37': /Abraham/i, '14:39': /Ishmael/i, '21:68-70': /coolness/i,
  '2:260': /birds/i, '37:102-107': /sacrifice/i, '37:133': /Lot/i, '29:26': /Lot/i, '7:80-81': /immorality/i,
  '9:70': /overturned/i, '53:53': /overturned/i, '7:83': /wife/i, '11:78': /daughters/i, '15:71': /daughters/i,
  '11:77-81': /Lot/i, '11:82-83': /stones/i, '19:54': /promise/i, '37:112': /Isaac/i, '11:71': /Jacob/i,
  '21:72': /Jacob/i, '3:93': /Israel/i, '19:58': /Israel/i, '19:49': /prophet/i, '12:99-100': /Egypt/i,
  '12:4': /eleven/i, '12:59': /brother/i, '2:136': /Descendants/i, '12:93-96': /seeing/i, '12:46': /man of truth/i,
  '40:34': /Joseph/i, '12:39-40': /prison/i, '12:55-56': /storehouses/i, '12:101': /interpretation/i, '12:93': /shirt/i,
  '38:44': /patient/i, '4:163': /Job/i, '38:42': /foot/i, '21:84': /family/i, '38:43': /family/i, '26:178': /messenger/i,
  '11:89': /Lot/i, '7:85': /Madyan/i, '26:176-177': /Thicket/i, '7:91': /earthquake/i, '26:189': /cloud/i,
  '28:23-28': /Madyan/i, '4:164': /spoke/i, '19:51': /Moses/i, '7:103': /Pharaoh/i, '14:5': /Moses/i,
  '28:7-13': /mother of Moses/i, '28:22': /Madyan/i, '20:12': /Tuwa/i, '26:63': /sea/i, '5:44': /Torah/i, '17:2': /Moses/i,
  '28:27-29': /daughters/i, '20:17-21': /snake/i, '7:107': /serpent/i, '20:22': /white/i, '7:108': /white/i,
  '17:101': /nine/i, '7:133': /locusts/i, '2:60': /springs/i, '18:60-82': /Moses/i, '19:53': /Aaron/i, '20:47': /messengers/i,
  '20:42-48': /Pharaoh/i, '7:142': /Aaron/i, '28:34': /fluent|eloquent/i, '20:29-32': /Aaron/i, '21:85-86': /Dhul-Kifl/i,
  '38:48': /Dhul-Kifl/i, '38:26': /successor/i, '2:251': /Goliath/i, '2:246': /Moses/i, '17:55': /book/i, '27:16': /Solomon/i,
  '21:79': /mountains/i, '38:18-19': /mountains/i, '34:10-11': /iron/i, '21:80': /coats of armor|armor/i, '38:35': /kingdom/i,
  '27:28-31': /Solomon/i, '27:16-19': /birds|ant/i, '21:81': /wind/i, '34:12': /wind/i, '34:12-13': /copper/i,
  '27:38-40': /glance/i, '37:123': /Elias/i, '37:123-126': /Ba'l|Baal/i, '6:85': /Zechariah/i, '6:86': /Elisha/i,
  '21:87': /fish/i, '68:48': /fish/i, '37:139': /Jonah/i, '37:147-148': /hundred thousand/i, '10:98': /Jonah/i,
  '21:87-88': /darknesses/i, '37:139-146': /fish/i, '3:37': /Zechariah/i, '19:5': /barren/i, '21:90': /wife/i, '19:7': /John/i,
  '19:2-9': /Zechariah/i, '3:38-40': /Zechariah/i, '19:10': /three nights/i, '3:41': /three days/i, '3:39': /John/i,
  '19:12': /John/i, '19:15': /peace/i, '3:33': /Imran/i, '66:12': /Imran/i, '3:35-36': /Imran/i, '3:42': /Mary/i,
  '19:23-26': /palm/i, '3:45': /Messiah/i, '4:171': /Messiah/i, '61:6': /Ahmad/i, '5:46': /Gospel/i, '57:27': /Gospel/i,
  '4:157-158': /crucify/i, '3:59': /Adam/i, '3:47': /man has touched me|no man/i, '19:29-33': /cradle/i, '3:49': /clay/i,
  '5:110': /clay/i, '5:112-115': /table/i, '33:40': /last of the prophets/i, '21:107': /mercy/i, '48:29': /Muhammad/i, '34:28': /all of mankind|mankind/i,
  '7:158': /all/i, '6:19': /Qur'an/i, '42:7': /Arabic Qur'an|Qur'an/i, '2:23': /surah/i, '17:88': /like/i, '17:1': /night/i,
  '53:13-18': /Lote Tree/i, '54:1': /moon/i, '33:6': /mothers/i, '46:35': /determination/i, '33:7': /Noah/i, '42:13': /Noah/i,
  '6:84': /David/i, '12:38': /fathers/i, '20:29-30': /Aaron/i, '19:22-34': /Mary|cradle/i, '12:6': /interpretation/i,
  '12:36-49': /interpretation/i, '2:35-36': /Paradise/i, '7:11-12': /prostrate/i, '2:30': /successive authority/i,
  '11:37-44': /ship/i, '54:11-14': /ship|water/i, '71:1': /Noah/i, '11:58': /Hud/i, '2:258': /Abraham/i, '21:51-57': /idols|statues/i,
  '11:69-73': /Isaac/i, '51:24-30': /boy|wife/i, '2:133': /Jacob/i, '21:83-84': /Job/i, '37:101-107': /sacrifice/i,
}

/** hadith ref -> regex that must match its English text. */
const HADITH_CHECKS = {
  'bukhari:3326': /60 cubits/i, 'bukhari:3330': /Eve/i, 'tirmidhi:3076': /Dawud.*forty|forty.*Dawud/is, 'bukhari:4712': /Noah/i,
  'bukhari:3358': /Sarah/i, 'bukhari:3364': /Zamzam/i, 'bukhari:3207': /Idris/i, 'bukhari:3430': /cousins/i,
  'bukhari:3395': /Matta/i, 'muslim:2276': /Kinana/i, 'bukhari:3536': /sixty three/i, 'bukhari:3818': /Khadija/i,
  'bukhari:1303': /Ibrahim/i, 'bukhari:3714': /Fatima/i, 'bukhari:279': /locusts/i, 'bukhari:2073': /David/i,
  'bukhari:1131': /David/i, 'bukhari:3424': /Solomon/i, 'bukhari:3448': /descend/i, 'bukhari:3637': /moon/i,
  'bukhari:3576': /fingers/i, 'bukhari:3379': /Thamud|Hijr/i, 'bukhari:1339': /red/i,
  'bukhari:4987': /Hafsa|Uthman/i, 'muslim:918': /Salama/i, 'muslim:2452': /Mother of the Faithful|hands/i,
  'tirmidhi:3894': /Safiyyah|Hafsah/i, 'bukhari:371': /Khaibar|Safiya|Safiyya/i, 'muslim:1410': /Maimuna|Maymuna/i,
  'muslim:2543': /Egypt|conquer/i, 'muslim:2315': /Ibrahim/i, 'bukhari:3698': /Uthman|Badr/i,
}

const refs = new Set()
const collect = (fact) => fact?.r?.forEach((r) => refs.add(r))
for (const p of people) {
  for (const k of ['title', 'role', 'era', 'sentTo', 'place', 'scripture', 'lifespan', 'marriage', 'children']) collect(p[k])
  p.signs?.forEach(collect)
  p.notes?.forEach(collect)
  p.verses.forEach((r) => refs.add(r))
}
links.forEach((k) => k.r?.forEach((r) => refs.add(r)))
collect(ululAzm)

const parsed = [...refs].map(parseRef)
const quran = parsed.filter((p) => p.kind === 'quran')
const hadith = parsed.filter((p) => p.kind === 'hadith')
let failures = 0
const fail = (msg) => { failures++; console.log('  FAIL', msg) }

console.log(`Checking ${quran.length} Qur'an and ${hadith.length} hadith references…`)

const en = await (await fetch('https://api.alquran.cloud/v1/quran/en.sahih')).json()
const surahs = en.data.surahs
for (const r of quran) {
  const s = surahs[r.s - 1]
  if (!s || r.a < 1 || r.to > s.ayahs.length || r.to < r.a) { fail(`${r.raw}: verse does not exist`); continue }
  const re = QURAN_CHECKS[r.raw]
  if (!re) continue
  const text = s.ayahs.slice(r.a - 1, r.to).map((a) => a.text).join(' ')
  if (!re.test(text)) fail(`${r.raw}: expected ${re} in "${text.slice(0, 160)}…"`)
}
const unchecked = quran.filter((r) => !QURAN_CHECKS[r.raw]).map((r) => r.raw)
if (unchecked.length) console.log(`  note: ${unchecked.length} Qur'an refs only checked for existence: ${unchecked.join(', ')}`)

const BOOK = { bukhari: 'eng-bukhari', muslim: 'eng-muslim', tirmidhi: 'eng-tirmidhi' }
const muslimAll = hadith.some((h) => h.book === 'muslim')
  ? (await (await fetch('https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/eng-muslim.min.json')).json()).hadiths
  : []
for (const h of hadith) {
  let text = ''
  if (h.book === 'muslim') {
    // sunnah.com uses the ‘Abd al-Baqi number, which this dataset keeps as arabicnumber.
    text = muslimAll.filter((x) => Math.floor(Number(x.arabicnumber)) === h.n).map((x) => x.text).join(' ')
  } else {
    const j = await (await fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/${BOOK[h.book]}/${h.n}.json`)).json()
    text = (j.hadiths ?? []).map((x) => x.text).join(' ')
  }
  if (!text) { fail(`${h.raw}: hadith not found`); continue }
  const re = HADITH_CHECKS[h.raw]
  if (re && !re.test(text)) fail(`${h.raw}: expected ${re} in "${text.slice(0, 160)}…"`)
}

console.log(failures ? `\n${failures} problem(s) found.` : '\nAll references verified.')
process.exit(failures ? 1 : 0)
