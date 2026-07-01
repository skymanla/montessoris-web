import * as THREE from "three"
import type { MaterialSceneConfig } from "./scene"
import { makeCollider, MIN_HIT } from "./pieceUtils"

// 갈색계단 — 10 prisms, same length, square section 1..10 units thick, thickest first.
const U = 0.08
const COUNT = 10
const LEN = 1.6 // 20cm, fixed for every prism (Z axis)
const SUPPLY = [10, 4, 7, 2, 9, 5, 1, 8, 3, 6]
const BROWN = 0x7a5a44

export const brownStairConfig: MaterialSceneConfig = {
  count: COUNT,
  supplyOrder: SUPPLY,
  cameraPos: [3.0, 4.2, 8.2],
  target: [0, 0.4, 0],
  minDistance: 4,
  maxDistance: 16,
  maxPolarAngle: 1.42,
  liftY: 1.4,
  placeRadius: 1.0,
  rugRadius: 3.4,
  grabEmissive: 0x241812,
  resetYawOnPick: false,

  buildPiece(n) {
    const t = n * U
    const mat = new THREE.MeshStandardMaterial({
      color: BROWN,
      roughness: 0.72,
      metalness: 0,
    })
    const prism = new THREE.Mesh(new THREE.BoxGeometry(t, t, LEN), mat)
    prism.castShadow = true
    prism.receiveShadow = true
    const group = new THREE.Group()
    group.add(prism)
    const hit = Math.max(t + 0.04, MIN_HIT)
    const collider = makeCollider(hit, hit, LEN)
    group.add(collider)
    return { object: group, collider, materials: [mat] }
  },

  supplyTransform(i, n) {
    const t = n * U
    return { pos: [(i - 4.5) * 0.72, t / 2, 2.2], yaw: 0 }
  },

  targetTransform(k) {
    let left = -2.2
    for (let j = 0; j < k; j++) left += (COUNT - j) * U
    const t = (COUNT - k) * U
    return { pos: [left + t / 2, t / 2, 0] }
  },

  placementRef(pos) {
    return { x: pos.x, z: pos.z }
  },

  hintPulse(p) {
    return [0.3 * p, 0.18 * p, 0.1 * p]
  },
}
