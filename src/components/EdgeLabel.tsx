import type { Lang } from '../data/types'
import { LABEL_H, labelWidth } from '../lib/labelLayout'

/**
 * The relation name drawn on a line of a tree ("son", "wife", "his teacher"). One look for both trees:
 * a dark pill edged with the line's colour, gold when the line belongs to the selected person.
 */
export function EdgeLabel({
  x,
  y,
  scale,
  text,
  lang,
  accent = 'rgba(255, 255, 255, 0.35)',
  active = false,
}: {
  x: number
  y: number
  scale: number
  text: string
  lang: Lang
  accent?: string
  active?: boolean
}) {
  const w = labelWidth(text, lang)
  return (
    <g transform={`translate(${x},${y}) scale(${scale})`} className="pointer-events-none select-none" aria-hidden="true">
      <rect
        x={-w / 2}
        y={-LABEL_H / 2}
        width={w}
        height={LABEL_H}
        rx={LABEL_H / 2}
        fill="rgba(8, 7, 20, 0.92)"
        stroke={active ? '#facc15' : accent}
        strokeOpacity={active ? 1 : 0.7}
        strokeWidth={active ? 1.2 : 0.9}
      />
      <text
        y={3.8}
        textAnchor="middle"
        fontSize={lang === 'ar' ? 11 : 10.5}
        fontWeight={600}
        fill={active ? '#fde68a' : '#ece4cf'}
        fontFamily={lang === 'ar' ? 'Reem Kufi Variable, serif' : 'Sora Variable, Reem Kufi Variable, sans-serif'}
      >
        {text}
      </text>
    </g>
  )
}
