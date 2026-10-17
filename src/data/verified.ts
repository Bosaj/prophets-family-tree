import { links } from './links'
import { people, ululAzm } from './people'
import type { Fact } from './types'

/** Every Qur'an and hadith reference in the dataset (all are checked by `npm run verify:sources`). */
export function allTextRefs(): Set<string> {
  const refs = new Set<string>()
  const add = (f?: Fact) => f?.r?.forEach((r) => refs.add(r))
  for (const p of people) {
    ;[p.title, p.role, p.era, p.sentTo, p.place, p.scripture, p.lifespan, p.marriage, p.children].forEach(add)
    p.signs?.forEach(add)
    p.notes?.forEach(add)
    p.verses.forEach((r) => refs.add(r))
  }
  links.forEach((k) => k.r?.forEach((r) => refs.add(r)))
  add(ululAzm)
  for (const r of refs) if (r.startsWith('book:')) refs.delete(r)
  return refs
}

export const VERIFIED_REFS = allTextRefs().size
