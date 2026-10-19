/**
 * Source level of a fact or relationship. Never upgrade a level: when unsure, use the weaker one.
 * - quran: stated in the Qur'an (refs give surah:ayah)
 * - hadith: authentic hadith or established sira (refs give collection:number)
 * - tradition: scholarly / historical tradition (Qisas al-Anbiya, Tarikh al-Tabari, commentators, Biblical accounts)
 * - disputed: scholars disagree, or the claim is uncertain
 */
export type Level = 'quran' | 'hadith' | 'tradition' | 'disputed'

export type Lang = 'en' | 'fr' | 'ar'

/** Text in the three site languages. */
export type L3 = Record<Lang, string>

/**
 * A source reference.
 * - Qur'an: "7:73" or "7:73-79"
 * - hadith: "bukhari:3326", "muslim:2276", "tirmidhi:3076" (sunnah.com numbering)
 * - book:   "book:qisas", "book:tabari", "book:sira", "book:bible", "book:historians"
 */
export type Ref = string

export interface Fact {
  l: Level
  t: L3
  r?: Ref[]
}

export type Kind = 'prophet' | 'family' | 'spouse' | 'child'

export interface LifeEvent {
  id: string
  title: L3
  era?: L3
  yearHijri?: string
  yearBceCe?: string
  desc: L3
  refs?: Ref[]
}

export interface DateInfo {
  born?: Fact
  died?: Fact
  hijriBorn?: string
  hijriDied?: string
  gregorianBorn?: string
  gregorianDied?: string
}

export interface ParentInfo {
  father?: Fact
  mother?: Fact
  fosterMother?: Fact
}

export interface SacredSite {
  name: L3
  type: 'mountain' | 'valley' | 'river' | 'city' | 'well' | 'sanctuary' | 'sea' | 'tomb'
  desc?: L3
}

export interface Topography {
  region: L3
  modernCountries: L3
  sacredSites?: SacredSite[]
  missionRoute?: L3
  burialSite?: Fact
  mapCoordinates?: { lat: number; lng: number }
}

export interface Person {
  id: string
  kind: Kind
  name: L3
  /** Name used in the Bible / English tradition, when different. */
  alt?: L3
  /** Honorific or Qur'anic description. */
  title?: Fact
  /** Messenger (rasul) and/or prophet (nabi), with the verse that says so. */
  role?: Fact
  /** Chronological sequence (1 = Adam). Same number = contemporaries. */
  order: number
  era?: Fact
  /** Commonly cited count of the name in the Qur'an (counting methods vary). */
  mentions?: number
  sentTo?: Fact
  place?: Fact
  scripture?: Fact
  lifespan?: Fact
  marriage?: Fact
  children?: Fact
  parents?: ParentInfo
  siblings?: Fact[]
  spouses?: Fact[]
  allChildren?: Fact[]
  dates?: DateInfo
  events?: LifeEvent[]
  signs?: Fact[]
  notes?: Fact[]
  story: L3
  biography?: L3[]
  topography?: Topography
  /** Main Qur'an passages to read. */
  verses: Ref[]
  /** Scene image in /public/img (landscapes only — never a depiction of a person). */
  image?: string
  /** Heaven in which he was met during the Mi'raj (Bukhari 3207). */
  heaven?: number
  ululAzm?: boolean
}

export type LinkType = 'parent' | 'descendant' | 'sibling' | 'cousin' | 'guardian' | 'nephew' | 'maybe-parent' | 'spouse' | 'child'

export interface Link {
  from: string
  to: string
  type: LinkType
  l: Level
  r?: Ref[]
  note?: L3
}

