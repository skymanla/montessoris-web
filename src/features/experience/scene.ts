import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"

export interface PieceBuild {
  /** Group centered at its geometric center; positioned by the engine. */
  object: THREE.Object3D
  /** Raycast target (visible=true, may be transparent). */
  collider: THREE.Object3D
  /** MeshStandardMaterials to tint on grab / hint. */
  materials: THREE.MeshStandardMaterial[]
}

export interface MaterialSceneConfig {
  count: number
  supplyOrder: number[]
  cameraPos: [number, number, number]
  target: [number, number, number]
  minDistance: number
  maxDistance: number
  maxPolarAngle: number
  liftY: number
  placeRadius: number
  rugRadius: number
  grabEmissive: number
  resetYawOnPick: boolean
  buildPiece: (n: number) => PieceBuild
  supplyTransform: (i: number, n: number) => { pos: [number, number, number]; yaw: number }
  targetTransform: (k: number) => { pos: [number, number, number] }
  /** Drop-test reference point for a piece of grade n at world pos. */
  placementRef: (pos: THREE.Vector3, n: number) => { x: number; z: number }
  hintPulse: (p: number) => [number, number, number]
}

export interface SceneCopy {
  start: string
  progressPraise: string
  successChip: string
  errorTooEarly: string
  errorOther: string
}

export interface SceneCallbacks {
  onProgress: (placed: number, total: number) => void
  onFeedback: (type: "success" | "error" | "info", message: string) => void
  onComplete: () => void
}

type Piece = {
  object: THREE.Object3D
  collider: THREE.Object3D
  materials: THREE.MeshStandardMaterial[]
  n: number
  origin: THREE.Vector3
  originYaw: number
  placed: boolean
  anim: { target: THREE.Vector3; onDone?: () => void } | null
  yawTarget: number
  hint: boolean
}

export class MaterialScene {
  private container: HTMLElement
  private cfg: MaterialSceneConfig
  private copy: SceneCopy
  private cb: SceneCallbacks
  private renderer: THREE.WebGLRenderer
  private scene: THREE.Scene
  private camera: THREE.PerspectiveCamera
  private controls: OrbitControls
  private keyLight!: THREE.DirectionalLight
  private raycaster = new THREE.Raycaster()
  private pointer = new THREE.Vector2()
  private dragPlane: THREE.Plane
  private pieces: Piece[] = []
  private colliderMap = new Map<THREE.Object3D, Piece>()
  private placed = 0
  private completedFired = false
  private dragging: Piece | null = null
  private activePointerId: number | null = null
  private hovered: Piece | null = null
  private hintTimer = 0
  private raf = 0
  private paused = false
  private disposed = false
  private reduced: boolean
  private clock = new THREE.Clock()
  private resizeObs: ResizeObserver
  private orientTimer: ReturnType<typeof setTimeout> | null = null
  private baseDist = 1
  private wasPortrait = false

  constructor(
    container: HTMLElement,
    config: MaterialSceneConfig,
    copy: SceneCopy,
    callbacks: SceneCallbacks
  ) {
    this.container = container
    this.cfg = config
    this.copy = copy
    this.cb = callbacks
    this.reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    this.dragPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), -config.liftY)

    const w = container.clientWidth || 1
    const h = container.clientHeight || 1

    this.renderer = new THREE.WebGLRenderer({ antialias: true })
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    this.renderer.setSize(w, h)
    this.renderer.shadowMap.enabled = true
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping
    this.renderer.toneMappingExposure = 1.05
    container.appendChild(this.renderer.domElement)
    const cv = this.renderer.domElement
    cv.style.display = "block"
    cv.style.touchAction = "none"
    cv.style.userSelect = "none"
    cv.style.setProperty("-webkit-user-select", "none")
    cv.style.setProperty("-webkit-touch-callout", "none")

    this.scene = new THREE.Scene()
    this.scene.background = new THREE.Color("#ECE6DA")
    this.scene.fog = new THREE.Fog("#ECE6DA", 9, 22)

    this.camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100)
    this.camera.position.set(...config.cameraPos)

    this.controls = new OrbitControls(this.camera, cv)
    this.controls.target.set(...config.target)
    this.controls.enableDamping = !this.reduced
    this.controls.dampingFactor = 0.08
    this.controls.enablePan = false
    this.controls.minDistance = config.minDistance
    this.controls.maxDistance = config.maxDistance
    this.controls.maxPolarAngle = config.maxPolarAngle

    this.baseDist = this.camera.position.distanceTo(this.controls.target)
    this.wasPortrait = w / h < 1
    this.frameForAspect()
    this.controls.update()
    this.controls.saveState()

    this.buildLights()
    this.buildGround()
    this.buildPieces()

    cv.addEventListener("pointerdown", this.onPointerDown)
    cv.addEventListener("pointermove", this.onPointerMove)
    window.addEventListener("pointerup", this.onPointerUp)
    window.addEventListener("pointercancel", this.onPointerCancel)
    document.addEventListener("visibilitychange", this.onVisibility)
    window.addEventListener("orientationchange", this.onOrient)

    this.resizeObs = new ResizeObserver(this.onResize)
    this.resizeObs.observe(container)

    this.cb.onProgress(0, config.count)
    this.animate()
  }

  // Re-fit the framing distance for the current aspect, PRESERVING the user's
  // current orbit direction (don't snap back to the construction-time angle).
  private frameForAspect() {
    const aspect = this.camera.aspect
    const factor = aspect < 1 ? Math.min(1.85, 0.92 / aspect) : 1
    const dir = this.camera.position.clone().sub(this.controls.target)
    if (dir.lengthSq() < 1e-6) dir.set(0, 0, 1)
    dir.normalize()
    this.camera.position
      .copy(this.controls.target)
      .addScaledVector(dir, this.baseDist * factor)
  }

  private buildLights() {
    this.scene.add(new THREE.HemisphereLight(0xffffff, 0xd8cbb0, 0.65))
    const key = new THREE.DirectionalLight(0xfff4e6, 2.1)
    key.position.set(4, 8, 5)
    key.castShadow = true
    key.shadow.mapSize.set(2048, 2048)
    key.shadow.camera.near = 1
    key.shadow.camera.far = 25
    const s = 7
    key.shadow.camera.left = -s
    key.shadow.camera.right = s
    key.shadow.camera.top = s
    key.shadow.camera.bottom = -s
    key.shadow.bias = -0.0004
    this.scene.add(key)
    this.keyLight = key
    const fill = new THREE.DirectionalLight(0xffffff, 0.35)
    fill.position.set(-5, 3, -2)
    this.scene.add(fill)
  }

  private buildGround() {
    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(60, 60),
      new THREE.MeshStandardMaterial({ color: "#F2EEE4", roughness: 1 })
    )
    floor.rotation.x = -Math.PI / 2
    floor.receiveShadow = true
    this.scene.add(floor)

    const rug = new THREE.Mesh(
      new THREE.CircleGeometry(this.cfg.rugRadius, 64),
      new THREE.MeshStandardMaterial({ color: "#E7E0D0", roughness: 1 })
    )
    rug.rotation.x = -Math.PI / 2
    rug.position.y = 0.002
    rug.receiveShadow = true
    this.scene.add(rug)
  }

  private buildPieces() {
    this.cfg.supplyOrder.forEach((n, i) => {
      const { object, collider, materials } = this.cfg.buildPiece(n)
      const { pos, yaw } = this.cfg.supplyTransform(i, n)
      object.position.set(...pos)
      object.rotation.y = yaw
      this.scene.add(object)
      const piece: Piece = {
        object,
        collider,
        materials,
        n,
        origin: new THREE.Vector3(...pos),
        originYaw: yaw,
        placed: false,
        anim: null,
        yawTarget: yaw,
        hint: false,
      }
      this.pieces.push(piece)
      this.colliderMap.set(collider, piece)
    })
  }

  // ---- interaction ----

  private setPointer(e: PointerEvent) {
    const rect = this.renderer.domElement.getBoundingClientRect()
    this.pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
    this.pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1
  }

  private pick(): Piece | null {
    this.raycaster.setFromCamera(this.pointer, this.camera)
    const colliders = this.pieces
      .filter((p) => !p.placed && !p.anim)
      .map((p) => p.collider)
    const hit = this.raycaster.intersectObjects(colliders, false)[0]
    if (!hit) return null
    return this.colliderMap.get(hit.object) ?? null
  }

  private setEmissive(piece: Piece, hex: number) {
    piece.materials.forEach((m) => m.emissive.setHex(hex))
  }

  private releaseCapture() {
    if (this.activePointerId !== null) {
      try {
        this.renderer.domElement.releasePointerCapture(this.activePointerId)
      } catch {
        /* pointer already released */
      }
      this.activePointerId = null
    }
  }

  private endDrag() {
    this.dragging = null
    this.controls.enabled = true
    this.renderer.domElement.style.cursor = "default"
    this.hovered = null
    this.releaseCapture()
  }

  private onPointerDown = (e: PointerEvent) => {
    if (this.dragging) return // single-pointer lock
    if (e.button !== 0) return // primary button / touch only
    this.setPointer(e)
    const piece = this.pick()
    if (piece) {
      this.dragging = piece
      this.activePointerId = e.pointerId
      try {
        this.renderer.domElement.setPointerCapture(e.pointerId)
      } catch {
        /* capture unsupported */
      }
      this.controls.enabled = false
      this.renderer.domElement.style.cursor = "grabbing"
      this.setEmissive(piece, this.cfg.grabEmissive)
      if (this.cfg.resetYawOnPick) piece.yawTarget = 0
    }
  }

  private onPointerMove = (e: PointerEvent) => {
    if (this.dragging) {
      if (this.activePointerId !== null && e.pointerId !== this.activePointerId) return
      this.setPointer(e)
      this.raycaster.setFromCamera(this.pointer, this.camera)
      const p = new THREE.Vector3()
      if (
        this.raycaster.ray.intersectPlane(this.dragPlane, p) &&
        Math.abs(p.x) < 20 &&
        Math.abs(p.z) < 20
      ) {
        this.dragging.object.position.set(p.x, this.cfg.liftY, p.z)
      }
      return
    }
    this.setPointer(e)
    const piece = this.pick()
    if (piece !== this.hovered) {
      this.hovered = piece
      this.renderer.domElement.style.cursor = piece ? "grab" : "default"
    }
  }

  private onPointerUp = (e?: PointerEvent) => {
    const piece = this.dragging
    if (!piece) return
    if (e && this.activePointerId !== null && e.pointerId !== this.activePointerId) return
    this.endDrag()
    if (!piece.hint) this.setEmissive(piece, 0x000000)

    const correctN = this.cfg.count - this.placed
    const targetPos = new THREE.Vector3(...this.cfg.targetTransform(this.placed).pos)
    const tref = this.cfg.placementRef(targetPos, correctN)
    const pref = this.cfg.placementRef(piece.object.position, piece.n)
    const dist = Math.hypot(pref.x - tref.x, pref.z - tref.z)
    const isCorrect = piece.n === correctN

    if (dist <= this.cfg.placeRadius && isCorrect) {
      this.placePiece(piece)
    } else if (dist <= this.cfg.placeRadius && !isCorrect) {
      this.returnToOrigin(piece)
      this.cb.onFeedback(
        "error",
        piece.n < correctN ? this.copy.errorTooEarly : this.copy.errorOther
      )
    } else {
      this.returnToOrigin(piece)
      // correct piece dropped too far from its slot — re-prompt gently
      if (isCorrect) {
        this.cb.onFeedback(
          "info",
          this.placed === 0 ? this.copy.start : this.copy.progressPraise
        )
      }
    }
  }

  // A cancelled pointer (palm rejection, gesture takeover, rotation) is not an
  // intentional drop — return the piece home rather than run the drop test.
  private onPointerCancel = (e: PointerEvent) => {
    const piece = this.dragging
    if (!piece) return
    if (this.activePointerId !== null && e.pointerId !== this.activePointerId) return
    this.endDrag()
    if (!piece.hint) this.setEmissive(piece, 0x000000)
    this.returnToOrigin(piece)
  }

  private placePiece(piece: Piece) {
    const targetPos = new THREE.Vector3(...this.cfg.targetTransform(this.placed).pos)
    this.placed += 1
    piece.placed = true
    piece.hint = false
    piece.yawTarget = 0
    this.setEmissive(piece, 0x000000)
    this.animateTo(piece, targetPos, () => {
      if (this.placed === this.cfg.count && !this.completedFired) {
        this.completedFired = true
        this.cb.onComplete()
      }
    })
    this.cb.onProgress(this.placed, this.cfg.count)
    this.cb.onFeedback("success", this.copy.successChip)
  }

  private animateTo(piece: Piece, target: THREE.Vector3, onDone?: () => void) {
    piece.anim = { target: target.clone(), onDone }
  }

  private returnToOrigin(piece: Piece) {
    piece.yawTarget = piece.originYaw
    this.animateTo(piece, piece.origin)
  }

  private onResize = () => {
    const w = this.container.clientWidth || 1
    const h = this.container.clientHeight || 1
    this.camera.aspect = w / h
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(w, h)
    // re-fit only when the orientation flips, so we don't stomp the user's zoom
    const portrait = this.camera.aspect < 1
    if (portrait !== this.wasPortrait) {
      this.wasPortrait = portrait
      this.frameForAspect()
    }
  }

  private onOrient = () => {
    this.orientTimer = setTimeout(() => {
      if (this.disposed) return
      this.onResize()
      this.frameForAspect()
      this.controls.update()
    }, 250)
  }

  private onVisibility = () => {
    if (document.hidden) {
      this.paused = true
      cancelAnimationFrame(this.raf)
    } else if (this.paused && !this.disposed) {
      this.paused = false
      this.clock.getDelta() // discard the long paused interval
      this.animate()
    }
  }

  // ---- public controls ----

  reset() {
    if (this.dragging) this.endDrag()
    this.completedFired = false
    this.pieces.forEach((p) => {
      p.placed = false
      p.hint = false
      p.yawTarget = p.originYaw
      this.setEmissive(p, 0x000000)
      this.animateTo(p, p.origin)
    })
    this.placed = 0
    this.cb.onProgress(0, this.cfg.count)
  }

  resetView() {
    this.controls.reset()
    this.frameForAspect()
  }

  hint() {
    // clear any prior hint so only one piece ever pulses
    this.pieces.forEach((p) => {
      if (p.hint) {
        p.hint = false
        if (p !== this.dragging) this.setEmissive(p, 0x000000)
      }
    })
    const nextN = this.cfg.count - this.placed
    const piece = this.pieces.find((p) => p.n === nextN && !p.placed)
    if (!piece) return
    piece.hint = true
    this.hintTimer = 1.6
    if (this.reduced) {
      const [r, g, b] = this.cfg.hintPulse(1)
      piece.materials.forEach((m) => m.emissive.setRGB(r, g, b))
    }
    this.cb.onFeedback(
      "info",
      this.placed === 0 ? this.copy.start : this.copy.progressPraise
    )
  }

  /** Non-pointer path: place the next correct piece (keyboard / assistive use). */
  placeNext() {
    if (this.placed >= this.cfg.count) return
    const correctN = this.cfg.count - this.placed
    const piece = this.pieces.find((p) => p.n === correctN && !p.placed)
    if (!piece || piece.anim) return
    if (this.dragging) {
      const dragged = this.dragging
      this.endDrag()
      if (dragged !== piece) {
        if (!dragged.hint) this.setEmissive(dragged, 0x000000)
        this.returnToOrigin(dragged)
      }
    }
    this.placePiece(piece)
  }

  private animate = () => {
    this.raf = requestAnimationFrame(this.animate)
    const dt = Math.min(this.clock.getDelta(), 0.1)
    const posF = this.reduced ? 1 : 1 - Math.pow(1 - 0.2, dt * 60)
    const yawF = this.reduced ? 1 : 1 - Math.pow(1 - 0.25, dt * 60)

    for (const p of this.pieces) {
      if (p.anim) {
        p.object.position.lerp(p.anim.target, posF)
        if (p.object.position.distanceTo(p.anim.target) < 0.004) {
          p.object.position.copy(p.anim.target)
          const done = p.anim.onDone
          p.anim = null
          done?.()
        }
      }
      if (Math.abs(p.object.rotation.y - p.yawTarget) > 0.001) {
        p.object.rotation.y += (p.yawTarget - p.object.rotation.y) * yawF
      }
      if (p.hint && !p.placed && p !== this.dragging && !this.reduced) {
        const pulse = (Math.sin(performance.now() * 0.008) + 1) / 2
        const [r, g, b] = this.cfg.hintPulse(pulse)
        p.materials.forEach((m) => m.emissive.setRGB(r, g, b))
      }
    }

    if (this.hintTimer > 0) {
      this.hintTimer -= dt
      if (this.hintTimer <= 0) {
        this.pieces.forEach((p) => {
          if (p.hint) {
            p.hint = false
            if (p !== this.dragging) this.setEmissive(p, 0x000000)
          }
        })
      }
    }

    this.controls.update()
    this.renderer.render(this.scene, this.camera)
  }

  dispose() {
    this.disposed = true
    cancelAnimationFrame(this.raf)
    if (this.orientTimer) {
      clearTimeout(this.orientTimer)
      this.orientTimer = null
    }
    this.resizeObs.disconnect()
    const cv = this.renderer.domElement
    cv.removeEventListener("pointerdown", this.onPointerDown)
    cv.removeEventListener("pointermove", this.onPointerMove)
    window.removeEventListener("pointerup", this.onPointerUp)
    window.removeEventListener("pointercancel", this.onPointerCancel)
    document.removeEventListener("visibilitychange", this.onVisibility)
    window.removeEventListener("orientationchange", this.onOrient)
    this.controls.dispose()
    this.keyLight.shadow.dispose()
    this.scene.traverse((o) => {
      if (o instanceof THREE.Mesh) {
        o.geometry.dispose()
        const m = o.material
        if (Array.isArray(m)) m.forEach((x) => x.dispose())
        else m.dispose()
      }
    })
    this.renderer.dispose()
    this.renderer.forceContextLoss()
    if (cv.parentNode === this.container) this.container.removeChild(cv)
  }
}
