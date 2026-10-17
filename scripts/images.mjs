// Encode scene images for the web.
//   node scripts/images.mjs <folder with name.png files>
// For each PNG writes public/img/<name>-2048.{webp,avif} (full resolution, never downscaled)
// and public/img/<name>-960.{webp,avif} (lighter copy for phones), plus public/og.jpg from hero.png.
// Needs ffmpeg on PATH (with libwebp and libaom-av1 / libsvtav1).
import fs from 'node:fs'
import path from 'node:path'
import { execFileSync } from 'node:child_process'

const src = process.argv[2]
if (!src) {
  console.error('usage: node scripts/images.mjs <folder>')
  process.exit(1)
}
const out = path.resolve('public/img')
fs.mkdirSync(out, { recursive: true })

const ff = (...args) => execFileSync('ffmpeg', ['-loglevel', 'error', '-y', ...args], { stdio: 'inherit' })

for (const file of fs.readdirSync(src).filter((f) => f.endsWith('.png'))) {
  const name = path.basename(file, '.png')
  const input = path.join(src, file)
  for (const width of [2048, 960]) {
    const scale = width === 2048 ? [] : ['-vf', `scale=${width}:-2:flags=lanczos`]
    ff('-i', input, ...scale, '-c:v', 'libwebp', '-quality', width === 2048 ? '88' : '80', '-preset', 'photo', path.join(out, `${name}-${width}.webp`))
    ff('-i', input, ...scale, '-c:v', 'libaom-av1', '-still-picture', '1', '-crf', width === 2048 ? '26' : '30', '-cpu-used', '6', path.join(out, `${name}-${width}.avif`))
  }
  if (name === 'hero') {
    ff('-i', input, '-vf', 'scale=1200:-2:flags=lanczos,crop=1200:630', '-q:v', '3', path.resolve('public/og.jpg'))
  }
  console.log('encoded', name)
}
