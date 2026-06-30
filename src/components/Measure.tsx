import React from "react"

/**
 * Signature motif — "측정(The Measure)".
 *
 * Montessori materials teach through precise, ordered gradation: the ten cubes
 * of the Pink Tower, the segmented Number Rods, the gradated Knobbed Cylinders.
 * These primitives turn that idea into the page's structural language.
 */

/** A worksheet / number-rod tick rule. Decorative divider between sections. */
export function MeasureRule({ className = "" }: { className?: string }) {
  return <div aria-hidden className={`measure-rule w-full ${className}`} />
}

type Rod = { h: string; color: string }

// Ascending height + deepening green = the child growing in measured steps,
// at their own pace, toward maturity.
const DEFAULT_RODS: Rod[] = [
  { h: "22%", color: "#C8DBCF" },
  { h: "34%", color: "#9DBCAA" },
  { h: "48%", color: "#7FAE97" },
  { h: "64%", color: "#5F8D76" },
  { h: "82%", color: "#4E7A66" },
  { h: "100%", color: "#33503F" },
]

/**
 * The hero signature: a staircase of rods that rises from the baseline in
 * sequence on load (pure CSS, reduced-motion safe). Echoes the Number Rods
 * and the Pink Tower's measured progression.
 */
export function RodStaircase({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`flex items-end gap-2 sm:gap-3 h-20 sm:h-28 lg:h-32 ${className}`}
    >
      {DEFAULT_RODS.map((rod, i) => (
        <div
          key={rod.h}
          className="rod w-7 sm:w-10 lg:w-12 rounded-t-[3px]"
          style={{
            height: rod.h,
            backgroundColor: rod.color,
            animationDelay: `${0.35 + i * 0.09}s`,
          }}
        />
      ))}
    </div>
  )
}
