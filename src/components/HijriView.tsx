import { useEffect, useMemo, useState } from 'react'
import { CalendarDays, Info, Moon, Sunset } from 'lucide-react'
import { useI18n } from '../i18n'
import type { L4, Lang } from '../data/types'
import { EID_STEPS, HIJRI_INTRO, KAHF, MONTHS, OCCASIONS, OTHER_COUNTRIES, SACRED_MONTHS_QUOTE, SACRED_NOTE } from '../data/hijri'
import { diyanetDate, hijri, moroccoDate, nextOccurrence, solarToLunar, type HDate, type MoroccoStatus } from '../lib/hijri'
import { dayTimes, PLACES, type Place } from '../lib/prayerTimes'
import { DuaCard } from './DuasView'
import { Step } from './HourView'
import { A, LevelChip, RefChip } from './ui'

const t = (en: string, fr: string, ar: string, es: string): L4 => ({ en, fr, ar, es })
const LOCALE: Record<Lang, string> = { en: 'en-GB', fr: 'fr-FR', ar: 'ar-MA', es: 'es-ES' }
const ERA: Record<Lang, string> = { en: 'AH', fr: 'H', ar: 'هـ', es: 'H' }
const STORE = 'shajara:place'

const UI = {
  kicker: t('Live, from the moon', 'En direct, d’après la lune', 'مباشر، على منازل القمر', 'En directo, según la luna'),
  title: t('The Hijri calendar', 'Le calendrier hégirien', 'التقويم الهجري', 'El calendario hégira'),
  lead: t(
    'Today’s Hijri date where you are and in several countries, how the calendar works, its twelve months, the two Eids, and the 300 and 309 years of the Cave.',
    'La date hégirienne d’aujourd’hui chez vous et dans plusieurs pays, le fonctionnement du calendrier, ses douze mois, les deux Aïds, et les 300 et 309 ans de la Caverne.',
    'التاريخ الهجري اليوم حيث أنت وفي عدة بلدان، وكيف يعمل التقويم، وشهوره الاثنا عشر، والعيدان، وثلاثمائة سنين وتسع في سورة الكهف.',
    'La fecha hégira de hoy donde estás y en varios países, cómo funciona el calendario, sus doce meses, los dos Eid, y los 300 y 309 años de la Cueva.',
  ),
  place: t('Place', 'Lieu', 'المكان', 'Lugar'),
  tonight: t('The Hijri day changes at Maghrib. Tonight at {time} begins', 'Le jour hégirien change au Maghrib. Ce soir à {time} commence', 'يتغير اليوم الهجري عند المغرب. الليلة عند {time} يبدأ', 'El día hégira cambia en el Magrib. Esta noche a las {time} empieza'),
  begun: t('Since Maghrib at {time}, it is already the night of', 'Depuis le Maghrib à {time}, c’est déjà la nuit du', 'منذ المغرب عند {time} دخلت ليلة', 'Desde el Magrib a las {time}, ya es la noche del'),
  byCountry: t('Today, by country', 'Aujourd’hui, par pays', 'اليوم حسب البلد', 'Hoy, por país'),
  byCountryLead: t(
    'The three countries below publish how they set the date, so the page can show it live. Elsewhere the month begins with the announcement of the authority listed further down.',
    'Les trois pays ci-dessous publient leur méthode, la page peut donc afficher leur date en direct. Ailleurs, le mois commence avec l’annonce de l’autorité indiquée plus bas.',
    'البلدان الثلاثة أدناه تنشر طريقتها في تحديد التاريخ، فتعرضه الصفحة مباشرة. وفي غيرها يبدأ الشهر بإعلان الجهة المذكورة في الأسفل.',
    'Los tres países de abajo publican cómo fijan la fecha, así que la página la muestra en directo. En otros lugares el mes empieza con el anuncio de la autoridad indicada más abajo.',
  ),
  saudi: t('Saudi Arabia', 'Arabie saoudite', 'السعودية', 'Arabia Saudí'),
  saudiHow: t('Umm al-Qura calendar (official). Ramadan and the Eids follow the Supreme Court’s sighting.', 'Calendrier Umm al-Qura (officiel). Ramadan et les Aïds suivent l’observation de la Cour suprême.', 'تقويم أم القرى (رسمي)، ورمضان والعيدان بإعلان المحكمة العليا للرؤية.', 'Calendario Umm al-Qura (oficial). Ramadán y los Eid siguen el avistamiento del Tribunal Supremo.'),
  morocco: t('Morocco', 'Maroc', 'المغرب', 'Marruecos'),
  moroccoHow: t('Each month starts when the Ministry of Habous announces the crescent.', 'Chaque mois commence quand le ministère des Habous annonce le croissant.', 'يبدأ كل شهر بإعلان وزارة الأوقاف ثبوت رؤية الهلال.', 'Cada mes empieza cuando el Ministerio de Habous anuncia la luna nueva.'),
  turkey: t('Turkey', 'Turquie', 'تركيا', 'Turquía'),
  turkeyHow: t('Diyanet calendar, calculated in advance (read from the Aladhan API).', 'Calendrier de la Diyanet, calculé à l’avance (lu depuis l’API Aladhan).', 'تقويم رئاسة الشؤون الدينية، محسوب مسبقًا (من واجهة الأذان).', 'Calendario de la Diyanet, calculado de antemano (leído de la API Aladhan).'),
  official: t('Official', 'Officiel', 'رسمي', 'Oficial'),
  pending: t('Day 30 or the 1st: awaiting the announcement', 'Jour 30 ou le 1er : en attente de l’annonce', 'اليوم 30 أو الأول: في انتظار الإعلان', 'Día 30 o el 1: a la espera del anuncio'),
  estimate: t('Estimate', 'Estimation', 'تقدير', 'Estimación'),
  loading: t('Loading…', 'Chargement…', 'جارٍ التحميل…', 'Cargando…'),
  offline: t('Offline: astronomical estimate', 'Hors ligne : estimation astronomique', 'دون اتصال: تقدير فلكي', 'Sin conexión: estimación astronómica'),
  methods: t('The same day, by method', 'Le même jour, selon la méthode', 'اليوم نفسه حسب الطريقة', 'El mismo día, según el método'),
  umalqura: t('Umm al-Qura', 'Umm al-Qura', 'أم القرى', 'Umm al-Qura'),
  astronomical: t('Astronomical (new moon)', 'Astronomique (nouvelle lune)', 'فلكي (الاقتران)', 'Astronómico (luna nueva)'),
  civil: t('Tabular (arithmetical)', 'Tabulaire (arithmétique)', 'جدولي (حسابي)', 'Tabular (aritmético)'),
  others: t('Who decides elsewhere', 'Qui décide ailleurs', 'من يقرر في البلدان الأخرى', 'Quién decide en otros lugares'),
  country: t('Country', 'Pays', 'البلد', 'País'),
  authority: t('Authority', 'Autorité', 'الجهة', 'Autoridad'),
  method: t('Method', 'Méthode', 'الطريقة', 'Método'),
  explain: t('How the calendar works', 'Comment fonctionne le calendrier', 'كيف يعمل التقويم', 'Cómo funciona el calendario'),
  months: t('The twelve months', 'Les douze mois', 'الشهور الاثنا عشر', 'Los doce meses'),
  monthsLead: t('Their names, what the classical lexicographers say they mean, and what the Sunnah says about each.', 'Leurs noms, leur sens selon les lexicographes classiques, et ce qu’en dit la Sunna.', 'أسماؤها، ومعانيها عند أهل اللغة، وما ورد فيها من السنة.', 'Sus nombres, su sentido según los lexicógrafos clásicos y lo que dice la Sunna de cada uno.'),
  now: t('Now', 'En cours', 'الشهر الحالي', 'Ahora'),
  meaningLevel: t('The meanings of the names come from the Arabic lexicons.', 'Le sens des noms vient des lexiques arabes.', 'معاني الأسماء من معاجم اللغة.', 'El sentido de los nombres procede de los léxicos árabes.'),
  coming: t('Coming up', 'Prochainement', 'القادم', 'Próximamente'),
  comingLead: t(
    'Dates by Umm al-Qura. Ramadan, the Eids and ‘Arafah begin with each country’s announcement and can differ by a day.',
    'Dates selon Umm al-Qura. Ramadan, les Aïds et ‘Arafa commencent avec l’annonce de chaque pays et peuvent différer d’un jour.',
    'التواريخ بحسب أم القرى، ويبدأ رمضان والعيدان وعرفة بإعلان كل بلد، وقد تختلف يومًا.',
    'Fechas según Umm al-Qura. Ramadán, los Eid y ‘Arafa empiezan con el anuncio de cada país y pueden diferir un día.',
  ),
  today: t('Today', 'Aujourd’hui', 'اليوم', 'Hoy'),
  inDays: t('in {n} days', 'dans {n} jours', 'بعد {n} يومًا', 'en {n} días'),
  tomorrow: t('tomorrow', 'demain', 'غدًا', 'mañana'),
  eids: t('The two Eids', 'Les deux Aïds', 'العيدان', 'Los dos Eid'),
  kahfCalc: t('Solar years', 'Années solaires', 'سنوات شمسية', 'Años solares'),
  kahfEquals: t('are as long as', 'durent autant que', 'تعادل', 'duran lo mismo que'),
  lunarYears: t('lunar (Hijri) years', 'années lunaires (hégiriennes)', 'سنة قمرية (هجرية)', 'años lunares (hégira)'),
  differ: t('Where scholars differ', 'Divergence des savants', 'خلاف العلماء', 'Donde los sabios difieren'),
  more: t('Prayer times and the day', 'Horaires de prière et la journée', 'مواقيت الصلاة واليوم', 'Horarios de oración y el día'),
}

function loadPlace(): Place {
  try {
    const saved = JSON.parse(localStorage.getItem(STORE) ?? 'null') as Place | null
    if (saved && typeof saved.lat === 'number' && typeof saved.lng === 'number' && saved.tz) return saved
  } catch {
    /* storage blocked */
  }
  return PLACES[0]!
}

function dayIn(tz: string, now: Date, offset: number): Date {
  const parts = new Intl.DateTimeFormat('en-CA', { timeZone: tz, year: 'numeric', month: '2-digit', day: '2-digit' }).format(now)
  const [y, m, d] = parts.split('-').map(Number) as [number, number, number]
  return new Date(Date.UTC(y, m - 1, d + offset, 12))
}

export function HijriView() {
  const { pick, lang } = useI18n()
  const [now, setNow] = useState(() => new Date())
  const [place, setPlace] = useState<Place>(loadPlace)
  const [turkey, setTurkey] = useState<HDate | null | 'loading'>('loading')
  const [solar, setSolar] = useState(300)

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 60_000)
    return () => clearInterval(id)
  }, [])

  // Turkey: the Diyanet date, once per civil day in Istanbul
  const istanbulDay = new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Istanbul' }).format(now)
  useEffect(() => {
    const ctrl = new AbortController()
    setTurkey('loading')
    diyanetDate(new Date(), ctrl.signal).then((d) => setTurkey(d))
    return () => ctrl.abort()
  }, [istanbulDay])

  const fmtH = (h: HDate) => `${h.d} ${pick(MONTHS[h.m - 1]!.name)} ${h.y} ${ERA[lang]}`
  const time = (d: Date, tz: string) => new Intl.DateTimeFormat(LOCALE[lang], { hour: '2-digit', minute: '2-digit', timeZone: tz, hour12: false }).format(d)
  const greg = (d: Date, tz: string) => new Intl.DateTimeFormat(LOCALE[lang], { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: tz }).format(d)

  const morocco = moroccoDate(now)
  const saudi = hijri(now, 'umalqura', 'Asia/Riyadh')
  // The reader's place: its country's own date where it is published, and the Hijri day that begins at Maghrib
  const inMorocco = place.tz === 'Africa/Casablanca'
  const local: { date: HDate; status: MoroccoStatus } = inMorocco
    ? morocco
    : place.tz === 'Asia/Riyadh'
      ? { date: saudi, status: 'official' }
      : place.tz === 'Europe/Istanbul' && turkey && turkey !== 'loading'
        ? { date: turkey, status: 'official' }
        : { date: hijri(now, 'umalqura', place.tz), status: 'estimate' }
  const maghrib = useMemo(() => dayTimes(place, dayIn(place.tz, now, 0)).maghrib, [place, now])
  const afterMaghrib = now >= maghrib
  const tonight = useMemo(() => {
    const tomorrow = new Date(now.getTime() + 86_400_000)
    return inMorocco ? moroccoDate(tomorrow).date : hijri(tomorrow, 'umalqura', place.tz)
  }, [now, inMorocco, place.tz])

  const turkeyFallback = hijri(now, 'astronomical', 'Europe/Istanbul')
  const methods = (['umalqura', 'astronomical', 'civil'] as const).map((m) => ({ m, h: hijri(now, m, place.tz) }))
  const currentMonth = saudi.m

  const coming = useMemo(
    () =>
      OCCASIONS.map((o) => ({ o, next: nextOccurrence(o.m, o.d, now) }))
        .filter((x) => x.next)
        .sort((a, b) => a.next!.days - b.next!.days),
    // recomputed once a day: `now` ticks every minute but the result only changes at midnight
    [now.toDateString()],
  )

  const choose = (id: string) => {
    const p = PLACES.find((x) => x.id === id)
    if (!p) return
    setPlace(p)
    try {
      localStorage.setItem(STORE, JSON.stringify(p))
    } catch {
      /* storage blocked */
    }
  }

  const statusChip = (s: MoroccoStatus) => (
    <span className={`rounded-full border px-2.5 py-0.5 text-xs ${s === 'official' ? 'border-emerald-400/30 bg-emerald-400/10 text-emerald-300' : s === 'pending' ? 'border-amber-400/30 bg-amber-400/10 text-amber-300' : 'border-white/15 bg-white/5 text-ink-3'}`}>
      {pick(s === 'official' ? UI.official : s === 'pending' ? UI.pending : UI.estimate)}
    </span>
  )

  const lunar = solarToLunar(solar)

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <header className="reveal mx-auto mb-10 max-w-2xl text-center">
        <p className="kicker inline-flex items-center justify-center gap-2">
          <Moon aria-hidden="true" className="size-3.5" /> {pick(UI.kicker)}
        </p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-5xl">
          <span className="gold-text">{pick(UI.title)}</span>
        </h1>
        <p className="mt-5 text-base leading-relaxed text-pretty text-ink-2">{pick(UI.lead)}</p>
      </header>

      {/* Today where the reader is */}
      <section aria-live="polite" className="glass mb-12 rounded-3xl p-6 text-center sm:p-8">
        <label className="mb-4 inline-flex items-center gap-2 text-sm text-ink-3">
          {pick(UI.place)}
          <select value={PLACES.some((p) => p.id === place.id) ? place.id : ''} onChange={(e) => choose(e.target.value)} className="rounded-full border border-white/15 bg-night-2 px-3 py-1 text-ink">
            {!PLACES.some((p) => p.id === place.id) && <option value="">{pick(place.name as L4)}</option>}
            {PLACES.map((p) => (
              <option key={p.id} value={p.id}>
                {pick(p.name)}
              </option>
            ))}
          </select>
        </label>
        <p className="text-4xl font-semibold text-gold-2 sm:text-5xl" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
          {fmtH(local.date)}
        </p>
        <p className="mt-2 text-ink-2">{greg(now, place.tz)}</p>
        <div className="mt-3 flex justify-center">{statusChip(local.status)}</div>
        <p className="mx-auto mt-5 flex max-w-xl items-start justify-center gap-2 text-sm text-ink-2" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
          <Sunset aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-gold" />
          <span>
            {pick(afterMaghrib ? UI.begun : UI.tonight).replace('{time}', time(maghrib, place.tz))}{' '}
            <strong className="text-gold">{fmtH(tonight)}</strong>
          </span>
        </p>
      </section>

      {/* By country */}
      <section className="mb-14">
        <h2 className="text-2xl font-semibold text-ink sm:text-3xl">{pick(UI.byCountry)}</h2>
        <p className="mt-2 max-w-2xl text-ink-2">{pick(UI.byCountryLead)}</p>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <article className="glass rounded-2xl p-5">
            <p className="text-sm text-ink-3">🇸🇦 {pick(UI.saudi)}</p>
            <p className="mt-1 text-2xl font-semibold text-gold-2">{fmtH(saudi)}</p>
            <div className="mt-2">{statusChip('official')}</div>
            <p className="mt-3 text-sm text-ink-2">{pick(UI.saudiHow)}</p>
          </article>
          <article className="glass rounded-2xl p-5">
            <p className="text-sm text-ink-3">🇲🇦 {pick(UI.morocco)}</p>
            <p className="mt-1 text-2xl font-semibold text-gold-2">{fmtH(morocco.date)}</p>
            <div className="mt-2">{statusChip(morocco.status)}</div>
            <p className="mt-3 text-sm text-ink-2">{pick(UI.moroccoHow)}</p>
            {morocco.source && <p className="mt-2 text-xs text-ink-3">{pick(morocco.source)}</p>}
          </article>
          <article className="glass rounded-2xl p-5">
            <p className="text-sm text-ink-3">🇹🇷 {pick(UI.turkey)}</p>
            <p className="mt-1 text-2xl font-semibold text-gold-2">{turkey === 'loading' ? pick(UI.loading) : fmtH(turkey ?? turkeyFallback)}</p>
            <div className="mt-2">
              {turkey === 'loading' ? null : turkey ? statusChip('official') : <span className="rounded-full border border-white/15 bg-white/5 px-2.5 py-0.5 text-xs text-ink-3">{pick(UI.offline)}</span>}
            </div>
            <p className="mt-3 text-sm text-ink-2">{pick(UI.turkeyHow)}</p>
          </article>
        </div>

        <h3 className="mt-8 text-lg font-semibold text-ink">{pick(UI.methods)}</h3>
        <ul className="mt-3 grid gap-2 sm:grid-cols-3">
          {methods.map(({ m, h }) => (
            <li key={m} className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
              <span className="block text-xs text-ink-3">{pick(UI[m])}</span>
              <span className="block font-semibold text-ink">{fmtH(h)}</span>
            </li>
          ))}
        </ul>

        <h3 className="mt-8 text-lg font-semibold text-ink">{pick(UI.others)}</h3>
        <div className="mt-3 overflow-x-auto rounded-2xl border border-white/10">
          <table className="w-full min-w-[560px] text-start text-sm">
            <thead className="bg-white/[0.04] text-ink-3">
              <tr>
                <th className="px-4 py-2 text-start font-medium">{pick(UI.country)}</th>
                <th className="px-4 py-2 text-start font-medium">{pick(UI.authority)}</th>
                <th className="px-4 py-2 text-start font-medium">{pick(UI.method)}</th>
              </tr>
            </thead>
            <tbody>
              {OTHER_COUNTRIES.map((c) => (
                <tr key={c.id} className="border-t border-white/5">
                  <td className="px-4 py-2 text-ink">
                    <span aria-hidden="true">{c.flag}</span> {pick(c.name)}
                  </td>
                  <td className="px-4 py-2 text-ink-2">{pick(c.authority)}</td>
                  <td className="px-4 py-2 text-ink-2">{pick(c.method)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* How it works */}
      <section className="mb-14">
        <h2 className="text-2xl font-semibold text-ink sm:text-3xl">{pick(UI.explain)}</h2>
        <ol className="relative mt-8 space-y-10 border-s border-gold/20 ps-6 sm:ps-10">
          {HIJRI_INTRO.map((s, i) => (
            <Step key={s.id} s={s} n={i + 1} />
          ))}
        </ol>
      </section>

      {/* The twelve months */}
      <section className="mb-14">
        <h2 className="text-2xl font-semibold text-ink sm:text-3xl">{pick(UI.months)}</h2>
        <p className="mt-2 max-w-2xl text-ink-2">{pick(UI.monthsLead)}</p>
        <div className="mt-5">
          <DuaCard d={SACRED_MONTHS_QUOTE} compact />
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {MONTHS.map((mo) => (
            <article key={mo.n} id={`month-${mo.n}`} className={`min-w-0 rounded-2xl border p-5 ${mo.n === currentMonth ? 'border-gold/50 bg-gold/[0.06]' : 'border-white/10 bg-white/[0.02]'}`}>
              <div className="flex flex-wrap items-center gap-2">
                <span className="grid size-7 place-items-center rounded-full bg-night-2 text-xs font-semibold text-gold ring-1 ring-gold/40">{mo.n}</span>
                <h3 className="text-lg font-semibold text-ink">
                  <span lang="ar" className="font-hadith text-xl text-gold-2">{mo.ar}</span>
                  {lang !== 'ar' && <span className="ms-2">{pick(mo.name)}</span>}
                </h3>
                {mo.sacred && <span className="rounded-full border border-gold/40 bg-gold/10 px-2.5 py-0.5 text-xs text-gold">{pick(SACRED_NOTE)}</span>}
                {mo.n === currentMonth && <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2.5 py-0.5 text-xs text-emerald-300">{pick(UI.now)}</span>}
              </div>
              <p className="mt-2 text-sm text-ink-2">{pick(mo.meaning)}</p>
              {mo.days.map((d, i) => (
                <div key={i} className="mt-4 border-t border-white/5 pt-3">
                  <p className="text-sm font-semibold text-ink">{pick(d.title)}</p>
                  <p className="mt-1 text-sm text-ink-2">{pick(d.text)}</p>
                  <div className="mt-2 flex flex-wrap items-center gap-1.5">
                    <LevelChip level={d.l} />
                    {d.r.map((r) => (
                      <RefChip key={r} r={r} />
                    ))}
                  </div>
                  {d.quote && (
                    <div className="mt-3">
                      <DuaCard d={d.quote} compact />
                    </div>
                  )}
                </div>
              ))}
            </article>
          ))}
        </div>
        <p className="mt-4 flex items-center gap-2 text-xs text-ink-3">
          <LevelChip level="tradition" /> {pick(UI.meaningLevel)}
        </p>
      </section>

      {/* Coming up */}
      <section className="mb-14">
        <h2 className="flex items-center gap-2 text-2xl font-semibold text-ink sm:text-3xl">
          <CalendarDays aria-hidden="true" className="size-6 text-gold" /> {pick(UI.coming)}
        </h2>
        <p className="mt-2 max-w-2xl text-ink-2">{pick(UI.comingLead)}</p>
        <ul className="mt-6 space-y-3">
          {coming.map(({ o, next }) => (
            <li key={o.id} className="flex flex-col gap-2 rounded-2xl border border-white/10 bg-white/[0.02] p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <p className="font-semibold text-ink">{pick(o.title)}</p>
                <p className="text-sm text-ink-2">
                  {fmtH(next!.h)} · {greg(next!.date, 'UTC')}
                </p>
                {o.note && <p className="mt-1 text-xs text-ink-3">{pick(o.note)}</p>}
                <div className="mt-2 flex flex-wrap items-center gap-1.5">
                  <LevelChip level={o.l} />
                  {o.r.map((r) => (
                    <RefChip key={r} r={r} />
                  ))}
                </div>
              </div>
              <span className="shrink-0 self-start rounded-full bg-gold/15 px-3 py-1 text-sm font-semibold text-gold sm:self-center">
                {next!.days === 0 ? pick(UI.today) : next!.days === 1 ? pick(UI.tomorrow) : pick(UI.inDays).replace('{n}', String(next!.days))}
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* The two Eids */}
      <section className="mb-14">
        <h2 className="text-2xl font-semibold text-ink sm:text-3xl">{pick(UI.eids)}</h2>
        <ol className="relative mt-8 space-y-10 border-s border-gold/20 ps-6 sm:ps-10">
          {EID_STEPS.map((s, i) => (
            <Step key={s.id} s={s} n={i + 1} />
          ))}
        </ol>
      </section>

      {/* Al-Kahf: 300 and 309 */}
      <section id="kahf" className="glass mb-10 rounded-3xl p-6 sm:p-8">
        <h2 className="text-2xl font-semibold text-ink sm:text-3xl">{pick(KAHF.title)}</h2>
        <p className="mt-3 leading-relaxed text-ink-2">{pick(KAHF.lead)}</p>
        <div className="mt-3 flex flex-wrap items-center gap-1.5">
          <LevelChip level="quran" />
          <RefChip r="18:25" />
          <RefChip r="18:26" />
        </div>
        <p className="mt-5 leading-relaxed text-ink-2">{pick(KAHF.explain)}</p>
        <div className="mt-3 flex flex-wrap items-center gap-1.5">
          <LevelChip level="tradition" />
          {KAHF.r.map((r) => (
            <RefChip key={r} r={r} />
          ))}
        </div>

        <div className="mt-6 rounded-2xl border border-gold/25 bg-gold/[0.04] p-5">
          <label className="flex flex-wrap items-center gap-3 text-ink">
            <input
              type="number"
              min={1}
              max={10000}
              value={solar}
              onChange={(e) => setSolar(Math.max(1, Math.min(10000, Number(e.target.value) || 1)))}
              className="w-28 rounded-xl border border-white/15 bg-night-2 px-3 py-2 text-lg font-semibold text-gold-2"
              aria-label={pick(UI.kahfCalc)}
            />
            <span>{pick(UI.kahfCalc)}</span>
            <span className="text-ink-3">{pick(UI.kahfEquals)}</span>
            <strong className="text-2xl text-gold-2">{lunar.toLocaleString(LOCALE[lang], { maximumFractionDigits: 1 })}</strong>
            <span>{pick(UI.lunarYears)}</span>
          </label>
          <div className="mt-5 space-y-2" aria-hidden="true">
            <div className="flex items-center gap-3">
              <span className="w-24 shrink-0 text-xs text-ink-3">{pick(UI.kahfCalc)}</span>
              <div className="h-3 flex-1 rounded-full bg-white/5">
                <div className="h-3 rounded-full bg-sky-300/70" style={{ width: `${(solar / lunar) * 100}%` }} />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-24 shrink-0 text-xs text-ink-3">{pick(UI.lunarYears)}</span>
              <div className="h-3 flex-1 rounded-full bg-white/5">
                <div className="h-3 w-full rounded-full bg-gold/80" />
              </div>
            </div>
          </div>
        </div>

        <aside className="mt-5 flex gap-2.5 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm leading-relaxed text-ink-2" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
          <Info aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-gold" />
          <p>
            <span className="font-semibold text-ink">{pick(UI.differ)}. </span>
            {pick(KAHF.note)}
          </p>
        </aside>
      </section>

      <p className="text-center">
        <A href="/times" className="ref">
          {pick(UI.more)}
        </A>
      </p>
    </div>
  )
}
