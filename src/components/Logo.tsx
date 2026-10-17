/** Mark: a tree whose branches end in stars, inside an eight-point star (khatam). */
export function Logo({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="lg-gold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff3cf" />
          <stop offset="0.55" stopColor="#e9c67b" />
          <stop offset="1" stopColor="#a8823c" />
        </linearGradient>
      </defs>
      <g fill="none" stroke="url(#lg-gold)" strokeWidth="1.6" strokeLinejoin="round">
        <rect x="14" y="14" width="36" height="36" rx="3" transform="rotate(45 32 32)" opacity="0.55" />
        <rect x="14" y="14" width="36" height="36" rx="3" opacity="0.55" />
      </g>
      <g stroke="url(#lg-gold)" strokeWidth="2" strokeLinecap="round" fill="none">
        <path d="M32 50 V30" />
        <path d="M32 38 C28 35 25 32 23 27" />
        <path d="M32 34 C36 31 39 28 41 23" />
        <path d="M32 30 V20" />
      </g>
      <g fill="#fbe6b0">
        <circle cx="23" cy="26" r="2.4" />
        <circle cx="41" cy="22" r="2.4" />
        <circle cx="32" cy="18" r="2.8" />
        <circle cx="32" cy="50" r="1.8" opacity="0.7" />
      </g>
    </svg>
  )
}
