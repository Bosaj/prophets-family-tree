import { useSyncExternalStore } from 'react'

export type Route =
  | { name: 'home' }
  | { name: 'tree'; focus?: string }
  | { name: 'map'; focus?: string }
  | { name: 'timeline' }
  | { name: 'stature' }
  | { name: 'stories' }
  | { name: 'nature' }
  | { name: 'sources' }
  | { name: 'person'; id: string }
  | { name: 'notfound' }

export function parsePath(path: string, search = ''): Route {
  const p = path.replace(/\/+$/, '') || '/'
  if (p === '/') return { name: 'home' }
  if (p === '/tree') {
    const focus = new URLSearchParams(search).get('focus') ?? undefined
    return focus ? { name: 'tree', focus } : { name: 'tree' }
  }
  if (p === '/map') {
    const focus = new URLSearchParams(search).get('focus') ?? undefined
    return focus ? { name: 'map', focus } : { name: 'map' }
  }
  if (p === '/timeline') return { name: 'timeline' }
  if (p === '/stature') return { name: 'stature' }
  if (p === '/stories') return { name: 'stories' }
  if (p === '/nature') return { name: 'nature' }
  if (p === '/sources') return { name: 'sources' }
  const m = /^\/p\/([a-z0-9_]+)$/.exec(p)
  if (m) return { name: 'person', id: m[1]! }
  return { name: 'notfound' }
}

export const hrefOf = (r: Route): string => {
  switch (r.name) {
    case 'home':
      return '/'
    case 'tree':
      return r.focus ? `/tree?focus=${r.focus}` : '/tree'
    case 'map':
      return r.focus ? `/map?focus=${r.focus}` : '/map'
    case 'timeline':
      return '/timeline'
    case 'stature':
      return '/stature'
    case 'stories':
      return '/stories'
    case 'nature':
      return '/nature'
    case 'sources':
      return '/sources'
    case 'person':
      return `/p/${r.id}`
    default:
      return '/'
  }
}

const listeners = new Set<() => void>()
let current = typeof location !== 'undefined' ? location.pathname + location.search : '/'

function emit() {
  current = location.pathname + location.search
  listeners.forEach((l) => l())
}
if (typeof window !== 'undefined') window.addEventListener('popstate', emit)

export function navigate(href: string, opts: { replace?: boolean } = {}) {
  if (href === location.pathname + location.search) return
  if (opts.replace) history.replaceState(null, '', href)
  else history.pushState(null, '', href)
  emit()
  if (!opts.replace) window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
}

export function useRoute(): Route {
  const url = useSyncExternalStore(
    (cb) => {
      listeners.add(cb)
      return () => listeners.delete(cb)
    },
    () => current,
    () => '/',
  )
  const q = url.indexOf('?')
  return parsePath(q < 0 ? url : url.slice(0, q), q < 0 ? '' : url.slice(q))
}
