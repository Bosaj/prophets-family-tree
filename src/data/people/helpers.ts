import type { Fact, L3, Level, Ref } from '../types.ts'

export const t = (en: string, fr: string, ar: string): L3 => ({ en, fr, ar })
export const f = (l: Level, text: L3, ...r: Ref[]): Fact => (r.length ? { l, t: text, r } : { l, t: text })

export const UNKNOWN = t('Not stated in the sources.', 'Non précisé dans les sources.', 'لم تذكره المصادر.')
