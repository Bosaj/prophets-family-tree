/** A short, stable key for a text (FNV-1a, 32-bit, base 36). The Spanish long texts are stored by the key of their English text. */
export function textKey(s: string): string {
  let h = 0x811c9dc5
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i)
    h = Math.imul(h, 0x01000193) >>> 0
  }
  return h.toString(36)
}
