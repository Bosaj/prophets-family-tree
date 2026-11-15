// Run daily by .github/workflows/morocco-month.yml.
// Morocco's Hijri months start when the Ministry of Habous announces the crescent, and the site counts each
// month from the last announcement recorded in MOROCCO_STARTS (src/lib/hijri.ts). When that month reaches its
// 28th day, the next announcement is due: this opens one issue asking for it to be added (once per month).
// Locally:  node scripts/check-morocco-month.mjs --dry [--today=YYYY-MM-DD]
import { execFileSync } from 'node:child_process'
import { MOROCCO_STARTS, civilDay } from '../src/lib/hijri.ts'
import { MONTH_NAMES } from '../src/data/hijriMonths.ts'

const dry = process.argv.includes('--dry')
const dayNumber = (iso) => Math.round(Date.parse(`${iso}T00:00:00Z`) / 86_400_000)
const isoOf = (n) => new Date(n * 86_400_000).toISOString().slice(0, 10)

const last = MOROCCO_STARTS[MOROCCO_STARTS.length - 1]
const forced = process.argv.find((a) => a.startsWith('--today='))?.slice(8)
const today = forced ?? civilDay(new Date(), 'Africa/Casablanca')
const day = dayNumber(today) - dayNumber(last.start) + 1
const next = last.m === 12 ? { y: last.y + 1, m: 1 } : { y: last.y, m: last.m + 1 }
const name = (m) => MONTH_NAMES[m - 1].en

console.log(`Last announced month: ${name(last.m)} ${last.y}, began ${last.start}. Today (${today}) is day ${day}.`)
if (day < 28) {
  console.log('No announcement due yet.')
  process.exit(0)
}

const title = `Morocco: add the start of ${name(next.m)} ${next.y} to MOROCCO_STARTS`
const evening29 = isoOf(dayNumber(last.start) + 28)
const body = `The Ministry of Habous and Islamic Affairs announces the crescent of **${name(next.m)} ${next.y}** on the evening of 29 ${name(last.m)} (${evening29}). The site counts Moroccan dates from the last announcement in \`MOROCCO_STARTS\` (\`src/lib/hijri.ts\`), so without the new entry Morocco's date turns into an estimate after day 29.

What to do:

1. Read the Ministry's announcement (habous.gov.ma, or the MAP news agency) for the evening of ${evening29}.
2. If the crescent was seen, ${name(next.m)} begins on ${isoOf(dayNumber(last.start) + 29)}; if not, ${name(last.m)} has 30 days and ${name(next.m)} begins on ${isoOf(dayNumber(last.start) + 30)}.
3. Add the entry to \`MOROCCO_STARTS\` with its source in the four languages, run \`npm test\`, and release a patch version.

\`\`\`ts
{ y: ${next.y}, m: ${next.m}, start: 'YYYY-MM-DD', source: { en: '…', fr: '…', ar: '…', es: '…' } },
\`\`\`

This issue was opened by the daily Morocco month check (\`.github/workflows/morocco-month.yml\`).`

const gh = (args) => execFileSync('gh', args, { encoding: 'utf8' })
const open = JSON.parse(gh(['issue', 'list', '--state', 'all', '--search', `"${title}" in:title`, '--json', 'number,title', '--limit', '20']))
if (open.some((i) => i.title === title)) {
  console.log(`Issue already exists: #${open.find((i) => i.title === title).number}`)
  process.exit(0)
}
if (dry) {
  console.log(`[dry run] would open: ${title}\n\n${body}`)
  process.exit(0)
}
console.log(gh(['issue', 'create', '--title', title, '--body', body, '--label', 'accuracy']).trim())
