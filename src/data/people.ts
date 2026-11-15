import type { Person } from './types.ts'
import { primordialPeople } from './people/primordial.ts'
import { ibrahamicPeople } from './people/ibrahamic.ts'
import { mosaicAndKingsPeople } from './people/mosaicAndKings.ts'
import { gospelAndFinalPeople } from './people/gospelAndFinal.ts'

export { ululAzm, heavens } from './peopleCore.ts'

const ORDER = ["adam","shith","idris","nuh","hud","salih","azar","ibrahim","lut","ismail","ishaq","yaqub","yusuf","ayyub","shuayb","musa","harun","dhulkifl","dawud","sulayman","ilyas","alyasa","yunus","zakariya","yahya","imran","maryam","isa","muhammad","hawwa","qabil","habil","sam","ham","yafith","yam","sarah","hajar","binyamin","safura","khadijah","aisha","fatimah","sawdah","hafsah","zaynab_khuzaymah","umm_salamah","zaynab_jahsh","juwayriyah","umm_habibah","safiyyah","maymunah","mariyah","qasim","abdullah_m","ibrahim_m","zaynab_m","ruqayyah","umm_kulthum"]
const raw: Person[] = [
  ...primordialPeople,
  ...ibrahamicPeople,
  ...mosaicAndKingsPeople,
  ...gospelAndFinalPeople,
]
const rawMap = new Map(raw.map((p) => [p.id, p]))

/**
 * The 25 Prophets named in the Qur'an, plus the family members needed to draw the lineage.
 * Assembled from split per-era chunks for tests and verification scripts; runtime views import peopleCore + loader.ts.
 */
export const people: Person[] = ORDER.map((id) => rawMap.get(id)!)
export const byId = new Map(people.map((p) => [p.id, p]))
export const prophets = people.filter((p) => p.kind === 'prophet')
