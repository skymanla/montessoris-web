/**
 * Shelf-tile material previews. These are the ONE real-color element on the
 * otherwise brand-colored shelf: the pink tower stays pink, the brown stair
 * brown, and the number rods red/blue — because Montessori color-coding is
 * pedagogically meaningful. Filled SVG silhouettes, stylized (not to scale).
 */

type Props = { className?: string }
const box = "h-16 w-16"

const PINK = "#dd93a6"
const BROWN = "#7a5a44"
const RED = "#c6413b"
const BLUE = "#3b6ba5"

/** Centered descending stack of 10 cubes — the Pink Tower. */
export function PreviewTower({ className = "" }: Props) {
  const n = 10
  const h = 3.6
  return (
    <svg viewBox="0 0 64 48" aria-hidden className={`${box} ${className}`}>
      {Array.from({ length: n }).map((_, i) => {
        const w = 34 - (i * (34 - 6)) / (n - 1) // taper 34 → 6 across 10 cubes
        return (
          <rect
            key={i}
            x={(64 - w) / 2}
            y={44 - (i + 1) * h}
            width={w}
            height={h - 0.5}
            rx="1"
            fill={PINK}
          />
        )
      })}
    </svg>
  )
}

/** Descending steps, thickest on the left — the Brown Stair. */
export function PreviewStair({ className = "" }: Props) {
  const n = 10
  return (
    <svg viewBox="0 0 64 48" aria-hidden className={`${box} ${className}`}>
      {Array.from({ length: n }).map((_, i) => {
        const height = 6 + (n - i) * 3.4
        const w = 5.4
        return (
          <rect
            key={i}
            x={3 + i * 5.7}
            y={44 - height}
            width={w}
            height={height}
            rx="0.8"
            fill={BROWN}
          />
        )
      })}
    </svg>
  )
}

/** Left-aligned red/blue segmented staircase — the Number Rods. */
export function PreviewRods({ className = "" }: Props) {
  const rows = 10
  const seg = 5.2
  const barH = 3
  const pitch = 4
  return (
    <svg viewBox="0 0 64 48" aria-hidden className={`${box} ${className}`}>
      {Array.from({ length: rows }).map((_, r) => {
        const len = rows - r // bottom row (r=0) = longest = 10 segments
        const y = 44 - (r + 1) * pitch
        return Array.from({ length: len }).map((_, s) => (
          <rect
            key={`${r}-${s}`}
            x={6 + s * seg}
            y={y}
            width={seg - 0.4}
            height={barH}
            rx="0.5"
            fill={s % 2 === 0 ? RED : BLUE}
          />
        ))
      })}
    </svg>
  )
}
