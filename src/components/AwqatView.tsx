import { useEffect, useMemo, useState } from 'react'
import { Clock, LocateFixed, MapPin, Moon, RotateCcw, Sun } from 'lucide-react'
import { useI18n } from '../i18n'
import type { L4, Lang } from '../data/types'
import { ADHKAR, DAY_PARTS, FRIDAY, PRAYERS, type DayPartId } from '../data/awqat'
import { PLACES, currentPart, dayTimes, guessMethod, nextPrayer, type DayTimes, type MethodId, type Place, type PrayerKey } from '../lib/prayerTimes'
import { DuaCard } from './DuasView'
import { LevelChip, RefChip } from './ui'

const t = (en: string, fr: string, ar: string, es: string): L4 => ({ en, fr, ar, es })

const UI = {
  kicker: t('Awqat', 'Awqat', 'المواقيت', 'Awqat'),
  title: t('The times of prayer and of the day', 'Les heures de prière et du jour', 'مواقيت الصلاة وأوقات اليوم', 'Las horas de la oración y del día'),
  lead: t(
    'Today’s prayer times for your place, and what the Sunnah teaches for each part of the day and night, with the remembrances to say.',
    'Les heures de prière d’aujourd’hui pour votre lieu, et ce que la Sunna enseigne pour chaque moment du jour et de la nuit, avec les invocations à dire.',
    'مواقيت الصلاة اليوم في مدينتك، وما علّمته السنة لكل وقت من أوقات الليل والنهار، مع أذكاره.',
    'Los horarios de oración de hoy para tu lugar, y lo que la Sunna enseña para cada momento del día y de la noche, con los recuerdos que se dicen.',
  ),
  place: t('Place', 'Lieu', 'المدينة', 'Lugar'),
  myLocation: t('Use my location', 'Utiliser ma position', 'استعمل موقعي', 'Usar mi ubicación'),
  here: t('My location', 'Ma position', 'موقعي', 'Mi ubicación'),
  locating: t('Locating…', 'Localisation…', 'جارٍ تحديد الموقع…', 'Localizando…'),
  denied: t('Location unavailable. Choose a city.', 'Position indisponible. Choisissez une ville.', 'تعذّر تحديد الموقع، اختر مدينة.', 'Ubicación no disponible. Elige una ciudad.'),
  method: t('Method', 'Méthode', 'طريقة الحساب', 'Método'),
  next: t('Next prayer', 'Prochaine prière', 'الصلاة القادمة', 'Próxima oración'),
  in: t('in', 'dans', 'بعد', 'en'),
  now: t('Now', 'Maintenant', 'الآن', 'Ahora'),
  guide: t('What to do at each time', 'Que faire à chaque moment', 'ماذا تفعل في كل وقت', 'Qué hacer en cada momento'),
  friday: t('Friday', 'Le vendredi', 'يوم الجمعة', 'El viernes'),
  note: t(
    'Times are calculated, so they can differ by a minute or two from your mosque. The call to prayer of your local mosque prevails. In Morocco the method follows the Ministry of Habous (Fajr 19°, ‘Isha 17°).',
    'Les heures sont calculées et peuvent différer d’une ou deux minutes de votre mosquée. L’appel à la prière de votre mosquée fait foi. Au Maroc, la méthode suit le ministère des Habous (Fajr 19°, ‘Isha 17°).',
    'المواقيت محسوبة، وقد تختلف دقيقة أو دقيقتين عن مسجدك، والعبرة بأذان مسجدك. في المغرب تتبع طريقة وزارة الأوقاف (الفجر 19°، العشاء 17°).',
    'Los horarios son calculados y pueden diferir uno o dos minutos de tu mezquita. Prevalece la llamada de tu mezquita local. En Marruecos el método sigue al Ministerio de Habices (Fayr 19°, ‘Isha 17°).',
  ),
  hijriNote: t('Hijri date by calculation (Umm al-Qura); local moon sighting can differ by a day.', 'Date hégirienne calculée (Umm al-Qura) ; l’observation locale du croissant peut différer d’un jour.', 'التاريخ الهجري بالحساب (أم القرى)، وقد يختلف يومًا عن الرؤية المحلية.', 'Fecha hégira calculada (Umm al-Qura); la observación local de la luna puede diferir un día.'),
  reset: t('Reset', 'Remettre à zéro', 'إعادة', 'Reiniciar'),
  tap: t('Tap to count', 'Touchez pour compter', 'اضغط للعدّ', 'Toca para contar'),
  rakahs: t('rak‘ahs', 'rak‘as', 'ركعات', 'rak‘as'),
}

const METHODS: { id: MethodId; label: L4 }[] = [
  { id: 'morocco', label: t('Morocco (Ministry of Habous)', 'Maroc (ministère des Habous)', 'المغرب (وزارة الأوقاف)', 'Marruecos (Ministerio de Habices)') },
  { id: 'mwl', label: t('Muslim World League', 'Ligue islamique mondiale', 'رابطة العالم الإسلامي', 'Liga del Mundo Islámico') },
  { id: 'ummalqura', label: t('Umm al-Qura (Makkah)', 'Umm al-Qura (La Mecque)', 'أم القرى (مكة)', 'Umm al-Qura (La Meca)') },
  { id: 'egyptian', label: t('Egyptian Authority', 'Autorité égyptienne', 'الهيئة المصرية', 'Autoridad egipcia') },
  { id: 'turkey', label: t('Turkey (Diyanet)', 'Turquie (Diyanet)', 'تركيا (ديانت)', 'Turquía (Diyanet)') },
  { id: 'isna', label: t('North America (ISNA)', 'Amérique du Nord (ISNA)', 'أمريكا الشمالية', 'Norteamérica (ISNA)') },
]

const LOCALE: Record<Lang, string> = { en: 'en-GB', fr: 'fr-FR', ar: 'ar-MA', es: 'es-ES' }
const STORE = 'shajara:place'

function loadPlace(): Place {
  try {
    const saved = JSON.parse(localStorage.getItem(STORE) ?? 'null') as Place | null
    if (saved && typeof saved.lat === 'number' && typeof saved.lng === 'number') return saved
  } catch {
    /* storage blocked */
  }
  return PLACES[0]!
}

function savePlace(p: Place) {
  try {
    localStorage.setItem(STORE, JSON.stringify(p))
  } catch {
    /* storage blocked */
  }
}

/** Noon of the calendar day `offset` days from `now` in the place's time zone, as a Date for adhan. */
function dayIn(tz: string, now: Date, offset: number): Date {
  const parts = new Intl.DateTimeFormat('en-CA', { timeZone: tz, year: 'numeric', month: '2-digit', day: '2-digit' }).format(now)
  const [y, m, d] = parts.split('-').map(Number) as [number, number, number]
  return new Date(Date.UTC(y, m - 1, d + offset, 12))
}

export function AwqatView() {
  const { pick, lang } = useI18n()
  const [place, setPlace] = useState<Place>(loadPlace)
  const [now, setNow] = useState(() => new Date())
  const [locating, setLocating] = useState(false)
  const [locError, setLocError] = useState(false)

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 30_000)
    return () => clearInterval(id)
  }, [])

  const choose = (p: Place) => {
    setPlace(p)
    savePlace(p)
  }

  const locate = () => {
    if (!navigator.geolocation) return setLocError(true)
    setLocating(true)
    setLocError(false)
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = Number(pos.coords.latitude.toFixed(4))
        const lng = Number(pos.coords.longitude.toFixed(4))
        choose({ id: 'here', name: UI.here, lat, lng, tz: Intl.DateTimeFormat().resolvedOptions().timeZone, method: guessMethod(lat, lng) })
        setLocating(false)
      },
      () => {
        setLocating(false)
        setLocError(true)
      },
      { timeout: 10_000, maximumAge: 3_600_000 },
    )
  }

  const { today, yesterday, tomorrow } = useMemo(
    () => ({
      today: dayTimes(place, dayIn(place.tz, now, 0)),
      yesterday: dayTimes(place, dayIn(place.tz, now, -1)),
      tomorrow: dayTimes(place, dayIn(place.tz, now, 1)),
    }),
    // Recompute when the calendar day changes, not every 30 seconds.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [place, dayIn(place.tz, now, 0).getTime()],
  )

  const part = currentPart(now, today, yesterday)
  const next = nextPrayer(now, today, tomorrow)
  const fmt = new Intl.DateTimeFormat(LOCALE[lang], { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: place.tz })
  const dateFmt = new Intl.DateTimeFormat(LOCALE[lang], { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: place.tz })
  let hijri = ''
  try {
    hijri = new Intl.DateTimeFormat(`${LOCALE[lang]}-u-ca-islamic-umalqura`, { day: 'numeric', month: 'long', year: 'numeric', timeZone: place.tz }).format(now)
  } catch {
    /* calendar not supported */
  }
  const isFriday = new Intl.DateTimeFormat('en-US', { weekday: 'short', timeZone: place.tz }).format(now) === 'Fri'
  const mins = Math.max(0, Math.round((next.at.getTime() - now.getTime()) / 60_000))
  const left = `${Math.floor(mins / 60)}:${String(mins % 60).padStart(2, '0')}`
  const prayerName = (k: PrayerKey) => pick(PRAYERS.find((p) => p.id === k)!.name)

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <header className="reveal mx-auto mb-8 max-w-2xl text-center">
        <p className="kicker inline-flex items-center justify-center gap-2">
          <Clock aria-hidden="true" className="size-3.5" /> {pick(UI.kicker)}
        </p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-5xl">
          <span className="gold-text">{pick(UI.title)}</span>
        </h1>
        <p className="mt-5 text-base leading-relaxed text-pretty text-ink-2">{pick(UI.lead)}</p>
      </header>

      {/* Place and method */}
      <div className="glass mb-6 flex flex-col gap-3 rounded-3xl p-4 sm:flex-row sm:items-end">
        <label className="flex flex-1 flex-col gap-1 text-xs text-ink-3">
          <span className="inline-flex items-center gap-1"><MapPin aria-hidden="true" className="size-3" /> {pick(UI.place)}</span>
          <select
            value={place.id}
            onChange={(e) => {
              const p = PLACES.find((x) => x.id === e.target.value)
              if (p) choose(p)
            }}
            className="rounded-xl border border-white/10 bg-night-2 px-3 py-2 text-sm text-ink"
          >
            {place.id === 'here' && <option value="here">{pick(UI.here)} ({place.lat}, {place.lng})</option>}
            {PLACES.map((p) => (
              <option key={p.id} value={p.id}>{pick(p.name)}</option>
            ))}
          </select>
        </label>
        <label className="flex flex-1 flex-col gap-1 text-xs text-ink-3">
          <span>{pick(UI.method)}</span>
          <select
            value={place.method}
            onChange={(e) => choose({ ...place, method: e.target.value as MethodId })}
            className="rounded-xl border border-white/10 bg-night-2 px-3 py-2 text-sm text-ink"
          >
            {METHODS.map((m) => (
              <option key={m.id} value={m.id}>{pick(m.label)}</option>
            ))}
          </select>
        </label>
        <button
          type="button"
          onClick={locate}
          disabled={locating}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-gold/40 bg-gold/10 px-4 py-2 text-sm font-medium text-gold transition-colors hover:bg-gold/20 disabled:opacity-60"
        >
          <LocateFixed aria-hidden="true" className="size-4" /> {pick(locating ? UI.locating : UI.myLocation)}
        </button>
      </div>
      {locError && <p role="alert" className="-mt-3 mb-6 text-sm text-lvl-disputed">{pick(UI.denied)}</p>}

      {/* Today */}
      <section className="glass-strong mb-12 overflow-hidden rounded-3xl p-5 sm:p-8" aria-labelledby="today">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
          <h2 id="today" className="text-lg font-semibold text-ink first-letter:uppercase">{dateFmt.format(now)}</h2>
          {hijri && <p className="text-sm text-gold" title={pick(UI.hijriNote)}>{hijri}</p>}
        </div>
        <div className="mt-6 grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <SunArc today={today} now={now} fmt={fmt} lang={lang} name={(k) => pick(PRAYERS.find((p) => p.id === k)!.name).split(' (')[0]!} />
          <div>
            <p className="text-sm text-ink-3">{pick(UI.next)}</p>
            <p className="mt-1 text-3xl font-semibold text-gold-2 sm:text-4xl">
              {prayerName(next.key)} <span className="tabular-nums">{fmt.format(next.at)}</span>
            </p>
            <p className="mt-1 text-sm text-ink-2">
              {pick(UI.in)} <span className="tabular-nums" dir="ltr">{left}</span>
            </p>
            <ul className="mt-6 grid grid-cols-3 gap-2 sm:grid-cols-6 lg:grid-cols-3">
              {PRAYERS.map((p) => {
                const at = today[p.id as keyof DayTimes]
                const isNext = p.id === next.key && next.at === at
                return (
                  <li key={p.id} className={`rounded-2xl border px-3 py-2 text-center ${isNext ? 'border-gold/60 bg-gold/10' : 'border-white/10 bg-white/[0.02]'}`}>
                    <span className={`block text-xs ${p.id === 'sunrise' ? 'text-ink-3' : 'text-ink-2'}`}>{pick(p.name)}</span>
                    <span className="block text-lg font-semibold tabular-nums text-ink">{fmt.format(at)}</span>
                    {p.fard && <span className="block text-[0.65rem] text-ink-3">{p.fard} {pick(UI.rakahs)}</span>}
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
        <p className="mt-6 text-xs leading-relaxed text-ink-3">{pick(UI.note)}</p>
      </section>

      {/* Day guide */}
      <h2 className="mb-6 text-2xl font-semibold text-ink sm:text-3xl">{pick(UI.guide)}</h2>
      <ol className="space-y-5">
        {DAY_PARTS.map((d) => (
          <DayPartCard key={d.id} id={d.id} active={d.id === part} />
        ))}
      </ol>

      <section className={`mt-10 rounded-3xl border p-5 sm:p-6 ${isFriday ? 'border-gold/50 bg-gold/10' : 'border-white/10 bg-white/[0.02]'}`}>
        <h2 className="text-xl font-semibold text-ink">{pick(UI.friday)}</h2>
        <p className="mt-2 leading-relaxed text-ink-2">{pick(FRIDAY.text)}</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          <LevelChip level={FRIDAY.l} />
          {FRIDAY.r.map((r) => <RefChip key={r} r={r} />)}
        </div>
      </section>
    </div>
  )
}

function DayPartCard({ id, active }: { id: DayPartId; active: boolean }) {
  const { pick } = useI18n()
  const d = DAY_PARTS.find((x) => x.id === id)!
  return (
    <li id={`part-${id}`} className={`min-w-0 rounded-3xl border p-5 transition-colors sm:p-6 ${active ? 'border-gold/60 bg-gold/[0.07] shadow-[0_0_30px_rgba(233,198,123,0.12)]' : 'border-white/10 bg-white/[0.02]'}`}>
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <h3 className="text-lg font-semibold text-ink sm:text-xl">{pick(d.title)}</h3>
        {active && <span className="chip text-gold">{pick(UI.now)}</span>}
        <span className="text-sm text-ink-3">{pick(d.span)}</span>
      </div>
      {d.guide.length > 0 && (
        <ul className="mt-4 space-y-3">
          {d.guide.map((g, i) => (
            <li key={i} className="leading-relaxed text-ink-2">
              {pick(g.text)}
              <span className="mt-1.5 flex flex-wrap gap-1.5">
                <LevelChip level={g.l} />
                {g.grade && <span className="chip text-ink-2">{pick(g.grade)}</span>}
                {g.r.map((r) => <RefChip key={r} r={r} />)}
              </span>
            </li>
          ))}
        </ul>
      )}
      {d.adhkar && (
        <div className="mt-5 grid gap-3">
          {d.adhkar.map((k) => {
            const a = ADHKAR[k]
            if (!a) return null
            return (
              <div key={k} className="min-w-0">
                <p className="mb-1.5 text-sm font-medium text-gold">{pick(a.title)}</p>
                <DuaCard d={a} compact />
                {a.count && a.count > 1 && <Counter target={a.count} />}
              </div>
            )
          })}
        </div>
      )}
    </li>
  )
}

/** A tap counter for remembrances said a set number of times. It resets when the page reloads. */
function Counter({ target }: { target: number }) {
  const { pick } = useI18n()
  const [n, setN] = useState(0)
  const done = n >= target
  return (
    <div className="mt-2 flex items-center gap-2">
      <button
        type="button"
        onClick={() => setN((x) => Math.min(target, x + 1))}
        className={`min-h-11 flex-1 rounded-xl border px-4 py-2 text-sm font-medium tabular-nums transition-[transform,background-color] active:scale-[0.98] ${done ? 'border-lvl-hadith/50 bg-lvl-hadith/10 text-lvl-hadith' : 'border-gold/30 bg-gold/5 text-gold hover:bg-gold/10'}`}
        aria-label={`${pick(UI.tap)}: ${n} / ${target}`}
      >
        {n} / {target} {!done && <span className="text-ink-3">· {pick(UI.tap)}</span>}
      </button>
      <button type="button" onClick={() => setN(0)} className="grid size-11 place-items-center rounded-xl border border-white/10 text-ink-3 hover:text-ink" aria-label={pick(UI.reset)} title={pick(UI.reset)}>
        <RotateCcw aria-hidden="true" className="size-4" />
      </button>
    </div>
  )
}

/** The sun's path from sunrise to sunset, with the prayers on it and the sun (or moon) where it is now. */
function SunArc({ today, now, fmt, lang, name }: { today: DayTimes; now: Date; fmt: Intl.DateTimeFormat; lang: Lang; name: (k: PrayerKey | 'sunrise') => string }) {
  const W = 420, H = 190, cx = W / 2, cy = 160, r = 140
  const rise = today.sunrise.getTime()
  const set = today.maghrib.getTime()
  const at = (ms: number) => {
    const f = Math.min(1, Math.max(0, (ms - rise) / (set - rise)))
    const a = Math.PI * (1 - f)
    return { x: cx + r * Math.cos(a), y: cy - r * Math.sin(a) }
  }
  const n = now.getTime()
  const day = n >= rise && n <= set
  const sun = at(n)
  const rtl = lang === 'ar'
  const marks: { k: PrayerKey | 'sunrise'; ms: number }[] = [
    { k: 'sunrise', ms: rise },
    { k: 'dhuhr', ms: today.dhuhr.getTime() },
    { k: 'asr', ms: today.asr.getTime() },
    { k: 'maghrib', ms: set },
  ]
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label={marks.map((m) => `${name(m.k)} ${fmt.format(new Date(m.ms))}`).join(', ')} style={rtl ? { transform: 'scaleX(-1)' } : undefined}>
      <defs>
        <linearGradient id="arc-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#e9c67b" stopOpacity="0.18" />
          <stop offset="1" stopColor="#e9c67b" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy} Z`} fill="url(#arc-sky)" />
      <path d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`} fill="none" stroke="#e9c67b" strokeOpacity="0.45" strokeWidth="1.5" strokeDasharray="3 5" />
      <line x1={10} x2={W - 10} y1={cy} y2={cy} stroke="#8e89a8" strokeOpacity="0.4" />
      {marks.map((m) => {
        const pt = at(m.ms)
        return (
          <g key={m.k} transform={`translate(${pt.x},${pt.y})`}>
            <circle r={4} fill="#04050d" stroke="#e9c67b" strokeWidth={1.5} />
            <g style={rtl ? { transform: 'scaleX(-1)' } : undefined}>
              <text y={m.k === 'dhuhr' ? -12 : -10} textAnchor="middle" fontSize={10.5} fill="#c3bdd2">{name(m.k)}</text>
            </g>
          </g>
        )
      })}
      {day ? (
        <g transform={`translate(${sun.x},${sun.y})`}>
          <circle r={14} fill="#fbe6b0" opacity={0.25} />
          <Sun x={-9} y={-9} width={18} height={18} color="#fbe6b0" />
        </g>
      ) : (
        <g transform={`translate(${cx},${cy - 40})`}>
          <Moon x={-10} y={-10} width={20} height={20} color="#c3bdd2" />
        </g>
      )}
    </svg>
  )
}
