import { useSyncExternalStore } from 'react'

export type Route =
  | { name: 'home' }
  | { name: 'tree'; focus?: string }
  | { name: 'map'; focus?: string }
  | { name: 'timeline' }
  | { name: 'stature' }
  | { name: 'stories' }
  | { name: 'nature' }
  | { name: 'sahaba'; focus?: string }
  | { name: 'science'; focus?: string }
  | { name: 'sources' }
  | { name: 'scriptures'; book?: string }
  | { name: 'person'; id: string }
  | { name: 'notfound' }

export function withBase(path: string): string {
  const base = (typeof import.meta !== 'undefined' && import.meta.env?.BASE_URL ? import.meta.env.BASE_URL : '/').replace(/\/+$/, '')
  if (!base) return path
  if (path === '/') return `${base}/`
  if (path.startsWith(base)) return path
  return `${base}${path.startsWith('/') ? path : `/${path}`}`
}

export function stripBase(path: string): string {
  const base = (typeof import.meta !== 'undefined' && import.meta.env?.BASE_URL ? import.meta.env.BASE_URL : '/').replace(/\/+$/, '')
  if (!base) return path
  if (path === base || path === `${base}/`) return '/'
  if (path.startsWith(`${base}/`)) return path.slice(base.length)
  if (path.startsWith(base)) return path.slice(base.length) || '/'
  return path
}

export function parsePath(path: string, search = ''): Route {
  const p = stripBase(path.replace(/\/+$/, '') || '/')
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
  if (p === '/sahaba') {
    const focus = new URLSearchParams(search).get('focus') ?? undefined
    return focus ? { name: 'sahaba', focus } : { name: 'sahaba' }
  }
  if (p === '/science') {
    const focus = new URLSearchParams(search).get('focus') ?? undefined
    return focus ? { name: 'science', focus } : { name: 'science' }
  }
  if (p === '/sources') return { name: 'sources' }
  if (p === '/scriptures') {
    const book = new URLSearchParams(search).get('book') ?? undefined
    return book ? { name: 'scriptures', book } : { name: 'scriptures' }
  }
  const m = /^\/p\/([a-z0-9_]+)$/.exec(p)
  if (m) return { name: 'person', id: m[1]! }
  return { name: 'notfound' }
}

export const hrefOf = (r: Route): string => {
  let sub = '/'
  switch (r.name) {
    case 'home':
      sub = '/'
      break
    case 'tree':
      sub = r.focus ? `/tree?focus=${r.focus}` : '/tree'
      break
    case 'map':
      sub = r.focus ? `/map?focus=${r.focus}` : '/map'
      break
    case 'timeline':
      sub = '/timeline'
      break
    case 'stature':
      sub = '/stature'
      break
    case 'stories':
      sub = '/stories'
      break
    case 'nature':
      sub = '/nature'
      break
    case 'sahaba':
      sub = r.focus ? `/sahaba?focus=${r.focus}` : '/sahaba'
      break
    case 'science':
      sub = r.focus ? `/science?focus=${r.focus}` : '/science'
      break
    case 'sources':
      sub = '/sources'
      break
    case 'scriptures':
      sub = r.book ? `/scriptures?book=${r.book}` : '/scriptures'
      break
    case 'person':
      sub = `/p/${r.id}`
      break
    default:
      sub = '/'
  }
  return withBase(sub)
}

const listeners = new Set<() => void>()
let current = typeof location !== 'undefined' ? location.pathname + location.search : '/'

function emit() {
  current = location.pathname + location.search
  listeners.forEach((l) => l())
}
if (typeof window !== 'undefined') window.addEventListener('popstate', emit)

export function navigate(href: string, opts: { replace?: boolean } = {}) {
  const full = withBase(href)
  if (full === location.pathname + location.search) return
  if (opts.replace) history.replaceState(null, '', full)
  else history.pushState(null, '', full)
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
