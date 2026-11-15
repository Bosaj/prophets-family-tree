import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { L4 } from '../data/types'
import { guessMethod, PLACES, type Place } from './places'

/**
 * The reader's place and time, shared by every page: prayer times, the Hijri date, the header clock and the
 * home page all read it. It starts from the saved choice, else the first city in this device's time zone,
 * else Rabat, and can be set from the header, the Times page or the device's location.
 */

const STORE = 'shajara:place'
export const HERE: L4 = { en: 'My location', fr: 'Ma position', ar: 'موقعي', es: 'Mi ubicación' }

export function deviceTimeZone(): string {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC'
  } catch {
    return 'UTC'
  }
}

export function initialPlace(): Place {
  try {
    const saved = JSON.parse(localStorage.getItem(STORE) ?? 'null') as Place | null
    if (saved && typeof saved.lat === 'number' && typeof saved.lng === 'number' && saved.tz) return saved
  } catch {
    /* storage blocked */
  }
  const tz = deviceTimeZone()
  return PLACES.find((p) => p.tz === tz) ?? PLACES[0]!
}

interface PlaceCtx {
  place: Place
  setPlace: (p: Place) => void
  /** Ticks every 30 seconds. */
  now: Date
  /** The device's own time zone, from the browser. */
  deviceTz: string
  /** Use the device's position; resolves false when it is refused or unavailable. */
  locate: () => Promise<boolean>
}

const Ctx = createContext<PlaceCtx | null>(null)

export function PlaceProvider({ children }: { children: ReactNode }) {
  const [place, setPlaceState] = useState<Place>(initialPlace)
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 30_000)
    return () => clearInterval(id)
  }, [])

  const setPlace = useCallback((p: Place) => {
    setPlaceState(p)
    try {
      localStorage.setItem(STORE, JSON.stringify(p))
    } catch {
      /* storage blocked */
    }
  }, [])

  const locate = useCallback(
    () =>
      new Promise<boolean>((resolve) => {
        if (typeof navigator === 'undefined' || !navigator.geolocation) return resolve(false)
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            const lat = Number(pos.coords.latitude.toFixed(4))
            const lng = Number(pos.coords.longitude.toFixed(4))
            setPlace({ id: 'here', name: HERE, lat, lng, tz: deviceTimeZone(), method: guessMethod(lat, lng) })
            resolve(true)
          },
          () => resolve(false),
          { timeout: 10_000, maximumAge: 3_600_000 },
        )
      }),
    [setPlace],
  )

  const value = useMemo(() => ({ place, setPlace, now, deviceTz: deviceTimeZone(), locate }), [place, setPlace, now, locate])
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

/** The shared place; outside a provider (tests of a single component) it falls back to a fixed, local one. */
export function usePlace(): PlaceCtx {
  const ctx = useContext(Ctx)
  const [fallback, setFallback] = useState<Place>(initialPlace)
  if (ctx) return ctx
  return { place: fallback, setPlace: setFallback, now: new Date(), deviceTz: deviceTimeZone(), locate: async () => false }
}
