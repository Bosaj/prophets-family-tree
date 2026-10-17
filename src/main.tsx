import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource-variable/sora'
import '@fontsource-variable/reem-kufi'
import '@fontsource/amiri/400.css'
import '@fontsource/amiri-quran/arabic-400.css'
import './index.css'
import { I18nProvider } from './i18n'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <I18nProvider>
      <App />
    </I18nProvider>
  </StrictMode>,
)
