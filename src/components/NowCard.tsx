import { Clock, Moon, Sunset } from 'lucide-react'
import { useI18n } from '../i18n'
import type { L4 } from '../data/types'
import { DAY_PARTS, PRAYERS } from '../data/awqat'
import { usePlace } from '../lib/place'
import { nowInfo } from '../lib/nowInfo'
import { hijriText, LOCALE, NOW_UI } from '../lib/nowText'
import { A, q } from './ui'
import { FastBanner } from './FastingReminders'

/** "Now, where you are": the home page's link between the reader's own time and the guidance for it. */
export default function NowCard() {
  const { pick, lang } = useI18n()
  const { place, now } = usePlace()
  const info = nowInfo(place, now)
  const part = DAY_PARTS.find((p) => p.id === info.part)
  const prayer = PRAYERS.find((p) => p.id === info.next.key)
  const time = (d: Date) => new Intl.DateTimeFormat(LOCALE[lang], { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: place.tz }).format(d)
  const firstGuide = part?.guide[0]

  return (
    <>
      <A href="/times" className="glass mt-8 block max-w-xl rounded-2xl p-4 transition-colors hover:border-gold/40 sm:p-5">
        <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-ink-3">
          <span className="inline-flex items-center gap-1">
            <Clock className="size-3.5 text-gold" aria-hidden="true" />
            <span className="font-semibold tabular-nums text-gold-2">{time(now)}</span> · {q(pick(place.name as L4))}
          </span>
          <span className="inline-flex items-center gap-1">
            <Moon className="size-3.5 text-gold" aria-hidden="true" /> {hijriText(info.hijri.date, lang, pick)}
          </span>
        </p>
        <p className="mt-2 text-lg font-semibold text-ink">
          {q(pick(NOW_UI.now))}: {part ? pick(part.title) : ''}
        </p>
        {firstGuide && <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-ink-2">{q(pick(firstGuide.text))}</p>}
        <p className="mt-2 inline-flex items-center gap-1.5 text-sm text-gold">
          <Sunset className="size-4" aria-hidden="true" /> {q(pick(NOW_UI.next))}: {prayer ? pick(prayer.name) : ''} · <span className="tabular-nums">{time(info.next.at)}</span>
        </p>
      </A>
      <FastBanner />
    </>
  )
}
