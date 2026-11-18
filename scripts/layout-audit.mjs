// Phone layout and translation audit, run in CI on every pull request.
//
// Opens every page of the built site on a 375 × 812 phone in English, French, Spanish and Arabic, and fails when:
//   1. text sits outside the screen (cut off or pushing the page sideways), outside of a sideways-scrolling row;
//   2. two floating surfaces (panels, pills, labels with a background) overlap each other;
//   3. a header popup opens outside the screen;
//   4. a French or Spanish page shows a text identical to the English page, or an Arabic page shows Latin text,
//      except names, scientific names and bibliographic citations listed in ALLOWED.
//
// Usage: npm run build && npm run audit:layout   (needs `npx playwright install chromium` once)
import { spawn } from 'node:child_process'
import { chromium } from 'playwright'

const PORT = 4179
const BASE = `http://127.0.0.1:${PORT}`
const ROUTES = ['/', '/tree', '/tree?focus=ibrahim', '/map', '/map?focus=ibrahim', '/timeline', '/stature', '/stories', '/nature', '/duas', '/times', '/islam', '/hour', '/hijri', '/salat', '/sahaba', '/science', '/scriptures', '/sources', '/hadith', '/p/ibrahim', '/p/muhammad']
const LANGS = ['en', 'fr', 'es', 'ar']
/** Pages whose Latin text is bibliography, credits or scientific names, kept in their original language. */
const CITATION_PAGES = new Set(['/science', '/sources', '/nature'])
/** Texts that are the same in every language: names, book titles, units, scientific names. */
const ALLOWED = [
  /\bibn\b|\bbint\b|\babu\b|ﷺ|\bal-|\bas-|\bad-|\bat-|\ban-|\bash-|\baz-/i,
  /^(Sahih|Sunan|Musnad|Jami|Hasan|Muwatta|Sahifat|Hady)\b/,
  /^[A-Z][a-z]+ [a-z]+( [a-z]+)?( \/ [A-Z][a-z]+ [a-z]+( [a-z]+)?)*$/, // Latin binomials
  /^[A-Z][a-z]+ \([A-Z][a-z]+( [a-z]+)?( \/ [A-Z][a-z]+)*\)$/, // Lepidoptera (Autographa gamma)
  /Ctrl K|Oussama EL HADJI|GitHub|Shajara|Ulul ‘Azm|Azazil|New York|Salman|Selim|Abraham|Yam \(Kan‘an\)|Hamidullah|Motzki|Brill|Muhammad ﷺ/,
]
const allowed = (s) => ALLOWED.some((re) => re.test(s))

function startServer() {
  const child = spawn(process.execPath, ['node_modules/vite/bin/vite.js', 'preview', '--host', '127.0.0.1', '--port', String(PORT), '--strictPort'], { stdio: 'ignore' })
  return child
}

async function waitForServer() {
  for (let i = 0; i < 60; i++) {
    try {
      const r = await fetch(`http://127.0.0.1:${PORT}`)
      if (r.ok) return
    } catch {}
    await new Promise((r) => setTimeout(r, 500))
  }
  throw new Error('preview server did not start')
}

/** Runs in the page: returns the problems on the current screen and every screen below it. */
async function inspect() {
  const vw = innerWidth
  const vh = innerHeight
  const out = { overflow: [], overlap: [], texts: [] }
  const alpha = (c) => {
    const m = c.match(/rgba?\(([^)]+)\)/)
    if (!m) return 0
    const p = m[1].split(',').map(Number)
    return p.length === 4 ? p[3] : 1
  }
  const inScroller = (el) => {
    for (let a = el.parentElement; a; a = a.parentElement) {
      const o = getComputedStyle(a).overflowX
      if (o === 'auto' || o === 'scroll') return true
    }
    return false
  }
  const ownText = (el) => [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim())
  const short = (el) => (el.getAttribute('aria-label') || el.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 40)
  const screen = (tag) => {
    for (const el of document.querySelectorAll('body *')) {
      if (!ownText(el) || el.closest('svg, header, .leaflet-pane')) continue
      const r = el.getBoundingClientRect()
      if (!r.width || !r.height || r.bottom <= 0 || r.top >= vh) continue
      if ((r.right > vw + 2 || r.left < -2) && !inScroller(el)) out.overflow.push(`${tag} "${short(el)}" spans ${Math.round(r.left)}..${Math.round(r.right)}`)
    }
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
        if (w >= 4 && h >= 4 && w * h >= 60) out.overlap.push(`${tag} "${short(a)}" covers "${short(b)}" (${Math.round(w)}×${Math.round(h)})`)
      }
  }
  screen('top')
  const H = document.documentElement.scrollHeight
  for (let y = vh; y < Math.min(H, vh * 14); y += vh) {
    scrollTo(0, y)
    await new Promise((r) => setTimeout(r, 120))
    screen(`at ${y}px`)
  }
  scrollTo(0, 0)
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

/** Opens each header popup and checks it stays on screen. */
async function popups(page) {
  const found = []
  const buttons = await page.$$('header [aria-haspopup], header button[aria-expanded]')
  for (const b of buttons) {
    if (!(await b.isVisible())) continue
    await b.click({ timeout: 2000 }).catch(() => {})
    await page.waitForTimeout(400)
    found.push(
      ...(await page.evaluate(() => {
        const bad = []
        for (const el of document.querySelectorAll('[role=dialog], [role=menu], [role=listbox]')) {
          const r = el.getBoundingClientRect()
          if (r.width && (r.left < -1 || r.right > innerWidth + 1 || r.top < -1)) bad.push(`popup "${(el.getAttribute('aria-label') || '').slice(0, 30)}" spans ${Math.round(r.left)}..${Math.round(r.right)}`)
        }
        return bad
      })),
    )
    await page.keyboard.press('Escape').catch(() => {})
    await page.mouse.click(5, 790, { timeout: 2000 }).catch(() => {})
    await page.waitForTimeout(150)
  }
  return found
}

const server = startServer()
const problems = []
try {
  await waitForServer()
  const browser = await chromium.launch()
  const english = {}
  for (const lang of LANGS) {
    const ctx = await browser.newContext({ viewport: { width: 375, height: 812 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true, serviceWorkers: 'block' })
    await ctx.addInitScript((l) => localStorage.setItem('shajara:lang', JSON.stringify(l)), lang)
    const page = await ctx.newPage()
    page.setDefaultTimeout(15000)
    for (const route of ROUTES) {
      await page.goto(BASE + route, { waitUntil: 'domcontentloaded', timeout: 30000 })
      await page.waitForTimeout(2600)
      const res = await page.evaluate(inspect)
      for (const o of res.overflow) problems.push(`[${lang}] ${route} text off screen: ${o}`)
      for (const o of res.overlap) problems.push(`[${lang}] ${route} overlap: ${o}`)
      if (route === '/' || route === '/tree' || route === '/map') for (const p of await popups(page)) problems.push(`[${lang}] ${route} ${p}`)
      if (lang === 'en') english[route] = new Set(res.texts)
      else if (!CITATION_PAGES.has(route)) {
        for (const s of res.texts) {
          if (allowed(s)) continue
          const leak = lang === 'ar' ? /[A-Za-z]{3,}[^\n]*[A-Za-z]{3,}/.test(s) : english[route]?.has(s) && /[a-z]{3,}\s+\S+/i.test(s)
          if (leak) problems.push(`[${lang}] ${route} not translated: "${s.slice(0, 80)}"`)
        }
      }
    }
    await ctx.close()
    console.log(`${lang}: checked ${ROUTES.length} pages (${problems.length} problem(s) so far)`)
  }
  await browser.close()
} finally {
  server.kill()
}

const unique = [...new Set(problems)]
if (unique.length) {
  console.error(`\n${unique.length} layout or translation problem(s):`)
  for (const p of unique) console.error('  ' + p)
  process.exit(1)
}
console.log('\nNo overlap, no text off screen, nothing left untranslated.')
