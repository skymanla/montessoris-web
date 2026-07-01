import * as THREE from "three"
import type { MaterialSceneConfig } from "./scene"
import { makeCollider } from "./pieceUtils"

// 숫자막대 — 10 rods, length 1..10 dm, red/blue decimeter segments (leftmost red),
// left-aligned descending staircase, longest first.
const DM = 0.26 // one decimeter in world units
const T = 0.08 // cross-section
const COUNT = 10
const SUPPLY = [10, 4, 7, 2, 9, 5, 1, 8, 3, 6]
const RED = 0xc6413b
const BLUE = 0x3b6ba5

export const numberRodsConfig: MaterialSceneConfig = {
  count: COUNT,
  supplyOrder: SUPPLY,
  cameraPos: [0.2, 3.6, 4.6],
  target: [0, 0.15, 0],
  minDistance: 3,
  maxDistance: 12,
  maxPolarAngle: 1.35,
  liftY: 0.55, // below the lowest reachable camera height so the drag plane is always crossed
  placeRadius: 0.7,
  rugRadius: 3,
  grabEmissive: 0x3a1a18,
  resetYawOnPick: true,

  buildPiece(n) {
    const group = new THREE.Group()
    const materials: THREE.MeshStandardMaterial[] = []
    for (let i = 0; i < n; i++) {
      const mat = new THREE.MeshStandardMaterial({
        color: i % 2 === 0 ? RED : BLUE, // leftmost (i=0) always red
        roughness: 0.68,
        metalness: 0,
      })
      materials.push(mat)
      const seg = new THREE.Mesh(new THREE.BoxGeometry(DM, T, T), mat)
      seg.position.x = (i - (n - 1) / 2) * DM
      seg.castShadow = true
      seg.receiveShadow = true
      group.add(seg)
    }
    const collider = makeCollider(n * DM + 0.02, 0.16, 0.16)
    group.add(collider)
    return { object: group, collider, materials }
  },

  supplyTransform(i, n) {
    const L = n * DM
    const r = 1.6 + L * 0.28
    const angle = (-120 + i * (240 / (COUNT - 1))) * (Math.PI / 180)
    const yaw = (((i * 53) % 70) - 35) * (Math.PI / 180) // deterministic jitter −35..34°
    return { pos: [Math.sin(angle) * r, T / 2, Math.cos(angle) * r], yaw }
  },

  targetTransform(k) {
    const n = COUNT - k
    return { pos: [-1.3 + n * (DM / 2), T / 2, 0.5 - 0.11 * k] }
  },

  placementRef(pos, n) {
    const L = n * DM
    return { x: pos.x - L / 2, z: pos.z } // left end aligns to x = −1.3
  },

  hintPulse(p) {
    return [0.4 * p, 0.12 * p, 0.08 * p]
  },
}
