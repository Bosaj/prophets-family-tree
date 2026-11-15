// Every Spanish long text must match an English text that still needs it: when an English text changes, its key
// (textKey of the English) changes too, and the Spanish entry must be moved to the new key.
import { describe, expect, it } from 'vitest'
import { textKey } from '../../../lib/textKey'
import * as people from '../../people'
import * as links from '../../links'
import * as nature from '../../nature'
import * as sahaba from '../../sahaba'
import * as scriptures from '../../scriptures'
import * as salihin from '../../salihin'
import * as science from '../../science'
import * as preAdam from '../../preAdam'
import peopleEs from './people.json'
import linksEs from './links.json'
import natureEs from './nature.json'
import sahabaEs from './sahaba.json'
import scripturesEs from './scriptures.json'
import salihinEs from './salihin.json'
import scienceEs from './science.json'
import preAdamEs from './preAdam.json'

function englishKeys(root: unknown): Set<string> {
  const keys = new Set<string>()
  const seen = new Set<object>()
  const walk = (v: unknown) => {
    if (!v || typeof v !== 'object' || seen.has(v)) return
    seen.add(v)
    const o = v as Record<string, unknown>
    if (typeof o.en === 'string' && typeof o.ar === 'string') {
      keys.add(textKey(o.en))
      return
    }
    for (const k of Object.keys(o)) walk(o[k])
  }
  walk(root)
  return keys
}

const SETS: [string, unknown, Record<string, string>][] = [
  ['people', people, peopleEs],
  ['links', links, linksEs],
  ['nature', nature, natureEs],
  ['sahaba', sahaba, sahabaEs],
  ['scriptures', scriptures, scripturesEs],
  ['salihin', salihin, salihinEs],
  ['science', science, scienceEs],
  ['preAdam', preAdam, preAdamEs],
]

describe('Spanish long texts', () => {
  it.each(SETS)('%s: every Spanish text belongs to an English text of the dataset', (_name, data, es) => {
    const keys = englishKeys(data)
    const orphans = Object.keys(es).filter((k) => !keys.has(k))
    expect(orphans).toEqual([])
  })

  it('textKey is stable', () => {
    expect(textKey('Adam')).toBe('1nxg6wy')
  })
})
