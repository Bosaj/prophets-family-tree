// Test stand-in for 'virtual:pwa-register/react' (the real module only exists in a Vite build or dev server).
import { useState } from 'react'

export function useRegisterSW() {
  const needRefresh = useState(false)
  const offlineReady = useState(false)
  return { needRefresh, offlineReady, updateServiceWorker: async () => {} }
}
