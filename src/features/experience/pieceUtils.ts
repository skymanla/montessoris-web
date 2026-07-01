import * as THREE from "three"

/** An invisible, raycastable box used as a (touch-padded) pick target. */
export function makeCollider(w: number, h: number, d: number): THREE.Mesh {
  const m = new THREE.Mesh(
    new THREE.BoxGeometry(w, h, d),
    new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, depthWrite: false })
  )
  m.castShadow = false
  m.receiveShadow = false
  return m
}

/** Minimum collider edge so tiny pieces stay tappable on touch. */
export const MIN_HIT = 0.18
