// Phone layout and translation audit, run in CI on every pull request.
//
// Opens every page of the built site on a 375 × 812 phone in English, French, Spanish and Arabic: the main pages,
// every person page and every Holy Book. On the main pages it also opens what a reader can open (tabs, cards,
// panels, dialogs) by clicking one button of each kind. It fails when:
//   1. text sits outside the screen, outside of a sideways-scrolling row;
//   2. text is cut off by the box that holds it;
//   3. two pieces of text are drawn on top of each other;
//   4. two floating surfaces (panels, pills, labels with a background) overlap;
//   5. a popup or dialog opens outside the screen;
//   6. a button or link has no name (icon only, no aria-label);
//   7. a French or Spanish page shows a text identical to the English page, or an Arabic page shows Latin text,
//      except names, scientific names and bibliographic citations listed in ALLOWED.
//
// Usage: npm run build && npm run audit:layout   (needs `npx playwright install chromium` once)
// AUDIT_URL checks a deployed site instead of the local build; AUDIT_LANGS, AUDIT_ROUTES narrow the run;
// AUDIT_CLICKS=0 skips the clicking.
import { spawn } from 'node:child_process'
import { chromium } from 'playwright'
import { peopleCore } from '../src/data/peopleCore.ts'
import { SCRIPTURES } from '../src/data/scriptures.ts'

const PORT = 4179
const REMOTE = process.env.AUDIT_URL
const BASE = REMOTE ?? `http://127.0.0.1:${PORT}`
const MAIN = ['/', '/tree', '/tree?focus=ibrahim', '/map', '/map?focus=ibrahim', '/timeline', '/stature', '/stories', '/nature', '/duas', '/times', '/islam', '/hour', '/hijri', '/salat', '/sahaba', '/science', '/scriptures', '/sources', '/hadith', '/404-check']
const PEOPLE = peopleCore.map((p) => `/p/${p.id}`)
const BOOKS = SCRIPTURES.map((b) => `/scriptures?book=${b.id}`)
const ROUTES = process.env.AUDIT_ROUTES?.split(',') ?? [...MAIN, ...BOOKS, ...PEOPLE]
const CLICK_ROUTES = new Set(MAIN.concat('/p/ibrahim', '/p/muhammad', '/scriptures?book=quran'))
const CLICKS = process.env.AUDIT_CLICKS !== '0'
const LANGS = process.env.AUDIT_LANGS?.split(',') ?? ['en', 'fr', 'es', 'ar']
/** Pages whose Latin text is bibliography, credits or scientific names, kept in their original language. */
const CITATION_PAGES = new Set(['/science', '/sources', '/nature'])
/** Texts that are the same in every language: names, book titles, units, scientific names. */
const ALLOWED = [
  /\bibn\b|\bbint\b|\babu\b|ﷺ|\bal-|\bas-|\bad-|\bat-|\ban-|\bash-|\baz-/i,
  /^(Sahih|Sunan|Musnad|Jami|Hasan|Muwatta|Sahifat|Hady)\b/,
  /^[A-Z][a-z]+ [a-z]+( [a-z]+)?( \/ [A-Z][a-z]+ [a-z]+( [a-z]+)?)*$/, // Latin binomials
  /^[A-Z][a-z]+ \([A-Z][a-z]+( [a-z]+)?( \/ [A-Z][a-z]+)*\)$/, // Lepidoptera (Autographa gamma)
  /عليه السلام|Ctrl K|Oussama EL HADJI|GitHub|Shajara|Ulul ‘Azm|Azazil|New York|Salman|Selim|Abraham|Yam \(Kan‘an\)|Hamidullah|Motzki|Brill|Muhammad ﷺ/,
]
const allowed = (s) => ALLOWED.some((re) => re.test(s))

function startServer() {
  return spawn(process.execPath, ['node_modules/vite/bin/vite.js', 'preview', '--host', '127.0.0.1', '--port', String(PORT), '--strictPort'], { stdio: 'ignore' })
}

async function waitForServer() {
  for (let i = 0; i < 60; i++) {
    try {
      if ((await fetch(BASE)).ok) return
    } catch {}
    await new Promise((r) => setTimeout(r, 500))
  }
  throw new Error('preview server did not start')
}

/**
 * Runs in the page. `scroll` checks every screen down the page; otherwise only the current screen.
 * Returns the problems found and, for the translation check, every text on the page.
 */
async function inspect(scroll) {
  const vw = innerWidth
  const vh = innerHeight
  const out = { problems: [], texts: [] }
  const seen = new Set()
  const add = (s) => {
    if (!seen.has(s)) {
      seen.add(s)
      out.problems.push(s)
    }
  }
  const alpha = (c) => {
    const m = c.match(/rgba?\(([^)]+)\)/)
    if (!m) return 0
    const p = m[1].split(',').map(Number)
    return p.length === 4 ? p[3] : 1
  }
  const scroller = (el) => {
    for (let a = el.parentElement; a; a = a.parentElement) {
      const o = getComputedStyle(a).overflowX
      if (o === 'auto' || o === 'scroll') return true
    }
    return false
  }
  const visible = (el) => {
    for (let a = el; a && a !== document.body; a = a.parentElement) {
      const cs = getComputedStyle(a)
      if (cs.visibility === 'hidden' || cs.display === 'none' || +cs.opacity < 0.1) return false
    }
    return true
  }
  const ownText = (el) => [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim())
  const short = (el) => (el.getAttribute('aria-label') || el.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 40)
  const skip = (el) => el.closest('svg, header, .leaflet-pane, .sr-only, [aria-hidden=true]')
  /**
   * True when the lower of a and b cannot be seen at (x, y): something lies between them in paint order.
   * For text (`anyLayer`), any opaque or blurred layer between them hides the lower text. For surfaces, only a
   * full-screen layer (a dialog backdrop) does: one surface sitting on another is exactly what we look for.
   */
  const hidden = (a, b, x, y, anyLayer) => {
    const stack = document.elementsFromPoint(x, y)
    const ia = stack.findIndex((e) => a === e || a.contains(e))
    const ib = stack.findIndex((e) => b === e || b.contains(e))
    if (ia < 0 || ib < 0) return false // pointer-events: none hides an element from the stack; assume visible
    const [top, low, lowEl] = ia < ib ? [ia, ib, b] : [ib, ia, a]
    for (let k = top + 1; k < low; k++) {
      const e = stack[k]
      if (e.contains(lowEl)) continue
      const cs = getComputedStyle(e)
      const covers = alpha(cs.backgroundColor) >= 0.6 || (cs.backdropFilter && cs.backdropFilter !== 'none')
      if (!covers) continue
      if (anyLayer) return true
      const r = e.getBoundingClientRect()
      if (r.width * r.height >= vw * vh * 0.6) return true
    }
    return false
  }

  const screen = (tag) => {
    // text: off screen, cut by its box
    const texts = []
    for (const el of document.querySelectorAll('body *')) {
      if (!ownText(el) || skip(el)) continue
      const r = el.getBoundingClientRect()
      if (r.width < 2 || r.height < 2 || r.bottom <= 0 || r.top >= vh) continue
      if (!visible(el)) continue
      texts.push([el, r])
      if ((r.right > vw + 2 || r.left < -2) && !scroller(el)) add(`text off screen ${tag}: "${short(el)}" spans ${Math.round(r.left)}..${Math.round(r.right)}`)
      const cs = getComputedStyle(el)
      if (cs.textOverflow !== 'ellipsis' && !cs.webkitLineClamp?.match(/\d/)) {
        for (let a = el.parentElement, i = 0; a && a !== document.body && i < 6; a = a.parentElement, i++) {
          const acs = getComputedStyle(a)
          const ox = acs.overflowX
          const oy = acs.overflowY
          if (ox === 'auto' || ox === 'scroll' || oy === 'auto' || oy === 'scroll') break
          if (ox === 'hidden' || ox === 'clip' || oy === 'hidden' || oy === 'clip') {
            const ar = a.getBoundingClientRect()
            const cutX = (ox === 'hidden' || ox === 'clip') && (r.right > ar.right + 3 || r.left < ar.left - 3)
            const cutY = (oy === 'hidden' || oy === 'clip') && (r.bottom > ar.bottom + 3 || r.top < ar.top - 3)
            if ((cutX || cutY) && ar.width > 0 && !a.matches('[class*=truncate], [class*=line-clamp]')) add(`text cut by its box ${tag}: "${short(el)}"`)
            break
          }
        }
      }
    }
    // text drawn on top of text
    for (let i = 0; i < texts.length; i++)
      for (let j = i + 1; j < texts.length; j++) {
        const [a, ra] = texts[i]
        const [b, rb] = texts[j]
        if (a.contains(b) || b.contains(a)) continue
        const w = Math.min(ra.right, rb.right) - Math.max(ra.left, rb.left)
        const h = Math.min(ra.bottom, rb.bottom) - Math.max(ra.top, rb.top)
        if (w < 3 || h < 3 || w * h < 0.3 * Math.min(ra.width * ra.height, rb.width * rb.height)) continue
        const cx = Math.max(ra.left, rb.left) + w / 2
        const cy = Math.max(ra.top, rb.top) + h / 2
        if (hidden(a, b, cx, cy, true)) continue
        add(`text on text ${tag}: "${short(a)}" and "${short(b)}"`)
      }
    // floating surfaces on top of each other
    const surfaces = []
    for (const el of document.querySelectorAll('body *')) {
      if (el.closest('header, .leaflet-pane, svg, [aria-hidden=true]')) continue
      const cs = getComputedStyle(el)
      if (cs.visibility === 'hidden' || cs.display === 'none' || +cs.opacity < 0.1) continue
      if (!(alpha(cs.backgroundColor) > 0.25 || (cs.backdropFilter && cs.backdropFilter !== 'none'))) continue
      const r = el.getBoundingClientRect()
      if (r.width < 16 || r.height < 12 || r.bottom <= 0 || r.top >= vh || r.right <= 0 || r.left >= vw || r.width * r.height > vw * vh * 0.6) continue
      surfaces.push([el, r])
    }
    for (let i = 0; i < surfaces.length; i++)
      for (let j = i + 1; j < surfaces.length; j++) {
        const [a, ra] = surfaces[i]
        const [b, rb] = surfaces[j]
        if (a.contains(b) || b.contains(a)) continue
        const w = Math.min(ra.right, rb.right) - Math.max(ra.left, rb.left)
        const h = Math.min(ra.bottom, rb.bottom) - Math.max(ra.top, rb.top)
        if (w < 4 || h < 4 || w * h < 60) continue
        if (hidden(a, b, Math.max(ra.left, rb.left) + w / 2, Math.max(ra.top, rb.top) + h / 2, false)) continue
        add(`overlap ${tag}: "${short(a)}" covers "${short(b)}" (${Math.round(w)}×${Math.round(h)})`)
      }
    // buttons and links with no name (icon only, no aria-label): nothing to read aloud or translate
    for (const el of document.querySelectorAll('button, a[href], [role=button]')) {
      if (el.closest('.leaflet-pane, .leaflet-control-container')) continue
      const r = el.getBoundingClientRect()
      if (!r.width || r.bottom <= 0 || r.top >= vh || !visible(el)) continue
      const name = (el.getAttribute('aria-label') || el.getAttribute('title') || el.textContent || '').trim()
      const labelled = el.getAttribute('aria-labelledby') || el.querySelector('img[alt]:not([alt=""]), svg title')
      if (!name && !labelled) add(`button without a name ${tag}: <${el.tagName.toLowerCase()} class="${String(el.className).slice(0, 60)}">`)
    }
    // popups and dialogs inside the screen
    for (const el of document.querySelectorAll('[role=dialog], [role=menu], [role=listbox], [aria-modal=true]')) {
      const r = el.getBoundingClientRect()
      if (r.width && visible(el) && (r.left < -1 || r.right > vw + 1 || r.top < -1)) add(`popup off screen ${tag}: "${short(el)}" spans ${Math.round(r.left)}..${Math.round(r.right)}`)
    }
  }

  screen('top')
  if (scroll) {
    const H = document.documentElement.scrollHeight
    for (let y = vh; y < Math.min(H, vh * 14); y += vh) {
      scrollTo(0, y)
      await new Promise((r) => setTimeout(r, 120))
      screen(`at ${y}px`)
    }
    scrollTo(0, 0)
  }
  const set = new Set()
  const tw = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT)
  for (let n; (n = tw.nextNode()); ) {
    if (n.parentElement?.closest('script, style, noscript')) continue
    const s = n.textContent.replace(/\s+/g, ' ').trim()
    if (s.length >= 4 && /\p{L}/u.test(s)) set.add(s)
  }
  for (const el of document.querySelectorAll('[aria-label],[placeholder],[title]'))
    for (const k of ['aria-label', 'placeholder', 'title']) {
      const v = el.getAttribute(k)?.trim()
      if (v && v.length >= 4) set.add(v)
    }
  out.texts = [...set]
  return out
}

/** One button of each kind outside the header (tabs, cards, toggles, the ones that open panels), at most 14. */
async function clickTargets(page) {
  return page.evaluate(() => {
    const kinds = new Map()
    const all = [...document.querySelectorAll('main button, [role=main] button, #main button, body > div button')]
    all.forEach((b, i) => {
      if (b.closest('header') || b.disabled) return
      const r = b.getBoundingClientRect()
      if (!r.width || !r.height) return
      const label = (b.getAttribute('aria-label') || b.textContent || '').toLowerCase()
      if (/print|imprimer|طباعة|imprimir|download|télécharger|تنزيل|descargar|copy|copier|نسخ|copiar|poster|\.ics|calendar|calendrier|التقويم|calendario|location|position|موقعي|ubicación/.test(label)) return
      const kind = `${b.className}|${b.getAttribute('aria-expanded') ?? ''}|${b.getAttribute('aria-pressed') ?? ''}|${b.getAttribute('role') ?? ''}`
      if (!kinds.has(kind)) kinds.set(kind, i)
    })
    const pick = [...kinds.values()].slice(0, 14)
    all.forEach((b, i) => b.toggleAttribute('data-audit-click', pick.includes(i)))
    return pick.length
  })
}

async function auditLang(browser, lang, english) {
  const problems = []
  const ctx = await browser.newContext({ viewport: { width: 375, height: 812 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true, serviceWorkers: 'block' })
  await ctx.addInitScript((l) => localStorage.setItem('shajara:lang', JSON.stringify(l)), lang)
  const page = await ctx.newPage()
  page.setDefaultTimeout(15000)
  page.on('dialog', (d) => d.dismiss().catch(() => {}))
  for (const route of ROUTES) {
    await page.goto(BASE + route, { waitUntil: 'domcontentloaded', timeout: 30000 })
    await page.waitForTimeout(2600)
    const res = await page.evaluate(inspect, true)
    for (const p of res.problems) problems.push(`[${lang}] ${route} ${p}`)
    if (lang === 'en') english[route] = new Set(res.texts)
    else if (!CITATION_PAGES.has(route) && english[route]) {
      for (const s of res.texts) {
        if (allowed(s)) continue
        const leak = lang === 'ar' ? /[A-Za-z]{3,}[^\n]*[A-Za-z]{3,}/.test(s) : english[route].has(s) && /[a-z]{3,}\s+\S+/i.test(s)
        if (leak) problems.push(`[${lang}] ${route} not translated: "${s.slice(0, 80)}"`)
      }
    } else if (lang === 'ar' && !CITATION_PAGES.has(route)) {
      for (const s of res.texts) if (!allowed(s) && /[A-Za-z]{3,}[^\n]*[A-Za-z]{3,}/.test(s)) problems.push(`[ar] ${route} not translated: "${s.slice(0, 80)}"`)
    }
    if (!CLICKS || !CLICK_ROUTES.has(route)) continue
    // Header popups
    for (const b of await page.$$('header [aria-haspopup], header button[aria-expanded]')) {
      if (!(await b.isVisible())) continue
      await b.click({ timeout: 2000 }).catch(() => {})
      await page.waitForTimeout(400)
      for (const p of (await page.evaluate(inspect, false)).problems) problems.push(`[${lang}] ${route} (header popup open) ${p}`)
      await page.keyboard.press('Escape').catch(() => {})
      await page.mouse.click(5, 790).catch(() => {})
      await page.waitForTimeout(150)
    }
    // What a reader can open on the page
    const n = await clickTargets(page)
    for (let i = 0; i < n; i++) {
      const target = page.locator('[data-audit-click]').nth(i)
      if (!(await target.isVisible().catch(() => false))) continue
      const label = ((await target.getAttribute('aria-label').catch(() => null)) || (await target.innerText().catch(() => '')) || '').trim().replace(/\s+/g, ' ').slice(0, 30)
      await target.scrollIntoViewIfNeeded({ timeout: 2000 }).catch(() => {})
      await target.click({ timeout: 2000 }).catch(() => {})
      await page.waitForTimeout(500)
      if (!page.url().startsWith(BASE + route.split('?')[0])) {
        await page.goto(BASE + route, { waitUntil: 'domcontentloaded' })
        await page.waitForTimeout(2000)
        await clickTargets(page)
        continue
      }
      for (const p of (await page.evaluate(inspect, false)).problems) problems.push(`[${lang}] ${route} (after "${label}") ${p}`)
      await page.keyboard.press('Escape').catch(() => {})
      await page.waitForTimeout(150)
    }
  }
  await ctx.close()
  console.log(`${lang}: checked ${ROUTES.length} pages, ${problems.length} problem(s)`)
  return problems
}

const server = REMOTE ? null : startServer()
let problems = []
try {
  if (!REMOTE) await waitForServer()
  const browser = await chromium.launch()
  const english = {}
  // English first: the other languages compare their texts with it. Then the others side by side.
  if (LANGS.includes('en')) problems.push(...(await auditLang(browser, 'en', english)))
  const rest = await Promise.all(LANGS.filter((l) => l !== 'en').map((l) => auditLang(browser, l, english)))
  problems = problems.concat(...rest)
  await browser.close()
} finally {
  server?.kill()
}

const unique = [...new Set(problems)]
if (unique.length) {
  console.error(`\n${unique.length} layout or translation problem(s):`)
  for (const p of unique) console.error('  ' + p)
  process.exit(1)
}
console.log('\nNo overlap, no text off screen or cut, nothing left untranslated.')
