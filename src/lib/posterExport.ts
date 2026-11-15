import type { Lang } from '../data/types'
import { resolveWaypointSource, SOURCE_LEVEL_BADGE, type SiteSourceLevel } from '../data/archaeologySites'
import type { PropheticRoute, SacredSitePin } from '../components/TopographyMap'
import type { TreeLayout } from './layout'

function escXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function pickLang(
  text: { en: string; fr: string; ar: string; es?: string },
  lang: Lang,
): string {
  if (lang === 'es') return text.es ?? text.en
  return text[lang] ?? text.en
}

const POSTER_HEADERS: Record<
  Lang,
  {
    treeTitle: string
    treeSub: string
    mapTitle: string
    mapSub: string
    legendTitle: string
    prophetNode: string
    ululNode: string
    familyNode: string
    footerNote: string
  }
> = {
  en: {
    treeTitle: 'The Family Tree & Lineage of the 25 Prophets in the Qur’an',
    treeSub: 'Classroom Reference Poster · Every lineage link graded by Qur’an, Authentic Hadith, or Classical Tradition',
    mapTitle: 'Sacred Geography & Archaeological Atlas of the Prophets',
    mapSub: 'Classroom Cartographic Poster · Sourced Coordinates Distinguished by Qur’an, Hadith, Archaeology & Tradition',
    legendTitle: 'Source & Certainty Legend',
    prophetNode: 'Prophet (25 in Qur’an)',
    ululNode: 'Ulul ‘Azm (Arch-Prophet)',
    familyNode: 'Spouse / Child / Lineage',
    footerNote: 'Shajara — The Tree of the Prophets · Traditional geographic attributions are marked with dashed amber rings and never presented as certain.',
  },
  fr: {
    treeTitle: 'L’Arbre Généalogique des 25 Prophètes Nommés dans le Coran',
    treeSub: 'Affiche pédagogique de classe · Chaque lien est classé selon le Coran, le Hadith authentique ou la Tradition',
    mapTitle: 'Géographie Sacrée et Atlas Archéologique des Prophètes',
    mapSub: 'Affiche cartographique de classe · Coordonnées sourcées distinguant Coran, Hadith, Archéologie et Tradition',
    legendTitle: 'Légende des sources et certitudes',
    prophetNode: 'Prophète (25 dans le Coran)',
    ululNode: 'Ouloul ‘Azm (Doué de fermeté)',
    familyNode: 'Épouse / Enfant / Lignée',
    footerNote: 'Shajara — L’Arbre des Prophètes · Les attributions géographiques traditionnelles sont marquées d’un anneau ambré pointillé et ne sont jamais présentées comme certaines.',
  },
  ar: {
    treeTitle: 'شجرة نسب الأنبياء والمرسلين الخمسة والعشرين المذكورين في القرآن الكريم',
    treeSub: 'ملصق تعليمي للفصول الدراسية · كل صلة نسب موسومة بمرتبة ثبوتها من القرآن أو الحديث الصحيح أو الرواية التاريخية',
    mapTitle: 'أطلس الجغرافيا المقدسة والمعالم الأثرية للأنبياء والمرسلين',
    mapSub: 'ملصق جغرافي تعليمي · إحداثيات موثقة تميّز بدقة بين النص القرآني والحديث الصحيح والمسح الأثري والنسبة التقليدية غير الجازمة',
    legendTitle: 'مفتاح المصادر ومراتب الثبوت',
    prophetNode: 'نبي مرسل (٢٥ في القرآن)',
    ululNode: 'من أولي العزم من الرسل',
    familyNode: 'أهل البيت / الأزواج / الذرية',
    footerNote: 'شجرة الأنبياء · المواضع ذات النسبة التقليدية موسومة بحلقة كهرمانية متقطعة ولا يُجزم بتعيينها.',
  },
  es: {
    treeTitle: 'El Árbol Genealógico de los 25 Profetas Nombrados en el Corán',
    treeSub: 'Póster educativo de aula · Cada vínculo clasificado según el Corán, el Hadiz auténtico o la Tradición',
    mapTitle: 'Geografía Sagrada y Atlas Arqueológico de los Profetas',
    mapSub: 'Póster cartográfico de aula · Coordenadas documentadas según Corán, Hadiz, Arqueología y Tradición',
    legendTitle: 'Leyenda de fuentes y certeza',
    prophetNode: 'Profeta (25 en el Corán)',
    ululNode: 'Ulul ‘Azm (Firme resolución)',
    familyNode: 'Esposa / Hijo / Linaje',
    footerNote: 'Shajara — El Árbol de los Profetas · Las atribuciones tradicionales se marcan con anillo ámbar discontinuo y nunca se presentan como seguras.',
  },
}

/**
 * Generates a self-contained, classroom-ready A3 vector SVG poster of the Prophetic Family Tree
 * preserving labels in Arabic alongside the active language (English, French, Arabic, or Spanish).
 */
export function buildTreePosterSvg(layout: TreeLayout, lang: Lang): string {
  const header = POSTER_HEADERS[lang]
  const headerH = 150
  const footerH = 115
  const padX = 70
  const totalW = Math.max(1580, Math.ceil(layout.width + padX * 2))
  const totalH = Math.ceil(layout.height + headerH + footerH)
  const dir = lang === 'ar' ? 'rtl' : 'ltr'

  const edgeSvg = layout.edges
    .map((e) => {
      const stroke = e.isMarriage
        ? '#f472b6'
        : e.link.l === 'quran'
          ? '#e9c67b'
          : e.link.l === 'hadith'
            ? '#6ee7b7'
            : '#7dd3fc'
      const dash = e.arc
        ? '5 5'
        : e.link.l === 'tradition' || e.link.l === 'disputed'
          ? '6 4'
          : ''
      return `<path d="${escXml(e.d)}" fill="none" stroke="${stroke}" stroke-width="${e.isMarriage ? 1.8 : 2.2}" stroke-opacity="0.78"${dash ? ` stroke-dasharray="${dash}"` : ''} />`
    })
    .join('\n      ')

  const nodesSvg = layout.nodes
    .map((n) => {
      const p = n.person
      const isProphet = p.kind === 'prophet'
      const r = isProphet ? (p.ululAzm ? 20 : 16) : 11
      const fill = isProphet ? '#1c1810' : '#0f172a'
      const stroke = isProphet ? (p.ululAzm ? '#fde68a' : '#e9c67b') : p.kind === 'spouse' ? '#f472b6' : '#38bdf8'
      const strokeW = p.ululAzm ? 3 : 2
      const arName = escXml(p.name.ar)
      const locName = escXml(pickLang(p.name, lang))
      const showSub = lang !== 'ar' || (p.alt?.ar && p.alt.ar !== p.name.ar)
      const subLabel = lang === 'ar' ? escXml(p.alt?.ar ?? '') : locName
      const roleTag = p.order && isProphet ? `#${p.order}` : ''

      return `<g transform="translate(${n.x.toFixed(1)},${n.y.toFixed(1)})">
        ${p.ululAzm ? `<circle r="${r + 6}" fill="none" stroke="#fde68a" stroke-width="1.2" stroke-dasharray="3 3" opacity="0.85" />` : ''}
        <circle r="${r}" fill="${fill}" stroke="${stroke}" stroke-width="${strokeW}" />
        ${roleTag ? `<text y="4" text-anchor="middle" fill="#fde68a" font-size="9.5" font-weight="700" font-family="ui-monospace, monospace">${escXml(roleTag)}</text>` : ''}
        <rect x="-56" y="${r + 5}" width="112" height="${showSub && subLabel ? 36 : 22}" rx="7" fill="#070a18" fill-opacity="0.9" stroke="${stroke}" stroke-opacity="0.35" stroke-width="0.9" />
        <text y="${r + 20}" text-anchor="middle" fill="#fef3c7" font-size="${isProphet ? 14 : 12}" font-weight="700" font-family="'Amiri', 'Reem Kufi Variable', 'Traditional Arabic', serif">${arName}</text>
        ${showSub && subLabel ? `<text y="${r + 35}" text-anchor="middle" fill="#cbd5e1" font-size="10.5" font-weight="600" font-family="'Sora Variable', system-ui, sans-serif">${subLabel}</text>` : ''}
      </g>`
    })
    .join('\n      ')

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${totalW} ${totalH}" width="${totalW}" height="${totalH}" direction="${dir}">
  <defs>
    <linearGradient id="poster-bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#050814" />
      <stop offset="50%" stop-color="#090d20" />
      <stop offset="100%" stop-color="#050814" />
    </linearGradient>
  </defs>
  <rect width="${totalW}" height="${totalH}" fill="url(#poster-bg)" />
  <rect x="18" y="18" width="${totalW - 36}" height="${totalH - 36}" rx="20" fill="none" stroke="#e9c67b" stroke-opacity="0.45" stroke-width="2" />

  <!-- Classroom Poster Header -->
  <g transform="translate(${totalW / 2}, 54)">
    <text text-anchor="middle" fill="#e9c67b" font-size="28" font-weight="700" font-family="'Amiri', 'Reem Kufi Variable', serif">شجرة الأنبياء والمرسلين · Shajara</text>
    <text y="34" text-anchor="middle" fill="#f8fafc" font-size="22" font-weight="700" font-family="'Sora Variable', system-ui, sans-serif">${escXml(header.treeTitle)}</text>
    <text y="60" text-anchor="middle" fill="#94a3b8" font-size="13" font-family="'Sora Variable', system-ui, sans-serif">${escXml(header.treeSub)}</text>
  </g>
  <line x1="60" y1="${headerH - 12}" x2="${totalW - 60}" y2="${headerH - 12}" stroke="#e9c67b" stroke-opacity="0.25" stroke-width="1" />

  <!-- Tree Graph Content -->
  <g transform="translate(${padX}, ${headerH})">
    <g>
      ${edgeSvg}
    </g>
    <g>
      ${nodesSvg}
    </g>
  </g>

  <!-- Classroom Source & Symbol Legend Footer -->
  <g transform="translate(60, ${totalH - footerH + 16})">
    <rect width="${totalW - 120}" height="74" rx="14" fill="#0b1026" stroke="#e9c67b" stroke-opacity="0.3" stroke-width="1" />
    <text x="24" y="28" fill="#e9c67b" font-size="13" font-weight="700" font-family="'Sora Variable', system-ui, sans-serif">${escXml(header.legendTitle)}:</text>
    <circle cx="240" cy="24" r="7" fill="#1c1810" stroke="#e9c67b" stroke-width="2" />
    <text x="255" y="28" fill="#e2e8f0" font-size="12" font-family="'Sora Variable', system-ui, sans-serif">${escXml(header.prophetNode)}</text>
    <circle cx="470" cy="24" r="8" fill="#1c1810" stroke="#fde68a" stroke-width="2.5" stroke-dasharray="2 2" />
    <text x="486" y="28" fill="#fde68a" font-size="12" font-family="'Sora Variable', system-ui, sans-serif">${escXml(header.ululNode)}</text>
    <circle cx="710" cy="24" r="6" fill="#0f172a" stroke="#38bdf8" stroke-width="2" />
    <text x="724" y="28" fill="#cbd5e1" font-size="12" font-family="'Sora Variable', system-ui, sans-serif">${escXml(header.familyNode)}</text>
    <line x1="940" y1="24" x2="975" y2="24" stroke="#e9c67b" stroke-width="2.5" />
    <text x="983" y="28" fill="#fef3c7" font-size="12" font-family="'Sora Variable', system-ui, sans-serif">${escXml(SOURCE_LEVEL_BADGE.quran[lang])}</text>
    <line x1="1210" y1="24" x2="1245" y2="24" stroke="#7dd3fc" stroke-width="2" stroke-dasharray="5 4" />
    <text x="1253" y="28" fill="#bae6fd" font-size="12" font-family="'Sora Variable', system-ui, sans-serif">${escXml(SOURCE_LEVEL_BADGE.tradition[lang])}</text>
    <text x="24" y="54" fill="#94a3b8" font-size="11.5" font-family="'Sora Variable', system-ui, sans-serif">${escXml(header.footerNote)}</text>
  </g>
</svg>`
}

/**
 * Generates a pure-vector A3 cartographic classroom poster of `/map` with graticules, regional landmasses,
 * prophetic migration paths, and sourced archaeological waypoints keeping labels in Arabic + selected language.
 */
export function buildMapPosterSvg(
  sites: SacredSitePin[],
  routes: PropheticRoute[],
  lang: Lang,
): string {
  const header = POSTER_HEADERS[lang]
  const width = 1680
  const height = 1188
  const mapLeft = 60
  const mapTop = 140
  const mapW = 1560
  const mapH = 740
  const minLng = -10
  const maxLng = 70
  const minLat = 10
  const maxLat = 50

  const project = (lat: number, lng: number): [number, number] => {
    const clampedLng = Math.max(minLng, Math.min(maxLng, lng))
    const clampedLat = Math.max(minLat, Math.min(maxLat, lat))
    const x = mapLeft + ((clampedLng - minLng) / (maxLng - minLng)) * mapW
    const y = mapTop + ((maxLat - clampedLat) / (maxLat - minLat)) * mapH
    return [Number(x.toFixed(1)), Number(y.toFixed(1))]
  }

  // Graticule grid lines
  const graticules: string[] = []
  for (let lng = 0; lng <= 60; lng += 15) {
    const [x] = project(minLat, lng)
    graticules.push(
      `<line x1="${x}" y1="${mapTop}" x2="${x}" y2="${mapTop + mapH}" stroke="#1e293b" stroke-width="1" stroke-dasharray="4 4" />`,
      `<text x="${x + 4}" y="${mapTop + 16}" fill="#64748b" font-size="10" font-family="ui-monospace, monospace">${lng}°E</text>`,
    )
  }
  for (let lat = 15; lat <= 45; lat += 10) {
    const [, y] = project(lat, minLng)
    graticules.push(
      `<line x1="${mapLeft}" y1="${y}" x2="${mapLeft + mapW}" y2="${y}" stroke="#1e293b" stroke-width="1" stroke-dasharray="4 4" />`,
      `<text x="${mapLeft + 8}" y="${y - 5}" fill="#64748b" font-size="10" font-family="ui-monospace, monospace">${lat}°N</text>`,
    )
  }

  // Stylized regional geographic polygons (Arabian Peninsula, Nile & Red Sea corridor, Mesopotamia, Levant/Anatolia)
  const arabiaPoly = [
    [30.0, 32.5], [29.5, 34.9], [20.0, 40.2], [12.6, 43.4], [14.5, 49.2],
    [17.0, 54.1], [22.5, 59.8], [26.2, 56.3], [29.9, 48.0], [31.0, 46.0],
  ]
    .map(([la, ln]) => project(la!, ln!).join(','))
    .join(' ')

  const routesSvg = routes
    .map((r) => {
      const pts = r.coords.map(([la, ln]) => project(la, ln).join(',')).join(' ')
      return `<polyline points="${pts}" fill="none" stroke="${r.color}" stroke-width="2.2" stroke-opacity="0.65" stroke-dasharray="6 4" />`
    })
    .join('\n      ')

  const levelColor: Record<SiteSourceLevel, string> = {
    quran: '#e9c67b',
    hadith: '#34d399',
    archaeology: '#38bdf8',
    tradition: '#fbbf24',
  }

  const sitesSvg = sites
    .map((s, idx) => {
      const [x, y] = project(s.lat, s.lng)
      const meta = resolveWaypointSource(s)
      const col = levelColor[meta.sourceLevel]
      const isTradition = meta.sourceLevel === 'tradition'
      const labelOffsetY = idx % 2 === 0 ? -12 : 19
      const primaryLabel = escXml(pickLang(s.name, lang).replace(/\s*\(.*?\)/g, ''))
      const arShort = escXml(s.name.ar.replace(/\s*\(.*?\)/g, ''))
      const combinedLabel = lang === 'ar' ? arShort : `${primaryLabel} · ${arShort}`

      return `<g transform="translate(${x},${y})">
        ${isTradition ? `<circle r="10" fill="none" stroke="#fbbf24" stroke-width="1.3" stroke-dasharray="2.5 2.5" />` : ''}
        <circle r="5.5" fill="#080b1c" stroke="${col}" stroke-width="2.2" />
        <circle r="2.2" fill="${col}" />
        <text y="${labelOffsetY}" text-anchor="middle" fill="#f8fafc" font-size="9.5" font-weight="600" font-family="'Sora Variable', 'Amiri', sans-serif">${combinedLabel}</text>
      </g>`
    })
    .join('\n      ')

  // Indexed classroom reference table along the bottom (top 24 sites with coordinates & certainty badge)
  const directorySites = sites.slice(0, 24)
  const colW = 385
  const dirRows = directorySites
    .map((s, i) => {
      const colIdx = Math.floor(i / 6)
      const rowIdx = i % 6
      const dx = 65 + colIdx * colW
      const dy = 935 + rowIdx * 28
      const meta = resolveWaypointSource(s)
      const badgeCol = levelColor[meta.sourceLevel]
      const shortName = escXml(pickLang(s.name, lang).slice(0, 32))
      const coord = `${s.lat.toFixed(2)}°N, ${s.lng.toFixed(2)}°E`
      const tag =
        meta.sourceLevel === 'tradition'
          ? 'TRAD*'
          : meta.sourceLevel === 'archaeology'
            ? 'ARCH'
            : meta.sourceLevel.toUpperCase()
      return `<g transform="translate(${dx},${dy})">
        <circle cx="6" cy="-4" r="4" fill="${badgeCol}" />
        <text x="16" y="0" fill="#e2e8f0" font-size="10.5" font-weight="600" font-family="'Sora Variable', 'Amiri', sans-serif">${i + 1}. ${shortName}</text>
        <text x="235" y="0" fill="#94a3b8" font-size="9.5" font-family="ui-monospace, monospace">${coord}</text>
        <text x="335" y="0" fill="${badgeCol}" font-size="9" font-weight="700" font-family="ui-monospace, monospace">[${tag}]</text>
      </g>`
    })
    .join('\n    ')

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" direction="${lang === 'ar' ? 'rtl' : 'ltr'}">
  <rect width="${width}" height="${height}" fill="#050814" />
  <rect x="18" y="18" width="${width - 36}" height="${height - 36}" rx="20" fill="none" stroke="#e9c67b" stroke-opacity="0.45" stroke-width="2" />

  <!-- Header -->
  <g transform="translate(${width / 2}, 52)">
    <text text-anchor="middle" fill="#e9c67b" font-size="26" font-weight="700" font-family="'Amiri', 'Reem Kufi Variable', serif">أطلس الأنبياء الجغرافي والأثري · Shajara Map</text>
    <text y="32" text-anchor="middle" fill="#f8fafc" font-size="21" font-weight="700" font-family="'Sora Variable', system-ui, sans-serif">${escXml(header.mapTitle)}</text>
    <text y="56" text-anchor="middle" fill="#94a3b8" font-size="12.5" font-family="'Sora Variable', system-ui, sans-serif">${escXml(header.mapSub)}</text>
  </g>

  <!-- Vector Cartographic Frame -->
  <rect x="${mapLeft}" y="${mapTop}" width="${mapW}" height="${mapH}" rx="16" fill="#070c1e" stroke="#334155" stroke-width="1.5" />
  <polygon points="${arabiaPoly}" fill="#0f172a" fill-opacity="0.7" stroke="#1e293b" stroke-width="1.2" />
  <g>
    ${graticules.join('\n    ')}
  </g>
  <g>
    ${routesSvg}
  </g>
  <g>
    ${sitesSvg}
  </g>

  <!-- Certainty Legend & Coordinate Directory -->
  <text x="65" y="906" fill="#e9c67b" font-size="12.5" font-weight="700" font-family="'Sora Variable', system-ui, sans-serif">${escXml(header.legendTitle)}: [QURAN] ${escXml(SOURCE_LEVEL_BADGE.quran[lang])} · [HADITH] ${escXml(SOURCE_LEVEL_BADGE.hadith[lang])} · [ARCH] ${escXml(SOURCE_LEVEL_BADGE.archaeology[lang])} · [TRAD*] ${escXml(SOURCE_LEVEL_BADGE.tradition[lang])}</text>
  <g>
    ${dirRows}
  </g>
  <text x="65" y="1148" fill="#fbbf24" font-size="11" font-family="'Sora Variable', system-ui, sans-serif">* ${escXml(header.footerNote)}</text>
</svg>`
}

export function downloadSvgPoster(svgContent: string, filename: string): void {
  const blob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}

export function printPosterAsPdf(svgContent: string, title: string, lang: Lang): Window | null {
  const win = window.open('', '_blank', 'noopener,noreferrer,width=1280,height=900')
  if (!win) return null
  const dir = lang === 'ar' ? 'rtl' : 'ltr'
  win.document.open()
  win.document.write(`<!doctype html>
<html lang="${escXml(lang)}" dir="${dir}">
<head>
  <meta charset="utf-8" />
  <title>${escXml(title)}</title>
  <style>
    @page { size: A3 landscape; margin: 6mm; }
    html, body {
      margin: 0;
      padding: 0;
      background: #050814;
      color: #f8fafc;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
    }
    svg {
      width: 100%;
      height: auto;
      max-height: 98vh;
      display: block;
    }
  </style>
</head>
<body>
  ${svgContent}
  <script>
    window.addEventListener('load', () => {
      setTimeout(() => { window.focus(); window.print(); }, 250);
    });
  </script>
</body>
</html>`)
  win.document.close()
  return win
}
