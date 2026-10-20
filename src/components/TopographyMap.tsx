import { useEffect, useRef, useState, useMemo } from 'react'
import {
  Compass,
  ExternalLink,
  MapPin,
  Mountain,
  Navigation,
  RotateCcw,
  Search,
  Sparkles,
  X,
} from 'lucide-react'
import type L from 'leaflet'
import { useI18n } from '../i18n'
import { byId, prophets } from '../data/people'
import type { Person } from '../data/types'
import { hrefOf } from '../lib/router'
import { A, FactText, Scene } from './ui'

type MapStyle = 'satellite' | 'dark' | 'terrain'

interface SacredSitePin {
  id: string
  name: { en: string; fr: string; ar: string }
  type: 'mountain' | 'sanctuary' | 'well' | 'city'
  lat: number
  lng: number
  desc: { en: string; fr: string; ar: string }
  prophetId?: string
}

const SACRED_SITES: SacredSitePin[] = [
  {
    id: 'kaaba',
    name: { en: 'Al-Ka‘bah & The Sacred Sanctuary', fr: 'La Ka‘bah et le Sanctuaire Sacré', ar: 'الكعبة المشرفة والمسجد الحرام' },
    type: 'sanctuary',
    lat: 21.4225,
    lng: 39.8262,
    desc: { en: 'First sanctuary built for mankind; raised by Ibrahim and Ismail.', fr: 'Premier sanctuaire édifié pour l’humanité, élevé par Ibrahim et Ismail.', ar: 'أول بيت وُضع للناس، رفعه إبراهيم وإسماعيل عليهما السلام.' },
    prophetId: 'ibrahim',
  },
  {
    id: 'madinah_rawdah',
    name: { en: 'The Prophet’s Mosque & Rawdah', fr: 'La Mosquée du Prophète et la Rawdah', ar: 'المسجد النبوي والروضة الشريفة' },
    type: 'sanctuary',
    lat: 24.4686,
    lng: 39.6108,
    desc: { en: 'Final resting place of Prophet Muhammad ﷺ in Madinah.', fr: 'Dernière demeure du Prophète Muhammad ﷺ à Médine.', ar: 'مسجد رسول الله ﷺ ومدفنه الشريف في المدينة المنورة.' },
    prophetId: 'muhammad',
  },
  {
    id: 'aqsa',
    name: { en: 'Al-Masjid al-Aqsa (Jerusalem)', fr: 'Al-Masjid al-Aqsa (Jérusalem)', ar: 'المسجد الأقصى المبارك (القدس)' },
    type: 'sanctuary',
    lat: 31.7761,
    lng: 35.2358,
    desc: { en: 'The second mosque placed on earth, destination of the Night Journey (Isra).', fr: 'Deuxième mosquée sur terre, destination du Voyage nocturne (Isra).', ar: 'ثاني مسجد وُضع في الأرض ومسرى النبي ﷺ في ليلة الإسراء.' },
    prophetId: 'isa',
  },
  {
    id: 'sinai',
    name: { en: 'Mount Sinai (Jabal Musa / Tur)', fr: 'Mont Sinaï (Jabal Moussa / Tour)', ar: 'طور سيناء (جبل موسى)' },
    type: 'mountain',
    lat: 28.5394,
    lng: 33.9753,
    desc: { en: 'Sacred mountain where Allah spoke directly to Musa.', fr: 'Montagne sacrée où Allah parla directement à Musa.', ar: 'الجبل المقدس حيث كلّم الله تعالى موسى تكليمًا.' },
    prophetId: 'musa',
  },
  {
    id: 'judy',
    name: { en: 'Mount Judy (Jabal Judi)', fr: 'Mont Djoudi', ar: 'جبل الجودي' },
    type: 'mountain',
    lat: 37.3800,
    lng: 42.4500,
    desc: { en: 'The mountain where Nuh’s Ark rested after the Great Deluge (Qur’an 11:44).', fr: 'Montagne où s’est posée l’Arche de Nuh après le grand déluge.', ar: 'الموضع الذي استوت عليه سفينة نوح بعد الطوفان العظيم ﴿وَاسْتَوَتْ عَلَى الْجُودِيِّ﴾.' },
    prophetId: 'nuh',
  },
  {
    id: 'hira',
    name: { en: 'Cave of Hira (Jabal an-Nour)', fr: 'Grotte de Hira (Mont de la Lumière)', ar: 'غار حراء (جبل النور)' },
    type: 'mountain',
    lat: 21.4583,
    lng: 39.8583,
    desc: { en: 'The mountain cave where the Archangel Jibril descended with the first revelation: Iqra.', fr: 'La grotte où l’ange Jibril descendit avec les premiers versets du Coran.', ar: 'الغار الذي نزل فيه الوحي جبريل عليه السلام بأول آيات القرآن الكريم: ﴿اقْرَأْ﴾.' },
    prophetId: 'muhammad',
  },
  {
    id: 'thawr',
    name: { en: 'Cave of Thawr (Jabal Thawr)', fr: 'Grotte de Thawr', ar: 'غار ثور' },
    type: 'mountain',
    lat: 21.3786,
    lng: 39.8497,
    desc: { en: 'Sanctuary where the Prophet ﷺ and Abu Bakr hid during the historic Hijrah.', fr: 'Refuge où le Prophète ﷺ et Abou Bakr s’abritèrent lors de l’Hégire.', ar: 'الغار الذي لجأ إليه النبي ﷺ وأبو بكر في طريق الهجرة ﴿إِذْ يَقُولُ لِصَاحِبِهِ لَا تَحْزَنْ إِنَّ اللَّهَ مَعَنَا﴾.' },
    prophetId: 'muhammad',
  },
  {
    id: 'zamzam',
    name: { en: 'The Spring of Zamzam', fr: 'Le Puits de Zamzam', ar: 'بئر زمزم المبارك' },
    type: 'well',
    lat: 21.4226,
    lng: 39.8264,
    desc: { en: 'Miraculous freshwater spring that gushed forth for Hajar and infant Ismail.', fr: 'Source miraculeuse qui jaillit sous les pieds du nourrisson Ismail et sa mère Hajar.', ar: 'النبع المبارك الذي فجّره جبريل لهاجر وطفلها إسماعيل في وادٍ غير ذي زرع.' },
    prophetId: 'ismail',
  },
  {
    id: 'hebron',
    name: { en: 'Cave of the Patriarchs (Al-Khalil)', fr: 'Tombeau des Patriarches (Hébron)', ar: 'الحرم الإبراهيمي (الخليل)' },
    type: 'city',
    lat: 31.5247,
    lng: 35.1107,
    desc: { en: 'Burial site of Ibrahim, Sarah, Ishaq, and Ya‘qub in Palestine.', fr: 'Lieu d’inhumation d’Ibrahim, Sarah, Ishaq et Ya‘qub en Palestine.', ar: 'مدفن خليل الرحمن إبراهيم وزوجه سارة وإسحاق ويعقوب عليهم السلام.' },
    prophetId: 'ibrahim',
  },
  {
    id: 'madyan_well',
    name: { en: 'The Well of Midian (Al-Bad‘)', fr: 'Le Puits de Madyan', ar: 'بئر مدين (مغاير شعيب)' },
    type: 'well',
    lat: 28.4833,
    lng: 35.0167,
    desc: { en: 'The freshwater well where Musa watered the flocks for the two daughters of Shu‘ayb.', fr: 'Le puits où Musa abreuva le troupeau pour les filles de Chou‘ayb.', ar: 'ماء مدين حيث سقى موسى لفتاتي الشيخ الصالح وتزوج إحداهما.' },
    prophetId: 'shuayb',
  },
]

const ROUTES = [
  {
    id: 'ibrahim_path',
    name: { en: 'Migration Path of Ibrahim عليه السلام', fr: 'Itinéraire d’Ibrahim عليه السلام', ar: 'مسار هجرة إبراهيم الخليل عليه السلام' },
    color: '#e9c67b',
    coords: [
      [30.9628, 46.1030], // Ur (Iraq)
      [32.5422, 44.4210], // Babylon
      [36.8667, 39.0333], // Haran
      [33.5138, 36.2765], // Damascus
      [31.5247, 35.1107], // Hebron / Canaan
      [30.0444, 31.2357], // Egypt
      [21.4225, 39.8262], // Makkah
    ] as [number, number][],
  },
  {
    id: 'musa_exodus',
    name: { en: 'The Exodus of Musa عليه السلام', fr: 'L’Exode de Musa عليه السلام', ar: 'مسار الخروج لموسى عليه السلام وبني إسرائيل' },
    color: '#38bdf8',
    coords: [
      [30.5852, 31.5035], // Nile Delta
      [29.9668, 32.5498], // Red Sea Crossing
      [28.5394, 33.9753], // Mount Sinai
      [28.4833, 35.0167], // Midian
      [31.7683, 35.7253], // Mount Nebo
    ] as [number, number][],
  },
  {
    id: 'muhammad_hijrah',
    name: { en: 'The Blessed Hijrah to Madinah', fr: 'La sainte Hégire vers Médine', ar: 'طريق الهجرة النبوية الشريفة' },
    color: '#4ade80',
    coords: [
      [21.4225, 39.8262], // Makkah
      [21.3786, 39.8497], // Cave of Thawr
      [22.8000, 39.0000], // Coastal Way
      [24.4392, 39.6172], // Quba
      [24.4686, 39.6108], // Al-Masjid an-Nabawi
    ] as [number, number][],
  },
]

const ERAS = [
  { id: 'all', label: { en: 'All Eras', fr: 'Toutes époques', ar: 'جميع العصور' } },
  { id: 'primordial', label: { en: 'Primordial', fr: 'Origines', ar: 'البدايات الأولى' }, ids: ['adam', 'idris', 'nuh'] },
  { id: 'arabia', label: { en: 'Ancient Arabia', fr: 'Arabie antique', ar: 'العرب القدماء' }, ids: ['hud', 'salih'] },
  { id: 'abrahamic', label: { en: 'Abrahamic', fr: 'Abrahamique', ar: 'العهد الإبراهيمي' }, ids: ['ibrahim', 'lut', 'ismail', 'ishaq', 'yaqub', 'yusuf'] },
  { id: 'israelite', label: { en: 'Mosaic & Israelite', fr: 'Mosaïque et Rois', ar: 'موسى وملوك إسرائيل' }, ids: ['ayyub', 'shuayb', 'musa', 'harun', 'dhulkifl', 'dawud', 'sulayman', 'ilyas', 'alyasa', 'yunus'] },
  { id: 'prophetic', label: { en: 'Messianic & Seal', fr: 'Messianique et Sceau', ar: 'المسيح وخاتم النبيين' }, ids: ['zakariya', 'yahya', 'isa', 'muhammad'] },
]

export function TopographyMap({ focus }: { focus?: string }) {
  const { t, pick, lang } = useI18n()
  const mapContainer = useRef<HTMLDivElement>(null)
  const mapInstance = useRef<L.Map | null>(null)
  const layersRef = useRef<{ [key: string]: L.Layer }>({})

  const [mapStyle, setMapStyle] = useState<MapStyle>('satellite')
  const [selectedId, setSelectedId] = useState<string | null>(focus ?? null)
  const [selectedSite, setSelectedSite] = useState<SacredSitePin | null>(null)
  const [activeEra, setActiveEra] = useState<string>('all')
  const [showSites, setShowSites] = useState(true)
  const [showRoutes, setShowRoutes] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [mapReady, setMapReady] = useState(false)

  const activeProphetIds = useMemo(() => {
    if (activeEra === 'all') return new Set(prophets.map((p) => p.id))
    const eraObj = ERAS.find((e) => e.id === activeEra)
    return new Set(eraObj?.ids ?? [])
  }, [activeEra])

  const selectedPerson = selectedId ? byId.get(selectedId) : undefined

  // Filtered search list
  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase()
    if (!q) return []
    return prophets.filter((p) => {
      const matchName =
        p.name.en.toLowerCase().includes(q) ||
        p.name.fr.toLowerCase().includes(q) ||
        p.name.ar.includes(q) ||
        (p.alt?.en && p.alt.en.toLowerCase().includes(q))
      const matchRegion =
        p.topography?.region &&
        (p.topography.region.en.toLowerCase().includes(q) ||
          p.topography.region.ar.includes(q))
      return matchName || matchRegion
    })
  }, [searchQuery])

  // Initialize Leaflet Map Dynamically (Safe for SSR and JSDOM)
  useEffect(() => {
    if (!mapContainer.current || mapInstance.current) return

    let isMounted = true
    import('leaflet').then((leafletModule) => {
      if (!isMounted || !mapContainer.current) return
      const Leaflet = leafletModule.default || leafletModule

      const initialCenter: [number, number] = [27.0, 39.5]
      const initialZoom = 5

      const map = Leaflet.map(mapContainer.current, {
        center: initialCenter,
        zoom: initialZoom,
        minZoom: 3,
        maxZoom: 17,
        zoomControl: false,
        attributionControl: false,
      })

      // Custom zoom control in bottom-end
      Leaflet.control.zoom({ position: 'bottomright' }).addTo(map)

      mapInstance.current = map
      setMapReady(true)
    })

    return () => {
      isMounted = false
      if (mapInstance.current) {
        mapInstance.current.remove()
        mapInstance.current = null
      }
    }
  }, [])

  // Update Base Tile Layer when mapStyle changes
  useEffect(() => {
    const map = mapInstance.current
    if (!map) return

    import('leaflet').then((leafletModule) => {
      const Leaflet = leafletModule.default || leafletModule

      if (layersRef.current.tileLayer) {
        map.removeLayer(layersRef.current.tileLayer)
      }

      let tileUrl = ''
      let attribution = ''

      if (mapStyle === 'satellite') {
        tileUrl = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
        attribution = 'Tiles &copy; Esri, Maxar, Earthstar Geographics'
      } else if (mapStyle === 'terrain') {
        tileUrl = 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png'
        attribution = 'Map data: &copy; OpenStreetMap contributors, SRTM | Map style: &copy; OpenTopoMap'
      } else {
        // Dark theme
        tileUrl = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
        attribution = '&copy; OpenStreetMap contributors &copy; CARTO'
      }

      const tileLayer = Leaflet.tileLayer(tileUrl, {
        maxZoom: 18,
        subdomains: 'abcd',
        attribution,
      }).addTo(map)

      layersRef.current.tileLayer = tileLayer
    })
  }, [mapStyle, mapReady])

  // Update Prophet Markers & Sacred Sites
  useEffect(() => {
    const map = mapInstance.current
    if (!map || !mapReady) return

    import('leaflet').then((leafletModule) => {
      const Leaflet = leafletModule.default || leafletModule

      // Remove existing marker layer group
      if (layersRef.current.markersGroup) {
        map.removeLayer(layersRef.current.markersGroup)
      }
      if (layersRef.current.sitesGroup) {
        map.removeLayer(layersRef.current.sitesGroup)
      }
      if (layersRef.current.routesGroup) {
        map.removeLayer(layersRef.current.routesGroup)
      }

      const markersGroup = Leaflet.layerGroup()
      const sitesGroup = Leaflet.layerGroup()
      const routesGroup = Leaflet.layerGroup()

      // 1. Draw Routes
      if (showRoutes) {
        ROUTES.forEach((r) => {
          Leaflet.polyline(r.coords, {
            color: r.color,
            weight: 3,
            opacity: 0.8,
            dashArray: '6, 8',
          })
            .bindTooltip(r.name[lang], { sticky: true, className: 'leaflet-tooltip-dark' })
            .addTo(routesGroup)
        })
      }

      // 2. Sacred Sites
      if (showSites) {
        SACRED_SITES.forEach((site) => {
          const isMountain = site.type === 'mountain'
          const isSanctuary = site.type === 'sanctuary'
          const bgCol = isSanctuary ? 'rgba(233, 198, 123, 0.9)' : isMountain ? 'rgba(56, 189, 248, 0.9)' : 'rgba(74, 222, 128, 0.9)'

          const iconHtml = `
            <div style="
              display: flex;
              align-items: center;
              justify-content: center;
              width: 24px;
              height: 24px;
              border-radius: 50%;
              background: #080b1c;
              border: 1.5px solid ${bgCol};
              box-shadow: 0 0 10px ${bgCol};
              cursor: pointer;
            ">
              <div style="width: 8px; height: 8px; border-radius: 50%; background: ${bgCol};"></div>
            </div>
          `

          const siteIcon = Leaflet.divIcon({
            html: iconHtml,
            className: 'site-pin-glow',
            iconSize: [24, 24],
            iconAnchor: [12, 12],
          })

          const marker = Leaflet.marker([site.lat, site.lng], { icon: siteIcon })
          marker.on('click', () => {
            setSelectedSite(site)
            setSelectedId(null)
            map.flyTo([site.lat, site.lng], Math.max(map.getZoom(), 8), { duration: 1 })
          })
          marker.bindTooltip(
            `<div style="font-family: inherit; font-size: 11px; font-weight: bold; padding: 2px 4px;">${site.name[lang]}</div>`,
            { direction: 'top', offset: [0, -10] },
          )
          marker.addTo(sitesGroup)
        })
      }

      // 3. Prophet Markers
      prophets.forEach((p) => {
        if (!p.topography?.mapCoordinates) return
        const isVisible = activeProphetIds.has(p.id)
        if (!isVisible) return

        const { lat, lng } = p.topography.mapCoordinates
        const isSelected = selectedId === p.id
        const isUlul = p.ululAzm

        const orbColor = isSelected ? '#ffffff' : '#e9c67b'
        const borderColor = isUlul ? '#fbe6b0' : 'rgba(233, 198, 123, 0.8)'
        const pulseAnim = isSelected ? 'animation: pulse-ring 2s infinite;' : ''

        const iconHtml = `
          <div style="position: relative; display: flex; flex-direction: column; align-items: center; cursor: pointer; user-select: none;">
            <div style="
              position: relative;
              width: ${isSelected ? '32px' : '26px'};
              height: ${isSelected ? '32px' : '26px'};
              border-radius: 50%;
              background: radial-gradient(circle at 35% 35%, #fff, ${orbColor} 60%, #8a6327 100%);
              border: 2px solid ${borderColor};
              box-shadow: 0 0 ${isSelected ? '24px 6px' : '12px 2px'} rgba(233, 198, 123, 0.85);
              transition: all 0.3s ease;
              ${pulseAnim}
            "></div>
            <div style="
              margin-top: 4px;
              background: rgba(8, 11, 28, 0.88);
              border: 1px solid rgba(233, 198, 123, 0.35);
              backdrop-filter: blur(8px);
              padding: 2px 8px;
              border-radius: 12px;
              color: #fbe6b0;
              font-family: 'Reem Kufi Variable', serif;
              font-size: 13px;
              font-weight: 600;
              white-space: nowrap;
              box-shadow: 0 4px 12px rgba(0,0,0,0.7);
            ">
              ${p.name.ar}
            </div>
          </div>
        `

        const markerIcon = Leaflet.divIcon({
          html: iconHtml,
          className: 'prophet-pin-glow',
          iconSize: [80, 50],
          iconAnchor: [40, 15],
        })

        const marker = Leaflet.marker([lat, lng], { icon: markerIcon })
        marker.on('click', () => {
          setSelectedId(p.id)
          setSelectedSite(null)
          map.flyTo([lat, lng], Math.max(map.getZoom(), 7), { duration: 1.2 })
        })
        marker.addTo(markersGroup)
      })

      markersGroup.addTo(map)
      sitesGroup.addTo(map)
      routesGroup.addTo(map)

      layersRef.current.markersGroup = markersGroup
      layersRef.current.sitesGroup = sitesGroup
      layersRef.current.routesGroup = routesGroup
    })
  }, [activeProphetIds, selectedId, showSites, showRoutes, mapReady, lang])

  // Center on initial focus if provided
  useEffect(() => {
    if (!focus || !mapInstance.current || !mapReady) return
    const p = byId.get(focus)
    if (p?.topography?.mapCoordinates) {
      mapInstance.current.flyTo(
        [p.topography.mapCoordinates.lat, p.topography.mapCoordinates.lng],
        7,
        { duration: 1.5 },
      )
    }
  }, [focus, mapReady])

  const flyToProphet = (p: Person) => {
    setSelectedId(p.id)
    setSelectedSite(null)
    setSearchQuery('')
    if (p.topography?.mapCoordinates && mapInstance.current) {
      mapInstance.current.flyTo(
        [p.topography.mapCoordinates.lat, p.topography.mapCoordinates.lng],
        7,
        { duration: 1.2 },
      )
    }
  }

  const resetView = () => {
    setSelectedId(null)
    setSelectedSite(null)
    if (mapInstance.current) {
      mapInstance.current.flyTo([27.0, 39.5], 5, { duration: 1 })
    }
  }

  return (
    <div className="relative h-full w-full overflow-hidden bg-night">
      {/* Map Target Container */}
      <div ref={mapContainer} className="h-full w-full outline-none" tabIndex={0} />

      {/* Floating Header Controls */}
      <div className="pointer-events-none absolute inset-x-4 top-3 flex flex-wrap items-center justify-between gap-3 sm:inset-x-6 sm:top-5">
        {/* Style & Layer Toggles */}
        <div className="glass pointer-events-auto flex items-center gap-1 rounded-full p-1.5 shadow-xl">
          <button
            type="button"
            onClick={() => setMapStyle('satellite')}
            className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${
              mapStyle === 'satellite'
                ? 'bg-gold/30 text-gold-2 shadow-sm'
                : 'text-ink-3 hover:text-ink'
            }`}
          >
            <Compass className="size-3.5" />
            <span>Satellite</span>
          </button>
          <button
            type="button"
            onClick={() => setMapStyle('dark')}
            className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${
              mapStyle === 'dark'
                ? 'bg-gold/30 text-gold-2 shadow-sm'
                : 'text-ink-3 hover:text-ink'
            }`}
          >
            <Sparkles className="size-3.5" />
            <span>Dark</span>
          </button>
          <button
            type="button"
            onClick={() => setMapStyle('terrain')}
            className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${
              mapStyle === 'terrain'
                ? 'bg-gold/30 text-gold-2 shadow-sm'
                : 'text-ink-3 hover:text-ink'
            }`}
          >
            <Mountain className="size-3.5" />
            <span>Terrain</span>
          </button>
        </div>

        {/* Feature Toggles (Sites & Routes) */}
        <div className="glass pointer-events-auto flex items-center gap-1.5 rounded-full p-1.5 text-xs shadow-xl">
          <button
            type="button"
            onClick={() => setShowSites((v) => !v)}
            className={`rounded-full px-3 py-1 font-medium transition-colors ${
              showSites ? 'bg-sky-400/20 text-sky-200' : 'text-ink-3 hover:text-ink'
            }`}
          >
            <MapPin className="me-1 inline size-3" />
            <span>{t('sacredSites')}</span>
          </button>
          <button
            type="button"
            onClick={() => setShowRoutes((v) => !v)}
            className={`rounded-full px-3 py-1 font-medium transition-colors ${
              showRoutes ? 'bg-emerald-400/20 text-emerald-200' : 'text-ink-3 hover:text-ink'
            }`}
          >
            <Navigation className="me-1 inline size-3" />
            <span>{t('missionRoute')}</span>
          </button>
          <button
            type="button"
            onClick={resetView}
            className="flex items-center gap-1 rounded-full px-2.5 py-1 text-ink-3 hover:text-gold transition-colors"
            title={t('resetView')}
          >
            <RotateCcw className="size-3.5" />
          </button>
        </div>
      </div>

      {/* Floating Era Filter Bar */}
      <div className="pointer-events-none absolute inset-x-4 top-16 flex justify-center sm:top-20">
        <div className="glass pointer-events-auto flex flex-wrap items-center justify-center gap-1.5 rounded-2xl p-1.5 shadow-xl max-w-2xl">
          {ERAS.map((era) => (
            <button
              key={era.id}
              type="button"
              onClick={() => setActiveEra(era.id)}
              className={`rounded-xl px-3 py-1 text-xs transition-colors ${
                activeEra === era.id
                  ? 'border border-gold/40 bg-gold/20 text-gold-2 font-medium shadow-sm'
                  : 'text-ink-3 hover:text-ink hover:bg-white/5'
              }`}
            >
              {era.label[lang]}
            </button>
          ))}
        </div>
      </div>

      {/* Prophet Search Floating Widget */}
      <div className="pointer-events-none absolute start-4 top-32 z-10 w-72 sm:start-6 sm:top-36">
        <div className="glass pointer-events-auto relative rounded-2xl p-1.5 shadow-xl">
          <div className="relative flex items-center">
            <Search className="size-4 absolute start-3 text-ink-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('searchPlaceholder')}
              className="w-full rounded-xl bg-black/40 py-1.5 ps-9 pe-3 text-xs text-ink placeholder:text-ink-3 focus:outline-none focus:ring-1 focus:ring-gold/50"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute end-2 text-ink-3 hover:text-ink"
              >
                <X className="size-3.5" />
              </button>
            )}
          </div>

          {/* Search Dropdown Results */}
          {searchResults.length > 0 && (
            <div className="mt-2 max-h-56 overflow-y-auto rounded-xl border border-white/10 bg-night-2/95 p-1 backdrop-blur shadow-2xl">
              {searchResults.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => flyToProphet(p)}
                  className="flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-start text-xs text-ink hover:bg-gold/15 transition-colors"
                >
                  <span className="font-semibold text-gold-2">{pick(p.name)}</span>
                  <span className="ar-name text-sm text-gold">{p.name.ar}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Selected Sacred Site Drawer */}
      {selectedSite && !selectedPerson && (
        <aside className="glass-strong absolute inset-x-4 bottom-4 z-20 flex flex-col rounded-3xl border border-sky-400/30 p-5 shadow-2xl sm:inset-x-auto sm:end-6 sm:top-24 sm:bottom-6 sm:w-96">
          <div className="flex items-start justify-between gap-3">
            <div>
              <span className="rounded-full bg-sky-400/20 px-2.5 py-0.5 text-[0.65rem] font-semibold text-sky-200 uppercase tracking-wider">
                {selectedSite.type}
              </span>
              <h3 className="mt-1.5 text-lg font-bold text-ink sm:text-xl">{selectedSite.name[lang]}</h3>
              <p className="ar-name text-2xl font-bold text-gold">{selectedSite.name.ar}</p>
            </div>
            <button
              type="button"
              onClick={() => setSelectedSite(null)}
              className="rounded-full p-1 text-ink-3 hover:bg-white/10 hover:text-ink"
            >
              <X className="size-4" />
            </button>
          </div>
          <p className="mt-4 text-xs leading-relaxed text-ink-2">{selectedSite.desc[lang]}</p>
          <div className="mt-4 rounded-xl border border-white/5 bg-white/[0.02] p-3 text-xs text-ink-3">
            <span className="font-medium text-ink-2">Coordinates:</span> {selectedSite.lat.toFixed(4)}° N, {selectedSite.lng.toFixed(4)}° E
          </div>
        </aside>
      )}

      {/* Selected Prophet Detail Drawer */}
      {selectedPerson && (
        <aside className="glass-strong absolute inset-x-4 bottom-4 z-20 flex max-h-[80vh] flex-col overflow-hidden rounded-3xl border border-gold/40 shadow-2xl sm:inset-x-auto sm:end-6 sm:top-24 sm:bottom-6 sm:w-[420px]">
          {/* Header Image Scene */}
          <div className="relative aspect-[16/9] w-full shrink-0 overflow-hidden bg-night-2">
            <Scene image={selectedPerson.image} sizes="420px" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-night via-night/40 to-transparent" />
            <button
              type="button"
              onClick={() => setSelectedId(null)}
              className="absolute end-3 top-3 flex size-8 items-center justify-center rounded-full bg-black/60 text-ink-2 backdrop-blur hover:text-ink"
            >
              <X className="size-4" />
            </button>
            <div className="absolute inset-x-4 bottom-3">
              <p className="ar-name gold-text text-3xl font-bold">{selectedPerson.name.ar}</p>
              <h2 className="text-base font-semibold text-ink">
                {pick(selectedPerson.name)}
                {selectedPerson.alt && lang !== 'ar' && (
                  <span className="text-xs text-ink-3 ms-2">· {pick(selectedPerson.alt)}</span>
                )}
              </h2>
            </div>
          </div>

          {/* Drawer Body Scroll */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4 text-xs">
            {/* Historical Region & Modern Countries */}
            {selectedPerson.topography && (
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3.5 space-y-2">
                <div>
                  <span className="text-[0.65rem] tracking-wider uppercase text-gold font-semibold">
                    {t('region')}
                  </span>
                  <p className="text-ink font-medium">{pick(selectedPerson.topography.region)}</p>
                </div>
                <div>
                  <span className="text-[0.65rem] tracking-wider uppercase text-sky-300 font-semibold">
                    {t('modernCountries')}
                  </span>
                  <p className="text-ink-2">{pick(selectedPerson.topography.modernCountries)}</p>
                </div>
              </div>
            )}

            {/* Mission Route */}
            {selectedPerson.topography?.missionRoute && (
              <div>
                <h4 className="font-semibold text-gold mb-1">{t('missionRoute')}</h4>
                <p className="text-ink-2 leading-relaxed">{pick(selectedPerson.topography.missionRoute)}</p>
              </div>
            )}

            {/* Burial Site */}
            {selectedPerson.topography?.burialSite && (
              <div>
                <h4 className="font-semibold text-gold mb-1">{t('burialSite')}</h4>
                <FactText fact={selectedPerson.topography.burialSite} />
              </div>
            )}

            {/* Sacred Sites List */}
            {selectedPerson.topography?.sacredSites && selectedPerson.topography.sacredSites.length > 0 && (
              <div>
                <h4 className="font-semibold text-gold mb-2">{t('sacredSites')}</h4>
                <ul className="space-y-1.5">
                  {selectedPerson.topography.sacredSites.map((s, idx) => (
                    <li key={idx} className="rounded-xl border border-white/5 bg-white/[0.02] p-2.5">
                      <span className="font-semibold text-ink">{pick(s.name)}</span>
                      {s.desc && <p className="text-ink-3 mt-0.5 leading-snug">{pick(s.desc)}</p>}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Biography Snippet */}
            {selectedPerson.biography && selectedPerson.biography.length > 0 && (
              <div className="border-t border-white/5 pt-3">
                <h4 className="font-semibold text-gold mb-1">{t('fullBiography')}</h4>
                <p className="text-ink-3 leading-relaxed line-clamp-4">{pick(selectedPerson.biography[0]!)}</p>
              </div>
            )}
          </div>

          {/* Drawer Footer Actions */}
          <div className="border-t border-white/10 bg-night-2 p-3.5 flex items-center justify-between">
            <A
              href={hrefOf({ name: 'person', id: selectedPerson.id })}
              className="btn btn-gold text-xs py-2 px-4"
            >
              <span>{t('openProfile')}</span>
              <ExternalLink className="size-3.5 ms-1" />
            </A>
            <A
              href={hrefOf({ name: 'tree', focus: selectedPerson.id })}
              className="btn btn-ghost text-xs py-2 px-3.5"
            >
              <span>{t('treeView')}</span>
            </A>
          </div>
        </aside>
      )}
    </div>
  )
}
