import { MaterialScene, type SceneCallbacks, type SceneCopy } from "./scene"
import { pinkTowerConfig } from "./pinkTower"
import { brownStairConfig } from "./brownStair"
import { numberRodsConfig } from "./numberRods"
import type { MaterialSlug } from "./materials"

const CONFIGS = {
  "pink-tower": pinkTowerConfig,
  "brown-stair": brownStairConfig,
  "number-rods": numberRodsConfig,
}

export function createScene(
  slug: MaterialSlug,
  container: HTMLElement,
  copy: SceneCopy,
  callbacks: SceneCallbacks
) {
  return new MaterialScene(container, CONFIGS[slug] ?? pinkTowerConfig, copy, callbacks)
}
