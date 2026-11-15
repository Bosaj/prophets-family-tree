import type { Person } from '../types'

export type PersonGroup = 'primordial' | 'ibrahamic' | 'mosaicAndKings' | 'gospelAndFinal'

export const PERSON_GROUP_BY_ID: Record<string, PersonGroup> = {
  adam: 'primordial',
  shith: 'primordial',
  idris: 'primordial',
  nuh: 'primordial',
  hud: 'primordial',
  salih: 'primordial',
  hawwa: 'primordial',
  qabil: 'primordial',
  habil: 'primordial',
  sam: 'primordial',
  ham: 'primordial',
  yafith: 'primordial',
  yam: 'primordial',
  azar: 'ibrahamic',
  ibrahim: 'ibrahamic',
  lut: 'ibrahamic',
  ismail: 'ibrahamic',
  ishaq: 'ibrahamic',
  yaqub: 'ibrahamic',
  yusuf: 'ibrahamic',
  ayyub: 'ibrahamic',
  shuayb: 'ibrahamic',
  sarah: 'ibrahamic',
  hajar: 'ibrahamic',
  binyamin: 'ibrahamic',
  musa: 'mosaicAndKings',
  harun: 'mosaicAndKings',
  dhulkifl: 'mosaicAndKings',
  dawud: 'mosaicAndKings',
  sulayman: 'mosaicAndKings',
  ilyas: 'mosaicAndKings',
  alyasa: 'mosaicAndKings',
  yunus: 'mosaicAndKings',
  safura: 'mosaicAndKings',
  zakariya: 'gospelAndFinal',
  yahya: 'gospelAndFinal',
  imran: 'gospelAndFinal',
  maryam: 'gospelAndFinal',
  isa: 'gospelAndFinal',
  muhammad: 'gospelAndFinal',
  fatimah: 'gospelAndFinal',
  khadijah: 'gospelAndFinal',
  sawdah: 'gospelAndFinal',
  aisha: 'gospelAndFinal',
  hafsah: 'gospelAndFinal',
  zaynab_khuzaymah: 'gospelAndFinal',
  umm_salamah: 'gospelAndFinal',
  zaynab_jahsh: 'gospelAndFinal',
  juwayriyah: 'gospelAndFinal',
  umm_habibah: 'gospelAndFinal',
  safiyyah: 'gospelAndFinal',
  maymunah: 'gospelAndFinal',
  mariyah: 'gospelAndFinal',
  qasim: 'gospelAndFinal',
  abdullah_m: 'gospelAndFinal',
  ibrahim_m: 'gospelAndFinal',
  zaynab_m: 'gospelAndFinal',
  ruqayyah: 'gospelAndFinal',
  umm_kulthum: 'gospelAndFinal',
}

const cache = new Map<string, Person>()
const groupPromises = new Map<PersonGroup, Promise<Person[]>>()

function loadGroup(group: PersonGroup): Promise<Person[]> {
  let pending = groupPromises.get(group)
  if (!pending) {
    pending = (async () => {
      let list: Person[]
      if (group === 'primordial') {
        list = (await import('./primordial')).primordialPeople
      } else if (group === 'ibrahamic') {
        list = (await import('./ibrahamic')).ibrahamicPeople
      } else if (group === 'mosaicAndKings') {
        list = (await import('./mosaicAndKings')).mosaicAndKingsPeople
      } else {
        list = (await import('./gospelAndFinal')).gospelAndFinalPeople
      }
      const { applySpanish } = await import('../es/people.es')
      applySpanish(list)
      for (const p of list) cache.set(p.id, p)
      return list
    })()
    groupPromises.set(group, pending)
  }
  return pending
}

/** Lazy-load full biographical/narrative Person record only for its era chunk. */
export async function loadPersonDetails(id: string): Promise<Person | undefined> {
  const hit = cache.get(id)
  if (hit) return hit
  const group = PERSON_GROUP_BY_ID[id]
  if (!group) return undefined
  await loadGroup(group)
  return cache.get(id)
}

/** Load all 4 prophetic group chunks in parallel (used lazily by Timeline & Search signs index). */
export async function loadAllPeople(): Promise<Person[]> {
  const [a, b, c, d] = await Promise.all([
    loadGroup('primordial'),
    loadGroup('ibrahamic'),
    loadGroup('mosaicAndKings'),
    loadGroup('gospelAndFinal'),
  ])
  return [...a, ...b, ...c, ...d]
}
