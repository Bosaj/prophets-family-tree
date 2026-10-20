import { useState, useMemo, useRef, useEffect } from 'react'
import {
  BookOpen,
  Compass,
  Eye,
  Heart,
  Leaf,
  Moon,
  Pause,
  Play,
  Search,
  Sparkles,
  Sun,
  Volume2,
  X,
  Zap,
} from 'lucide-react'
import { useI18n } from '../i18n'
import {
  QURAN_SUNNAH_ANIMALS,
  QURAN_SUNNAH_PLANTS,
  type AnimalCategory,
  type PlantCategory,
  type ScriptureSource,
  type AnimalEntry,
  type PlantFoodEntry,
} from '../data/nature'
import { RefChip } from './ui'
import { audioUrl, loadPassage } from '../lib/quran'

// --- Audio Synthesizer & Speech Engine ---

class SoundscapeEngine {
  private ctx: AudioContext | null = null

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      if (AudioCtx) this.ctx = new AudioCtx()
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      void this.ctx.resume()
    }
    return this.ctx
  }

  playChirp() {
    const ctx = this.getContext()
    if (!ctx) return
    const now = ctx.currentTime
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'sine'
    osc.frequency.setValueAtTime(1800, now)
    osc.frequency.exponentialRampToValueAtTime(3200, now + 0.08)
    osc.frequency.exponentialRampToValueAtTime(2200, now + 0.16)
    gain.gain.setValueAtTime(0.001, now)
    gain.gain.linearRampToValueAtTime(0.2, now + 0.04)
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22)
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start(now)
    osc.stop(now + 0.24)
  }

  playBuzz() {
    const ctx = this.getContext()
    if (!ctx) return
    const now = ctx.currentTime
    const osc = ctx.createOscillator()
    const lfo = ctx.createOscillator()
    const lfoGain = ctx.createGain()
    const gain = ctx.createGain()
    osc.type = 'sawtooth'
    osc.frequency.setValueAtTime(210, now)
    lfo.type = 'sine'
    lfo.frequency.setValueAtTime(28, now)
    lfoGain.gain.setValueAtTime(15, now)
    lfo.connect(osc.frequency)
    gain.gain.setValueAtTime(0.001, now)
    gain.gain.linearRampToValueAtTime(0.12, now + 0.05)
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4)
    osc.connect(gain)
    gain.connect(ctx.destination)
    lfo.start(now)
    osc.start(now)
    lfo.stop(now + 0.45)
    osc.stop(now + 0.45)
  }

  playOcean() {
    const ctx = this.getContext()
    if (!ctx) return
    const now = ctx.currentTime
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'sine'
    osc.frequency.setValueAtTime(65, now)
    osc.frequency.exponentialRampToValueAtTime(45, now + 0.8)
    gain.gain.setValueAtTime(0.001, now)
    gain.gain.linearRampToValueAtTime(0.25, now + 0.2)
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.85)
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start(now)
    osc.stop(now + 0.9)
  }

  playWind() {
    const ctx = this.getContext()
    if (!ctx) return
    const now = ctx.currentTime
    const bufferSize = ctx.sampleRate * 0.6
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
    const data = buffer.getChannelData(0)
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1
    }
    const noise = ctx.createBufferSource()
    noise.buffer = buffer
    const filter = ctx.createBiquadFilter()
    filter.type = 'bandpass'
    filter.frequency.setValueAtTime(450, now)
    filter.Q.setValueAtTime(2.5, now)
    const gain = ctx.createGain()
    gain.gain.setValueAtTime(0.001, now)
    gain.gain.linearRampToValueAtTime(0.15, now + 0.2)
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.58)
    noise.connect(filter)
    filter.connect(gain)
    gain.connect(ctx.destination)
    noise.start(now)
    noise.stop(now + 0.6)
  }

  playChime() {
    const ctx = this.getContext()
    if (!ctx) return
    const now = ctx.currentTime
    ;[1046.5, 1318.5, 1567.98].forEach((freq, idx) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.setValueAtTime(freq, now + idx * 0.08)
      gain.gain.setValueAtTime(0.001, now + idx * 0.08)
      gain.gain.linearRampToValueAtTime(0.12, now + idx * 0.08 + 0.02)
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.6)
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start(now + idx * 0.08)
      osc.stop(now + idx * 0.08 + 0.65)
    })
  }

  playCoo() {
    const ctx = this.getContext()
    if (!ctx) return
    const now = ctx.currentTime
    ;[380, 430, 360, 410].forEach((freq, idx) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sine'
      const start = now + idx * 0.16
      osc.frequency.setValueAtTime(freq, start)
      osc.frequency.exponentialRampToValueAtTime(freq * 0.88, start + 0.14)
      gain.gain.setValueAtTime(0.001, start)
      gain.gain.linearRampToValueAtTime(0.16, start + 0.03)
      gain.gain.exponentialRampToValueAtTime(0.001, start + 0.15)
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start(start)
      osc.stop(start + 0.16)
    })
  }

  playFor(id: string) {
    if (id === 'hamama') {
      this.playCoo()
    } else if (['hudhud', 'ghurab', 'tayr_ababil'].includes(id)) {
      this.playChirp()
    } else if (['nahl', 'namlah', 'ankabut'].includes(id)) {
      this.playBuzz()
    } else if (['hut_yunus'].includes(id)) {
      this.playOcean()
    } else if (['sidr', 'buraq', 'talbinah', 'asal'].includes(id)) {
      this.playChime()
    } else {
      this.playWind()
    }
  }
}

const soundEngine = new SoundscapeEngine()

function speakArabic(text: string) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return
  try {
    window.speechSynthesis.cancel()
    const u = new SpeechSynthesisUtterance(text)
    u.lang = 'ar-SA'
    u.rate = 0.85
    window.speechSynthesis.speak(u)
  } catch {
    // fallback gracefully
  }
}

// --- Bespoke Handcrafted SVG Illustrations & Silhouettes ---

function HoopoeSvg({ animated = true }: { animated?: boolean }) {
  return (
    <svg viewBox="0 0 200 160" className="w-full h-full drop-shadow-[0_10px_20px_rgba(233,198,123,0.35)]">
      <defs>
        <linearGradient id="hoopoeGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fde047" />
          <stop offset="40%" stopColor="#d97706" />
          <stop offset="100%" stopColor="#78350f" />
        </linearGradient>
      </defs>
      <path d="M 125 45 C 135 22 155 18 165 24 C 158 32 145 36 135 48 Z" fill="url(#hoopoeGrad)" className={animated ? 'origin-[125px_48px] animate-pulse' : ''} />
      <path d="M 120 48 C 128 30 142 26 150 32 C 144 38 135 42 128 50 Z" fill="#b45309" />
      <path d="M 116 52 C 122 36 132 32 138 38 C 132 44 125 48 120 54 Z" fill="#fde047" />
      <path d="M 132 64 C 158 70 185 82 192 88 C 182 86 150 72 130 68 Z" fill="#451a03" />
      <path d="M 108 52 C 125 50 135 62 128 75 C 120 90 128 110 115 125 C 95 142 55 145 30 135 C 15 130 5 120 2 110 C 15 112 40 105 55 90 C 70 75 88 54 108 52 Z" fill="url(#hoopoeGrad)" />
      <circle cx="120" cy="62" r="3" fill="#000" />
      <circle cx="121" cy="61" r="1" fill="#fff" />
      <g className={animated ? 'origin-[90px_85px] animate-creature-fly' : ''}>
        <path d="M 95 78 C 80 95 60 120 35 142 C 45 130 75 95 105 82 Z" fill="#1c1917" />
        <path d="M 85 88 C 72 102 55 125 42 136 C 50 125 72 100 95 90 Z" fill="#f8fafc" />
        <path d="M 75 98 C 65 110 50 128 45 132 C 52 122 68 105 85 96 Z" fill="#1c1917" />
      </g>
      <path d="M 32 135 L 5 155 L 15 158 L 42 138 Z" fill="#0f172a" />
      <path d="M 85 135 L 82 148 M 80 148 L 88 148 M 72 136 L 68 148 M 65 148 L 73 148" stroke="#78350f" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  )
}

function DoveSvg({ animated = true }: { animated?: boolean }) {
  return (
    <svg viewBox="0 0 200 160" className="w-full h-full drop-shadow-[0_10px_20px_rgba(224,242,254,0.45)]">
      <defs>
        <linearGradient id="doveGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="35%" stopColor="#f1f5f9" />
          <stop offset="70%" stopColor="#cbd5e1" />
          <stop offset="100%" stopColor="#64748b" />
        </linearGradient>
        <linearGradient id="doveNeckSheen" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="50%" stopColor="#c084fc" />
          <stop offset="100%" stopColor="#34d399" />
        </linearGradient>
      </defs>
      {/* Olive Twig in Beak (Symbol of Peace and Noah's Ark Return) */}
      <g>
        <path d="M 158 50 Q 172 44 186 38" stroke="#15803d" strokeWidth="2" fill="none" strokeLinecap="round" />
        <ellipse cx="174" cy="39" rx="5" ry="2.5" transform="rotate(-25 174 39)" fill="#22c55e" />
        <ellipse cx="184" cy="37" rx="4" ry="2" transform="rotate(-40 184 37)" fill="#4ade80" />
        <ellipse cx="168" cy="45" rx="4" ry="2.2" transform="rotate(20 168 45)" fill="#16a34a" />
      </g>
      {/* Dove Head & Body */}
      <path
        d="M 128 40 C 145 38 156 44 156 52 C 156 60 146 66 136 70 C 128 80 132 102 122 118 C 102 134 64 138 38 128 C 22 122 12 112 8 102 C 22 104 45 98 60 84 C 76 68 96 42 128 40 Z"
        fill="url(#doveGrad)"
      />
      {/* Iridescent Neck Sheen Ring */}
      <path
        d="M 132 54 C 140 56 146 62 142 68 C 136 70 128 66 126 60 Z"
        fill="url(#doveNeckSheen)"
        opacity="0.65"
      />
      {/* Beak */}
      <path d="M 154 48 L 166 51 L 154 54 Z" fill="#f59e0b" />
      {/* Eye */}
      <circle cx="144" cy="46" r="2.8" fill="#e11d48" />
      <circle cx="144" cy="46" r="1.5" fill="#0f172a" />
      <circle cx="145" cy="45" r="0.6" fill="#ffffff" />
      {/* Flapping Wing */}
      <g className={animated ? 'origin-[92px_78px] animate-creature-fly' : ''}>
        <path
          d="M 96 70 C 82 86 60 112 34 132 C 46 120 76 88 106 74 Z"
          fill="#cbd5e1"
        />
        <path
          d="M 86 80 C 72 94 54 116 40 126 C 50 116 72 92 96 82 Z"
          fill="#f8fafc"
        />
        <path
          d="M 76 90 C 66 102 50 118 44 122 C 52 112 68 96 86 88 Z"
          fill="#94a3b8"
        />
      </g>
      {/* Tail Feathers */}
      <path d="M 38 128 L 8 148 L 20 152 L 48 132 Z" fill="#64748b" />
      {/* Gentle Red Claws */}
      <path d="M 88 128 L 84 142 M 81 142 L 89 142 M 74 129 L 70 142 M 67 142 L 75 142" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  )
}

function AntSvg({ animated = true }: { animated?: boolean }) {
  return (
    <svg viewBox="0 0 200 160" className="w-full h-full drop-shadow-[0_10px_20px_rgba(233,198,123,0.35)]">
      <defs>
        <linearGradient id="antGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#78350f" />
          <stop offset="60%" stopColor="#451a03" />
          <stop offset="100%" stopColor="#1c1917" />
        </linearGradient>
      </defs>
      <path d="M 165 65 Q 180 50 192 52 M 165 68 Q 182 62 195 70" stroke="#b45309" strokeWidth="2" fill="none" strokeLinecap="round" />
      <ellipse cx="152" cy="74" rx="18" ry="14" fill="url(#antGrad)" />
      <ellipse cx="158" cy="70" rx="3" ry="4" fill="#fbbf24" />
      <path d="M 168 76 Q 176 80 178 86 M 166 79 Q 174 85 174 90" stroke="#d97706" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <ellipse cx="118" cy="80" rx="20" ry="12" fill="url(#antGrad)" />
      <ellipse cx="94" cy="81" rx="6" ry="5" fill="#92400e" />
      <ellipse cx="58" cy="82" rx="34" ry="24" transform="rotate(-8 58 82)" fill="url(#antGrad)" />
      <path d="M 68 62 Q 74 82 66 102 M 52 61 Q 58 82 50 103 M 36 65 Q 42 82 34 98" stroke="#b45309" strokeWidth="1.5" fill="none" opacity="0.6" />
      <g className={animated ? 'animate-creature-walk origin-center' : ''}>
        <path d="M 128 82 L 145 98 L 158 135" stroke="#92400e" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M 118 82 L 115 105 L 110 138" stroke="#78350f" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M 108 82 L 85 96 L 72 136" stroke="#451a03" strokeWidth="3.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M 134 76 L 152 60 L 168 85" stroke="#451a03" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.7" />
        <path d="M 122 76 L 118 55 L 112 80" stroke="#451a03" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.7" />
        <path d="M 112 76 L 85 58 L 68 82" stroke="#451a03" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.7" />
      </g>
    </svg>
  )
}

function WhaleSvg({ animated = true }: { animated?: boolean }) {
  return (
    <svg viewBox="0 0 240 150" className="w-full h-full drop-shadow-[0_10px_25px_rgba(56,189,248,0.4)]">
      <defs>
        <linearGradient id="whaleGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="50%" stopColor="#0284c7" />
          <stop offset="100%" stopColor="#082f49" />
        </linearGradient>
      </defs>
      {animated && (
        <path d="M 185 45 C 185 20 175 10 170 5 M 186 45 C 190 22 200 12 210 8 M 185 42 C 185 18 185 5 187 2" stroke="#7dd3fc" strokeWidth="2.5" fill="none" strokeLinecap="round" className="animate-pulse" />
      )}
      <path d="M 15 88 C 30 84 55 86 85 84 C 130 82 170 60 205 60 C 225 60 238 72 235 88 C 230 108 200 120 155 122 C 110 124 55 108 15 88 Z" fill="url(#whaleGrad)" />
      <path d="M 140 118 C 170 114 195 106 215 95" stroke="#bae6fd" strokeWidth="2" fill="none" opacity="0.6" />
      <path d="M 130 121 C 160 118 190 110 205 102" stroke="#bae6fd" strokeWidth="1.5" fill="none" opacity="0.6" />
      <circle cx="210" cy="78" r="3.5" fill="#fbbf24" />
      <circle cx="211" cy="77" r="1.2" fill="#fff" />
      <path d="M 155 92 C 145 115 130 135 118 142 C 122 130 135 110 152 90 Z" fill="#0369a1" className={animated ? 'animate-creature-swim origin-[155px_92px]' : ''} />
      <path d="M 78 84 C 74 72 68 66 60 68 C 65 74 70 80 75 84 Z" fill="#0284c7" />
      <g className={animated ? 'animate-creature-swim origin-[25px_88px]' : ''}>
        <path d="M 22 88 C 10 70 2 55 0 52 C 5 65 15 80 20 86 C 15 92 5 108 0 122 C 4 118 12 102 22 88 Z" fill="#0284c7" />
      </g>
    </svg>
  )
}

function SheCamelSvg({ animated = true }: { animated?: boolean }) {
  return (
    <svg viewBox="0 0 220 180" className="w-full h-full drop-shadow-[0_12px_24px_rgba(233,198,123,0.4)]">
      <defs>
        <linearGradient id="camelGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="45%" stopColor="#eab308" />
          <stop offset="100%" stopColor="#713f12" />
        </linearGradient>
      </defs>
      <path d="M 160 105 C 168 85 178 50 185 35 C 190 26 200 24 208 26 C 215 28 218 36 215 42 C 205 45 195 48 190 58 C 182 75 175 100 170 115 Z" fill="url(#camelGrad)" />
      <path d="M 195 24 L 198 14 L 202 23 Z" fill="#ca8a04" />
      <circle cx="206" cy="32" r="2.5" fill="#451a03" />
      <path d="M 65 115 C 65 110 78 72 105 60 C 128 50 145 75 155 100 C 165 110 162 135 150 145 C 130 152 85 150 68 135 C 62 128 65 118 65 115 Z" fill="url(#camelGrad)" />
      <g className={animated ? 'animate-creature-walk origin-bottom' : ''}>
        <path d="M 152 140 L 156 160 L 158 178" stroke="#ca8a04" strokeWidth="5" strokeLinecap="round" fill="none" />
        <ellipse cx="160" cy="178" rx="6" ry="2.5" fill="#713f12" />
        <path d="M 78 135 L 70 155 L 72 178" stroke="#ca8a04" strokeWidth="5.5" strokeLinecap="round" fill="none" />
        <ellipse cx="73" cy="178" rx="6.5" ry="2.5" fill="#713f12" />
        <path d="M 142 138 L 138 158 L 140 176" stroke="#854d0e" strokeWidth="4" strokeLinecap="round" fill="none" />
        <ellipse cx="141" cy="176" rx="5" ry="2" fill="#451a03" />
        <path d="M 90 135 L 95 156 L 93 176" stroke="#854d0e" strokeWidth="4.5" strokeLinecap="round" fill="none" />
        <ellipse cx="94" cy="176" rx="5" ry="2" fill="#451a03" />
      </g>
      <path d="M 64 120 Q 55 135 58 152" stroke="#854d0e" strokeWidth="2.5" fill="none" />
      <path d="M 57 150 C 54 158 56 162 60 160 Z" fill="#713f12" />
    </svg>
  )
}

function DogSvg({ animated = true }: { animated?: boolean }) {
  return (
    <svg viewBox="0 0 200 150" className="w-full h-full drop-shadow-[0_10px_20px_rgba(233,198,123,0.35)]">
      <defs>
        <linearGradient id="dogGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="60%" stopColor="#d97706" />
          <stop offset="100%" stopColor="#78350f" />
        </linearGradient>
      </defs>
      <path d="M 135 48 C 145 35 160 38 175 48 C 185 55 192 62 188 70 C 182 75 168 72 160 78 C 150 85 142 90 135 85 Z" fill="url(#dogGrad)" />
      <path d="M 142 42 L 146 22 L 155 38 Z" fill="#b45309" />
      <path d="M 152 44 L 158 28 L 164 42 Z" fill="#92400e" />
      <circle cx="168" cy="54" r="2.5" fill="#1c1917" />
      <ellipse cx="188" cy="65" rx="3" ry="2" fill="#1c1917" />
      <path d="M 65 95 C 65 80 85 75 110 75 C 130 75 140 85 142 105 C 144 120 135 135 110 138 C 85 140 60 138 52 125 C 48 118 55 105 65 95 Z" fill="url(#dogGrad)" />
      <g className={animated ? 'animate-pulse' : ''}>
        <path d="M 135 110 L 165 125 L 195 132" stroke="#b45309" strokeWidth="6" strokeLinecap="round" fill="none" />
        <ellipse cx="196" cy="132" rx="7" ry="3" fill="#78350f" />
        <path d="M 125 115 L 155 128 L 185 135" stroke="#92400e" strokeWidth="5.5" strokeLinecap="round" fill="none" />
        <ellipse cx="186" cy="135" rx="6.5" ry="3" fill="#451a03" />
      </g>
      <ellipse cx="68" cy="120" rx="18" ry="14" fill="#92400e" />
      <path d="M 52 118 C 35 112 30 92 42 85 C 46 82 48 88 44 94 Z" fill="#ca8a04" />
    </svg>
  )
}

function BaqarahSvg({ animated = true }: { animated?: boolean }) {
  return (
    <svg viewBox="0 0 220 170" className="w-full h-full drop-shadow-[0_12px_24px_rgba(250,204,21,0.45)]">
      <defs>
        <linearGradient id="cowGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="50%" stopColor="#eab308" />
          <stop offset="100%" stopColor="#a16207" />
        </linearGradient>
      </defs>
      {/* Curved Horns */}
      <path d="M 180 42 C 185 24 195 20 202 22 M 172 45 C 168 28 158 24 152 26" stroke="#ca8a04" strokeWidth="3" fill="none" strokeLinecap="round" />
      {/* Head & Muzzle */}
      <path d="M 165 52 C 175 42 188 45 192 60 C 196 74 194 90 180 92 C 168 93 160 82 165 52 Z" fill="url(#cowGrad)" />
      <circle cx="180" cy="62" r="3" fill="#451a03" />
      <ellipse cx="188" cy="85" rx="6" ry="4" fill="#a16207" />
      {/* Ears */}
      <ellipse cx="158" cy="56" rx="8" ry="4" transform="rotate(-20 158 56)" fill="#ca8a04" />
      <ellipse cx="195" cy="54" rx="8" ry="4" transform="rotate(20 195 54)" fill="#ca8a04" />
      {/* Sleek Golden Bovine Body */}
      <path d="M 65 85 C 75 75 110 72 155 75 C 170 76 172 90 168 115 C 162 135 145 142 110 144 C 75 145 58 135 55 110 C 53 95 58 88 65 85 Z" fill="url(#cowGrad)" />
      {/* Sturdy Legs */}
      <g className={animated ? 'animate-creature-walk origin-bottom' : ''}>
        <rect x="145" y="125" width="10" height="38" rx="4" fill="#ca8a04" />
        <rect x="130" y="122" width="9" height="38" rx="3.5" fill="#a16207" />
        <rect x="68" y="125" width="10" height="38" rx="4" fill="#ca8a04" />
        <rect x="85" y="122" width="9" height="38" rx="3.5" fill="#a16207" />
        {/* Dark Hooves */}
        <ellipse cx="150" cy="163" rx="5.5" ry="2.5" fill="#451a03" />
        <ellipse cx="135" cy="160" rx="5" ry="2.5" fill="#1c1917" />
        <ellipse cx="73" cy="163" rx="5.5" ry="2.5" fill="#451a03" />
        <ellipse cx="90" cy="160" rx="5" ry="2.5" fill="#1c1917" />
      </g>
      {/* Tail with tuft */}
      <path d="M 55 92 Q 42 115 45 140" stroke="#a16207" strokeWidth="2.5" fill="none" />
      <ellipse cx="45" cy="142" rx="3" ry="6" fill="#451a03" />
    </svg>
  )
}

function ElephantSvg({ animated = true }: { animated?: boolean }) {
  return (
    <svg viewBox="0 0 240 180" className="w-full h-full drop-shadow-[0_12px_28px_rgba(148,163,184,0.35)]">
      <defs>
        <linearGradient id="eleGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#94a3b8" />
          <stop offset="60%" stopColor="#475569" />
          <stop offset="100%" stopColor="#1e293b" />
        </linearGradient>
      </defs>
      <path d="M 155 60 C 170 45 195 50 205 65 C 215 80 215 105 210 120 C 205 135 198 155 190 162 C 185 166 180 162 184 150 C 190 135 194 110 188 95 C 182 85 170 82 160 88 Z" fill="url(#eleGrad)" />
      <path d="M 198 108 C 215 112 228 106 235 98 C 228 108 212 118 195 114 Z" fill="#fef08a" />
      <path d="M 152 58 C 170 56 182 75 178 98 C 175 115 158 128 142 125 C 132 120 135 95 142 75 Z" fill="#334155" className={animated ? 'animate-pulse' : ''} />
      <path d="M 50 100 C 50 75 80 60 120 60 C 150 60 165 75 165 100 C 165 125 150 145 125 150 C 85 152 50 138 50 100 Z" fill="url(#eleGrad)" />
      <g className={animated ? 'animate-creature-walk origin-bottom' : ''}>
        <rect x="142" y="125" width="22" height="50" rx="6" fill="#475569" />
        <rect x="122" y="122" width="18" height="50" rx="5" fill="#334155" />
        <rect x="65" y="125" width="24" height="50" rx="6" fill="#475569" />
        <rect x="85" y="122" width="18" height="50" rx="5" fill="#334155" />
      </g>
      <path d="M 52 102 C 45 118 48 140 46 155" stroke="#334155" strokeWidth="2.5" fill="none" />
      <ellipse cx="46" cy="157" rx="3" ry="5" fill="#1e293b" />
    </svg>
  )
}

function BeeSvg({ animated = true }: { animated?: boolean }) {
  return (
    <svg viewBox="0 0 180 140" className="w-full h-full drop-shadow-[0_10px_20px_rgba(234,179,8,0.45)]">
      <defs>
        <linearGradient id="beeGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="60%" stopColor="#eab308" />
          <stop offset="100%" stopColor="#854d0e" />
        </linearGradient>
      </defs>
      <g className={animated ? 'animate-creature-fly origin-[85px_50px]' : ''}>
        <ellipse cx="80" cy="30" rx="35" ry="16" transform="rotate(-30 80 30)" fill="rgba(224, 242, 254, 0.65)" stroke="#38bdf8" strokeWidth="1.2" />
        <ellipse cx="100" cy="35" rx="28" ry="12" transform="rotate(-15 100 35)" fill="rgba(224, 242, 254, 0.55)" stroke="#38bdf8" strokeWidth="1" />
      </g>
      <ellipse cx="135" cy="72" rx="14" ry="12" fill="#451a03" />
      <ellipse cx="140" cy="68" rx="4" ry="5" fill="#1c1917" />
      <path d="M 145 64 Q 155 52 162 55 M 144 68 Q 158 64 165 70" stroke="#78350f" strokeWidth="2" fill="none" strokeLinecap="round" />
      <ellipse cx="110" cy="74" rx="18" ry="16" fill="url(#beeGrad)" />
      <g>
        <ellipse cx="65" cy="76" rx="32" ry="20" fill="url(#beeGrad)" />
        <path d="M 78 58 C 82 70 82 82 78 94 L 72 95 C 76 83 76 71 72 59 Z" fill="#1c1917" />
        <path d="M 62 56 C 66 70 66 84 62 96 L 56 96 C 60 84 60 70 56 56 Z" fill="#1c1917" />
        <path d="M 46 60 C 50 72 50 82 46 92 L 40 90 C 44 80 44 72 40 62 Z" fill="#1c1917" />
        <path d="M 33 76 L 24 76" stroke="#451a03" strokeWidth="2" strokeLinecap="round" />
      </g>
    </svg>
  )
}

function WolfSvg({ animated = true }: { animated?: boolean }) {
  return (
    <svg viewBox="0 0 210 160" className="w-full h-full drop-shadow-[0_12px_24px_rgba(203,213,225,0.35)]">
      <defs>
        <linearGradient id="wolfGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#cbd5e1" />
          <stop offset="50%" stopColor="#64748b" />
          <stop offset="100%" stopColor="#1e293b" />
        </linearGradient>
      </defs>
      {/* Alert Pricked Ears */}
      <path d="M 152 38 L 158 18 L 168 34 Z" fill="#475569" />
      <path d="M 166 38 L 174 20 L 180 36 Z" fill="#334155" />
      {/* Alert Snout & Head */}
      <path d="M 148 48 C 158 35 175 36 188 48 C 198 56 205 62 198 70 C 188 74 175 72 165 78 C 152 86 145 88 142 80 Z" fill="url(#wolfGrad)" />
      <circle cx="178" cy="52" r="3" fill="#f59e0b" />
      <ellipse cx="202" cy="65" rx="3.5" ry="2.5" fill="#0f172a" />
      {/* Lean Desert Body */}
      <path d="M 68 85 C 75 75 105 72 145 74 C 158 75 160 88 155 108 C 150 126 135 135 105 136 C 75 137 60 125 58 105 Z" fill="url(#wolfGrad)" />
      {/* Agile Paws */}
      <g className={animated ? 'animate-creature-walk origin-bottom' : ''}>
        <path d="M 142 108 L 148 135 L 155 155" stroke="#475569" strokeWidth="4.5" strokeLinecap="round" fill="none" />
        <path d="M 130 110 L 135 134 L 142 153" stroke="#334155" strokeWidth="4" strokeLinecap="round" fill="none" />
        <path d="M 80 105 L 72 132 L 68 155" stroke="#475569" strokeWidth="4.5" strokeLinecap="round" fill="none" />
        <path d="M 92 108 L 86 135 L 82 153" stroke="#334155" strokeWidth="4" strokeLinecap="round" fill="none" />
      </g>
      {/* Bushy Tail */}
      <path d="M 60 90 C 42 100 35 125 40 145 C 44 148 48 140 46 130 C 45 115 52 102 62 92 Z" fill="#475569" />
    </svg>
  )
}

function RavenSvg({ animated = true }: { animated?: boolean }) {
  return (
    <svg viewBox="0 0 200 160" className="w-full h-full drop-shadow-[0_12px_24px_rgba(99,102,241,0.3)]">
      <defs>
        <linearGradient id="ravenGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#4338ca" />
          <stop offset="40%" stopColor="#1e1b4b" />
          <stop offset="100%" stopColor="#09090b" />
        </linearGradient>
      </defs>
      {/* Heavy Sharp Beak for Excavation */}
      <path d="M 145 62 L 185 75 L 145 80 Z" fill="#09090b" />
      {/* Glossy Black Head & Body */}
      <path d="M 115 50 C 132 48 148 58 145 74 C 140 92 142 112 125 128 C 105 145 65 146 38 135 C 22 130 10 118 8 108 C 22 110 48 102 65 88 C 80 72 98 52 115 50 Z" fill="url(#ravenGrad)" />
      <circle cx="132" cy="62" r="2.8" fill="#e2e8f0" />
      <circle cx="132" cy="62" r="1.5" fill="#000" />
      {/* Folded Wings */}
      <g className={animated ? 'origin-[95px_85px] animate-creature-fly' : ''}>
        <path d="M 105 78 C 85 96 62 125 32 145 C 48 132 80 98 115 82 Z" fill="#0f172a" />
        <path d="M 92 88 C 75 104 55 128 42 138 C 52 125 78 102 102 90 Z" fill="#312e81" opacity="0.6" />
      </g>
      {/* Tail */}
      <path d="M 35 135 L 8 152 L 18 155 L 45 138 Z" fill="#09090b" />
      {/* Scratching Talons Digging the Earth */}
      <path d="M 90 135 L 88 150 L 98 152 M 85 150 L 76 152 M 75 136 L 72 150 L 80 152" stroke="#475569" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    </svg>
  )
}

function SpiderSvg({ animated = true }: { animated?: boolean }) {
  return (
    <svg viewBox="0 0 200 180" className="w-full h-full drop-shadow-[0_12px_24px_rgba(203,213,225,0.3)]">
      <defs>
        <radialGradient id="webGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(248, 250, 252, 0.4)" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>
      {/* Intricate Radial Web Threads */}
      <g stroke="rgba(255,255,255,0.25)" strokeWidth="0.8" fill="none">
        <line x1="20" y1="20" x2="180" y2="160" />
        <line x1="180" y1="20" x2="20" y2="160" />
        <line x1="100" y1="10" x2="100" y2="170" />
        <line x1="10" y1="90" x2="190" y2="90" />
        <polygon points="100,45 135,65 135,115 100,135 65,115 65,65" />
        <polygon points="100,30 155,55 155,125 100,150 45,125 45,55" />
      </g>
      {/* Central Garden Spider */}
      <g className={animated ? 'animate-creature-walk origin-center' : ''}>
        {/* 8 Articulated Spidery Legs */}
        <g stroke="#e2e8f0" strokeWidth="2" fill="none" strokeLinecap="round">
          <path d="M 105 85 Q 130 65 145 45" />
          <path d="M 108 90 Q 140 85 155 75" />
          <path d="M 106 95 Q 140 105 152 120" />
          <path d="M 102 98 Q 125 125 135 145" />
          <path d="M 95 85 Q 70 65 55 45" />
          <path d="M 92 90 Q 60 85 45 75" />
          <path d="M 94 95 Q 60 105 48 120" />
          <path d="M 98 98 Q 75 125 65 145" />
        </g>
        {/* Cephalothorax & Patterned Abdomen */}
        <ellipse cx="100" cy="85" rx="7" ry="6" fill="#475569" />
        <ellipse cx="100" cy="100" rx="14" ry="18" fill="#1e293b" stroke="#e2e8f0" strokeWidth="1.5" />
        {/* Yellow cross pattern */}
        <path d="M 100 88 L 100 112 M 92 98 L 108 98" stroke="#facc15" strokeWidth="2" strokeLinecap="round" />
      </g>
    </svg>
  )
}

function BuraqSvg({ animated = true }: { animated?: boolean }) {
  return (
    <svg viewBox="0 0 240 180" className="w-full h-full drop-shadow-[0_12px_28px_rgba(254,240,138,0.6)]">
      <defs>
        <linearGradient id="buraqGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="50%" stopColor="#fef08a" />
          <stop offset="100%" stopColor="#ca8a04" />
        </linearGradient>
        <linearGradient id="wingGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,0.9)" />
          <stop offset="50%" stopColor="rgba(253,224,71,0.7)" />
          <stop offset="100%" stopColor="rgba(56,189,248,0.4)" />
        </linearGradient>
      </defs>
      {/* Celestial Aura Halo */}
      <circle cx="120" cy="90" r="75" fill="none" stroke="rgba(250,204,21,0.25)" strokeWidth="1.5" strokeDasharray="4 6" className={animated ? 'animate-spin-slow' : ''} />
      {/* Majestic Feathered Celestial Wings */}
      <g className={animated ? 'animate-creature-fly origin-[125px_85px]' : ''}>
        <path d="M 125 85 C 135 45 165 15 195 10 C 180 35 170 65 155 85 Z" fill="url(#wingGrad)" />
        <path d="M 115 88 C 120 50 142 25 170 20 C 158 42 148 70 135 90 Z" fill="url(#wingGrad)" />
        <path d="M 105 92 C 105 60 120 40 145 35 C 135 55 125 78 118 95 Z" fill="url(#wingGrad)" />
      </g>
      {/* Elegant Noble White Steed Body */}
      <path d="M 155 85 C 160 65 172 40 188 28 C 195 22 205 24 210 32 C 215 40 210 48 200 52 C 185 56 175 70 168 90 Z" fill="url(#buraqGrad)" />
      <path d="M 80 95 C 80 82 100 75 130 75 C 160 75 170 88 168 108 C 165 125 150 135 125 136 C 95 137 80 125 80 95 Z" fill="url(#buraqGrad)" />
      {/* Galloping Divine Hooves */}
      <g className={animated ? 'animate-creature-gallop origin-bottom' : ''}>
        <path d="M 160 110 L 172 135 L 188 155" stroke="#facc15" strokeWidth="4.5" strokeLinecap="round" fill="none" />
        <path d="M 148 112 L 155 136 L 165 154" stroke="#ca8a04" strokeWidth="4" strokeLinecap="round" fill="none" />
        <path d="M 95 105 L 80 132 L 68 152" stroke="#facc15" strokeWidth="5" strokeLinecap="round" fill="none" />
        <path d="M 108 108 L 98 135 L 90 154" stroke="#ca8a04" strokeWidth="4.5" strokeLinecap="round" fill="none" />
      </g>
      {/* Luminous Tail */}
      <path d="M 82 90 C 60 75 48 92 45 122 C 42 138 48 150 55 154" stroke="#fef08a" strokeWidth="4" fill="none" strokeLinecap="round" className={animated ? 'animate-pulse' : ''} />
    </svg>
  )
}

function AbabilSvg({ animated = true }: { animated?: boolean }) {
  return (
    <svg viewBox="0 0 220 170" className="w-full h-full drop-shadow-[0_12px_24px_rgba(244,63,94,0.35)]">
      <defs>
        <linearGradient id="ababilBird" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="50%" stopColor="#0f172a" />
          <stop offset="100%" stopColor="#000000" />
        </linearGradient>
      </defs>
      {/* Lead Bird 1 */}
      <g className={animated ? 'animate-creature-fly origin-center' : ''}>
        <path d="M 110 50 Q 140 25 175 45 Q 140 55 110 50" fill="url(#ababilBird)" />
        <path d="M 110 50 Q 80 25 45 45 Q 80 55 110 50" fill="url(#ababilBird)" />
        <ellipse cx="110" cy="50" rx="8" ry="18" fill="#0f172a" />
        {/* Baked Clay Stone in Claws */}
        <circle cx="110" cy="72" r="5" fill="#b91c1c" className={animated ? 'animate-pulse' : ''} />
      </g>
      {/* Wingman Bird 2 (Left Lower) */}
      <g transform="translate(-40, 45) scale(0.75)" className={animated ? 'animate-creature-fly origin-center' : ''}>
        <path d="M 110 50 Q 140 25 175 45 Q 140 55 110 50" fill="url(#ababilBird)" />
        <path d="M 110 50 Q 80 25 45 45 Q 80 55 110 50" fill="url(#ababilBird)" />
        <ellipse cx="110" cy="50" rx="8" ry="18" fill="#0f172a" />
        <circle cx="110" cy="72" r="5" fill="#dc2626" />
      </g>
      {/* Wingman Bird 3 (Right Lower) */}
      <g transform="translate(60, 40) scale(0.75)" className={animated ? 'animate-creature-fly origin-center' : ''}>
        <path d="M 110 50 Q 140 25 175 45 Q 140 55 110 50" fill="url(#ababilBird)" />
        <path d="M 110 50 Q 80 25 45 45 Q 80 55 110 50" fill="url(#ababilBird)" />
        <ellipse cx="110" cy="50" rx="8" ry="18" fill="#0f172a" />
        <circle cx="110" cy="72" r="5" fill="#dc2626" />
      </g>
    </svg>
  )
}

function HorseSvg({ animated = true }: { animated?: boolean }) {
  return (
    <svg viewBox="0 0 220 160" className="w-full h-full drop-shadow-[0_12px_24px_rgba(234,179,8,0.4)]">
      <defs>
        <linearGradient id="horseGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="40%" stopColor="#ca8a04" />
          <stop offset="100%" stopColor="#451a03" />
        </linearGradient>
      </defs>
      <path d="M 140 85 C 145 65 158 40 175 28 C 182 22 192 24 198 32 C 204 40 200 48 190 52 C 175 56 162 70 155 90 Z" fill="url(#horseGrad)" />
      <path d="M 188 24 L 192 12 L 196 22 Z" fill="#a16207" />
      <circle cx="192" cy="34" r="2.5" fill="#1c1917" />
      <path d="M 168 28 C 158 35 152 48 148 62 C 142 75 138 90 135 105" stroke="#713f12" strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M 65 95 C 65 82 85 75 115 75 C 145 75 155 88 152 108 C 150 125 135 135 110 136 C 80 137 65 125 65 95 Z" fill="url(#horseGrad)" />
      <g className={animated ? 'animate-creature-gallop origin-bottom' : ''}>
        <path d="M 145 110 L 158 135 L 175 155" stroke="#a16207" strokeWidth="4.5" strokeLinecap="round" fill="none" />
        <path d="M 132 112 L 140 136 L 152 154" stroke="#713f12" strokeWidth="4" strokeLinecap="round" fill="none" />
        <path d="M 80 105 L 65 132 L 52 152" stroke="#a16207" strokeWidth="5" strokeLinecap="round" fill="none" />
        <path d="M 92 108 L 82 135 L 75 154" stroke="#713f12" strokeWidth="4.5" strokeLinecap="round" fill="none" />
      </g>
      <path d="M 66 90 C 45 75 35 90 32 120 C 30 135 34 148 40 152" stroke="#ca8a04" strokeWidth="4" fill="none" strokeLinecap="round" className={animated ? 'animate-creature-walk origin-[66px_90px]' : ''} />
    </svg>
  )
}

function CatSvg({ animated = true }: { animated?: boolean }) {
  return (
    <svg viewBox="0 0 180 140" className="w-full h-full drop-shadow-[0_10px_20px_rgba(234,179,8,0.35)]">
      <defs>
        <linearGradient id="catGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fed7aa" />
          <stop offset="50%" stopColor="#ea580c" />
          <stop offset="100%" stopColor="#7c2d12" />
        </linearGradient>
      </defs>
      <circle cx="132" cy="55" r="18" fill="url(#catGrad)" />
      <path d="M 120 45 L 118 28 L 130 40 Z" fill="#9a3412" />
      <path d="M 136 40 L 146 28 L 144 45 Z" fill="#9a3412" />
      <path d="M 142 60 L 165 58 M 142 63 L 166 65 M 142 66 L 162 72" stroke="#fef08a" strokeWidth="1" />
      <ellipse cx="138" cy="52" rx="3" ry="4" fill="#84cc16" />
      <line x1="138" y1="49" x2="138" y2="55" stroke="#000" strokeWidth="1.2" />
      <path d="M 60 85 C 60 70 85 68 115 68 C 128 68 135 78 132 98 C 130 115 115 125 90 126 C 65 127 55 110 60 85 Z" fill="url(#catGrad)" />
      <g className={animated ? 'animate-creature-walk origin-bottom' : ''}>
        <rect x="118" y="100" width="8" height="26" rx="4" fill="#c2410c" />
        <rect x="108" y="102" width="7" height="24" rx="3.5" fill="#9a3412" />
        <ellipse cx="72" cy="110" rx="14" ry="12" fill="#c2410c" />
        <rect x="65" y="115" width="8" height="12" rx="4" fill="#9a3412" />
      </g>
      <path d="M 58 92 C 40 85 30 65 35 50 C 38 42 46 44 45 52 C 42 65 48 80 62 90" stroke="#ea580c" strokeWidth="4.5" fill="none" strokeLinecap="round" className={animated ? 'animate-creature-swim origin-[58px_92px]' : ''} />
    </svg>
  )
}

function DatePalmSvg({ animated = true }: { animated?: boolean }) {
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-[0_12px_24px_rgba(34,197,94,0.35)]">
      <defs>
        <linearGradient id="palmTrunk" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#78350f" />
          <stop offset="50%" stopColor="#b45309" />
          <stop offset="100%" stopColor="#451a03" />
        </linearGradient>
      </defs>
      <path d="M 92 195 Q 98 120 102 75 L 112 75 Q 106 120 104 195 Z" fill="url(#palmTrunk)" />
      {[100, 120, 140, 160, 180].map((y) => (
        <line key={y} x1="95" y1={y} x2="105" y2={y - 4} stroke="#451a03" strokeWidth="2" strokeLinecap="round" />
      ))}
      <g>
        <ellipse cx="96" cy="85" rx="10" ry="14" fill="#eab308" />
        <ellipse cx="116" cy="86" rx="9" ry="13" fill="#ca8a04" />
        <ellipse cx="106" cy="92" rx="11" ry="15" fill="#fde047" />
      </g>
      <g className={animated ? 'animate-flora-sway origin-[106px_75px]' : ''}>
        <path d="M 106 75 Q 70 50 30 70 Q 75 40 106 75" fill="#15803d" />
        <path d="M 106 75 Q 60 25 15 25 Q 65 20 106 75" fill="#16a34a" />
        <path d="M 106 75 Q 95 15 80 0 Q 100 15 106 75" fill="#22c55e" />
        <path d="M 106 75 Q 125 15 140 0 Q 120 15 106 75" fill="#22c55e" />
        <path d="M 106 75 Q 155 25 195 25 Q 145 20 106 75" fill="#16a34a" />
        <path d="M 106 75 Q 145 50 185 70 Q 135 40 106 75" fill="#15803d" />
      </g>
    </svg>
  )
}

function OliveSvg({ animated = true }: { animated?: boolean }) {
  return (
    <svg viewBox="0 0 200 180" className="w-full h-full drop-shadow-[0_12px_24px_rgba(132,204,22,0.4)]">
      <defs>
        <linearGradient id="oliveGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#a3e635" />
          <stop offset="60%" stopColor="#65a30d" />
          <stop offset="100%" stopColor="#3f6212" />
        </linearGradient>
      </defs>
      <path d="M 25 145 Q 70 120 120 90 Q 160 65 185 35" stroke="#78350f" strokeWidth="4.5" fill="none" strokeLinecap="round" />
      <g className={animated ? 'animate-flora-sway origin-center' : ''}>
        <path d="M 85 110 C 65 95 60 70 80 65 C 100 68 105 95 85 110 Z" fill="#4d7c0f" />
        <path d="M 125 85 C 110 65 115 45 135 40 C 150 45 148 70 125 85 Z" fill="#65a30d" />
        <path d="M 160 55 C 150 35 162 20 180 18 C 190 25 185 45 160 55 Z" fill="#4d7c0f" />
        <path d="M 105 100 C 120 115 140 120 148 105 C 145 90 125 85 105 100 Z" fill="#84cc16" />
      </g>
      <g>
        <ellipse cx="95" cy="125" rx="14" ry="18" fill="url(#oliveGrad)" />
        <ellipse cx="98" cy="120" rx="3.5" ry="6" fill="rgba(255,255,255,0.4)" />
        <ellipse cx="138" cy="98" rx="13" ry="17" fill="url(#oliveGrad)" />
        <ellipse cx="141" cy="94" rx="3" ry="5" fill="rgba(255,255,255,0.4)" />
        <path d="M 95 145 C 95 155 102 165 95 175 C 88 165 95 155 95 145 Z" fill="#facc15" className={animated ? 'animate-pulse' : ''} />
      </g>
    </svg>
  )
}

function FigSvg() {
  return (
    <svg viewBox="0 0 180 180" className="w-full h-full drop-shadow-[0_12px_24px_rgba(168,85,247,0.35)]">
      <defs>
        <linearGradient id="figGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#c084fc" />
          <stop offset="50%" stopColor="#7e22ce" />
          <stop offset="100%" stopColor="#3b0764" />
        </linearGradient>
      </defs>
      <path d="M 90 20 Q 95 40 90 55" stroke="#65a30d" strokeWidth="4" strokeLinecap="round" />
      <path d="M 90 55 C 65 75 42 105 45 132 C 48 160 80 170 95 170 C 120 170 145 158 142 128 C 138 102 115 75 90 55 Z" fill="url(#figGrad)" />
      <ellipse cx="94" cy="125" rx="32" ry="34" fill="#f43f5e" />
      <circle cx="94" cy="125" r="26" fill="#fb7185" />
      {[85, 95, 105].map((x) =>
        [115, 125, 135].map((y) => <circle key={`${x}-${y}`} cx={x} cy={y} r="1.5" fill="#fef08a" />)
      )}
    </svg>
  )
}

function PomegranateSvg({ animated = true }: { animated?: boolean }) {
  return (
    <svg viewBox="0 0 180 180" className="w-full h-full drop-shadow-[0_12px_24px_rgba(244,63,94,0.45)]">
      <defs>
        <linearGradient id="pomGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fda4af" />
          <stop offset="45%" stopColor="#e11d48" />
          <stop offset="100%" stopColor="#881337" />
        </linearGradient>
      </defs>
      <path d="M 90 15 L 90 35" stroke="#713f12" strokeWidth="4" strokeLinecap="round" />
      <path d="M 75 35 L 70 20 L 82 28 L 90 18 L 98 28 L 110 20 L 105 35 Z" fill="#9f1239" />
      <circle cx="90" cy="100" r="62" fill="url(#pomGrad)" />
      <path d="M 70 80 Q 115 70 125 100 Q 115 135 70 120 Q 55 100 70 80 Z" fill="#fff1f2" />
      {[
        [78, 88], [92, 85], [105, 88],
        [82, 100], [96, 98], [110, 102],
        [88, 112], [102, 114],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="5.5" fill="#be123c" className={animated ? 'animate-pulse' : ''} />
      ))}
    </svg>
  )
}

function HoneySvg({ animated = true }: { animated?: boolean }) {
  return (
    <svg viewBox="0 0 180 180" className="w-full h-full drop-shadow-[0_12px_24px_rgba(234,179,8,0.5)]">
      <defs>
        <linearGradient id="honeyJar" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="60%" stopColor="#eab308" />
          <stop offset="100%" stopColor="#ca8a04" />
        </linearGradient>
      </defs>
      <polygon points="45,45 60,35 75,45 75,65 60,75 45,65" fill="#fde047" stroke="#ca8a04" strokeWidth="1.5" opacity="0.6" />
      <polygon points="75,45 90,35 105,45 105,65 90,75 75,65" fill="#fde047" stroke="#ca8a04" strokeWidth="1.5" opacity="0.8" />
      <polygon points="60,75 75,65 90,75 90,95 75,105 60,95" fill="#eab308" stroke="#ca8a04" strokeWidth="1.5" />
      <path d="M 65 95 L 115 95 L 125 155 C 125 165 115 172 90 172 C 65 172 55 165 55 155 Z" fill="url(#honeyJar)" />
      <line x1="135" y1="30" x2="100" y2="90" stroke="#78350f" strokeWidth="4.5" strokeLinecap="round" />
      <ellipse cx="102" cy="88" rx="12" ry="10" fill="#a16207" />
      <path d="M 102 98 C 102 110 108 122 102 135 C 96 122 102 110 102 98 Z" fill="#fde047" className={animated ? 'animate-pulse' : ''} />
    </svg>
  )
}

function BlackSeedSvg({ animated = true }: { animated?: boolean }) {
  return (
    <svg viewBox="0 0 180 180" className="w-full h-full drop-shadow-[0_12px_24px_rgba(56,189,248,0.4)]">
      <defs>
        <linearGradient id="nigellaFlower" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#bae6fd" />
          <stop offset="50%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#0369a1" />
        </linearGradient>
      </defs>
      {/* Delicate Nigella Petals */}
      <g className={animated ? 'animate-flora-sway origin-[90px_80px]' : ''}>
        {[0, 72, 144, 216, 288].map((angle) => (
          <path
            key={angle}
            d="M 90 80 C 85 50 95 30 90 18 C 85 30 95 50 90 80 Z"
            fill="url(#nigellaFlower)"
            transform={`rotate(${angle} 90 80)`}
          />
        ))}
      </g>
      {/* Horned Seed Capsule in Center */}
      <circle cx="90" cy="80" r="14" fill="#047857" />
      <path d="M 90 80 L 82 58 M 90 80 L 98 58 M 90 80 L 90 54" stroke="#065f46" strokeWidth="2.5" strokeLinecap="round" />
      {/* Scattered Jet Black Seeds */}
      {([
        [65, 125], [78, 142], [92, 130], [105, 145], [118, 128], [85, 155], [100, 160]
      ] as const).map(([x, y], i) => (
        <polygon
          key={i}
          points={`${x},${y - 6} ${x + 5},${y + 4} ${x - 5},${y + 4}`}
          fill="#09090b"
          stroke="#475569"
          strokeWidth="0.8"
          className={animated ? 'animate-pulse' : ''}
        />
      ))}
    </svg>
  )
}

function GourdSvg({ animated = true }: { animated?: boolean }) {
  return (
    <svg viewBox="0 0 200 180" className="w-full h-full drop-shadow-[0_12px_24px_rgba(245,158,11,0.45)]">
      <defs>
        <linearGradient id="gourdGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fde047" />
          <stop offset="50%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#b45309" />
        </linearGradient>
      </defs>
      {/* Sprawling Vine and Broad Umbrella Leaves */}
      <path d="M 20 140 Q 60 100 110 115 Q 160 130 190 90" stroke="#15803d" strokeWidth="4" fill="none" strokeLinecap="round" />
      <g className={animated ? 'animate-flora-sway origin-[55px_95px]' : ''}>
        <path d="M 55 95 C 30 75 25 45 50 35 C 75 40 85 70 55 95 Z" fill="#16a34a" />
        <path d="M 145 90 C 130 65 145 40 170 42 C 185 55 175 80 145 90 Z" fill="#15803d" />
      </g>
      {/* Ribbed Golden Pumpkin / Gourd */}
      <g>
        <ellipse cx="105" cy="130" rx="48" ry="35" fill="url(#gourdGrad)" />
        <ellipse cx="105" cy="130" rx="34" ry="35" fill="none" stroke="#d97706" strokeWidth="3" />
        <ellipse cx="105" cy="130" rx="18" ry="35" fill="none" stroke="#b45309" strokeWidth="2.5" />
        {/* Curled Stem */}
        <path d="M 105 95 Q 112 80 104 70" stroke="#713f12" strokeWidth="5" fill="none" strokeLinecap="round" />
      </g>
    </svg>
  )
}

function SidrSvg({ animated = true }: { animated?: boolean }) {
  return (
    <svg viewBox="0 0 200 190" className="w-full h-full drop-shadow-[0_12px_26px_rgba(250,204,21,0.5)]">
      <defs>
        <radialGradient id="sidrAura" cx="50%" cy="40%" r="50%">
          <stop offset="0%" stopColor="rgba(250,204,21,0.4)" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>
      {/* Celestial Aura of Sidrat al-Muntaha */}
      <circle cx="100" cy="85" r="75" fill="url(#sidrAura)" className={animated ? 'animate-pulse' : ''} />
      {/* Gnarled Thorny Branch */}
      <path d="M 40 175 Q 85 140 100 100 Q 115 65 155 35" stroke="#78350f" strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d="M 85 125 Q 120 115 160 120" stroke="#78350f" strokeWidth="3.5" fill="none" strokeLinecap="round" />
      {/* Thorns */}
      <path d="M 78 135 L 70 128 M 110 88 L 118 80 M 132 55 L 142 50" stroke="#451a03" strokeWidth="2.5" strokeLinecap="round" />
      {/* Oval Glossy Leaves */}
      <g className={animated ? 'animate-flora-sway origin-[100px_100px]' : ''}>
        <ellipse cx="125" cy="65" rx="14" ry="9" transform="rotate(-30 125 65)" fill="#15803d" />
        <ellipse cx="150" cy="45" rx="15" ry="9" transform="rotate(-20 150 45)" fill="#16a34a" />
        <ellipse cx="115" cy="115" rx="14" ry="8" transform="rotate(15 115 115)" fill="#16a34a" />
        <ellipse cx="145" cy="118" rx="15" ry="9" transform="rotate(25 145 118)" fill="#15803d" />
        <ellipse cx="75" cy="110" rx="14" ry="8" transform="rotate(-40 75 110)" fill="#16a34a" />
      </g>
      {/* Clusters of Sweet Golden-Red Nabq Berries */}
      {[
        [108, 98], [132, 85], [142, 100], [162, 110], [95, 120]
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="6" fill={i % 2 === 0 ? '#e11d48' : '#f59e0b'} className={animated ? 'animate-pulse' : ''} />
      ))}
    </svg>
  )
}

function TalbinahSvg({ animated = true }: { animated?: boolean }) {
  return (
    <svg viewBox="0 0 190 170" className="w-full h-full drop-shadow-[0_12px_24px_rgba(254,240,138,0.4)]">
      <defs>
        <linearGradient id="bowlGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f8fafc" />
          <stop offset="60%" stopColor="#cbd5e1" />
          <stop offset="100%" stopColor="#64748b" />
        </linearGradient>
      </defs>
      {/* Soothing Steam Rising */}
      {animated && (
        <g stroke="rgba(255,255,255,0.45)" strokeWidth="2.5" fill="none" strokeLinecap="round" className="animate-pulse">
          <path d="M 75 45 Q 65 30 75 15" />
          <path d="M 95 40 Q 105 25 95 10" />
          <path d="M 115 45 Q 125 30 115 15" />
        </g>
      )}
      {/* Fine Porcelain / Clay Bowl */}
      <path d="M 35 75 C 35 125 65 148 95 148 C 125 148 155 125 155 75 Z" fill="url(#bowlGrad)" />
      {/* Bowl Rim & Foot */}
      <ellipse cx="95" cy="75" rx="60" ry="18" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="2" />
      <rect x="75" y="146" width="40" height="8" rx="3" fill="#64748b" />
      {/* Creamy White Barley Porridge Soup */}
      <ellipse cx="95" cy="76" rx="55" ry="15" fill="#fef9c3" />
      {/* Drizzled Golden Honey Swirls */}
      <path d="M 65 76 Q 85 82 105 74 Q 125 80 135 74" stroke="#f59e0b" strokeWidth="3" fill="none" strokeLinecap="round" />
    </svg>
  )
}

function KamahSvg({ animated = true }: { animated?: boolean }) {
  return (
    <svg viewBox="0 0 190 160" className="w-full h-full drop-shadow-[0_12px_24px_rgba(217,119,6,0.4)]">
      <defs>
        <linearGradient id="truffleGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#d97706" />
          <stop offset="60%" stopColor="#92400e" />
          <stop offset="100%" stopColor="#451a03" />
        </linearGradient>
      </defs>
      {/* Desert Sand Ground with Cracks */}
      <path d="M 15 135 Q 95 128 175 135" stroke="#d97706" strokeWidth="3" fill="none" />
      <path d="M 75 132 L 85 142 M 115 130 L 125 145" stroke="#b45309" strokeWidth="1.5" />
      {/* Large Desert Truffle */}
      <g>
        <ellipse cx="80" cy="110" rx="36" ry="28" fill="url(#truffleGrad)" />
        {/* Natural bumpy texture facets */}
        <circle cx="68" cy="102" r="6" fill="#b45309" opacity="0.6" />
        <circle cx="88" cy="112" r="7" fill="#78350f" opacity="0.6" />
        <circle cx="95" cy="98" r="5" fill="#b45309" opacity="0.5" />
      </g>
      {/* Smaller Companion Truffle */}
      <g transform="translate(45, 10)">
        <ellipse cx="90" cy="115" rx="26" ry="22" fill="url(#truffleGrad)" />
        <circle cx="85" cy="110" r="5" fill="#b45309" opacity="0.6" />
        <circle cx="98" cy="118" r="4" fill="#78350f" opacity="0.6" />
      </g>
      {/* Glistening Dewdrop of Manna */}
      <circle cx="80" cy="95" r="4" fill="#38bdf8" className={animated ? 'animate-pulse' : ''} />
    </svg>
  )
}

function QistHindiSvg() {
  return (
    <svg viewBox="0 0 190 160" className="w-full h-full drop-shadow-[0_12px_24px_rgba(180,83,9,0.4)]">
      <defs>
        <linearGradient id="qistWood" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#78350f" />
          <stop offset="50%" stopColor="#b45309" />
          <stop offset="100%" stopColor="#451a03" />
        </linearGradient>
      </defs>
      {/* Bundle of Medicinal Wood Roots */}
      <rect x="45" y="70" width="100" height="18" rx="5" transform="rotate(-15 95 79)" fill="url(#qistWood)" />
      <rect x="40" y="85" width="110" height="20" rx="5" transform="rotate(5 95 95)" fill="url(#qistWood)" />
      <rect x="50" y="102" width="95" height="18" rx="5" transform="rotate(-8 97 111)" fill="url(#qistWood)" />
      {/* Tied Natural Hemp Cord */}
      <rect x="88" y="65" width="14" height="65" rx="3" fill="#ca8a04" stroke="#713f12" strokeWidth="1" />
      {/* Purple Alpine Flower of Costus */}
      <circle cx="145" cy="55" r="14" fill="#7e22ce" />
      <circle cx="145" cy="55" r="7" fill="#a855f7" />
    </svg>
  )
}

function MiswakSvg({ animated = true }: { animated?: boolean }) {
  return (
    <svg viewBox="0 0 200 160" className="w-full h-full drop-shadow-[0_12px_24px_rgba(202,138,4,0.45)]">
      <defs>
        <linearGradient id="miswakWood" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#d97706" />
          <stop offset="50%" stopColor="#fef08a" />
          <stop offset="100%" stopColor="#b45309" />
        </linearGradient>
      </defs>
      {/* Arak Tree Green Leaf */}
      <path d="M 40 45 C 20 65 30 95 55 90 C 70 85 65 55 40 45 Z" fill="#15803d" />
      {/* Miswak Root Stick */}
      <rect x="45" y="85" width="120" height="18" rx="7" transform="rotate(-18 105 94)" fill="url(#miswakWood)" stroke="#78350f" strokeWidth="2" />
      {/* Peeled Frayed Brush Fibers Tip */}
      <g transform="translate(138, 48) rotate(-18)" className={animated ? 'animate-pulse' : ''}>
        <rect x="0" y="0" width="22" height="16" rx="2" fill="#fef9c3" />
        {/* Natural Fiber Bristles */}
        {[2, 5, 8, 11, 14].map((y) => (
          <line key={y} x1="16" y1={y} x2="32" y2={y} stroke="#ca8a04" strokeWidth="1.5" strokeLinecap="round" />
        ))}
      </g>
    </svg>
  )
}

function GingerSvg() {
  return (
    <svg viewBox="0 0 190 160" className="w-full h-full drop-shadow-[0_12px_24px_rgba(217,119,6,0.4)]">
      <defs>
        <linearGradient id="gingerGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fde047" />
          <stop offset="50%" stopColor="#d97706" />
          <stop offset="100%" stopColor="#78350f" />
        </linearGradient>
      </defs>
      {/* Green Shoot Sprout */}
      <path d="M 125 55 Q 135 30 148 18 Q 140 38 128 65" stroke="#16a34a" strokeWidth="4.5" fill="none" strokeLinecap="round" />
      {/* Knobby Multi-Lobed Rhizome Body */}
      <g>
        <circle cx="75" cy="115" r="26" fill="url(#gingerGrad)" />
        <circle cx="110" cy="108" r="28" fill="url(#gingerGrad)" />
        <circle cx="125" cy="80" r="18" fill="url(#gingerGrad)" />
        <circle cx="60" cy="90" r="18" fill="url(#gingerGrad)" />
        {/* Ring Marks */}
        <path d="M 65 110 Q 75 122 85 112 M 100 100 Q 110 115 120 104 M 118 75 Q 128 85 132 78" stroke="#78350f" strokeWidth="2" fill="none" opacity="0.6" />
      </g>
    </svg>
  )
}

function WatermelonSvg({ animated = true }: { animated?: boolean }) {
  return (
    <svg viewBox="0 0 200 170" className="w-full h-full drop-shadow-[0_12px_26px_rgba(239,68,68,0.4)]">
      <defs>
        <linearGradient id="melonRind" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#15803d" />
          <stop offset="100%" stopColor="#14532d" />
        </linearGradient>
      </defs>
      {/* Whole Striped Melon Sphere */}
      <circle cx="75" cy="100" r="48" fill="url(#melonRind)" />
      {/* Green Stripes */}
      <path d="M 75 52 Q 60 100 75 148 M 55 58 Q 42 100 55 142 M 95 58 Q 108 100 95 142" stroke="#22c55e" strokeWidth="5" fill="none" opacity="0.8" />
      {/* Sliced Juicy Crimson Crescent Slice */}
      <g transform="translate(110, 80)">
        {/* Rind */}
        <path d="M 0 50 A 45 45 0 0 0 70 0 Z" fill="#15803d" />
        {/* White Pith */}
        <path d="M 4 46 A 41 41 0 0 0 66 4 Z" fill="#f8fafc" />
        {/* Red Flesh */}
        <path d="M 7 42 A 37 37 0 0 0 62 7 Z" fill="#ef4444" />
        {/* Black Seeds */}
        {[
          [24, 28], [38, 20], [45, 32]
        ].map(([x, y], i) => (
          <ellipse key={i} cx={x} cy={y} rx="2" ry="3.5" fill="#09090b" />
        ))}
      </g>
      {/* Cluster of Fresh Ripe Dates (Rutab) Beside It */}
      <g className={animated ? 'animate-pulse' : ''}>
        <ellipse cx="145" cy="135" rx="10" ry="14" fill="#eab308" />
        <ellipse cx="160" cy="138" rx="9" ry="13" fill="#ca8a04" />
        <ellipse cx="132" cy="142" rx="9" ry="13" fill="#d97706" />
      </g>
    </svg>
  )
}

function RenderOrganismSilhouette({ id, animated = true }: { id: string; animated?: boolean }) {
  switch (id) {
    case 'hudhud':
      return <HoopoeSvg animated={animated} />
    case 'hamama':
      return <DoveSvg animated={animated} />
    case 'namlah':
      return <AntSvg animated={animated} />
    case 'hut_yunus':
      return <WhaleSvg animated={animated} />
    case 'naqat_salih':
      return <SheCamelSvg animated={animated} />
    case 'kalb_kahf':
      return <DogSvg animated={animated} />
    case 'baqarah':
      return <BaqarahSvg animated={animated} />
    case 'fil':
      return <ElephantSvg animated={animated} />
    case 'nahl':
      return <BeeSvg animated={animated} />
    case 'dhib_yusuf':
      return <WolfSvg animated={animated} />
    case 'ghurab':
      return <RavenSvg animated={animated} />
    case 'ankabut':
      return <SpiderSvg animated={animated} />
    case 'khayl_adiyat':
      return <HorseSvg animated={animated} />
    case 'buraq':
      return <BuraqSvg animated={animated} />
    case 'tayr_ababil':
      return <AbabilSvg animated={animated} />
    case 'qittah':
      return <CatSvg animated={animated} />
    case 'nakhl_tamr':
      return <DatePalmSvg animated={animated} />
    case 'zaytun_zayt':
      return <OliveSvg animated={animated} />
    case 'tin':
      return <FigSvg />
    case 'rumman':
      return <PomegranateSvg animated={animated} />
    case 'asal':
      return <HoneySvg animated={animated} />
    case 'habbah_sawda':
      return <BlackSeedSvg animated={animated} />
    case 'yaqtin_dubba':
      return <GourdSvg animated={animated} />
    case 'sidr':
      return <SidrSvg animated={animated} />
    case 'talbinah':
      return <TalbinahSvg animated={animated} />
    case 'kamah':
      return <KamahSvg animated={animated} />
    case 'qist_hindi':
      return <QistHindiSvg />
    case 'arak_siwak':
      return <MiswakSvg animated={animated} />
    case 'zanjabil':
      return <GingerSvg />
    case 'battikh':
      return <WatermelonSvg animated={animated} />
    default:
      return <DatePalmSvg animated={animated} />
  }
}

// --- Main Interactive View Component ---

export function NatureView() {
  const { lang, pick } = useI18n()

  const [activeTab, setActiveTab] = useState<'animals' | 'plants'>('animals')
  const [animalCategory, setAnimalCategory] = useState<AnimalCategory | 'all'>('all')
  const [plantCategory, setPlantCategory] = useState<PlantCategory | 'all'>('all')
  const [sourceFilter, setSourceFilter] = useState<ScriptureSource | 'all'>('all')
  const [query, setQuery] = useState('')

  // Interactive Stage Controls
  const [selectedAnimalId, setSelectedAnimalId] = useState<string>('hudhud')
  const [selectedPlantId, setSelectedPlantId] = useState<string>('nakhl_tamr')
  const [isMotionActive, setIsMotionActive] = useState<boolean>(true)
  const [showRealPhoto, setShowRealPhoto] = useState<boolean>(false)
  const [sunAngle, setSunAngle] = useState<number>(65) // 15 to 165 degrees
  const [shadowIntensity, setShadowIntensity] = useState<number>(65) // 20 to 100%
  const [isOrbiting, setIsOrbiting] = useState<boolean>(false)
  const [isDraggingSky, setIsDraggingSky] = useState<boolean>(false)

  // Live celestial orbit physics simulation
  useEffect(() => {
    if (!isOrbiting) return
    let animId: number
    let lastTime = performance.now()
    const orbitSpeed = 12 // degrees per second

    const step = (now: number) => {
      const dt = (now - lastTime) / 1000
      lastTime = now
      setSunAngle((prev) => {
        const next = prev + orbitSpeed * dt
        return next > 165 ? 15 : next
      })
      animId = requestAnimationFrame(step)
    }

    animId = requestAnimationFrame(step)
    return () => cancelAnimationFrame(animId)
  }, [isOrbiting])

  // Detail Modal / Sheet
  const [detailItem, setDetailItem] = useState<AnimalEntry | PlantFoodEntry | null>(null)
  const [modalShowPhoto, setModalShowPhoto] = useState<boolean>(false)

  // Qur'an Audio State
  const [isPlayingAyah, setIsPlayingAyah] = useState<boolean>(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const ANIMAL_CATEGORIES: { id: AnimalCategory | 'all'; label: Record<string, string> }[] = [
    { id: 'all', label: { en: 'All Animals', fr: 'Tous les animaux', ar: 'جميع الكائنات' } },
    { id: 'birds', label: { en: 'Birds & Winged', fr: 'Oiseaux & Ailés', ar: 'الطيور والجوارح' } },
    { id: 'mammals', label: { en: 'Mammals & Beasts', fr: 'Mammifères & Bêtes', ar: 'الثدييات والأنعام' } },
    { id: 'insects', label: { en: 'Insects & Micro', fr: 'Insectes & Minuscules', ar: 'الحشرات والخلائق الدقيقة' } },
    { id: 'marine', label: { en: 'Marine & Sea', fr: 'Monde Marin & Océans', ar: 'الكائنات البحرية' } },
  ]

  const PLANT_CATEGORIES: { id: PlantCategory | 'all'; label: Record<string, string> }[] = [
    { id: 'all', label: { en: 'All Plants & Foods', fr: 'Toutes les plantes', ar: 'جميع النباتات والأطعمة' } },
    { id: 'fruits', label: { en: 'Blessed Fruits', fr: 'Fruits Bénis', ar: 'الفواكه والأشجار المباركة' } },
    { id: 'herbs_medicinal', label: { en: 'Medicinal Herbs', fr: 'Herbes & Remèdes', ar: 'الأعشاب والطب النبوي' } },
    { id: 'grains_vegetables', label: { en: 'Vegetables & Grains', fr: 'Légumes & Céréales', ar: 'الحبوب والخضروات' } },
    { id: 'drinks_sustenance', label: { en: 'Sustenance & Drinks', fr: 'Boissons & Aliments', ar: 'الأشربة والأغذية الكريمة' } },
    { id: 'heavenly', label: { en: 'Heavenly Flora', fr: 'Flore du Paradis', ar: 'نباتات ورياحين الجنة' } },
  ]

  const filteredAnimals = useMemo(() => {
    return QURAN_SUNNAH_ANIMALS.filter((a) => {
      if (animalCategory !== 'all' && a.category !== animalCategory) return false
      if (sourceFilter !== 'all' && a.source !== sourceFilter) return false
      if (!query.trim()) return true
      const q = query.toLowerCase()
      return (
        a.name.en.toLowerCase().includes(q) ||
        a.name.fr.toLowerCase().includes(q) ||
        a.name.ar.includes(q) ||
        a.scientificName.toLowerCase().includes(q) ||
        a.summary.en.toLowerCase().includes(q) ||
        a.whatTheyDid.en.toLowerCase().includes(q)
      )
    })
  }, [animalCategory, sourceFilter, query])

  const filteredPlants = useMemo(() => {
    return QURAN_SUNNAH_PLANTS.filter((p) => {
      if (plantCategory !== 'all' && p.category !== plantCategory) return false
      if (sourceFilter !== 'all' && p.source !== sourceFilter) return false
      if (!query.trim()) return true
      const q = query.toLowerCase()
      return (
        p.name.en.toLowerCase().includes(q) ||
        p.name.fr.toLowerCase().includes(q) ||
        p.name.ar.includes(q) ||
        p.scientificName.toLowerCase().includes(q) ||
        p.summary.en.toLowerCase().includes(q) ||
        p.scriptureContext.en.toLowerCase().includes(q)
      )
    })
  }, [plantCategory, sourceFilter, query])

  const activeAnimal = QURAN_SUNNAH_ANIMALS.find((a) => a.id === selectedAnimalId) ?? QURAN_SUNNAH_ANIMALS[0]!
  const activePlant = QURAN_SUNNAH_PLANTS.find((p) => p.id === selectedPlantId) ?? QURAN_SUNNAH_PLANTS[0]!
  const currentActive = activeTab === 'animals' ? activeAnimal : activePlant

  // --- Real Astronomical Physics Coordinates ---
  // Sun travels from Left (Dawn/East, 15°) to Zenith (Noon, 90°) to Right (Sunset/West, 165°)
  const sunXPercent = (sunAngle / 180) * 100
  // Arc altitude: High at noon (16% top), low at dawn/dusk (66% top)
  const sunYPercent = 70 - Math.sin((sunAngle * Math.PI) / 180) * 54

  // Luminous Celestial Moon opposite the Sun in the sky
  const moonXPercent = 100 - (sunAngle / 180) * 100
  const moonYPercent = 74 - Math.sin(((180 - sunAngle) * Math.PI) / 180) * 48
  const moonOpacity = sunAngle <= 55 ? 0.9 : sunAngle >= 125 ? 0.9 : 0.28

  // Ground shadow casts in the OPPOSITE direction of the sun
  // If sun is on left (sunAngle < 90), shadow points to the right!
  const shadowSkew = (90 - sunAngle) * 0.95
  const shadowTranslateX = (90 - sunAngle) * 0.65
  const shadowStretch = 1 + Math.abs(sunAngle - 90) / 48
  const shadowBlur = 4 + Math.abs(sunAngle - 90) / 18
  const shadowOpacity = (shadowIntensity / 100) * (0.85 - Math.abs(sunAngle - 90) / 380)

  // Solar Time Period Label
  const timePeriodLabel = useMemo(() => {
    if (sunAngle <= 38) {
      return { en: 'Dawn / Sunrise', fr: 'Aube / Lever', ar: 'الفجر / الشروق' }
    } else if (sunAngle <= 75) {
      return { en: 'Morning Sun (Duha)', fr: 'Matinée (Douha)', ar: 'الضحى والصباح' }
    } else if (sunAngle <= 105) {
      return { en: 'Solar Noon (Zahirah)', fr: 'Zénith / Midi', ar: 'الظهيرة والزوال' }
    } else if (sunAngle <= 142) {
      return { en: 'Afternoon (Asr)', fr: 'Après-midi (Asr)', ar: 'العصر والظلال' }
    } else {
      return { en: 'Sunset (Maghrib)', fr: 'Crépuscule / Coucher', ar: 'الغروب والشفق' }
    }
  }, [sunAngle])

  // Stop Ayah audio when switching item
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current = null
      setIsPlayingAyah(false)
    }
  }, [selectedAnimalId, selectedPlantId, activeTab])

  // Handle Play Qur'an Ayah
  const togglePlayAyah = async (refStr?: string) => {
    if (isPlayingAyah && audioRef.current) {
      audioRef.current.pause()
      setIsPlayingAyah(false)
      return
    }
    const targetRef = refStr ?? currentActive.quranRefs[0]
    if (!targetRef) return
    try {
      const passage = await loadPassage(targetRef, lang)
      if (passage.ayahs.length > 0) {
        const firstAyah = passage.ayahs[0]!
        const url = audioUrl(firstAyah.number)
        const a = new Audio(url)
        audioRef.current = a
        a.onended = () => setIsPlayingAyah(false)
        a.onerror = () => setIsPlayingAyah(false)
        await a.play()
        setIsPlayingAyah(true)
      }
    } catch {
      setIsPlayingAyah(false)
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-4 pt-4 pb-16 sm:px-6">
      {/* Top Banner / Hero Title */}
      <div className="text-center max-w-4xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1 text-xs font-semibold text-gold mb-3">
          <Leaf className="size-3.5" />
          <span>
            {lang === 'ar'
              ? 'الكائنات الحية والغطاء النباتي في القرآن والسنة'
              : lang === 'fr'
              ? 'Faune, Flore & Aliments sacrés du Coran et de la Sunnah'
              : 'Fauna, Flora & Sacred Foods of the Qur’an and Sunnah'}
          </span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-ink">
          <span className="ar-name gold-text block mb-1">
            {lang === 'ar' ? 'حيوانات ونباتات القرآن الكريم والطب النبوي' : 'Creatures, Flora & Prophetic Medicine'}
          </span>
          <span className="text-base sm:text-xl font-light text-ink-2">
            {lang === 'ar'
              ? 'سجل وثائقي شامل لجميع الكائنات المذكورة، قصصها، حركتها، وظلالها، والفوائد الطبية والغذائية'
              : lang === 'fr'
              ? 'Encyclopédie visuelle : rôles historiques, mouvements, ombres portées et vertus médicales'
              : 'Complete documentary compendium: scripture narratives, motions, shadow projections, and medicinal benefits'}
          </span>
        </h1>
      </div>

      {/* Primary Tab Switcher: Animals vs Plants */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex items-center rounded-2xl border border-white/10 bg-white/5 p-1.5 shadow-xl backdrop-blur-xl">
          <button
            type="button"
            onClick={() => setActiveTab('animals')}
            className={`flex items-center gap-2.5 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'animals'
                ? 'bg-gold text-night shadow-[0_0_15px_rgba(233,198,123,0.4)]'
                : 'text-ink-2 hover:text-ink'
            }`}
          >
            <Compass className="size-4" />
            <span>{lang === 'ar' ? 'حيوانات القرآن والسنة' : lang === 'fr' ? 'Animaux du Coran & Sunnah' : 'Animals of Qur’an & Sunnah'}</span>
            <span className={`text-[0.65rem] px-1.5 py-0.5 rounded-full ${activeTab === 'animals' ? 'bg-night/20 text-night font-bold' : 'bg-white/10 text-gold'}`}>
              {QURAN_SUNNAH_ANIMALS.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('plants')}
            className={`flex items-center gap-2.5 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'plants'
                ? 'bg-gold text-night shadow-[0_0_15px_rgba(233,198,123,0.4)]'
                : 'text-ink-2 hover:text-ink'
            }`}
          >
            <Leaf className="size-4" />
            <span>{lang === 'ar' ? 'نباتات وأطعمة القرآن والطب النبوي' : lang === 'fr' ? 'Plantes & Aliments Prophétiques' : 'Plants & Foods of Qur’an & Sunnah'}</span>
            <span className={`text-[0.65rem] px-1.5 py-0.5 rounded-full ${activeTab === 'plants' ? 'bg-night/20 text-night font-bold' : 'bg-white/10 text-gold'}`}>
              {QURAN_SUNNAH_PLANTS.length}
            </span>
          </button>
        </div>
      </div>

      {/* Interactive Astronomical Sun & Shadow Theater Stage */}
      <div className="glass rounded-3xl p-6 sm:p-8 mb-10 border border-gold/30 shadow-2xl relative overflow-hidden">
        {/* Stage Header Info & Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gold">
              <Sun className="size-4" />
              <span>
                {lang === 'ar'
                  ? 'مسرح الظلال والشمس الفلكي التفاعلي'
                  : lang === 'fr'
                  ? 'Théâtre astronomique du soleil et des ombres'
                  : 'Interactive Celestial Sun & Shadow Stage'}
              </span>
            </div>
            {/* Title with Arabic deduplication */}
            <h2 className="text-xl sm:text-2xl font-bold text-ink mt-1 flex items-center gap-3">
              <span>{pick(currentActive.name)}</span>
              {lang !== 'ar' && (
                <span className="ar-name text-gold text-lg font-normal">
                  {currentActive.name.ar}
                </span>
              )}
            </h2>
          </div>

          {/* Interactive Controls Bar */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {/* Audio Voice: Pronounce Arabic Name */}
            <button
              type="button"
              onClick={() => speakArabic(currentActive.name.ar)}
              title={lang === 'ar' ? 'نطق الاسم بالعربية' : 'Pronounce Arabic Name'}
              className="flex items-center gap-1.5 rounded-full border border-gold/30 bg-gold/10 px-3 py-1.5 text-xs font-medium text-gold hover:bg-gold/20 transition-colors cursor-pointer"
            >
              <Volume2 className="size-3.5" />
              <span>{lang === 'ar' ? 'نطق الاسم' : 'Pronounce'}</span>
            </button>

            {/* Audio Soundscape Call / Atmosphere */}
            <button
              type="button"
              onClick={() => soundEngine.playFor(currentActive.id)}
              title={lang === 'ar' ? 'صوت الكائن أو الطبيعة' : 'Natural Sound / Call'}
              className="flex items-center gap-1.5 rounded-full border border-sky-400/30 bg-sky-400/10 px-3 py-1.5 text-xs font-medium text-sky-300 hover:bg-sky-400/20 transition-colors cursor-pointer"
            >
              <Zap className="size-3.5" />
              <span>{lang === 'ar' ? 'صوت الطبيعة' : 'Sound Call'}</span>
            </button>

            {/* Recite Qur'an Ayah Audio Button */}
            {currentActive.quranRefs.length > 0 && (
              <button
                type="button"
                onClick={() => togglePlayAyah()}
                title={lang === 'ar' ? 'استمع لتلاوة الآية الكريمة بصوت العفاسي' : 'Listen to Qur’an Ayah recitation'}
                className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
                  isPlayingAyah
                    ? 'border-emerald-400/50 bg-emerald-500/20 text-emerald-300 shadow-[0_0_12px_rgba(52,211,153,0.5)]'
                    : 'border-white/15 bg-white/5 text-ink-2 hover:border-gold/40 hover:text-ink'
                }`}
              >
                {isPlayingAyah ? <Pause className="size-3.5" /> : <Play className="size-3.5" />}
                <span>
                  {isPlayingAyah
                    ? (lang === 'ar' ? 'إيقاف التلاوة' : 'Pause Recitation')
                    : (lang === 'ar' ? 'تلاوة الآية' : 'Recite Ayah')}
                </span>
              </button>
            )}

            {/* Motion Toggle */}
            <button
              type="button"
              onClick={() => setIsMotionActive((m) => !m)}
              className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
                isMotionActive ? 'border-gold/40 bg-gold/15 text-gold' : 'border-white/15 bg-white/5 text-ink-3'
              }`}
            >
              {isMotionActive ? <Pause className="size-3.5" /> : <Play className="size-3.5" />}
              <span>{isMotionActive ? (lang === 'ar' ? 'حركة الكائن' : 'Motion') : (lang === 'ar' ? 'سكون' : 'Paused')}</span>
            </button>

            {/* Real Photo / Silhouette Switch */}
            <button
              type="button"
              onClick={() => setShowRealPhoto((v) => !v)}
              className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
                showRealPhoto
                  ? 'border-gold/50 bg-gold/20 text-gold-2 shadow-[0_0_15px_rgba(233,198,123,0.3)]'
                  : 'border-white/15 bg-white/5 text-ink-3 hover:text-ink hover:border-white/30'
              }`}
              title={lang === 'ar' ? 'عرض الصورة الحقيقية للكائن' : 'Toggle Real Photograph'}
            >
              <Sparkles className="size-3.5 text-gold" />
              <span>{showRealPhoto ? (lang === 'ar' ? 'صورة حقيقية' : 'Real Photo') : (lang === 'ar' ? 'رسم ظلي' : 'Silhouette')}</span>
            </button>

            {/* Sun Angle Slider & Time Period Badge (Physically consistent LTR) */}
            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs" dir="ltr">
              <Sun className="size-3.5 text-gold animate-spin-slow shrink-0" />
              <input
                type="range"
                min="15"
                max="165"
                value={sunAngle}
                onChange={(e) => setSunAngle(Number(e.target.value))}
                className="w-24 sm:w-28 accent-gold cursor-pointer"
                dir="ltr"
                aria-label="Sun Angle"
              />
              <span className="font-mono text-gold-2 w-9 text-center shrink-0">{sunAngle}°</span>
              <span className="text-[0.68rem] text-ink-3 border-s border-white/10 ps-2 hidden sm:inline whitespace-nowrap">
                {pick(timePeriodLabel)}
              </span>
            </div>

            {/* Shadow Depth Slider with Value Display */}
            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs" dir="ltr">
              <Moon className="size-3.5 text-gold shrink-0" />
              <span className="text-[0.68rem] text-ink-3 hidden xs:inline">{lang === 'ar' ? 'الظل' : 'Shadow'}</span>
              <input
                type="range"
                min="20"
                max="100"
                value={shadowIntensity}
                onChange={(e) => setShadowIntensity(Number(e.target.value))}
                className="w-16 sm:w-20 accent-gold cursor-pointer"
                dir="ltr"
                aria-label="Shadow Depth"
              />
              <span className="font-mono text-gold-2 w-8 text-center shrink-0">{shadowIntensity}%</span>
            </div>
          </div>
        </div>

        {/* Upupa epops / Hoopoe Clarity Note for User */}
        {currentActive.id === 'hudhud' && (
          <div className="mb-3 rounded-xl border border-amber-400/40 bg-gradient-to-r from-amber-500/15 via-amber-400/10 to-transparent p-3 text-xs leading-relaxed text-amber-200 flex items-start gap-3 shadow-sm">
            <span className="text-xl shrink-0">🪶</span>
            <div>
              <div className="font-bold text-amber-300 text-sm mb-0.5">
                {lang === 'ar'
                  ? 'طائر الهُدْهُد (Upupa epops) · طائر نبي الله سليمان عليه السلام'
                  : lang === 'fr'
                  ? 'La Huppe fasciée (Upupa epops) · L’oiseau du Prophète Salomon'
                  : 'The Hoopoe (Upupa epops) · Prophet Solomon’s Bird'}
              </div>
              <p className="text-ink-2 text-xs">
                {lang === 'ar'
                  ? '«Upupa epops» هو الاسم العلمي اللاتيني المصنّف عالمياً لطائر الهُدْهُد، وهو الطائر الحكيم والمستكشف الصادق الذي تفقّده نبي الله سليمان وحمل رسالة التوحيد إلى ملكة سبأ بلقيس (سورة النمل، الآيات 20-28).'
                  : lang === 'fr'
                  ? '« Upupa epops » est le nom scientifique international de la Huppe fasciée (الهدهد), l’oiseau messager du Prophète Salomon qui porta la lettre de foi à la Reine de Saba (Sourate An-Naml 27:20-28).'
                  : '« Upupa epops » is the recognized scientific binomial name for the Hoopoe (الهدهد), the wise scout bird of Prophet Sulayman (Solomon) who carried the message of monotheism to the Queen of Sheba (Surah An-Naml 27:20-28).'}
              </p>
            </div>
          </div>
        )}

        {/* Solar Prayer Time Presets & Live Orbit Physics */}
        <div className="flex flex-wrap items-center gap-1.5 mb-2 px-1">
          <span className="text-[0.7rem] text-ink-3 font-medium me-1">
            {lang === 'ar' ? 'مواقيت الشمس:' : 'Sun Orbit:'}
          </span>
          {[
            { angle: 20, en: 'Fajr / Dawn', ar: 'الفجر والصبح', icon: '🌅' },
            { angle: 55, en: 'Duha / Forenoon', ar: 'الضحى', icon: '☀️' },
            { angle: 90, en: 'Zhuhr / Midday', ar: 'الظهيرة', icon: '🌞' },
            { angle: 125, en: 'Asr / Afternoon', ar: 'العصر', icon: '🌤️' },
            { angle: 165, en: 'Maghrib / Sunset', ar: 'الغروب والشفق', icon: '🌇' },
          ].map((p) => (
            <button
              key={p.angle}
              type="button"
              onClick={() => {
                setIsOrbiting(false)
                setSunAngle(p.angle)
              }}
              className={`rounded-full px-2.5 py-1 text-[0.7rem] transition-colors cursor-pointer flex items-center gap-1 ${
                Math.abs(sunAngle - p.angle) <= 18
                  ? 'border border-gold/50 bg-gold/20 text-gold-2 font-semibold shadow-[0_0_10px_rgba(233,198,123,0.2)]'
                  : 'border border-white/10 bg-white/5 text-ink-3 hover:text-ink hover:border-white/20'
              }`}
            >
              <span>{p.icon}</span>
              <span>{lang === 'ar' ? p.ar : p.en}</span>
            </button>
          ))}

          {/* Live Orbit Physics Loop Toggle */}
          <button
            type="button"
            onClick={() => setIsOrbiting((o) => !o)}
            className={`rounded-full px-3 py-1 text-[0.7rem] transition-colors cursor-pointer flex items-center gap-1.5 ms-auto ${
              isOrbiting
                ? 'border border-amber-400/80 bg-amber-500/25 text-amber-300 font-bold shadow-[0_0_12px_rgba(245,158,11,0.5)] animate-pulse'
                : 'border border-white/15 bg-white/5 text-ink-2 hover:text-ink hover:border-white/30'
            }`}
            title={lang === 'ar' ? 'محاكاة الحركة الفلكية الحية للشمس والأجرام' : 'Live celestial orbit physics loop'}
          >
            <span>{isOrbiting ? '⏸️' : '▶️'}</span>
            <span>{lang === 'ar' ? 'دوران الفلك الحي' : 'Live Orbit Physics'}</span>
          </button>
        </div>

        {/* Visual Stage Canvas with Realistic Celestial Sun & Horizon */}
        <div
          className={`relative h-72 sm:h-84 w-full rounded-2xl border border-white/10 overflow-hidden flex flex-col justify-end items-center px-4 pb-4 select-none transition-colors duration-500 touch-none group/stage ${
            isDraggingSky ? 'cursor-grabbing' : 'cursor-grab'
          }`}
          onPointerDown={(e) => {
            setIsDraggingSky(true)
            setIsOrbiting(false)
            e.currentTarget.setPointerCapture(e.pointerId)
            const rect = e.currentTarget.getBoundingClientRect()
            const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
            setSunAngle(Math.round(15 + ratio * 150))
          }}
          onPointerMove={(e) => {
            if (!isDraggingSky) return
            const rect = e.currentTarget.getBoundingClientRect()
            const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
            setSunAngle(Math.round(15 + ratio * 150))
          }}
          onPointerUp={(e) => {
            if (isDraggingSky) {
              setIsDraggingSky(false)
              try {
                e.currentTarget.releasePointerCapture(e.pointerId)
              } catch {
                // ignore
              }
            }
          }}
          onPointerCancel={(e) => {
            if (isDraggingSky) {
              setIsDraggingSky(false)
              try {
                e.currentTarget.releasePointerCapture(e.pointerId)
              } catch {
                // ignore
              }
            }
          }}
          style={{
            background:
              sunAngle <= 45
                ? 'linear-gradient(180deg, #1e1b4b 0%, #311042 35%, #7c2d12 70%, #ca8a04 100%)'
                : sunAngle >= 135
                ? 'linear-gradient(180deg, #09090b 0%, #2e1065 40%, #831843 75%, #c2410c 100%)'
                : 'linear-gradient(180deg, #080b1c 0%, #0f172a 40%, #1e293b 80%, #292524 100%)',
          }}
        >
          {/* Dynamic Celestial Radiant Sunlight Rays */}
          <div
            className="absolute inset-0 pointer-events-none transition-all duration-200"
            style={{
              background: `radial-gradient(circle at ${sunXPercent}% ${sunYPercent}%, rgba(254, 240, 138, 0.28) 0%, rgba(234, 179, 8, 0.12) 35%, transparent 70%)`,
            }}
          />

          {/* Drifting Celestial Clouds Layer (Multi-tiered Volumetric Clouds) */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
            {/* High Altitude Cirrus Cloud */}
            <div
              className="absolute top-4 w-96 h-12 rounded-full animate-cloud-slow opacity-75"
              style={{
                filter: 'blur(10px)',
                background:
                  sunAngle <= 45
                    ? 'radial-gradient(ellipse, rgba(251,191,36,0.45) 0%, rgba(244,114,182,0.2) 60%, transparent 100%)'
                    : sunAngle >= 135
                    ? 'radial-gradient(ellipse, rgba(249,115,22,0.45) 0%, rgba(168,85,247,0.2) 60%, transparent 100%)'
                    : 'radial-gradient(ellipse, rgba(255,255,255,0.4) 0%, rgba(203,213,225,0.15) 60%, transparent 100%)',
              }}
            />
            {/* Mid Altitude Cumulus Cloud */}
            <div
              className="absolute top-12 w-80 h-16 rounded-full animate-cloud-mid opacity-60"
              style={{
                filter: 'blur(14px)',
                background:
                  sunAngle <= 45
                    ? 'radial-gradient(ellipse, rgba(245,158,11,0.35) 0%, rgba(147,51,234,0.15) 60%, transparent 100%)'
                    : sunAngle >= 135
                    ? 'radial-gradient(ellipse, rgba(234,88,12,0.35) 0%, rgba(126,34,206,0.15) 60%, transparent 100%)'
                    : 'radial-gradient(ellipse, rgba(255,255,255,0.3) 0%, rgba(148,163,184,0.1) 60%, transparent 100%)',
              }}
            />
            {/* Low Ambient Fluffy Cloud Puff */}
            <div
              className="absolute top-20 w-64 h-14 rounded-full animate-cloud-fast opacity-50"
              style={{
                filter: 'blur(12px)',
                background:
                  sunAngle <= 45
                    ? 'radial-gradient(ellipse, rgba(253,224,71,0.3) 0%, rgba(244,63,94,0.12) 60%, transparent 100%)'
                    : sunAngle >= 135
                    ? 'radial-gradient(ellipse, rgba(251,146,60,0.3) 0%, rgba(192,132,252,0.12) 60%, transparent 100%)'
                    : 'radial-gradient(ellipse, rgba(255,255,255,0.25) 0%, rgba(226,232,240,0.08) 60%, transparent 100%)',
              }}
            />
          </div>

          {/* Luminous Celestial Moon */}
          <div
            className="absolute z-15 pointer-events-none flex items-center justify-center transition-all duration-500 -translate-x-1/2 -translate-y-1/2"
            style={{
              left: `${moonXPercent}%`,
              top: `${moonYPercent}%`,
              opacity: moonOpacity,
            }}
          >
            {/* Lunar Glow */}
            <div className="absolute size-24 rounded-full bg-sky-200/20 blur-xl animate-pulse" />
            <div className="size-8 rounded-full bg-gradient-to-br from-slate-100 via-sky-100 to-slate-300 shadow-[0_0_20px_rgba(224,242,254,0.7)] border border-white/60 relative overflow-hidden">
              <div className="absolute top-1.5 start-1.5 size-2 rounded-full bg-slate-400/30" />
              <div className="absolute bottom-2 end-2 size-2.5 rounded-full bg-slate-400/25" />
            </div>
          </div>

          {/* Actual Luminous Celestial Sun Body in the Sky */}
          <div
            className="absolute z-20 transition-all duration-150 pointer-events-none flex items-center justify-center -translate-x-1/2 -translate-y-1/2"
            style={{
              left: `${sunXPercent}%`,
              top: `${sunYPercent}%`,
            }}
          >
            {/* Solar Outer Corona Flare */}
            <div className="absolute size-28 rounded-full bg-amber-400/25 blur-xl animate-pulse" />
            <div className="absolute size-16 rounded-full bg-yellow-300/40 blur-md" />
            {/* Core Sun Disc */}
            <div className="size-10 rounded-full bg-gradient-to-br from-white via-amber-200 to-yellow-500 shadow-[0_0_25px_rgba(251,191,36,0.9),0_0_50px_rgba(245,158,11,0.6)] border border-white/80" />
          </div>

          {/* Organism Display in Stage Show (Hover disabled here per user request; toggles on button click) */}
          <div
            className="relative z-10 w-48 sm:w-60 h-48 sm:h-60 flex items-center justify-center"
            title={lang === 'ar' ? 'مسرح الظل والحركة' : 'Shadow Theater Stage'}
          >
            {/* Silhouette View */}
            <div
              className={`w-full h-full flex items-center justify-center transition-opacity duration-500 ${
                showRealPhoto ? 'opacity-0 pointer-events-none absolute' : 'opacity-100'
              }`}
            >
              <RenderOrganismSilhouette id={currentActive.id} animated={isMotionActive} />
            </div>

            {/* Real Photograph View (Toggled exclusively via Button) */}
            <div
              className={`w-44 sm:w-52 h-44 sm:h-52 rounded-2xl overflow-hidden border-2 border-gold/60 shadow-[0_10px_30px_rgba(0,0,0,0.8),0_0_20px_rgba(233,198,123,0.4)] transition-all duration-500 relative flex items-center justify-center bg-night-2 ${
                showRealPhoto ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none absolute'
              }`}
            >
              <img
                src={`/nature/${currentActive.id}.jpg`}
                alt={currentActive.scientificName}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
              <div className="absolute bottom-2 inset-x-2 text-center">
                <span className="text-[0.7rem] font-bold text-gold drop-shadow-md bg-black/60 px-2 py-0.5 rounded-full border border-gold/30">
                  {lang === 'ar' ? 'صورة فوتوغرافية حقيقية' : 'Authentic Photograph'}
                </span>
              </div>
            </div>
          </div>

          {/* Scientifically Accurate Ground Projected Shadow */}
          <div
            className="relative z-0 h-4 rounded-[100%] transition-transform duration-100"
            style={{
              width: `${135 * shadowStretch}px`,
              backgroundColor: `rgba(0, 0, 0, ${shadowOpacity})`,
              filter: `blur(${shadowBlur}px)`,
              transform: `skewX(${shadowSkew}deg) translateX(${shadowTranslateX}px) translateY(4px)`,
              opacity: isMotionActive ? undefined : 0.85,
            }}
          />

          {/* Realistic Desert Sand Dunes & Sculpted Ground */}
          <div className="w-full relative mt-2 pointer-events-none">
            <svg viewBox="0 0 1200 65" preserveAspectRatio="none" className="w-full h-12 sm:h-14 block">
              <defs>
                <linearGradient id="sandDuneBack" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#78350f" stopOpacity="0.85" />
                  <stop offset="50%" stopColor="#92400e" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#451a03" stopOpacity="0.95" />
                </linearGradient>
                <linearGradient id="sandDuneFront" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#d97706" stopOpacity="0.95" />
                  <stop offset="35%" stopColor="#f59e0b" stopOpacity="0.92" />
                  <stop offset="70%" stopColor="#b45309" stopOpacity="0.95" />
                  <stop offset="100%" stopColor="#78350f" stopOpacity="1" />
                </linearGradient>
              </defs>
              <path
                d="M 0 35 Q 300 15 600 30 T 1200 20 L 1200 65 L 0 65 Z"
                fill="url(#sandDuneBack)"
              />
              <path
                d="M 0 45 Q 220 22 520 38 T 1000 28 Q 1120 34 1200 40 L 1200 65 L 0 65 Z"
                fill="url(#sandDuneFront)"
              />
              <path
                d="M 0 45 Q 220 22 520 38 T 1000 28 Q 1120 34 1200 40"
                fill="none"
                stroke="rgba(254,240,138,0.45)"
                strokeWidth="1.5"
              />
            </svg>
          </div>

          <div className="w-full flex justify-between text-[0.65rem] font-mono text-ink-3 pt-1">
            <span>
              {'physicalTraits' in currentActive
                ? pick(currentActive.physicalTraits.size)
                : pick(currentActive.botanicalTraits.growthForm)}
            </span>
            <span className="text-gold font-bold text-center px-2">
              {pick(currentActive.name)} · {currentActive.scientificName} {currentActive.id === 'hudhud' ? (lang === 'ar' ? '· طائر نبي الله سليمان' : '· Prophet Solomon’s Bird') : ''}
            </span>
            <span>
              {'physicalTraits' in currentActive
                ? pick(currentActive.physicalTraits.habitat)
                : pick(currentActive.botanicalTraits.habitat)}
            </span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex flex-wrap items-center gap-2">
          {/* Category Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
            {activeTab === 'animals'
              ? ANIMAL_CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setAnimalCategory(cat.id)}
                    className={`rounded-full px-3.5 py-1 text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                      animalCategory === cat.id ? 'bg-gold text-night font-bold shadow-md' : 'glass text-ink-2 hover:text-ink'
                    }`}
                  >
                    {cat.label[lang] ?? cat.label.en}
                  </button>
                ))
              : PLANT_CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setPlantCategory(cat.id)}
                    className={`rounded-full px-3.5 py-1 text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                      plantCategory === cat.id ? 'bg-gold text-night font-bold shadow-md' : 'glass text-ink-2 hover:text-ink'
                    }`}
                  >
                    {cat.label[lang] ?? cat.label.en}
                  </button>
                ))}
          </div>

          {/* Source Filter (All / Qur'an / Sunnah) */}
          <div className="flex items-center rounded-full border border-white/10 bg-white/5 p-0.5 text-xs">
            {(['all', 'quran', 'sunnah'] as const).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSourceFilter(s)}
                className={`rounded-full px-2.5 py-1 font-medium transition-colors cursor-pointer ${
                  sourceFilter === s ? 'bg-gold text-night font-bold' : 'text-ink-3 hover:text-ink'
                }`}
              >
                {s === 'all'
                  ? (lang === 'ar' ? 'الكل' : 'All')
                  : s === 'quran'
                  ? (lang === 'ar' ? 'قرآن' : 'Qur’an')
                  : (lang === 'ar' ? 'سنة' : 'Sunnah')}
              </button>
            ))}
          </div>
        </div>

        {/* Live Search Input */}
        <div className="relative min-w-[240px] flex-1 max-w-sm">
          <Search className="absolute start-3 top-1/2 -translate-y-1/2 size-4 text-ink-3" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={
              lang === 'ar'
                ? 'ابحث بالاسم أو السورة أو الفائدة...'
                : lang === 'fr'
                ? 'Rechercher par nom, verset ou bienfait...'
                : 'Search by name, verse, benefit...'
            }
            className="w-full rounded-full border border-white/10 bg-white/5 py-1.5 ps-9 pe-4 text-xs text-ink placeholder:text-ink-3 focus:border-gold/40 focus:outline-none focus:ring-1 focus:ring-gold/30"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="absolute end-2.5 top-1/2 -translate-y-1/2 text-ink-3 hover:text-ink cursor-pointer"
            >
              <X className="size-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Grid of Interactive Organism Cards */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {activeTab === 'animals'
          ? filteredAnimals.map((animal) => {
              const isSelected = selectedAnimalId === animal.id
              return (
                <div
                  key={animal.id}
                  onClick={() => setSelectedAnimalId(animal.id)}
                  className={`glass group relative rounded-2xl p-5 border transition-all duration-300 flex flex-col justify-between cursor-pointer ${
                    isSelected
                      ? 'border-gold shadow-[0_0_20px_rgba(233,198,123,0.3)] bg-gold/[0.04]'
                      : 'border-white/10 hover:border-gold/40 hover:bg-white/[0.06]'
                  }`}
                >
                  <div>
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="font-bold text-ink text-base group-hover:text-gold transition-colors">
                          {pick(animal.name)}
                        </h3>
                        <p className="text-xs font-mono text-ink-3 italic">{animal.scientificName}</p>
                      </div>
                      {lang !== 'ar' && (
                        <span className="ar-name gold-text text-lg font-bold shrink-0">{animal.name.ar}</span>
                      )}
                    </div>

                    {/* Miniature Animated Silhouette Theater + Full Uncropped Real Photo on Hover */}
                    <div className="relative my-4 h-44 sm:h-48 w-full rounded-2xl bg-night-2/80 border border-white/5 flex flex-col items-center justify-center overflow-hidden group/theater">
                      {/* Handcrafted Silhouette View */}
                      <div className="w-24 h-24 relative z-10 transition-all duration-300 group-hover:opacity-0 group-hover:scale-90 flex flex-col items-center justify-center">
                        <RenderOrganismSilhouette id={animal.id} animated={true} />
                        <div className="w-20 h-2 bg-black/60 rounded-[100%] blur-[3px] -mt-1 animate-shadow-breathe" />
                      </div>

                      {/* Real Photo Revealed on Card Hover — Fully Centered & NEVER Cropped */}
                      <div className="absolute inset-0 z-20 opacity-0 group-hover:opacity-100 transition-all duration-500 scale-95 group-hover:scale-100 flex items-center justify-center bg-night-3/95 overflow-hidden">
                        {/* Ambient blurred backdrop to fill all proportions */}
                        <img
                          src={`/nature/${animal.id}.jpg`}
                          alt=""
                          aria-hidden="true"
                          className="absolute inset-0 w-full h-full object-cover blur-md opacity-35 scale-125"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
                        {/* Sharp, uncropped full subject */}
                        <img
                          src={`/nature/${animal.id}.jpg`}
                          alt={animal.scientificName}
                          loading="lazy"
                          className="relative z-10 max-h-full max-w-full object-contain p-2 drop-shadow-2xl"
                        />
                        <span className="absolute bottom-2 start-2 text-[0.68rem] font-medium text-gold bg-black/75 px-2.5 py-0.5 rounded-full border border-gold/30 flex items-center gap-1 backdrop-blur-sm z-20">
                          <Sparkles className="size-2.5 text-gold" />
                          <span>{lang === 'ar' ? 'صورة حقيقية كاملة' : 'Full Photo'}</span>
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-ink-2 leading-relaxed line-clamp-3 mb-4">
                      {pick(animal.summary)}
                    </p>
                  </div>

                  <div className="border-t border-white/10 pt-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex flex-wrap gap-1.5">
                        {animal.quranRefs.map((r) => (
                          <RefChip key={r} r={r} />
                        ))}
                        {animal.hadithRefs.map((h, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center gap-1 rounded bg-teal-500/10 px-1.5 py-0.5 text-[0.68rem] text-teal-300 font-mono"
                          >
                            <BookOpen className="size-2.5" />
                            {h.book} {h.number}
                          </span>
                        ))}
                      </div>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          setDetailItem(animal)
                        }}
                        className="btn-ghost flex items-center gap-1 rounded-full px-2.5 py-1 text-xs text-gold hover:bg-gold/10 cursor-pointer"
                      >
                        <Eye className="size-3.5" />
                        <span>{lang === 'ar' ? 'التفاصيل والفوائد' : 'Details'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              )
            })
          : filteredPlants.map((plant) => {
              const isSelected = selectedPlantId === plant.id
              return (
                <div
                  key={plant.id}
                  onClick={() => setSelectedPlantId(plant.id)}
                  className={`glass group relative rounded-2xl p-5 border transition-all duration-300 flex flex-col justify-between cursor-pointer ${
                    isSelected
                      ? 'border-gold shadow-[0_0_20px_rgba(233,198,123,0.3)] bg-gold/[0.04]'
                      : 'border-white/10 hover:border-gold/40 hover:bg-white/[0.06]'
                  }`}
                >
                  <div>
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="font-bold text-ink text-base group-hover:text-gold transition-colors">
                          {pick(plant.name)}
                        </h3>
                        <p className="text-xs font-mono text-ink-3 italic">{plant.scientificName}</p>
                      </div>
                      {lang !== 'ar' && (
                        <span className="ar-name gold-text text-lg font-bold shrink-0">{plant.name.ar}</span>
                      )}
                    </div>

                    {/* Miniature Animated Silhouette Theater + Full Uncropped Real Photo on Hover */}
                    <div className="relative my-4 h-44 sm:h-48 w-full rounded-2xl bg-night-2/80 border border-white/5 flex flex-col items-center justify-center overflow-hidden group/theater">
                      {/* Handcrafted Silhouette View */}
                      <div className="w-24 h-24 relative z-10 transition-all duration-300 group-hover:opacity-0 group-hover:scale-90 flex flex-col items-center justify-center">
                        <RenderOrganismSilhouette id={plant.id} animated={true} />
                        <div className="w-20 h-2 bg-black/60 rounded-[100%] blur-[3px] -mt-1 animate-shadow-breathe" />
                      </div>

                      {/* Real Photo Revealed on Card Hover — Fully Centered & NEVER Cropped */}
                      <div className="absolute inset-0 z-20 opacity-0 group-hover:opacity-100 transition-all duration-500 scale-95 group-hover:scale-100 flex items-center justify-center bg-night-3/95 overflow-hidden">
                        {/* Ambient blurred backdrop to fill all proportions */}
                        <img
                          src={`/nature/${plant.id}.jpg`}
                          alt=""
                          aria-hidden="true"
                          className="absolute inset-0 w-full h-full object-cover blur-md opacity-35 scale-125"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
                        {/* Sharp, uncropped full subject */}
                        <img
                          src={`/nature/${plant.id}.jpg`}
                          alt={plant.scientificName}
                          loading="lazy"
                          className="relative z-10 max-h-full max-w-full object-contain p-2 drop-shadow-2xl"
                        />
                        <span className="absolute bottom-2 start-2 text-[0.68rem] font-medium text-gold bg-black/75 px-2.5 py-0.5 rounded-full border border-gold/30 flex items-center gap-1 backdrop-blur-sm z-20">
                          <Sparkles className="size-2.5 text-gold" />
                          <span>{lang === 'ar' ? 'صورة حقيقية كاملة' : 'Full Photo'}</span>
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-ink-2 leading-relaxed line-clamp-3 mb-4">
                      {pick(plant.summary)}
                    </p>
                  </div>

                  <div className="border-t border-white/10 pt-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex flex-wrap gap-1.5">
                        {plant.quranRefs.slice(0, 2).map((r) => (
                          <RefChip key={r} r={r} />
                        ))}
                        {plant.hadithRefs.slice(0, 1).map((h, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center gap-1 rounded bg-teal-500/10 px-1.5 py-0.5 text-[0.68rem] text-teal-300 font-mono"
                          >
                            <BookOpen className="size-2.5" />
                            {h.book} {h.number}
                          </span>
                        ))}
                      </div>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          setDetailItem(plant)
                        }}
                        className="btn-ghost flex items-center gap-1 rounded-full px-2.5 py-1 text-xs text-gold hover:bg-gold/10 cursor-pointer"
                      >
                        <Eye className="size-3.5" />
                        <span>{lang === 'ar' ? 'الفوائد والطب النبوي' : 'Benefits'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
      </div>

      {/* Comprehensive Detail Modal / Drawer */}
      {detailItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-night/80 backdrop-blur-md animate-fade-in">
          <div className="glass-strong relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-gold/40 p-6 sm:p-8 shadow-2xl">
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setDetailItem(null)}
              className="absolute end-4 top-4 rounded-full border border-white/10 bg-white/5 p-2 text-ink-2 hover:bg-white/10 hover:text-ink cursor-pointer"
              aria-label="Close"
            >
              <X className="size-5" />
            </button>

            {/* Header info */}
            <div className="flex items-center gap-3 mb-2">
              <span className="rounded-full bg-gold/15 px-3 py-1 text-xs font-semibold text-gold">
                {'whatTheyDid' in detailItem
                  ? (lang === 'ar' ? 'كائن في القرآن والسنة' : 'Animal in Qur’an & Sunnah')
                  : (lang === 'ar' ? 'نبات وغذاء في القرآن والطب النبوي' : 'Plant & Food in Qur’an & Sunnah')}
              </span>
              <span className="text-xs font-mono text-ink-3 italic">{detailItem.scientificName}</span>
            </div>

            <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-ink">{pick(detailItem.name)}</h2>
                {lang !== 'ar' && (
                  <p className="ar-name gold-text text-xl font-bold mt-1">{detailItem.name.ar}</p>
                )}
              </div>

              {/* Calligraphy if animal */}
              {'arabicCalligraphy' in detailItem && detailItem.arabicCalligraphy && (
                <div className="hidden sm:block text-end max-w-xs">
                  <p className="ar-name text-xs text-gold/80 font-['Amiri_Quran',_serif] leading-relaxed">
                    «{detailItem.arabicCalligraphy}»
                  </p>
                </div>
              )}
            </div>

            {/* Visual Stage inside Modal with Voice Buttons & Photo Switch */}
            <div className="my-6 rounded-2xl bg-gradient-to-b from-night-2 to-night-3 border border-white/10 p-6 flex flex-col items-center justify-center relative overflow-hidden">
              {/* Floating Left: View Switch */}
              <div className="absolute top-3 start-3">
                <button
                  type="button"
                  onClick={() => setModalShowPhoto((p) => !p)}
                  className={`flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-colors cursor-pointer ${
                    modalShowPhoto
                      ? 'border-gold/50 bg-gold/20 text-gold-2 shadow-[0_0_12px_rgba(233,198,123,0.3)]'
                      : 'border-white/15 bg-white/5 text-ink-3 hover:text-ink'
                  }`}
                >
                  <Sparkles className="size-3 text-gold" />
                  <span>{modalShowPhoto ? (lang === 'ar' ? 'صورة حقيقية' : 'Real Photo') : (lang === 'ar' ? 'رسم ظلي' : 'Silhouette')}</span>
                </button>
              </div>

              {/* Floating Voice Buttons */}
              <div className="absolute top-3 end-3 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => speakArabic(detailItem.name.ar)}
                  className="rounded-full bg-white/10 p-2 text-gold hover:bg-gold/20 transition-colors cursor-pointer"
                  title={lang === 'ar' ? 'نطق الاسم' : 'Pronounce Arabic'}
                >
                  <Volume2 className="size-4" />
                </button>
                <button
                  type="button"
                  onClick={() => soundEngine.playFor(detailItem.id)}
                  className="rounded-full bg-white/10 p-2 text-sky-300 hover:bg-sky-400/20 transition-colors cursor-pointer"
                  title={lang === 'ar' ? 'صوت الطبيعة' : 'Play Sound'}
                >
                  <Zap className="size-4" />
                </button>
              </div>

              {modalShowPhoto ? (
                <div className="w-52 h-52 sm:w-60 sm:h-60 rounded-2xl overflow-hidden border-2 border-gold/40 shadow-[0_10px_25px_rgba(0,0,0,0.6)] relative my-2">
                  <img
                    src={`/nature/${detailItem.id}.jpg`}
                    alt={detailItem.scientificName}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <span className="absolute bottom-2 inset-x-2 text-center text-[0.68rem] text-gold font-mono">
                    {detailItem.scientificName}
                  </span>
                </div>
              ) : (
                <>
                  <div className="w-36 h-36">
                    <RenderOrganismSilhouette id={detailItem.id} animated={true} />
                  </div>
                  <div className="w-28 h-3 bg-black/60 rounded-[100%] blur-[4px] -mt-1 animate-shadow-breathe" />
                </>
              )}
            </div>

            {/* Scripture Context: What They Did */}
            <div className="mb-6 rounded-2xl bg-white/[0.02] border border-white/5 p-4">
              <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-gold mb-2">
                <BookOpen className="size-4" />
                <span>
                  {'whatTheyDid' in detailItem
                    ? (lang === 'ar' ? 'ماذا فعلت في القرآن والسنة (القصة والدور النبيل)' : 'What They Did & Scripture Narrative')
                    : (lang === 'ar' ? 'السياق القرآني والنبوي لذكر هذا النبات والغذاء' : 'Scripture Context & Prophetic Guidance')}
                </span>
              </h3>
              <p className="text-xs sm:text-sm text-ink-2 leading-relaxed whitespace-pre-line">
                {'whatTheyDid' in detailItem ? pick(detailItem.whatTheyDid) : pick(detailItem.scriptureContext)}
              </p>
            </div>

            {/* 4 Pillars Benefits Breakdown */}
            <div className="grid gap-4 sm:grid-cols-2 mb-6">
              {/* Pillar 1: Nutritional / Physical */}
              <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-4">
                <h4 className="flex items-center gap-2 text-xs font-bold uppercase text-emerald-400 mb-2">
                  <Leaf className="size-4" />
                  <span>
                    {'benefits' in detailItem
                      ? (lang === 'ar' ? 'القيمة الغذائية والتركيب الحيوي' : 'Nutritional & Bioactive Profile')
                      : (lang === 'ar' ? 'السمات الحيوية والبيئية' : 'Biological & Ecological Traits')}
                  </span>
                </h4>
                <p className="text-xs text-ink-3 leading-relaxed">
                  {'benefits' in detailItem
                    ? pick(detailItem.benefits.nutritional)
                    : pick(detailItem.benefitsAndWisdom.scientificEcological)}
                </p>
              </div>

              {/* Pillar 2: Medicinal & Prophetic Healing */}
              <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-4">
                <h4 className="flex items-center gap-2 text-xs font-bold uppercase text-teal-400 mb-2">
                  <Heart className="size-4" />
                  <span>
                    {'benefits' in detailItem
                      ? (lang === 'ar' ? 'الطب النبوي والعلاج الإكلينيكي' : 'Prophetic Medicine & Healing')
                      : (lang === 'ar' ? 'هدي السنة والرحمة بالحيوان' : 'Sunnah Guidance & Animal Ethics')}
                  </span>
                </h4>
                <p className="text-xs text-ink-3 leading-relaxed">
                  {'benefits' in detailItem
                    ? pick(detailItem.benefits.medicinalProphetic)
                    : pick(detailItem.benefitsAndWisdom.sunnahGuidance)}
                </p>
              </div>

              {/* Pillar 3: Spiritual Wisdom & Moral Lessons */}
              <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-4">
                <h4 className="flex items-center gap-2 text-xs font-bold uppercase text-gold mb-2">
                  <Sparkles className="size-4" />
                  <span>{lang === 'ar' ? 'الحكمة الإيمانية والعبرة' : 'Spiritual Lessons & Quranic Wisdom'}</span>
                </h4>
                <p className="text-xs text-ink-3 leading-relaxed">
                  {'benefits' in detailItem
                    ? pick(detailItem.benefits.spiritualWisdom)
                    : pick(detailItem.benefitsAndWisdom.spiritual)}
                </p>
              </div>

              {/* Pillar 4: Modern Science & Benefits to Humanity */}
              <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-4">
                <h4 className="flex items-center gap-2 text-xs font-bold uppercase text-sky-400 mb-2">
                  <Zap className="size-4" />
                  <span>{lang === 'ar' ? 'أبحاث العلم الحديث والتطبيقات' : 'Modern Science & Practical Benefits'}</span>
                </h4>
                <p className="text-xs text-ink-3 leading-relaxed">
                  {'benefits' in detailItem
                    ? pick(detailItem.benefits.modernScience)
                    : pick(detailItem.benefitsAndWisdom.practicalBenefits)}
                </p>
              </div>
            </div>

            {/* Scripture References */}
            <div className="border-t border-white/10 pt-4">
              <h4 className="text-xs font-semibold text-ink-3 uppercase mb-2">
                {lang === 'ar' ? 'المراجع القرآنية والأحاديث الصحيحة:' : 'Scriptural References:'}
              </h4>
              <div className="flex flex-wrap gap-2">
                {detailItem.quranRefs.map((r) => (
                  <RefChip key={r} r={r} />
                ))}
                {detailItem.hadithRefs.map((h, i) => (
                  <div key={i} className="rounded-xl border border-teal-500/20 bg-teal-500/5 p-3 w-full">
                    <div className="flex items-center gap-1.5 text-xs text-teal-300 font-semibold mb-1">
                      <BookOpen className="size-3.5" />
                      <span>{h.book} #{h.number}</span>
                    </div>
                    <p className="text-xs text-ink-2 italic leading-relaxed">"{pick(h.text)}"</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
