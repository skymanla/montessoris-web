import * as THREE from "three"
import type { MaterialSceneConfig } from "./scene"
import { makeCollider, MIN_HIT } from "./pieceUtils"

// 분홍탑 — 10 cubes, edges 1..10 units, centered vertical stack, largest first.
const U = 0.08
const COUNT = 10
const SUPPLY = [10, 4, 7, 2, 9, 5, 1, 8, 3, 6]
const PINK = 0xdd93a6

export const pinkTowerConfig: MaterialSceneConfig = {
  count: COUNT,
  supplyOrder: SUPPLY,
  cameraPos: [4.2, 3.2, 6.0],
  target: [0, 2.0, 0],
  minDistance: 3.5,
  maxDistance: 14,
  maxPolarAngle: 1.5,
  liftY: 1.4,
  placeRadius: 1.0,
  rugRadius: 3,
  grabEmissive: 0x3a2229,
  resetYawOnPick: false,

  buildPiece(n) {
    const edge = n * U
    const mat = new THREE.MeshStandardMaterial({
      color: PINK,
      roughness: 0.72,
      metalness: 0,
    })
    const cube = new THREE.Mesh(new THREE.BoxGeometry(edge, edge, edge), mat)
    cube.castShadow = true
    cube.receiveShadow = true
    const group = new THREE.Group()
    group.add(cube)
    const hit = Math.max(edge + 0.04, MIN_HIT)
    const collider = makeCollider(hit, hit, hit)
    group.add(collider)
    return { object: group, collider, materials: [mat] }
  },

  supplyTransform(i, n) {
    const edge = n * U
    const angle = (-130 + i * (260 / (COUNT - 1))) * (Math.PI / 180)
    const r = 2.0 + edge * 0.6
    return { pos: [Math.sin(angle) * r, edge / 2, Math.cos(angle) * r], yaw: 0 }
  },

  targetTransform(k) {
    let bottom = 0
    for (let j = 0; j < k; j++) bottom += (COUNT - j) * U
    const edge = (COUNT - k) * U
    return { pos: [0, bottom + edge / 2, 0] }
  },

  placementRef(pos) {
    return { x: pos.x, z: pos.z }
  },

  hintPulse(p) {
    return [0.35 * p, 0.12 * p, 0.18 * p]
  },
}
