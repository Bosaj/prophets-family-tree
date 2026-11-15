// Spanish names for the scriptures, added when the page that shows them loads. Long descriptions still show in English.
import { SCRIPTURES } from '../scriptures'
import { addSpanish, type Fields } from './addSpanish'

const BOOKS: Record<string, Fields> = {
  quran: { title: 'El Noble Corán' },
  tawrat: { title: 'La Torá (at-Tawrat) y las Tablas' },
  zabur: { title: 'Los Salmos (az-Zabur)' },
  injeel: { title: 'El Evangelio (al-Inyil)' },
  suhuf_ibrahim: { title: 'Las Hojas de Abraham (Suhuf Ibrahim)' },
  suhuf_idris: { title: 'Las 30 Hojas de Idris' },
  suhuf_shith: { title: 'Las 50 Hojas de Set (Suhuf Shith)' },
}

addSpanish(SCRIPTURES, BOOKS)
