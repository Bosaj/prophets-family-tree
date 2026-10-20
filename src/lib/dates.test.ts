import { describe, it, expect } from 'vitest'
import { formatDate, formatBirthDeath } from './dates'

describe('dates translation utility', () => {
  it('translates 9 BH into 3 languages', () => {
    expect(formatDate('9 BH', 'en')).toBe('9 BH')
    expect(formatDate('9 BH', 'fr')).toBe('9 av. H')
    expect(formatDate('9 BH', 'ar')).toBe('9 ق.هـ')
  })

  it('translates 610 CE into 3 languages', () => {
    expect(formatDate('610 CE', 'en')).toBe('610 CE')
    expect(formatDate('610 CE', 'fr')).toBe('610 ap. J.-C.')
    expect(formatDate('610 CE', 'ar')).toBe('610 م')
  })

  it('translates 58 AH into 3 languages', () => {
    expect(formatDate('58 AH', 'en')).toBe('58 AH')
    expect(formatDate('58 AH', 'fr')).toBe('58 H')
    expect(formatDate('58 AH', 'ar')).toBe('58 هـ')
  })

  it('translates BCE and circa prefix', () => {
    expect(formatDate('c. 1300 BCE', 'en')).toBe('c. 1300 BCE')
    expect(formatDate('c. 1300 BCE', 'fr')).toBe('env. 1300 av. J.-C.')
    expect(formatDate('c. 1300 BCE', 'ar')).toBe('حوالي 1300 ق.م')
  })

  it('formats combined birth and death string in 3 languages', () => {
    expect(formatBirthDeath('9 BH', '610 CE', 'en')).toBe('9 BH (610 CE)')
    expect(formatBirthDeath('9 BH', '610 CE', 'fr')).toBe('9 av. H (610 ap. J.-C.)')
    expect(formatBirthDeath('9 BH', '610 CE', 'ar')).toBe('9 ق.هـ (610 م)')

    expect(formatBirthDeath('50 AH', '670 CE', 'ar')).toBe('50 هـ (670 م)')
  })
})
