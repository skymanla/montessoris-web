export function isCounselPath(pathname: string | null) {
  return pathname === "/counsel" || pathname === "/counsel/"
}

// A specific material scene, e.g. /experience/pink-tower — immersive, no chrome.
// The /experience shelf itself keeps the global header/footer.
export function isExperienceScenePath(pathname: string | null) {
  return !!pathname && /^\/experience\/[^/]+\/?$/.test(pathname)
}

// Routes that render immersively, without the global header/footer chrome.
export function isChromelessPath(pathname: string | null) {
  return isCounselPath(pathname) || isExperienceScenePath(pathname)
}
