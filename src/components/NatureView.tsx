import { useState, useMemo } from 'react'
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

// --- SVG Silhouettes ---

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
      {/* Crest feathers */}
      <path
        d="M 125 45 C 135 22 155 18 165 24 C 158 32 145 36 135 48 Z"
        fill="url(#hoopoeGrad)"
        className={animated ? 'origin-[125px_48px] animate-pulse' : ''}
      />
      <path d="M 120 48 C 128 30 142 26 150 32 C 144 38 135 42 128 50 Z" fill="#b45309" />
      <path d="M 116 52 C 122 36 132 32 138 38 C 132 44 125 48 120 54 Z" fill="#fde047" />
      {/* Bill */}
      <path d="M 132 64 C 158 70 185 82 192 88 C 182 86 150 72 130 68 Z" fill="#451a03" />
      {/* Head and Body */}
      <path
        d="M 108 52 C 125 50 135 62 128 75 C 120 90 128 110 115 125 C 95 142 55 145 30 135 C 15 130 5 120 2 110 C 15 112 40 105 55 90 C 70 75 88 54 108 52 Z"
        fill="url(#hoopoeGrad)"
      />
      {/* Eye */}
      <circle cx="120" cy="62" r="3" fill="#000" />
      <circle cx="121" cy="61" r="1" fill="#fff" />
      {/* Wings with black and white stripes */}
      <g className={animated ? 'origin-[90px_85px] animate-creature-fly' : ''}>
        <path d="M 95 78 C 80 95 60 120 35 142 C 45 130 75 95 105 82 Z" fill="#1c1917" />
        <path d="M 85 88 C 72 102 55 125 42 136 C 50 125 72 100 95 90 Z" fill="#f8fafc" />
        <path d="M 75 98 C 65 110 50 128 45 132 C 52 122 68 105 85 96 Z" fill="#1c1917" />
      </g>
      {/* Tail */}
      <path d="M 32 135 L 5 155 L 15 158 L 42 138 Z" fill="#0f172a" />
      {/* Perch and feet */}
      <path d="M 85 135 L 82 148 M 80 148 L 88 148 M 72 136 L 68 148 M 65 148 L 73 148" stroke="#78350f" strokeWidth="2.5" strokeLinecap="round" />
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
      {/* Antennae */}
      <path d="M 165 65 Q 180 50 192 52 M 165 68 Q 182 62 195 70" stroke="#b45309" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* Head */}
      <ellipse cx="152" cy="74" rx="18" ry="14" fill="url(#antGrad)" />
      {/* Eye */}
      <ellipse cx="158" cy="70" rx="3" ry="4" fill="#fbbf24" />
      {/* Mandibles */}
      <path d="M 168 76 Q 176 80 178 86 M 166 79 Q 174 85 174 90" stroke="#d97706" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      {/* Thorax (Middle) */}
      <ellipse cx="118" cy="80" rx="20" ry="12" fill="url(#antGrad)" />
      {/* Petiole (Waist connector) */}
      <ellipse cx="94" cy="81" rx="6" ry="5" fill="#92400e" />
      {/* Gaster / Abdomen (Back) */}
      <ellipse cx="58" cy="82" rx="34" ry="24" transform="rotate(-8 58 82)" fill="url(#antGrad)" />
      {/* Abdomen segments highlights */}
      <path d="M 68 62 Q 74 82 66 102 M 52 61 Q 58 82 50 103 M 36 65 Q 42 82 34 98" stroke="#b45309" strokeWidth="1.5" fill="none" opacity="0.6" />
      {/* 6 Articulated Legs */}
      <g className={animated ? 'animate-creature-walk origin-center' : ''}>
        {/* Front leg */}
        <path d="M 128 82 L 145 98 L 158 135" stroke="#92400e" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        {/* Middle leg */}
        <path d="M 118 82 L 115 105 L 110 138" stroke="#78350f" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        {/* Back leg */}
        <path d="M 108 82 L 85 96 L 72 136" stroke="#451a03" strokeWidth="3.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        {/* Far side legs shadow */}
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
      {/* Water Spout */}
      {animated && (
        <path
          d="M 185 45 C 185 20 175 10 170 5 M 186 45 C 190 22 200 12 210 8 M 185 42 C 185 18 185 5 187 2"
          stroke="#7dd3fc"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
          className="animate-pulse"
        />
      )}
      {/* Massive Body */}
      <path
        d="M 15 88 C 30 84 55 86 85 84 C 130 82 170 60 205 60 C 225 60 238 72 235 88 C 230 108 200 120 155 122 C 110 124 55 108 15 88 Z"
        fill="url(#whaleGrad)"
      />
      {/* Belly ventral pleats */}
      <path d="M 140 118 C 170 114 195 106 215 95" stroke="#bae6fd" strokeWidth="2" fill="none" opacity="0.6" />
      <path d="M 130 121 C 160 118 190 110 205 102" stroke="#bae6fd" strokeWidth="1.5" fill="none" opacity="0.6" />
      {/* Eye */}
      <circle cx="210" cy="78" r="3.5" fill="#fbbf24" />
      <circle cx="211" cy="77" r="1.2" fill="#fff" />
      {/* Pectoral Fin */}
      <path
        d="M 155 92 C 145 115 130 135 118 142 C 122 130 135 110 152 90 Z"
        fill="#0369a1"
        className={animated ? 'animate-creature-swim origin-[155px_92px]' : ''}
      />
      {/* Dorsal Fin */}
      <path d="M 78 84 C 74 72 68 66 60 68 C 65 74 70 80 75 84 Z" fill="#0284c7" />
      {/* Caudal Fluke Tail */}
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
      {/* Graceful S-Curved Neck and Head */}
      <path
        d="M 160 105 C 168 85 178 50 185 35 C 190 26 200 24 208 26 C 215 28 218 36 215 42 C 205 45 195 48 190 58 C 182 75 175 100 170 115 Z"
        fill="url(#camelGrad)"
      />
      {/* Camel Ears */}
      <path d="M 195 24 L 198 14 L 202 23 Z" fill="#ca8a04" />
      {/* Eye and Muzzle */}
      <circle cx="206" cy="32" r="2.5" fill="#451a03" />
      <path d="M 215 36 Q 212 42 206 43" stroke="#713f12" strokeWidth="1.5" fill="none" />
      {/* Grand Hump & Body */}
      <path
        d="M 65 115 C 65 110 78 72 105 60 C 128 50 145 75 155 100 C 165 110 162 135 150 145 C 130 152 85 150 68 135 C 62 128 65 118 65 115 Z"
        fill="url(#camelGrad)"
      />
      {/* Legs (Front & Rear) */}
      <g className={animated ? 'animate-creature-walk origin-bottom' : ''}>
        {/* Front Near Leg */}
        <path d="M 152 140 L 156 160 L 158 178" stroke="#ca8a04" strokeWidth="5" strokeLinecap="round" fill="none" />
        {/* Foot Pad Front */}
        <ellipse cx="160" cy="178" rx="6" ry="2.5" fill="#713f12" />
        {/* Rear Near Leg */}
        <path d="M 78 135 L 70 155 L 72 178" stroke="#ca8a04" strokeWidth="5.5" strokeLinecap="round" fill="none" />
        {/* Foot Pad Rear */}
        <ellipse cx="73" cy="178" rx="6.5" ry="2.5" fill="#713f12" />
        {/* Far Legs (Darker background) */}
        <path d="M 142 138 L 138 158 L 140 176" stroke="#854d0e" strokeWidth="4" strokeLinecap="round" fill="none" />
        <ellipse cx="141" cy="176" rx="5" ry="2" fill="#451a03" />
        <path d="M 90 135 L 95 156 L 93 176" stroke="#854d0e" strokeWidth="4.5" strokeLinecap="round" fill="none" />
        <ellipse cx="94" cy="176" rx="5" ry="2" fill="#451a03" />
      </g>
      {/* Tail with tuft */}
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
      {/* Alert Dog Head & Muzzle */}
      <path
        d="M 135 48 C 145 35 160 38 175 48 C 185 55 192 62 188 70 C 182 75 168 72 160 78 C 150 85 142 90 135 85 Z"
        fill="url(#dogGrad)"
      />
      {/* Ears - One upright, one relaxed */}
      <path d="M 142 42 L 146 22 L 155 38 Z" fill="#b45309" />
      <path d="M 152 44 L 158 28 L 164 42 Z" fill="#92400e" />
      {/* Eye and Nose */}
      <circle cx="168" cy="54" r="2.5" fill="#1c1917" />
      <ellipse cx="188" cy="65" rx="3" ry="2" fill="#1c1917" />
      {/* Recumbent / Sitting Guard Body */}
      <path
        d="M 65 95 C 65 80 85 75 110 75 C 130 75 140 85 142 105 C 144 120 135 135 110 138 C 85 140 60 138 52 125 C 48 118 55 105 65 95 Z"
        fill="url(#dogGrad)"
      />
      {/* Stretched Forelegs across threshold (Bāsitun Dhirā‘ayhi) */}
      <g className={animated ? 'animate-pulse' : ''}>
        <path d="M 135 110 L 165 125 L 195 132" stroke="#b45309" strokeWidth="6" strokeLinecap="round" fill="none" />
        <ellipse cx="196" cy="132" rx="7" ry="3" fill="#78350f" />
        <path d="M 125 115 L 155 128 L 185 135" stroke="#92400e" strokeWidth="5.5" strokeLinecap="round" fill="none" />
        <ellipse cx="186" cy="135" rx="6.5" ry="3" fill="#451a03" />
      </g>
      {/* Hindquarters resting */}
      <ellipse cx="68" cy="120" rx="18" ry="14" fill="#92400e" />
      {/* Tail curled back */}
      <path d="M 52 118 C 35 112 30 92 42 85 C 46 82 48 88 44 94 Z" fill="#ca8a04" />
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
      {/* Massive Dome Head */}
      <path
        d="M 155 60 C 170 45 195 50 205 65 C 215 80 215 105 210 120 C 205 135 198 155 190 162 C 185 166 180 162 184 150 C 190 135 194 110 188 95 C 182 85 170 82 160 88 Z"
        fill="url(#eleGrad)"
      />
      {/* Ivory Tusk */}
      <path d="M 198 108 C 215 112 228 106 235 98 C 228 108 212 118 195 114 Z" fill="#fef08a" />
      {/* Huge Fan Ear */}
      <path
        d="M 152 58 C 170 56 182 75 178 98 C 175 115 158 128 142 125 C 132 120 135 95 142 75 Z"
        fill="#334155"
        className={animated ? 'animate-pulse' : ''}
      />
      {/* Colossal Body */}
      <path
        d="M 50 100 C 50 75 80 60 120 60 C 150 60 165 75 165 100 C 165 125 150 145 125 150 C 85 152 50 138 50 100 Z"
        fill="url(#eleGrad)"
      />
      {/* Massive Pillar Legs */}
      <g className={animated ? 'animate-creature-walk origin-bottom' : ''}>
        <rect x="142" y="125" width="22" height="50" rx="6" fill="#475569" />
        <rect x="122" y="122" width="18" height="50" rx="5" fill="#334155" />
        <rect x="65" y="125" width="24" height="50" rx="6" fill="#475569" />
        <rect x="85" y="122" width="18" height="50" rx="5" fill="#334155" />
      </g>
      {/* Tail with brush */}
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
      {/* Translucent buzzing wings */}
      <g className={animated ? 'animate-creature-fly origin-[85px_50px]' : ''}>
        <ellipse cx="80" cy="30" rx="35" ry="16" transform="rotate(-30 80 30)" fill="rgba(224, 242, 254, 0.65)" stroke="#38bdf8" strokeWidth="1.2" />
        <ellipse cx="100" cy="35" rx="28" ry="12" transform="rotate(-15 100 35)" fill="rgba(224, 242, 254, 0.55)" stroke="#38bdf8" strokeWidth="1" />
      </g>
      {/* Head */}
      <ellipse cx="135" cy="72" rx="14" ry="12" fill="#451a03" />
      <ellipse cx="140" cy="68" rx="4" ry="5" fill="#1c1917" />
      {/* Antennae */}
      <path d="M 145 64 Q 155 52 162 55 M 144 68 Q 158 64 165 70" stroke="#78350f" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* Thorax (Fuzzy golden) */}
      <ellipse cx="110" cy="74" rx="18" ry="16" fill="url(#beeGrad)" />
      {/* Striped Abdomen */}
      <g>
        <ellipse cx="65" cy="76" rx="32" ry="20" fill="url(#beeGrad)" />
        {/* Dark Stripes */}
        <path d="M 78 58 C 82 70 82 82 78 94 L 72 95 C 76 83 76 71 72 59 Z" fill="#1c1917" />
        <path d="M 62 56 C 66 70 66 84 62 96 L 56 96 C 60 84 60 70 56 56 Z" fill="#1c1917" />
        <path d="M 46 60 C 50 72 50 82 46 92 L 40 90 C 44 80 44 72 40 62 Z" fill="#1c1917" />
        {/* Stinger */}
        <path d="M 33 76 L 24 76" stroke="#451a03" strokeWidth="2" strokeLinecap="round" />
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
      {/* Arching Neck and Regal Head */}
      <path
        d="M 140 85 C 145 65 158 40 175 28 C 182 22 192 24 198 32 C 204 40 200 48 190 52 C 175 56 162 70 155 90 Z"
        fill="url(#horseGrad)"
      />
      {/* Pricked Ears */}
      <path d="M 188 24 L 192 12 L 196 22 Z" fill="#a16207" />
      <circle cx="192" cy="34" r="2.5" fill="#1c1917" />
      {/* Flowing Mane */}
      <path d="M 168 28 C 158 35 152 48 148 62 C 142 75 138 90 135 105" stroke="#713f12" strokeWidth="4" fill="none" strokeLinecap="round" />
      {/* Athletic Muscular Body */}
      <path
        d="M 65 95 C 65 82 85 75 115 75 C 145 75 155 88 152 108 C 150 125 135 135 110 136 C 80 137 65 125 65 95 Z"
        fill="url(#horseGrad)"
      />
      {/* Powerful Galloping Legs */}
      <g className={animated ? 'animate-creature-gallop origin-bottom' : ''}>
        <path d="M 145 110 L 158 135 L 175 155" stroke="#a16207" strokeWidth="4.5" strokeLinecap="round" fill="none" />
        <path d="M 132 112 L 140 136 L 152 154" stroke="#713f12" strokeWidth="4" strokeLinecap="round" fill="none" />
        <path d="M 80 105 L 65 132 L 52 152" stroke="#a16207" strokeWidth="5" strokeLinecap="round" fill="none" />
        <path d="M 92 108 L 82 135 L 75 154" stroke="#713f12" strokeWidth="4.5" strokeLinecap="round" fill="none" />
      </g>
      {/* High Arched Tail */}
      <path
        d="M 66 90 C 45 75 35 90 32 120 C 30 135 34 148 40 152"
        stroke="#ca8a04"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
        className={animated ? 'animate-creature-walk origin-[66px_90px]' : ''}
      />
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
      {/* Cat Head */}
      <circle cx="132" cy="55" r="18" fill="url(#catGrad)" />
      {/* Triangular Ears */}
      <path d="M 120 45 L 118 28 L 130 40 Z" fill="#9a3412" />
      <path d="M 136 40 L 146 28 L 144 45 Z" fill="#9a3412" />
      {/* Whiskers */}
      <path d="M 142 60 L 165 58 M 142 63 L 166 65 M 142 66 L 162 72" stroke="#fef08a" strokeWidth="1" />
      {/* Eyes */}
      <ellipse cx="138" cy="52" rx="3" ry="4" fill="#84cc16" />
      <line x1="138" y1="49" x2="138" y2="55" stroke="#000" strokeWidth="1.2" />
      {/* Supple Feline Body */}
      <path
        d="M 60 85 C 60 70 85 68 115 68 C 128 68 135 78 132 98 C 130 115 115 125 90 126 C 65 127 55 110 60 85 Z"
        fill="url(#catGrad)"
      />
      {/* Graceful Paws */}
      <g className={animated ? 'animate-creature-walk origin-bottom' : ''}>
        <rect x="118" y="100" width="8" height="26" rx="4" fill="#c2410c" />
        <rect x="108" y="102" width="7" height="24" rx="3.5" fill="#9a3412" />
        <ellipse cx="72" cy="110" rx="14" ry="12" fill="#c2410c" />
        <rect x="65" y="115" width="8" height="12" rx="4" fill="#9a3412" />
      </g>
      {/* High Curved S-Tail */}
      <path
        d="M 58 92 C 40 85 30 65 35 50 C 38 42 46 44 45 52 C 42 65 48 80 62 90"
        stroke="#ea580c"
        strokeWidth="4.5"
        fill="none"
        strokeLinecap="round"
        className={animated ? 'animate-creature-swim origin-[58px_92px]' : ''}
      />
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
      {/* Graceful Curved Trunk */}
      <path d="M 92 195 Q 98 120 102 75 L 112 75 Q 106 120 104 195 Z" fill="url(#palmTrunk)" />
      {/* Trunk Scars */}
      {[100, 120, 140, 160, 180].map((y) => (
        <line key={y} x1="95" y1={y} x2="105" y2={y - 4} stroke="#451a03" strokeWidth="2" strokeLinecap="round" />
      ))}
      {/* Hanging Golden Date Clusters */}
      <g>
        <ellipse cx="96" cy="85" rx="10" ry="14" fill="#eab308" />
        <ellipse cx="116" cy="86" rx="9" ry="13" fill="#ca8a04" />
        <ellipse cx="106" cy="92" rx="11" ry="15" fill="#fde047" />
      </g>
      {/* Crown Fronds with gentle breeze animation */}
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
      {/* Olive Branch Stem */}
      <path d="M 25 145 Q 70 120 120 90 Q 160 65 185 35" stroke="#78350f" strokeWidth="4.5" fill="none" strokeLinecap="round" />
      {/* Silvery-green Leaves */}
      <g className={animated ? 'animate-flora-sway origin-center' : ''}>
        <path d="M 85 110 C 65 95 60 70 80 65 C 100 68 105 95 85 110 Z" fill="#4d7c0f" />
        <path d="M 125 85 C 110 65 115 45 135 40 C 150 45 148 70 125 85 Z" fill="#65a30d" />
        <path d="M 160 55 C 150 35 162 20 180 18 C 190 25 185 45 160 55 Z" fill="#4d7c0f" />
        <path d="M 105 100 C 120 115 140 120 148 105 C 145 90 125 85 105 100 Z" fill="#84cc16" />
      </g>
      {/* Hanging Glossy Olives with Oil Droplet */}
      <g>
        <ellipse cx="95" cy="125" rx="14" ry="18" fill="url(#oliveGrad)" />
        <ellipse cx="98" cy="120" rx="3.5" ry="6" fill="rgba(255,255,255,0.4)" />
        <ellipse cx="138" cy="98" rx="13" ry="17" fill="url(#oliveGrad)" />
        <ellipse cx="141" cy="94" rx="3" ry="5" fill="rgba(255,255,255,0.4)" />
        {/* Golden Glowing Oil Droplet */}
        <path d="M 95 145 C 95 155 102 165 95 175 C 88 165 95 155 95 145 Z" fill="#facc15" className={animated ? 'animate-pulse' : ''} />
      </g>
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
      {/* Stem */}
      <path d="M 90 15 L 90 35" stroke="#713f12" strokeWidth="4" strokeLinecap="round" />
      {/* Crown (Calyx) */}
      <path d="M 75 35 L 70 20 L 82 28 L 90 18 L 98 28 L 110 20 L 105 35 Z" fill="#9f1239" />
      {/* Whole Pomegranate Sphere */}
      <circle cx="90" cy="100" r="62" fill="url(#pomGrad)" />
      {/* Cut-open Window Showing Ruby Arils */}
      <path d="M 70 80 Q 115 70 125 100 Q 115 135 70 120 Q 55 100 70 80 Z" fill="#fff1f2" />
      {/* Ruby Aril Seeds */}
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
      {/* Tear-drop Fig shape */}
      <path
        d="M 90 55 C 65 75 42 105 45 132 C 48 160 80 170 95 170 C 120 170 145 158 142 128 C 138 102 115 75 90 55 Z"
        fill="url(#figGrad)"
      />
      {/* Interior Cut view */}
      <ellipse cx="94" cy="125" rx="32" ry="34" fill="#f43f5e" />
      <circle cx="94" cy="125" r="26" fill="#fb7185" />
      {/* Crunchy Micro Seeds */}
      {[85, 95, 105].map((x) =>
        [115, 125, 135].map((y) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="1.5" fill="#fef08a" />
        ))
      )}
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
      {/* Hexagonal Honeycomb Background */}
      <polygon points="45,45 60,35 75,45 75,65 60,75 45,65" fill="#fde047" stroke="#ca8a04" strokeWidth="1.5" opacity="0.6" />
      <polygon points="75,45 90,35 105,45 105,65 90,75 75,65" fill="#fde047" stroke="#ca8a04" strokeWidth="1.5" opacity="0.8" />
      <polygon points="60,75 75,65 90,75 90,95 75,105 60,95" fill="#eab308" stroke="#ca8a04" strokeWidth="1.5" />
      {/* Traditional Clay Jar of Honey */}
      <path
        d="M 65 95 L 115 95 L 125 155 C 125 165 115 172 90 172 C 65 172 55 165 55 155 Z"
        fill="url(#honeyJar)"
      />
      {/* Wooden Honey Dipper with Dripping Golden Drop */}
      <line x1="135" y1="30" x2="100" y2="90" stroke="#78350f" strokeWidth="4.5" strokeLinecap="round" />
      <ellipse cx="102" cy="88" rx="12" ry="10" fill="#a16207" />
      {/* Dripping honey drop */}
      <path
        d="M 102 98 C 102 110 108 122 102 135 C 96 122 102 110 102 98 Z"
        fill="#fde047"
        className={animated ? 'animate-pulse' : ''}
      />
    </svg>
  )
}

function GenericSilhouette({ name }: { name: string }) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center">
      <Sparkles className="size-12 text-gold animate-pulse mb-2" />
      <span className="text-xs font-mono text-gold-2 uppercase tracking-widest">{name}</span>
    </div>
  )
}

function RenderOrganismSilhouette({ id, animated = true }: { id: string; animated?: boolean }) {
  switch (id) {
    case 'hudhud':
      return <HoopoeSvg animated={animated} />
    case 'namlah':
      return <AntSvg animated={animated} />
    case 'hut_yunus':
      return <WhaleSvg animated={animated} />
    case 'naqat_salih':
      return <SheCamelSvg animated={animated} />
    case 'kalb_kahf':
      return <DogSvg animated={animated} />
    case 'fil':
      return <ElephantSvg animated={animated} />
    case 'nahl':
      return <BeeSvg animated={animated} />
    case 'khayl_adiyat':
    case 'buraq':
      return <HorseSvg animated={animated} />
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
    default:
      return <GenericSilhouette name={id} />
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
  const [sunAngle, setSunAngle] = useState<number>(65) // 0 to 180 degrees
  const [shadowIntensity, setShadowIntensity] = useState<number>(60) // 20 to 100%

  // Detail Modal / Sheet
  const [detailItem, setDetailItem] = useState<AnimalEntry | PlantFoodEntry | null>(null)

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

  // Dynamic shadow transform based on sunAngle
  const shadowSkew = (sunAngle - 90) * 0.7
  const shadowScaleX = 1 + Math.abs(sunAngle - 90) / 70

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      {/* Top Banner / Hero Title */}
      <div className="text-center max-w-4xl mx-auto mb-10">
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
          <span className="text-lg sm:text-2xl font-light text-ink-2">
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
            <span className={`text-[0.65rem] px-1.5 py-0.5 rounded-full ${activeTab === 'animals' ? 'bg-night/20 text-night' : 'bg-white/10 text-gold'}`}>
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
            <span className={`text-[0.65rem] px-1.5 py-0.5 rounded-full ${activeTab === 'plants' ? 'bg-night/20 text-night' : 'bg-white/10 text-gold'}`}>
              {QURAN_SUNNAH_PLANTS.length}
            </span>
          </button>
        </div>
      </div>

      {/* Interactive Shadow & Motion Theater Stage */}
      <div className="glass rounded-3xl p-6 sm:p-8 mb-10 border border-gold/30 shadow-2xl relative overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gold">
              <Sun className="size-4" />
              <span>
                {lang === 'ar'
                  ? 'مسرح الظلال والحركة التفاعلي للكائن المختار'
                  : lang === 'fr'
                  ? 'Théâtre interactif d’ombres et mouvements'
                  : 'Interactive Silhouette, Motion & Shadow Stage'}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-ink mt-1">
              {activeTab === 'animals' ? pick(activeAnimal.name) : pick(activePlant.name)}
              <span className="ar-name text-gold ms-3 text-lg font-normal">
                {activeTab === 'animals' ? activeAnimal.name.ar : activePlant.name.ar}
              </span>
            </h2>
          </div>

          {/* Interactive Controls */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Motion Play/Pause */}
            <button
              type="button"
              onClick={() => setIsMotionActive((m) => !m)}
              className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
                isMotionActive ? 'border-gold/40 bg-gold/15 text-gold' : 'border-white/15 bg-white/5 text-ink-3'
              }`}
            >
              {isMotionActive ? <Pause className="size-3.5" /> : <Play className="size-3.5" />}
              <span>{isMotionActive ? (lang === 'ar' ? 'إيقاف الحركة' : 'Pause Motion') : (lang === 'ar' ? 'تشغيل الحركة' : 'Play Motion')}</span>
            </button>

            {/* Sun Angle Slider */}
            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs">
              <Sun className="size-3.5 text-gold" />
              <span className="text-ink-3 hidden sm:inline">{lang === 'ar' ? 'زاوية الشمس:' : 'Light:'}</span>
              <input
                type="range"
                min="15"
                max="165"
                value={sunAngle}
                onChange={(e) => setSunAngle(Number(e.target.value))}
                className="w-20 accent-gold cursor-pointer"
              />
              <span className="font-mono text-ink-2">{sunAngle}°</span>
            </div>

            {/* Shadow Depth Slider */}
            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs">
              <Moon className="size-3.5 text-gold" />
              <span className="text-ink-3 hidden sm:inline">{lang === 'ar' ? 'عمق الظل:' : 'Shadow:'}</span>
              <input
                type="range"
                min="20"
                max="100"
                value={shadowIntensity}
                onChange={(e) => setShadowIntensity(Number(e.target.value))}
                className="w-16 accent-gold cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Visual Stage Canvas */}
        <div className="relative h-64 sm:h-72 w-full rounded-2xl bg-gradient-to-b from-night-2 via-night to-night-3 border border-white/10 overflow-hidden flex flex-col justify-end items-center px-4 pb-4">
          {/* Distant horizon sun rays */}
          <div
            className="absolute top-0 w-32 h-64 pointer-events-none transition-all duration-300 opacity-20 bg-gradient-to-b from-gold via-transparent to-transparent"
            style={{
              left: `${(sunAngle / 180) * 100}%`,
              transform: `translateX(-50%) rotate(${(90 - sunAngle) * 0.5}deg)`,
            }}
          />

          {/* Animated Organism Silhouette */}
          <div className="relative z-10 w-44 sm:w-56 h-44 sm:h-56 flex items-center justify-center">
            <RenderOrganismSilhouette
              id={activeTab === 'animals' ? activeAnimal.id : activePlant.id}
              animated={isMotionActive}
            />
          </div>

          {/* Realistic Dynamic Ground Projected Shadow */}
          <div
            className="relative z-0 h-4 rounded-[100%] transition-transform duration-150"
            style={{
              width: `${140 * shadowScaleX}px`,
              backgroundColor: `rgba(0, 0, 0, ${shadowIntensity / 100})`,
              filter: `blur(${6 + Math.abs(sunAngle - 90) / 15}px)`,
              transform: `skewX(${shadowSkew}deg) translateY(4px)`,
              opacity: isMotionActive ? undefined : 0.8,
            }}
          />

          {/* Ground surface line with measuring markings */}
          <div className="w-full h-1 bg-gradient-to-r from-transparent via-gold/40 to-transparent relative mt-1" />
          <div className="w-full flex justify-between text-[0.65rem] font-mono text-ink-3 pt-1">
            <span>{activeTab === 'animals' ? pick(activeAnimal.physicalTraits.size) : pick(activePlant.botanicalTraits.growthForm)}</span>
            <span className="text-gold">
              {activeTab === 'animals' ? activeAnimal.scientificName : activePlant.scientificName}
            </span>
            <span>{activeTab === 'animals' ? pick(activeAnimal.physicalTraits.habitat) : pick(activePlant.botanicalTraits.habitat)}</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        {/* Category & Source Pills */}
        <div className="flex flex-wrap items-center gap-2">
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

        {/* Search input */}
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

      {/* Card Grid */}
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
                  {/* Top Bar: Name, Arabic & Calligraphy */}
                  <div>
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="font-bold text-ink text-base group-hover:text-gold transition-colors">
                          {pick(animal.name)}
                        </h3>
                        <p className="text-xs font-mono text-ink-3 italic">{animal.scientificName}</p>
                      </div>
                      <span className="ar-name gold-text text-lg font-bold shrink-0">{animal.name.ar}</span>
                    </div>

                    {/* Miniature Animated Silhouette Theater */}
                    <div className="relative my-4 h-28 w-full rounded-xl bg-night-2/60 border border-white/5 flex flex-col items-center justify-center overflow-hidden">
                      <div className="w-20 h-20 relative z-10">
                        <RenderOrganismSilhouette id={animal.id} animated={true} />
                      </div>
                      <div className="w-16 h-2 bg-black/60 rounded-[100%] blur-[3px] -mt-1 animate-shadow-breathe" />
                    </div>

                    {/* Summary */}
                    <p className="text-xs text-ink-2 leading-relaxed line-clamp-3 mb-4">
                      {pick(animal.summary)}
                    </p>
                  </div>

                  {/* Bottom: References & Open Full Detail Button */}
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
                  {/* Top: Name & Botanical Class */}
                  <div>
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="font-bold text-ink text-base group-hover:text-gold transition-colors">
                          {pick(plant.name)}
                        </h3>
                        <p className="text-xs font-mono text-ink-3 italic">{plant.scientificName}</p>
                      </div>
                      <span className="ar-name gold-text text-lg font-bold shrink-0">{plant.name.ar}</span>
                    </div>

                    {/* Miniature Animated Silhouette */}
                    <div className="relative my-4 h-28 w-full rounded-xl bg-night-2/60 border border-white/5 flex flex-col items-center justify-center overflow-hidden">
                      <div className="w-20 h-20 relative z-10">
                        <RenderOrganismSilhouette id={plant.id} animated={true} />
                      </div>
                      <div className="w-16 h-2 bg-black/60 rounded-[100%] blur-[3px] -mt-1 animate-shadow-breathe" />
                    </div>

                    {/* Summary */}
                    <p className="text-xs text-ink-2 leading-relaxed line-clamp-3 mb-4">
                      {pick(plant.summary)}
                    </p>
                  </div>

                  {/* Bottom: References & Details Button */}
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
                {'category' in detailItem && ('motion' in detailItem ? 'Animal in Qur’an & Sunnah' : 'Plant & Food in Qur’an & Sunnah')}
              </span>
              <span className="text-xs font-mono text-ink-3 italic">{detailItem.scientificName}</span>
            </div>

            <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-ink">{pick(detailItem.name)}</h2>
                <p className="ar-name gold-text text-xl font-bold mt-1">{detailItem.name.ar}</p>
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

            {/* Visual Stage inside Modal */}
            <div className="my-6 rounded-2xl bg-gradient-to-b from-night-2 to-night-3 border border-white/10 p-6 flex flex-col items-center justify-center">
              <div className="w-36 h-36">
                <RenderOrganismSilhouette id={detailItem.id} animated={true} />
              </div>
              <div className="w-28 h-3 bg-black/60 rounded-[100%] blur-[4px] -mt-1 animate-shadow-breathe" />
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
