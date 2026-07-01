"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import type { MaterialScene } from "./scene"
import { getMaterial, type MaterialSlug } from "./materials"

type Feedback = { type: "success" | "error"; msg: string; key: number }

export default function ExperienceClient({ material }: { material: MaterialSlug }) {
  const meta = getMaterial(material)
  const containerRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<MaterialScene | null>(null)
  const dialogRef = useRef<HTMLDivElement>(null)
  const [placed, setPlaced] = useState(0)
  const [feedback, setFeedback] = useState<Feedback | null>(null)
  const [completed, setCompleted] = useState(false)

  const total = meta?.pieceCount ?? 10

  useEffect(() => {
    const el = containerRef.current
    if (!el || !meta) return
    let disposed = false
    let fbKey = 0
    setPlaced(0)
    setCompleted(false)
    setFeedback(null)

    import("./sceneLoader").then(({ createScene }) => {
      if (disposed || !containerRef.current) return
      sceneRef.current = createScene(meta.slug, containerRef.current, meta.copy, {
        onProgress: (p) => setPlaced(p),
        onFeedback: (type, msg) => setFeedback({ type, msg, key: ++fbKey }),
        onComplete: () => setCompleted(true),
      })
    })

    return () => {
      disposed = true
      sceneRef.current?.dispose()
      sceneRef.current = null
    }
  }, [meta])

  // lock page scroll while the immersive scene is mounted
  useEffect(() => {
    const html = document.documentElement
    const body = document.body
    const prev = [html.style.overflow, body.style.overflow] as const
    html.style.overflow = "hidden"
    body.style.overflow = "hidden"
    return () => {
      html.style.overflow = prev[0]
      body.style.overflow = prev[1]
    }
  }, [])

  useEffect(() => {
    if (!feedback) return
    const t = setTimeout(() => setFeedback(null), 2600)
    return () => clearTimeout(t)
  }, [feedback])

  // move focus into the completion dialog when the exercise finishes
  useEffect(() => {
    if (completed) dialogRef.current?.focus()
  }, [completed])

  if (!meta) return null

  const restart = () => {
    sceneRef.current?.reset()
    setCompleted(false)
    setFeedback(null)
  }

  const instruction = placed === 0 ? meta.copy.start : meta.copy.progressPraise
  const step = Math.min(placed + 1, total)
  const announce = completed ? meta.copy.completeTitle : feedback?.msg
  const announceKey = completed ? "complete" : (feedback?.key ?? 0)

  return (
    <div className="fixed inset-0 touch-none select-none overscroll-none bg-linen text-ink">
      {/* 3D canvas mounts here (opaque to assistive tech; semantics live in the HUD) */}
      <div ref={containerRef} aria-hidden className="absolute inset-0" />

      {/* persistent live region for screen readers (keyed so identical repeats re-announce) */}
      <p className="sr-only" aria-live="assertive">
        <span key={announceKey}>{announce}</span>
      </p>

      {!completed && (
        <>
          {/* top HUD */}
          <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between gap-3 p-3 sm:p-5">
            <div className="pointer-events-auto flex min-w-0 items-center gap-3 rounded-xl border border-ink/10 bg-paper/80 px-4 py-3 shadow-[0_20px_50px_-30px_rgba(38,64,47,0.5)] backdrop-blur-md">
              <Link
                href="/experience/"
                className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-sage-deep transition-colors hover:text-pine"
              >
                <span aria-hidden>←</span> 교구 선반
              </Link>
              <span className="h-6 w-px shrink-0 bg-ink/15" />
              <div className="min-w-0">
                <h1 className="block truncate font-display text-lg font-semibold leading-none">
                  {meta.name}
                </h1>
                <span className="mt-1 block truncate font-mono text-[10px] uppercase tracking-[0.12em] text-sage-deep">
                  {meta.eyebrow}
                </span>
              </div>
            </div>

            <div className="pointer-events-auto flex shrink-0 gap-2">
              <HudButton label="다음 조각 놓기" onClick={() => sceneRef.current?.placeNext()}>
                <path d="M12 4v9" />
                <path d="M8 10l4 4 4-4" />
                <path d="M5 20h14" />
              </HudButton>
              <HudButton label="회전 초기화" onClick={() => sceneRef.current?.resetView()}>
                <path d="M3 12a9 9 0 1 1 2.6 6.3" />
                <path d="M3 20v-5h5" />
              </HudButton>
              <HudButton label="처음부터" onClick={restart}>
                <path d="M21 12a9 9 0 1 1-2.6-6.3" />
                <path d="M21 4v5h-5" />
              </HudButton>
              <HudButton label="힌트" onClick={() => sceneRef.current?.hint()}>
                <path d="M9 18h6" />
                <path d="M10 21h4" />
                <path d="M12 3a6 6 0 0 1 4 10.5c-.7.6-1 1.4-1 2.5H9c0-1.1-.3-1.9-1-2.5A6 6 0 0 1 12 3Z" />
              </HudButton>
            </div>
          </div>

          {/* control-of-error feedback chip (decorative; announced via the sr-only region) */}
          {feedback && (
            <div
              key={feedback.key}
              aria-hidden
              className={`pointer-events-none absolute left-1/2 top-24 flex max-w-[calc(100vw-2rem)] -translate-x-1/2 items-center gap-2 rounded-full border px-4 py-2 text-center text-sm font-semibold backdrop-blur-sm ${
                feedback.type === "success"
                  ? "border-sage/35 bg-sage/15 text-sage-deep"
                  : "border-beech/40 bg-beech/15 text-[#9A6A34]"
              }`}
            >
              <span aria-hidden>{feedback.type === "success" ? "✓" : "✋"}</span>
              {feedback.msg}
            </div>
          )}

          {/* guidance — 마리 선생님 */}
          <div className="pointer-events-none absolute bottom-3 left-3 max-h-[45vh] w-[min(392px,calc(100vw-1.5rem))] overflow-auto rounded-2xl border border-ink/10 bg-paper/80 p-4 shadow-[0_20px_50px_-30px_rgba(38,64,47,0.5)] backdrop-blur-md sm:bottom-4 sm:left-4 sm:p-5">
            <div className="flex items-center gap-3">
              <span
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
                style={{ background: "linear-gradient(135deg,#7fae97,#33503f)" }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <circle cx="12" cy="9.5" r="4.5" fill="#fff" opacity="0.95" />
                  <path d="M5 20c0-3.6 3.1-6 7-6s7 2.4 7 6" fill="#fff" opacity="0.95" />
                </svg>
              </span>
              <div>
                <div className="text-[13px] font-bold">마리 선생님</div>
                <div className="font-mono text-[11px] tracking-[0.1em] text-sage-deep">
                  <span aria-hidden>STEP {step} / {total}</span>
                  <span className="sr-only">단계 {step} / {total}</span>
                </div>
              </div>
            </div>
            <p className="mt-3.5 text-[15px] leading-relaxed" aria-live="polite">
              {instruction}
            </p>
            <div
              className="mt-4 flex h-6 items-end gap-[5px]"
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={total}
              aria-valuenow={placed}
              aria-label={`${total}개 중 ${placed}개 완성`}
            >
              {Array.from({ length: total }).map((_, i) => (
                <span
                  key={i}
                  aria-hidden
                  className="flex-1 rounded-t-sm"
                  style={{
                    height: `${34 + i * 7}%`,
                    background: i < placed ? "#5F8D76" : "rgba(44,50,45,0.12)",
                  }}
                />
              ))}
            </div>
          </div>
        </>
      )}

      {/* completion */}
      {completed && (
        <div className="absolute inset-0 flex items-center justify-center bg-pine/25 p-6 backdrop-blur-[2px]">
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="exp-complete-title"
            tabIndex={-1}
            className="w-[min(440px,100%)] rounded-2xl border border-ink/10 bg-paper/95 p-8 text-center shadow-[0_40px_80px_-40px_rgba(38,64,47,0.6)] focus:outline-none"
          >
            <div className="font-mono text-xs uppercase tracking-[0.2em] text-sage-deep">
              {total} / {total} · 완성
            </div>
            <h2
              id="exp-complete-title"
              className="mt-4 font-display text-3xl font-medium text-ink"
            >
              {meta.copy.completeTitle}
            </h2>
            <p className="mt-3 leading-relaxed text-ink/70">{meta.copy.completeBody}</p>
            <div className="mt-7 flex flex-col gap-2.5 sm:flex-row sm:justify-center">
              <button
                onClick={restart}
                className="rounded-md bg-sage px-6 py-3 font-semibold text-white transition-colors hover:bg-sage-deep"
              >
                다시 해보기
              </button>
              <Link
                href="/experience/"
                className="rounded-md border border-ink/15 px-6 py-3 font-semibold text-ink transition-colors hover:border-sage/50"
              >
                다른 교구 고르기
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function HudButton({
  label,
  onClick,
  children,
}: {
  label: string
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className="flex h-11 w-11 items-center justify-center rounded-xl border border-ink/10 bg-paper/80 text-ink shadow-[0_20px_50px_-30px_rgba(38,64,47,0.5)] backdrop-blur-md transition-colors hover:text-sage-deep"
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {children}
      </svg>
    </button>
  )
}
