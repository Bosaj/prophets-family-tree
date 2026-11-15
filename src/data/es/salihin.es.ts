// Spanish names for the righteous and the Qur’an’s stories, added when the page that shows them loads. Long descriptions still show in English.
import { QURANIC_STORIES, SALIHIN_DATA } from '../salihin'
import { addSpanish, type Fields } from './addSpanish'

const SALIHIN: Record<string, Fields> = {
  maryam_bint_imran: { name: 'Maryam hija de ‘Imran', title: 'Elegida sobre las mujeres de los mundos' },
  asiya_bint_muzahim: { name: 'Asiya hija de Muzahim (esposa del Faraón)', title: 'La reina que eligió el Paraíso antes que un trono' },
  luqman_al_hakim: { name: 'Luqman el Sabio', title: 'Maestro de sabiduría y gratitud' },
  al_khidr: { name: 'Al-Jidr (el siervo justo)', title: 'El sabio del decreto oculto' },
  dhul_qarnayn: { name: 'Dhul-Qarnayn (el de los dos cuernos)', title: 'El rey justo y constructor de la muralla de hierro' },
  talut: { name: 'Talut (el rey Saúl)', title: 'El jefe elegido por su saber y su fuerza' },
  ashab_al_kahf: { name: 'Los compañeros de la cueva (Ashab al-Kahf)', title: 'Los jóvenes fieles a su conciencia y la resurrección' },
  mumin_al_yasin: { name: 'El creyente de la sura Ya-Sin', title: 'El mártir del consejo sincero' },
  mumin_al_firawn: { name: 'El creyente de la familia del Faraón', title: 'La voz de la verdad en el palacio del tirano' },
  yusha_ibn_nun: { name: 'Yusha‘ ibn Nun (Josué)', title: 'El compañero fiel y conquistador de la Tierra Santa' },
}

const STORIES: Record<string, Fields> = {
  story_ashab_al_kahf: { title: 'Los compañeros de la cueva' },
  story_ashab_al_fil: { title: 'Los compañeros del elefante' },
  story_ashab_al_ukhdud: { title: 'La gente de la zanja' },
  story_qarun: { title: 'Qarun (Coré) y sus tesoros' },
  story_bilqis_sulayman: { title: 'La reina de Saba (Bilqis) y Salomón' },
  story_ashab_al_jannah: { title: 'Los dueños del huerto quemado' },
  story_ashab_al_sabt: { title: 'Los que violaron el sábado junto al mar' },
}

addSpanish(SALIHIN_DATA, SALIHIN)
addSpanish(QURANIC_STORIES, STORIES)
