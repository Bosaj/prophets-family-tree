// Finds the Wikimedia Commons source, author and licence of each photo in public/nature,
// by matching it byte-for-byte against Wikipedia page thumbnails, then writes src/data/photoCredits.json.
//   node scripts/trace-photo-credits.mjs
import fs from 'node:fs'
import crypto from 'node:crypto'

const CANDIDATES = {
  ankabut: ['Spider', 'Araneus diadematus', 'Spider web'],
  arak_siwak: ['Salvadora persica', 'Miswak'],
  asal: ['Honey'],
  battikh: ['Watermelon'],
  dhib_yusuf: ['Wolf', 'Arabian wolf', 'Golden jackal', 'African golden wolf'],
  fil: ['Elephant', 'African bush elephant', 'Asian elephant'],
  ghurab: ['Brown-necked raven', 'Crow', 'Common raven', 'House crow', 'Hooded crow', 'Corvus'],
  habbah_sawda: ['Nigella sativa'],
  hudhud: ['Eurasian hoopoe', 'Hoopoe'],
  hut_yunus: ['Sperm whale', 'Whale'],
  kalb_kahf: ['Saluki', 'Dog'],
  kamah: ['Desert truffle', 'Truffle', 'Terfezia'],
  khayl_adiyat: ['Arabian horse', 'Horse'],
  nahl: ['Western honey bee', 'Honey bee'],
  nakhl_tamr: ['Date palm', 'Date (fruit)'],
  namlah: ['Ant'],
  naqat_salih: ['Dromedary', 'Camel'],
  qist_hindi: ['Saussurea costus', 'Costus'],
  qittah: ['Arabian Mau', 'Cat'],
  rumman: ['Pomegranate'],
  sidr: ['Ziziphus spina-christi', 'Ziziphus'],
  talbinah: ['Barley', 'Talbina'],
  tayr_ababil: ['Common swift', 'Swift (bird)', 'Ababil'],
  tin: ['Common fig', 'Fig'],
  yaqtin_dubba: ['Calabash', 'Lagenaria siceraria'],
  zanjabil: ['Ginger'],
  zaytun_zayt: ['Olive'],
}

const md5 = (b) => crypto.createHash('md5').update(b).digest('hex')
const UA = { 'user-agent': 'Shajara-credits/1.0 (https://github.com/Bosaj/prophets-family-tree)' }
// Images generated for this project (no third-party licence).
const GENERATED = ['buraq', 'baqarah', 'hamama']
const credits = Object.fromEntries(GENERATED.map((id) => [id, { generated: true, author: 'Generated for Shajara (Higgsfield z_image)', license: 'Project asset (MIT)' }]))
const strip = (h) => (h ?? '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim()

for (const [id, titles] of Object.entries(CANDIDATES)) {
  const local = md5(fs.readFileSync(`public/nature/${id}.jpg`))
  let found = null
  for (const title of titles) {
    const sum = await (await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`, { headers: UA })).json().catch(() => null)
    const urls = [sum?.thumbnail?.source, sum?.originalimage?.source].filter(Boolean)
    for (const u of urls) {
      const variants = [u, u.replace(/\/\d+px-/, '/330px-'), u.replace(/\/\d+px-/, '/320px-')]
      for (const v of variants) {
        const r = await fetch(v, { headers: UA }).catch(() => null)
        if (!r?.ok) continue
        if (md5(Buffer.from(await r.arrayBuffer())) === local) { found = { title, url: v }; break }
      }
      if (found) break
    }
    if (found) break
  }
  if (!found) { console.log(`${id}: not matched`); continue }
  const file = decodeURIComponent(found.url.split('/').filter((x) => /\.(jpe?g|png|webp|tiff?|gif)$/i.test(x)).slice(-1)[0].replace(/^\d+px-/, ''))
  const info = await (await fetch(`https://commons.wikimedia.org/w/api.php?action=query&format=json&prop=imageinfo&iiprop=extmetadata|url&titles=File:${encodeURIComponent(file)}`, { headers: UA })).json()
  const page = Object.values(info.query.pages)[0]
  const meta = page?.imageinfo?.[0]?.extmetadata ?? {}
  credits[id] = {
    file,
    page: page?.imageinfo?.[0]?.descriptionurl ?? `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(file)}`,
    author: strip(meta.Artist?.value) || 'Unknown',
    license: strip(meta.LicenseShortName?.value) || 'Unknown',
    licenseUrl: meta.LicenseUrl?.value ?? null,
  }
  console.log(`${id}: ${file} — ${credits[id].author} — ${credits[id].license}`)
}
fs.writeFileSync('src/data/photoCredits.json', JSON.stringify(credits, null, 2) + '\n')
console.log(`\n${Object.keys(credits).length}/${Object.keys(CANDIDATES).length} photos traced.`)
