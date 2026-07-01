import { MATERIALS } from "@/features/experience/materials"

const SCENE_SLUGS = new Set<string>(MATERIALS.map((m) => m.slug))

export function isCounselPath(pathname: string | null) {
  return pathname === "/counsel" || pathname === "/counsel/"
}

// A real material scene, e.g. /experience/pink-tower — immersive, no chrome.
// The /experience shelf and unknown slugs (404) keep the global header/footer.
export function isExperienceScenePath(pathname: string | null) {
  if (!pathname) return false
  const m = pathname.match(/^\/experience\/([^/]+)\/?$/)
  return !!m && SCENE_SLUGS.has(m[1])
}

// Routes that render immersively, without the global header/footer chrome.
export function isChromelessPath(pathname: string | null) {
  return isCounselPath(pathname) || isExperienceScenePath(pathname)
}
