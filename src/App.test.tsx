import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { I18nProvider } from './i18n'
import App from './App'
import { navigate } from './lib/router'

const renderAt = (path: string, lang: 'en' | 'fr' | 'ar' = 'en') => {
  navigate(path, { replace: true })
  return render(
    <I18nProvider lang={lang}>
      <App />
    </I18nProvider>,
  )
}

describe('App', () => {
  it('renders the home page with every chapter', () => {
    renderAt('/')
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('شجرة الأنبياء')
    expect(screen.getAllByText('Muhammad ﷺ').length).toBeGreaterThan(0)
    expect(screen.getByText('From Adam to Muhammad ﷺ')).toBeInTheDocument()
  })

  it('renders a profile with sourced facts and the family', () => {
    renderAt('/p/musa')
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('موسى')
    expect(screen.getByText('Signs and miracles')).toBeInTheDocument()
    expect(screen.getAllByText('Harun').length).toBeGreaterThan(0)
    expect(screen.getAllByRole('button', { name: /Qur’an\s*⁦20:17–21⁩/ }).length).toBeGreaterThan(0)
  })

  it('switches the document to right-to-left in Arabic', () => {
    renderAt('/timeline', 'ar')
    expect(document.documentElement.dir).toBe('rtl')
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('ترتيب الأنبياء')
  })

  it('keeps the verse sheet open after a reference is clicked', async () => {
    renderAt('/p/salih')
    const [chip] = screen.getAllByRole('button', { name: /Qur’an\s*⁦7:73/ })
    await userEvent.click(chip!)
    const sheet = document.querySelector('dialog[aria-labelledby="verse-title"]') as HTMLDialogElement
    expect(sheet.open).toBe(true)
    // the network is disabled in tests, so the sheet shows its error state instead of hanging
    expect(await screen.findByText('The verses could not be loaded. Check your connection.')).toBeInTheDocument()
  })

  it('shows a not-found page for unknown people', () => {
    renderAt('/p/unknown')
    expect(screen.getByText('This page does not exist.')).toBeInTheDocument()
  })

  it('renders the physical stature visualizer page', () => {
    renderAt('/stature')
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/Stature of the Prophets/i)
    expect(screen.getAllByText(/Adam/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/60 cubits/i).length).toBeGreaterThan(0)
  })

  it('renders the stories of the Quran and As-Salihin page', () => {
    renderAt('/stories')
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/The Righteous & Great Stories/i)
    expect(screen.getAllByText(/Maryam/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/Ashab al-Kahf/i).length).toBeGreaterThan(0)
  })

  it('renders a spouse profile with full details', () => {
    renderAt('/p/sawdah')
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('سودة بنت زمعة')
    expect(screen.getAllByText('Sawdah bint Zam‘ah').length).toBeGreaterThan(0)
  })

  it('renders the topography real map view', () => {
    renderAt('/map')
    expect(screen.getByText('Satellite')).toBeInTheDocument()
    expect(screen.getByText('Terrain')).toBeInTheDocument()
  })

  it('renders the creatures, flora and prophetic medicine page', async () => {
    renderAt('/nature')
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/Creatures, Flora & Prophetic Medicine/i)
    expect(screen.getAllByText(/Hoopoe/i).length).toBeGreaterThan(0)
    // Check that Upupa epops is explicitly explained so users understand the biological name
    expect(screen.getAllByText(/Upupa epops/i).length).toBeGreaterThan(0)
    const plantsBtn = screen.getByRole('button', { name: /Plants & Foods/i })
    await userEvent.click(plantsBtn)
    expect(screen.getAllByText(/Date Palm/i).length).toBeGreaterThan(0)
  })

  it('renders the sahaba, caliphs and continuous prophetic lineage page', () => {
    renderAt('/sahaba')
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/Tree of Sahaba, Caliphs & Prophetic Lineages/i)
    expect(screen.getAllByText(/Abu Bakr/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/Umar ibn al-Khattab/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/King Mohammed VI/i).length).toBeGreaterThan(0)
  })

  it('renders the scientific miracles and research papers page', () => {
    renderAt('/science')
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/Scientific Facts in Qur'an & Hadith/i)
    expect(screen.getAllByText(/The Expanding Universe/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/Peer-Reviewed DOIs/i).length).toBeGreaterThan(0)
  })
})
