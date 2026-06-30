/**
 * The shared inner-page header. Opens every page on the same pine ground as the
 * home hero, with a serif title, optional mono eyebrow, and the measure-rule
 * seam — so the whole site reads as one identity.
 */
export function PageHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string
  title: string
  subtitle?: string
}) {
  return (
    <section className="relative overflow-hidden bg-pine text-paper">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-24 pb-16 text-center lg:pt-28 lg:pb-20">
        {eyebrow && (
          <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.25em] text-moss-light sm:text-xs">
            {eyebrow}
          </p>
        )}
        <h1 className="font-display text-3xl font-medium leading-tight tracking-tight sm:text-4xl lg:text-5xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mx-auto mt-5 max-w-2xl whitespace-pre-line text-base leading-relaxed text-paper/85 sm:text-lg">
            {subtitle}
          </p>
        )}
      </div>
      <div className="measure-rule text-paper/30" aria-hidden />
    </section>
  )
}
