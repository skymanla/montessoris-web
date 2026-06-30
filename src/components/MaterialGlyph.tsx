/**
 * Small line-glyphs drawn from the Montessori world, replacing decorative
 * emoji. One stroke weight, one color (sage), so they read as a crafted set.
 */

type GlyphProps = { className?: string }

const base = "h-9 w-9"
const strokeProps = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
}

/** The Pink Tower — measured, standard, authentic gradation. */
export function GlyphTower({ className = "" }: GlyphProps) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden className={`${base} ${className}`}>
      <g {...strokeProps}>
        <rect x="6" y="34" width="14" height="8" rx="1" />
        <rect x="9" y="25" width="11" height="9" rx="1" />
        <rect x="12" y="17" width="8" height="8" rx="1" />
        <rect x="15" y="10" width="5" height="7" rx="1" />
        <line x1="6" y1="42.5" x2="42" y2="42.5" />
        <line x1="27" y1="42" x2="27" y2="24" />
        <path d="M27 24h7M27 32h11M27 38h6" opacity="0.55" />
      </g>
    </svg>
  )
}

/** A sprout — the child's own developmental unfolding, at their own pace. */
export function GlyphSprout({ className = "" }: GlyphProps) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden className={`${base} ${className}`}>
      <g {...strokeProps}>
        <path d="M24 42V20" />
        <path d="M24 26c-3-1-6-4-6-9 4 0 7 2 8 6" />
        <path d="M24 22c2-3 6-5 10-5 0 5-3 8-7 9" />
        <path d="M14 42h20" />
      </g>
    </svg>
  )
}

/** Adult and child on a shared baseline — the home–school partnership. */
export function GlyphPair({ className = "" }: GlyphProps) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden className={`${base} ${className}`}>
      <g {...strokeProps}>
        <circle cx="18" cy="15" r="5" />
        <path d="M9 38c0-6 4-10 9-10s9 4 9 10" />
        <circle cx="34" cy="22" r="3.5" />
        <path d="M28 38c0-4 2.5-7 6-7s6 3 6 7" />
        <line x1="6" y1="38.5" x2="42" y2="38.5" />
      </g>
    </svg>
  )
}

/** Knobbed Cylinders seen from above — graded focus and concentration. */
export function GlyphCylinder({ className = "" }: GlyphProps) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden className={`${base} ${className}`}>
      <g {...strokeProps}>
        <circle cx="24" cy="24" r="14" />
        <circle cx="24" cy="24" r="9" />
        <circle cx="24" cy="24" r="4" />
        <circle cx="24" cy="24" r="1.4" fill="currentColor" stroke="none" />
      </g>
    </svg>
  )
}

/** Constructive Triangles — building new wholes from parts, problem-solving. */
export function GlyphTriangle({ className = "" }: GlyphProps) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden className={`${base} ${className}`}>
      <g {...strokeProps}>
        <path d="M24 8 6 40h36L24 8Z" />
        <path d="M24 8 24 40" opacity="0.55" />
        <path d="M24 24 6 40M24 24 42 40" opacity="0.55" />
      </g>
    </svg>
  )
}
