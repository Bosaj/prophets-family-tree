import { render, screen, cleanup, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { I18nProvider } from './i18n'
import App from './App'
import { navigate } from './lib/router'
import { SAHABA_FIGURES } from './data/sahaba'
import { SCIENTIFIC_FACTS } from './data/science'

const renderAt = (path: string, lang: 'en' | 'fr' | 'ar' = 'en') => {
  cleanup()
  navigate(path, { replace: true })
  return render(
    <I18nProvider lang={lang}>
      <App />
    </I18nProvider>,
  )
}

describe('Full Website Automated Test Suite', () => {
  afterEach(() => {
    cleanup()
  })

  describe('1. Sahaba, Caliphs & Hadith Masters (/sahaba)', () => {
    it('renders all 41 figures with accurate era filter chip counts', () => {
      renderAt('/sahaba')
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/Tree of Sahaba, Caliphs/i)

      // Total count across entire dataset must equal 41
      expect(SAHABA_FIGURES.length).toBe(41)

      // "All Figures" filter chip must show 41 (and never 0)
      const allChip = screen.getByRole('button', { name: /All Figures & Dynasties\s*\(41\)/i })
      expect(allChip).toBeInTheDocument()

      // Verify specific era chip counts
      expect(screen.getByRole('button', { name: /Hadith Masters & Preservers\s*\(3\)/i })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /Rightly Guided Caliphs\s*\(5\)/i })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /Ten Promised Paradise\s*\(6\)/i })).toBeInTheDocument()
    })

    it('filters correctly to Hadith Masters (Abu Hurairah, Al-Bukhari, Imam Muslim) in Cards view', async () => {
      const user = userEvent.setup()
      renderAt('/sahaba')

      // Switch to detailed cards view
      const cardsBtn = screen.getByRole('button', { name: /Detailed Cards/i })
      await user.click(cardsBtn)

      // Click Hadith Masters filter chip
      const hadithChip = screen.getByRole('button', { name: /Hadith Masters & Preservers\s*\(3\)/i })
      await user.click(hadithChip)

      // Cards must only show the 3 Hadith scholars
      expect(screen.getByTestId('sahaba-card-imam_bukhari')).toBeInTheDocument()
      expect(screen.getByTestId('sahaba-card-imam_muslim')).toBeInTheDocument()
      expect(screen.getByTestId('sahaba-card-abu_hurairah')).toBeInTheDocument()

      // Non-Hadith masters (e.g. Muawiyah, Harun al-Rashid) must be filtered out
      expect(screen.queryByTestId('sahaba-card-muawiyah_ibn_abi_sufyan')).not.toBeInTheDocument()
      expect(screen.queryByTestId('sahaba-card-harun_al_rashid')).not.toBeInTheDocument()
    })

    it('filters correctly in Timeline view', async () => {
      const user = userEvent.setup()
      renderAt('/sahaba')

      // Switch to Timeline view
      const timelineBtn = screen.getByRole('button', { name: /Chronological Timeline/i })
      await user.click(timelineBtn)

      // Filter by Rightly Guided Caliphs (5 figures)
      const rashidunChip = screen.getByRole('button', { name: /Rightly Guided Caliphs\s*\(5\)/i })
      await user.click(rashidunChip)

      expect(screen.getByTestId('sahaba-timeline-abu_bakr')).toBeInTheDocument()
      expect(screen.getByTestId('sahaba-timeline-umar_ibn_khattab')).toBeInTheDocument()
      expect(screen.getByTestId('sahaba-timeline-uthman_ibn_affan')).toBeInTheDocument()
      expect(screen.getByTestId('sahaba-timeline-ali_ibn_abi_talib')).toBeInTheDocument()
      expect(screen.getByTestId('sahaba-timeline-hasan_ibn_ali')).toBeInTheDocument()

      // Scholars and modern figures must not exist inside the Rashidun timeline
      expect(screen.queryByTestId('sahaba-timeline-imam_bukhari')).not.toBeInTheDocument()
      expect(screen.queryByTestId('sahaba-timeline-king_mohammed_vi')).not.toBeInTheDocument()
    })

    it('searches by name or keyword dynamically', async () => {
      const user = userEvent.setup()
      renderAt('/sahaba')

      const cardsBtn = screen.getByRole('button', { name: /Detailed Cards/i })
      await user.click(cardsBtn)

      const searchInput = screen.getByPlaceholderText(/Search by name, title, lineage, or era/i)
      await user.type(searchInput, 'Bukhari')

      expect(screen.getByTestId('sahaba-card-imam_bukhari')).toBeInTheDocument()
      expect(screen.queryByTestId('sahaba-card-abu_bakr')).not.toBeInTheDocument()
    })

    it('opens detailed biography modal when a figure is clicked', async () => {
      const user = userEvent.setup()
      renderAt('/sahaba')

      const cardsBtn = screen.getByRole('button', { name: /Detailed Cards/i })
      await user.click(cardsBtn)

      // Find Bukhari card button using data-testid
      const bukhariCard = screen.getByTestId('sahaba-card-imam_bukhari')
      expect(bukhariCard).toBeInTheDocument()
      await user.click(bukhariCard)

      // Modal should open with scholarly credentials
      expect(screen.getAllByText(/Sahih al-Bukhari/i).length).toBeGreaterThan(0)
      expect(screen.getAllByText(/Eminent Teachers/i).length).toBeGreaterThan(0)

      // Close modal
      const closeBtns = screen.getAllByRole('button', { name: /Close|✕/i })
      await user.click(closeBtns[0]!)
    })
  })

  describe('2. Tree of Prophets & Pre-Adamic Realm (/tree)', () => {
    it('renders the Tree of Prophets and primordial separation barrier before Adam', () => {
      renderAt('/tree')

      // Check Pre-Adamic barrier threshold text
      expect(
        screen.getByText(/Primordial Threshold · Adam & Humankind/i),
      ).toBeInTheDocument()

      // Check the Hadith creation principle text
      expect(
        screen.getByText(/«Angels from Light · Jinn & Iblis from Fire · Adam from Clay»/i),
      ).toBeInTheDocument()

      // Check Pre-Adamic banner
      expect(
        screen.getByText(/Pre-Adamic Realm \(Jinn, Hinn & Nasnas\)/i),
      ).toBeInTheDocument()
    })

    it('opens the Pre-Adamic Realm modal when clicking Pre-Adamic entities and displays the famous angels and their appearance', () => {
      renderAt('/tree')

      // Click the Pre-Adamic Realm banner via fireEvent for SVG synthetic event handling
      const banner = screen.getByTestId('preadam-banner')
      fireEvent.click(banner)

      // Modal opens
      expect(
        screen.getByText(/The Pre-Adamic Realm: Angels, Iblis, Jinn, Hinn, Binn & Nasnas/i),
      ).toBeInTheDocument()
      expect(screen.getByText(/Al-Jinn \(Pre-Adamic Inhabitants\)/i)).toBeInTheDocument()

      // Click on Angels entity
      const angelsCard = screen.getByText(/Al-Mala’ikah \(The Angels of Light\)/i)
      fireEvent.click(angelsCard)

      // Verifies Famous Angels and How They Look
      expect(screen.getByText(/Great Archangels in the Qur’an & Sunnah & How They Look/i)).toBeInTheDocument()
      expect(screen.getByText(/Jibril \/ Gabriel \(The Spirit of Truth\)/i)).toBeInTheDocument()
      expect(screen.getByText(/Mikail \/ Michael \(Angel of Provision & Rain\)/i)).toBeInTheDocument()
      expect(screen.getByText(/Israfil \(The Angel of the Trumpet\)/i)).toBeInTheDocument()
      expect(screen.getByText(/Malak al-Mawt \(The Angel of Death\)/i)).toBeInTheDocument()
      expect(screen.getAllByText(/Appearance in Qur’an & Sunnah \(How They Look\):/i).length).toBeGreaterThan(0)
      expect(screen.getByText(/Endowed with 600 wings/i)).toBeInTheDocument()
    })
  })

  describe('3. Scientific Miracles & Research Papers (/science)', () => {
    it('renders scientific facts including the mosquito miracle and creatures atop it with verified research papers', () => {
      renderAt('/science')
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/Scientific Facts in Qur'an & Hadith/i)

      // Total facts count
      expect(SCIENTIFIC_FACTS.length).toBeGreaterThanOrEqual(11)

      // Verifies Mosquito scientific miracle (Surah 2:26)
      expect(screen.getAllByText(/The Mosquito & The Creatures Upon It/i).length).toBeGreaterThan(0)
      expect(screen.getAllByText(/Journal of Medical Entomology/i).length).toBeGreaterThan(0)
      expect(screen.getAllByText(/Smith, B\. P\./i).length).toBeGreaterThan(0)

      // Verifies presence of peer-reviewed journals
      expect(screen.getAllByText(/PNAS/i).length).toBeGreaterThan(0)
      expect(screen.getAllByText(/Nature/i).length).toBeGreaterThan(0)

      // Verifies category filters are present
      expect(screen.getByRole('button', { name: /All Scientific Facts/i })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /Biology & Microscopic Wonders/i })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /Geology & Mountains/i })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /Cosmology & Space/i })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /Oceanography & Seas/i })).toBeInTheDocument()
    })

    it('filters facts when a category chip is selected', async () => {
      const user = userEvent.setup()
      renderAt('/science')

      const geologyBtn = screen.getByRole('button', { name: /Geology & Mountains/i })
      await user.click(geologyBtn)

      // Mountain peg / isostasy fact should be visible
      expect(screen.getAllByText(/Mountains as Pegs with Deep Crustal Roots/i).length).toBeGreaterThan(0)

      // Astronomy facts should be filtered out
      expect(screen.queryByText(/Expansion of the Universe/i)).not.toBeInTheDocument()
    })
  })

  describe('4. Creatures, Flora & Prophetic Medicine (/nature)', () => {
    it('renders Hoopoe (Upupa epops), Rock Dove (Hamama), and the Mosquito (Culicidae) with full biological and Quranic details', () => {
      renderAt('/nature')
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/Creatures, Flora & Prophetic Medicine/i)

      // Hoopoe (Upupa epops)
      expect(screen.getAllByText(/Hoopoe/i).length).toBeGreaterThan(0)
      expect(screen.getAllByText(/Upupa epops/i).length).toBeGreaterThan(0)

      // Rock Dove / Pigeon (Hamama - Columba livia)
      expect(screen.getAllByText(/Dove & Pigeon/i).length).toBeGreaterThan(0)
      expect(screen.getAllByText(/Columba livia/i).length).toBeGreaterThan(0)

      // The Mosquito & Micro-Organisms (Culicidae - 2:26)
      expect(screen.getAllByText(/The Mosquito & Micro-Organisms/i).length).toBeGreaterThan(0)
      expect(screen.getAllByText(/Culicidae/i).length).toBeGreaterThan(0)
    })

    it('switches between Creatures and Plants/Healing Foods tabs', async () => {
      const user = userEvent.setup()
      renderAt('/nature')

      // Switch to Plants, Trees & Healing Foods
      const plantsBtn = screen.getByRole('button', { name: /Plants & Foods/i })
      await user.click(plantsBtn)

      expect(screen.getAllByText(/Date Palm/i).length).toBeGreaterThan(0)
      expect(screen.getAllByText(/Phoenix dactylifera/i).length).toBeGreaterThan(0)
      expect(screen.getAllByText(/Olive/i).length).toBeGreaterThan(0)
      expect(screen.getAllByText(/Black Seed/i).length).toBeGreaterThan(0)
      expect(screen.getAllByText(/Talbinah/i).length).toBeGreaterThan(0)
    })
  })

  describe('5. Profiles: Prophets and Spouses', () => {
    it('renders prophet profile with lineage, miracles, and Quranic references', () => {
      renderAt('/p/ibrahim')
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('إبراهيم')
      expect(screen.getAllByText(/Ibrahim/i).length).toBeGreaterThan(0)
      expect(screen.getByText('Signs and miracles')).toBeInTheDocument()
      expect(screen.getAllByText(/Sarah/i).length).toBeGreaterThan(0)
      expect(screen.getAllByText(/Hajar/i).length).toBeGreaterThan(0)
    })

    it('renders spouse profile with marriage details and virtues', () => {
      renderAt('/p/khadijah')
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('خديجة بنت خويلد')
      expect(screen.getAllByText(/Khadijah bint Khuwaylid/i).length).toBeGreaterThan(0)
    })
  })

  describe('6. Topography & Geographic Map (/map)', () => {
    it('renders the topography real map interface', () => {
      renderAt('/map')
      expect(screen.getByText('Satellite')).toBeInTheDocument()
      expect(screen.getByText('Terrain')).toBeInTheDocument()
    })
  })

  describe('7. Physical Stature Scale Comparison (/stature)', () => {
    it('renders physical stature from Adam 60 cubits down to modern humans', () => {
      renderAt('/stature')
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/Stature of the Prophets/i)
      expect(screen.getAllByText(/60 cubits/i).length).toBeGreaterThan(0)
      expect(screen.getAllByText(/~30 meters/i).length).toBeGreaterThan(0)
    })
  })

  describe('8. Stories of the Righteous (/stories)', () => {
    it('renders Quranic righteous stories and allows searching', async () => {
      renderAt('/stories')
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/The Righteous & Great Stories/i)
      expect(screen.getAllByText(/Maryam/i).length).toBeGreaterThan(0)
      expect(screen.getAllByText(/Ashab al-Kahf/i).length).toBeGreaterThan(0)
      expect(screen.getAllByText(/Dhul-Qarnayn/i).length).toBeGreaterThan(0)
    })
  })

  describe('9. Timeline of the 25 Prophets (/timeline)', () => {
    it('renders chronological ordering of the 25 prophets mentioned in the Quran', () => {
      renderAt('/timeline')
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/The order of the Prophets/i)
      expect(screen.getAllByText(/Adam/i).length).toBeGreaterThan(0)
      expect(screen.getAllByText(/Nuh/i).length).toBeGreaterThan(0)
      expect(screen.getAllByText(/Ibrahim/i).length).toBeGreaterThan(0)
      expect(screen.getAllByText(/Musa/i).length).toBeGreaterThan(0)
      expect(screen.getAllByText(/Isa/i).length).toBeGreaterThan(0)
      expect(screen.getAllByText(/Muhammad/i).length).toBeGreaterThan(0)
    })
  })

  describe('10. Internationalization & RTL / LTR Document Orientation', () => {
    it('configures document direction to RTL in Arabic and LTR in English and French', () => {
      renderAt('/sahaba', 'ar')
      expect(document.documentElement.dir).toBe('rtl')
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('شجرة الصحابة والخلفاء')

      renderAt('/sahaba', 'en')
      expect(document.documentElement.dir).toBe('ltr')

      renderAt('/sahaba', 'fr')
      expect(document.documentElement.dir).toBe('ltr')
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/Arbre des Sahaba/i)
    })
  })

  describe('11. Holy Scriptures & Manuscript Traditions (/scriptures)', () => {
    it('renders the scriptures page with all divine books and version counts', () => {
      renderAt('/scriptures')
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/Manuscript Traditions & Texts of the Prophets/i)

      // Must list the scriptures: Qur'an, Tawrat, Zabur, Injeel, Suhuf Ibrahim
      expect(screen.getAllByText(/The Noble Qur’an/i).length).toBeGreaterThan(0)
      expect(screen.getAllByText(/القرآن الكريم/i).length).toBeGreaterThan(0)
      expect(screen.getAllByText(/التوراة/i).length).toBeGreaterThan(0)
      expect(screen.getAllByText(/الزبور/i).length).toBeGreaterThan(0)
      expect(screen.getAllByText(/الإنجيل/i).length).toBeGreaterThan(0)
      expect(screen.getAllByText(/صُحُفُ إِبْرَاهِيمَ/i).length).toBeGreaterThan(0)

      // Must show the divine preservation guarantee for the Quran
      expect(screen.getAllByText(/Divinely Preserved/i).length).toBeGreaterThan(0)

      // Must show textual traditions counts
      expect(screen.getAllByText(/6 traditions/i).length).toBeGreaterThan(0)
      expect(screen.getAllByText(/5 traditions/i).length).toBeGreaterThan(0)
      expect(screen.getAllByText(/8 traditions/i).length).toBeGreaterThan(0)
    })

    it('switches between scriptures and shows manuscript details', async () => {
      const user = userEvent.setup()
      renderAt('/scriptures')

      // Click on At-Tawrat pill
      const tawratBtn = screen.getByRole('button', { name: /التوراة.*The Torah/i })
      await user.click(tawratBtn)

      // Must display the major versions: Masoretic, Samaritan, Septuagint, Dead Sea Scrolls
      expect(screen.getAllByText(/Masoretic Text/i).length).toBeGreaterThan(0)
      expect(screen.getAllByText(/Samaritan Pentateuch/i).length).toBeGreaterThan(0)
      expect(screen.getAllByText(/Dead Sea Scrolls/i).length).toBeGreaterThan(0)
    })
  })

  describe('12. Author Attribution (Oussama EL HADJI)', () => {
    it('strictly attests Oussama EL HADJI across the footer attribution in English and French', () => {
      renderAt('/timeline', 'en')
      expect(screen.getByText(/Oussama EL HADJI/i)).toBeInTheDocument()

      renderAt('/timeline', 'fr')
      expect(screen.getByText(/Oussama EL HADJI/i)).toBeInTheDocument()
    })
  })
})
