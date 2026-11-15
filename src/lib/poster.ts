// Poster export of an on-screen SVG (the family tree): the whole drawing at full size, with its colours and
// fonts inlined so the file looks the same anywhere, a title band, and the site's address.

const SVG_NS = 'http://www.w3.org/2000/svg'

/** Presentation properties copied from the page's CSS onto each element of the copy. */
const PROPS = [
  'fill',
  'fill-opacity',
  'stroke',
  'stroke-width',
  'stroke-opacity',
  'stroke-dasharray',
  'stroke-linecap',
  'stroke-linejoin',
  'opacity',
  'font-family',
  'font-size',
  'font-weight',
  'font-style',
  'letter-spacing',
  'text-anchor',
  'dominant-baseline',
  'paint-order',
  'visibility',
  'filter',
]

function inlineStyles(src: Element, dst: Element) {
  const cs = getComputedStyle(src)
  const style: string[] = []
  for (const p of PROPS) {
    const v = cs.getPropertyValue(p)
    if (v && v !== 'none' && v !== 'normal' && v !== 'auto') style.push(`${p}:${v}`)
    else if (p === 'fill' && v === 'none') style.push('fill:none')
    else if (p === 'stroke' && v === 'none') style.push('stroke:none')
  }
  if (cs.display === 'none') style.push('display:none')
  // Animated or CSS-placed transforms are left out: the drawing uses transform attributes.
  dst.setAttribute('style', style.join(';'))
  dst.removeAttribute('class')
  const a = src.children
  const b = dst.children
  for (let i = 0; i < a.length && i < b.length; i++) inlineStyles(a[i]!, b[i]!)
}

async function toDataUrl(url: string): Promise<string | null> {
  try {
    const blob = await (await fetch(url)).blob()
    return await new Promise((res) => {
      const r = new FileReader()
      r.onload = () => res(String(r.result))
      r.onerror = () => res(null)
      r.readAsDataURL(blob)
    })
  } catch {
    return null
  }
}

/** The page's @font-face rules for the given families, with their files embedded. */
async function embeddedFonts(families: Set<string>): Promise<string> {
  const rules: string[] = []
  for (const sheet of Array.from(document.styleSheets)) {
    let list: CSSRuleList
    try {
      list = sheet.cssRules
    } catch {
      continue
    }
    for (const rule of Array.from(list)) {
      if (!(rule instanceof CSSFontFaceRule)) continue
      const fam = rule.style.getPropertyValue('font-family').replace(/["']/g, '').trim()
      if (!families.has(fam)) continue
      const m = /url\(["']?([^"')]+\.woff2)["']?\)/.exec(rule.style.getPropertyValue('src'))
      if (!m) continue
      const data = await toDataUrl(new URL(m[1]!, sheet.href ?? location.href).href)
      if (!data) continue
      const range = rule.style.getPropertyValue('unicode-range')
      const weight = rule.style.getPropertyValue('font-weight')
      rules.push(`@font-face{font-family:"${fam}";src:url(${data}) format("woff2");${weight ? `font-weight:${weight};` : ''}${range ? `unicode-range:${range};` : ''}}`)
    }
  }
  return rules.join('\n')
}

export interface PosterText {
  title: string
  subtitle: string
  footer: string
  /** Right-to-left title band. */
  rtl: boolean
}

/**
 * A standalone SVG poster of `svg`, whose drawing is the group `content` (panned and zoomed on screen):
 * the full drawing, untransformed, with a title band above and a footer below.
 */
export async function posterSvg(svg: SVGSVGElement, content: SVGGElement, text: PosterText): Promise<{ markup: string; width: number; height: number }> {
  const box = content.getBBox()
  const pad = 90
  const head = 190
  const foot = 90
  const x = box.x - pad
  const y = box.y - pad - head
  const width = Math.ceil(box.width + pad * 2)
  const height = Math.ceil(box.height + pad * 2 + head + foot)

  const copy = svg.cloneNode(true) as SVGSVGElement
  inlineStyles(svg, copy)
  copy.setAttribute('xmlns', SVG_NS)
  copy.setAttribute('viewBox', `${x} ${y} ${width} ${height}`)
  copy.setAttribute('width', String(width))
  copy.setAttribute('height', String(height))
  copy.removeAttribute('style')
  copy.removeAttribute('role')

  // The drawing at rest: no pan, no zoom.
  const index = Array.from(svg.children).indexOf(content)
  const g = copy.children[index] as SVGGElement | undefined
  if (g) {
    const s = g.getAttribute('style') ?? ''
    g.setAttribute('style', s.replace(/transform[^;]*;?/g, '').replace(/transition[^;]*;?/g, ''))
  }

  const root = getComputedStyle(document.documentElement)
  const night = root.getPropertyValue('--color-night').trim() || '#07060d'
  const gold = root.getPropertyValue('--color-gold').trim() || '#e9c67b'
  const ink = root.getPropertyValue('--color-ink-2').trim() || '#cfc8d8'

  const bg = document.createElementNS(SVG_NS, 'rect')
  bg.setAttribute('x', String(x))
  bg.setAttribute('y', String(y))
  bg.setAttribute('width', String(width))
  bg.setAttribute('height', String(height))
  bg.setAttribute('fill', night)
  const defs = copy.querySelector('defs')
  copy.insertBefore(bg, defs ? defs.nextSibling : copy.firstChild)

  const cx = x + width / 2
  const line = (txt: string, ty: number, size: number, fill: string, weight = 600, family = '"Sora Variable", "Reem Kufi Variable", sans-serif') => {
    const el = document.createElementNS(SVG_NS, 'text')
    el.setAttribute('x', String(cx))
    el.setAttribute('y', String(ty))
    el.setAttribute('text-anchor', 'middle')
    el.setAttribute('style', `font-family:${family};font-size:${size}px;font-weight:${weight};fill:${fill}`)
    if (text.rtl) el.setAttribute('direction', 'rtl')
    el.textContent = txt
    copy.appendChild(el)
  }
  line('شجرة الأنبياء', y + 78, 64, gold, 700, '"Reem Kufi Variable", serif')
  line(text.title, y + 128, 30, gold)
  line(text.subtitle, y + 166, 18, ink, 400)
  line(text.footer, y + height - 40, 16, ink, 400)

  // Embed the fonts the drawing uses.
  const families = new Set<string>(['Reem Kufi Variable', 'Sora Variable'])
  copy.querySelectorAll('[style*="font-family"]').forEach((el) => {
    const f = /font-family:([^;]+)/.exec(el.getAttribute('style') ?? '')?.[1]
    f?.split(',').forEach((name) => families.add(name.replace(/["']/g, '').trim()))
  })
  const css = await embeddedFonts(families)
  if (css) {
    const style = document.createElementNS(SVG_NS, 'style')
    style.textContent = css
    copy.insertBefore(style, copy.firstChild)
  }

  const markup = '<?xml version="1.0" encoding="UTF-8"?>\n' + new XMLSerializer().serializeToString(copy)
  return { markup, width, height }
}

function save(blob: Blob, name: string) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = name
  document.body.appendChild(a)
  a.click()
  a.remove()
  setTimeout(() => URL.revokeObjectURL(url), 2000)
}

export function downloadSvg(markup: string, name: string) {
  save(new Blob([markup], { type: 'image/svg+xml;charset=utf-8' }), name)
}

/** Renders the poster to a PNG whose longest side is `longest` pixels (browsers cap canvases near 16k). */
export async function downloadPng(markup: string, width: number, height: number, name: string, longest = 8000) {
  const scale = Math.min(longest / Math.max(width, height), 4)
  const w = Math.round(width * scale)
  const h = Math.round(height * scale)
  const url = URL.createObjectURL(new Blob([markup], { type: 'image/svg+xml;charset=utf-8' }))
  try {
    const img = new Image()
    img.decoding = 'async'
    await new Promise<void>((res, rej) => {
      img.onload = () => res()
      img.onerror = () => rej(new Error('poster image failed to load'))
      img.src = url
    })
    const canvas = document.createElement('canvas')
    canvas.width = w
    canvas.height = h
    canvas.getContext('2d')!.drawImage(img, 0, 0, w, h)
    const blob = await new Promise<Blob | null>((res) => canvas.toBlob(res, 'image/png'))
    if (blob) save(blob, name)
  } finally {
    URL.revokeObjectURL(url)
  }
}

/** Opens the poster alone in a new tab and the print dialog, where it can be saved as a PDF. */
export function printPoster(markup: string, width: number, height: number, title: string) {
  const w = window.open('', '_blank')
  if (!w) return false
  const landscape = width > height
  w.document.write(
    `<!doctype html><html><head><meta charset="utf-8"><title>${title.replace(/</g, '&lt;')}</title>` +
      `<style>@page{size:${landscape ? 'A1 landscape' : 'A1 portrait'};margin:0}html,body{margin:0;background:#000}` +
      `svg{display:block;width:100vw;height:100vh}@media print{svg{width:100%;height:100%}}*{-webkit-print-color-adjust:exact;print-color-adjust:exact}</style>` +
      `</head><body>${markup.replace(/^<\?xml[^>]*>\s*/, '').replace('<svg ', '<svg preserveAspectRatio="xMidYMid meet" ')}</body></html>`,
  )
  w.document.close()
  // Print once the embedded fonts are ready.
  const ready = w.document.fonts?.ready ?? Promise.resolve()
  void ready.then(() => setTimeout(() => w.print(), 250))
  return true
}
