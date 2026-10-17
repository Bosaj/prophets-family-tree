import { useEffect, useRef } from 'react'

interface Star {
  x: number
  y: number
  z: number
  r: number
  tw: number
  hue: number
}

/**
 * A full-screen canvas of slowly drifting, twinkling stars with pointer parallax.
 * Fixed behind the page. Static when the user prefers reduced motion.
 */
export function Starfield({ density = 1 }: { density?: number }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let w = 0
    let h = 0
    let dpr = 1
    let stars: Star[] = []
    let raf = 0
    let px = 0
    let py = 0
    let tx = 0
    let ty = 0

    const seed = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = canvas.clientWidth
      h = canvas.clientHeight
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = Math.round(((w * h) / 2600) * density)
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        z: Math.random(),
        r: Math.random() ** 3 * 1.6 + 0.25,
        tw: Math.random() * Math.PI * 2,
        hue: Math.random() < 0.18 ? 40 : Math.random() < 0.3 ? 220 : 0,
      }))
    }

    const draw = (time: number) => {
      ctx.clearRect(0, 0, w, h)
      px += (tx - px) * 0.04
      py += (ty - py) * 0.04
      for (const s of stars) {
        const depth = 0.25 + s.z * 0.75
        let x = s.x + px * depth * 18
        let y = s.y + py * depth * 12
        if (!reduce) {
          s.y -= 0.02 * depth
          if (s.y < -4) s.y = h + 4
        }
        x = ((x % w) + w) % w
        y = ((y % h) + h) % h
        const twinkle = reduce ? 0.8 : 0.55 + 0.45 * Math.sin(time * 0.0012 * (0.6 + s.z) + s.tw)
        const a = (0.25 + s.z * 0.75) * twinkle
        ctx.beginPath()
        ctx.fillStyle = s.hue ? `hsla(${s.hue}, 80%, 85%, ${a})` : `rgba(255,255,255,${a})`
        ctx.arc(x, y, s.r * depth + 0.2, 0, Math.PI * 2)
        ctx.fill()
        if (s.r > 1.25) {
          ctx.fillStyle = `rgba(255, 236, 190, ${a * 0.12})`
          ctx.beginPath()
          ctx.arc(x, y, s.r * 4, 0, Math.PI * 2)
          ctx.fill()
        }
      }
      if (!reduce) raf = requestAnimationFrame(draw)
    }

    const onMove = (e: PointerEvent) => {
      tx = e.clientX / w - 0.5
      ty = e.clientY / h - 0.5
    }
    const onResize = () => {
      seed()
      if (reduce) draw(0)
    }

    seed()
    if (reduce) draw(0)
    else raf = requestAnimationFrame(draw)
    window.addEventListener('resize', onResize)
    window.addEventListener('pointermove', onMove, { passive: true })
    const onVis = () => {
      cancelAnimationFrame(raf)
      if (!document.hidden && !reduce) raf = requestAnimationFrame(draw)
    }
    document.addEventListener('visibilitychange', onVis)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('visibilitychange', onVis)
    }
  }, [density])

  return <canvas ref={ref} aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 h-full w-full" />
}
