// The Spanish long texts (stories, places, notes) of each dataset, keyed by the textKey of their English text.
// Loaded only for Spanish readers, after the page is shown; English stays the fallback for any text not listed.
import { textKey } from '../../../lib/textKey'

type Map = Record<string, string>

/** Sets `es` on every text of `root` that has en/ar and no es yet, from `map`. Returns how many were set. */
export function applyLong(root: unknown, map: Map): number {
  const seen = new Set<object>()
  let n = 0
  const walk = (v: unknown) => {
    if (!v || typeof v !== 'object' || seen.has(v)) return
    seen.add(v)
    const o = v as Record<string, unknown>
    if (typeof o.en === 'string' && typeof o.ar === 'string') {
      if (!o.es) {
        const es = map[textKey(o.en)]
        if (es) {
          o.es = es
          n++
        }
      }
      return
    }
    for (const k of Object.keys(o)) walk(o[k])
  }
  walk(root)
  return n
}

const SETS: [() => Promise<unknown>, () => Promise<{ default: Map }>][] = [
  // People: the core summaries now; the era chunks when they load (people/loader.ts) or are already loaded.
  [() => import('../../peopleCore'), () => import('./people.json')],
  [async () => (await import('../../people/loader')).loadedPeople(), () => import('./people.json')],
  [() => import('../../links'), () => import('./links.json')],
  [() => import('../../nature'), () => import('./nature.json')],
  [() => import('../../sahaba'), () => import('./sahaba.json')],
  [() => import('../../scriptures'), () => import('./scriptures.json')],
  [() => import('../../salihin'), () => import('./salihin.json')],
  [() => import('../../science'), () => import('./science.json')],
  [() => import('../../preAdam'), () => import('./preAdam.json')],
]

let done: Promise<number> | null = null

/** Applies the Spanish long texts to an era chunk of people as it loads (Spanish readers only). */
export async function applyLongPeople(list: unknown): Promise<void> {
  applyLong(list, (await import('./people.json')).default)
}

/** Loads and applies every dataset's Spanish texts once. */
export function applyAllLong(): Promise<number> {
  done ??= Promise.all(SETS.map(async ([data, texts]) => applyLong(await data(), (await texts()).default))).then((counts) => counts.reduce((a, b) => a + b, 0))
  return done
}
