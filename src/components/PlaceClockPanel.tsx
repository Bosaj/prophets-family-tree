import { useState } from 'react'
import { LocateFixed, MapPin, Moon } from 'lucide-react'
import { useI18n } from '../i18n'
import type { L4 } from '../data/types'
import { DAY_PARTS, PRAYERS } from '../data/awqat'
import { PLACES } from '../lib/places'
import { usePlace } from '../lib/place'
import { nowInfo } from '../lib/nowInfo'
import { hijriText, LOCALE, NOW_UI } from '../lib/nowText'
import { A } from './ui'

/** The clock panel: change the place, see the device's time zone, today's Hijri date, the part of the day and the next prayer. Loaded when opened. */
export default function PlaceClockPanel({ onClose }: { onClose: () => void }) {
  const { pick, lang } = useI18n()
  const { place, setPlace, now, deviceTz, locate } = usePlace()
  const [locating, setLocating] = useState(false)
  const [denied, setDenied] = useState(false)
  const time = (d: Date, tz: string) => new Intl.DateTimeFormat(LOCALE[lang], { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: tz }).format(d)
  const info = nowInfo(place, now)
  const part = DAY_PARTS.find((p) => p.id === info.part)
  const prayer = PRAYERS.find((p) => p.id === info.next.key)
  const cityName = pick(place.name as L4)
  return (
    <div role="dialog" aria-label={pick(NOW_UI.label)} className="absolute end-0 top-full z-50 mt-2 w-[min(20rem,calc(100vw-1.5rem))] rounded-2xl border border-gold/30 bg-night-surface/95 p-4 text-sm shadow-[0_16px_40px_rgba(0,0,0,0.7)] backdrop-blur-2xl">
    <p className="text-xs font-semibold uppercase tracking-wider text-gold">{pick(NOW_UI.label)}</p>
    <label className="mt-3 flex items-center gap-2 text-ink-2">
      <MapPin className="size-3.5 shrink-0 text-gold" aria-hidden="true" />
      <span className="sr-only">{pick(NOW_UI.place)}</span>
      <select
        value={PLACES.some((p) => p.id === place.id) ? place.id : ''}
        onChange={(e) => {
          const p = PLACES.find((x) => x.id === e.target.value)
          if (p) setPlace(p)
        }}
        className="min-w-0 flex-1 rounded-full border border-white/15 bg-night-2 px-3 py-1 text-ink"
      >
        {!PLACES.some((p) => p.id === place.id) && <option value="">{cityName}</option>}
        {PLACES.map((p) => (
          <option key={p.id} value={p.id}>
            {pick(p.name)}
          </option>
        ))}
      </select>
    </label>
    <button
      type="button"
      disabled={locating}
      onClick={() => {
        setLocating(true)
        setDenied(false)
        locate().then((ok) => {
          setLocating(false)
          setDenied(!ok)
        })
      }}
      className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-1 text-xs text-ink-2 hover:border-gold/40 hover:text-ink disabled:opacity-60"
    >
      <LocateFixed className="size-3.5" aria-hidden="true" /> {pick(locating ? NOW_UI.locating : NOW_UI.locate)}
    </button>
    {denied && <p role="alert" className="mt-1 text-xs text-lvl-disputed">{pick(NOW_UI.denied)}</p>}
    <p className="mt-2 text-xs text-ink-3">
      {pick(NOW_UI.device)}: <bdi>{deviceTz}</bdi> · <span className="tabular-nums">{time(now, deviceTz)}</span>
    </p>

    <dl className="mt-4 space-y-2 border-t border-white/10 pt-3">
      <div>
        <dt className="sr-only">{pick(NOW_UI.calendar)}</dt>
        <dd className="flex items-start gap-2">
          <Moon className="mt-0.5 size-3.5 shrink-0 text-gold" aria-hidden="true" />
          <span>
          <span className="font-semibold text-gold-2">{hijriText(info.hijri.date, lang, pick)}</span>
          {info.hijri.status === 'estimate' && <span className="ms-1 text-xs text-ink-3">({pick(NOW_UI.estimate)})</span>}
          {info.nightOf && (
            <span className="block text-xs text-ink-3">
              {pick(NOW_UI.nightOf)} {hijriText(info.nightOf, lang, pick)}
            </span>
          )}
          </span>
        </dd>
      </div>
      <div className="flex justify-between gap-2">
        <dt className="text-ink-3">{pick(NOW_UI.now)}</dt>
        <dd className="text-end text-ink">{part ? pick(part.title) : ''}</dd>
      </div>
      <div className="flex justify-between gap-2">
        <dt className="text-ink-3">{pick(NOW_UI.next)}</dt>
        <dd className="text-end text-ink">
          {prayer ? pick(prayer.name) : ''} · <span className="tabular-nums">{time(info.next.at, place.tz)}</span>
        </dd>
      </div>
    </dl>

    <div className="mt-4 flex flex-wrap gap-2">
      <A href="/times" onClick={onClose} className="ref">
        {pick(NOW_UI.times)}
      </A>
      <A href="/hijri" onClick={onClose} className="ref">
        {pick(NOW_UI.calendar)}
      </A>
    </div>
  </div>
  )
}
