import type { L3 } from '../types'

export type Fields = Record<string, string>

/** Adds Spanish to the named L3 fields of each item, keyed by id; leaves existing Spanish alone. */
export function addSpanish<T extends { id: string }>(list: readonly T[], names: Record<string, Fields>) {
  for (const item of list) {
    const fields = names[item.id]
    if (!fields) continue
    for (const [key, es] of Object.entries(fields)) {
      const v = (item as unknown as Record<string, L3 | undefined>)[key]
      if (v && typeof v === 'object' && !v.es) v.es = es
    }
  }
}
