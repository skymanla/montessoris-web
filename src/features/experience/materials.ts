// Plain-data registry for the /experience material scenes.
// IMPORTANT: no three.js import here — this file is used by server components,
// generateStaticParams, and sitemap.ts, so it must stay cheap and bundle-safe.

export type MaterialSlug = "pink-tower" | "brown-stair" | "number-rods"

export type MaterialCopy = {
  start: string
  progressPraise: string
  successChip: string
  errorTooEarly: string
  errorOther: string
  completeTitle: string
  completeBody: string
}

export type MaterialMeta = {
  slug: MaterialSlug
  name: string // 분홍탑
  area: string // 감각영역 | 수영역
  age: string // 3–6세 | 4–6세
  eyebrow: string // HUD + shelf mono eyebrow, e.g. "감각영역 · 3–6세"
  pieceCount: number // drives TOTAL / STEP / progressbar
  concept: string // shelf one-liner
  dataLabel: string // "10 조각 · 크기 순서"
  metaDescription: string
  copy: MaterialCopy
}

// Order = didactic sensorial → math (single source of truth for shelf + routing).
export const MATERIALS: MaterialMeta[] = [
  {
    slug: "pink-tower",
    name: "분홍탑",
    area: "감각영역",
    age: "3–6세",
    eyebrow: "감각영역 · 3–6세",
    pieceCount: 10,
    concept: "크기와 차원의 감각",
    dataLabel: "10 조각 · 크기 순서",
    metaDescription:
      "몬테소리 분홍탑을 3D로 직접 쌓아보는 체험. 가장 큰 정육면체부터 순서대로 올리며 크기·차원의 개념과 집중력을 손으로 익힙니다.",
    copy: {
      start: "가장 큰 정육면체부터 찾아, 양탄자 가운데에 살며시 놓아보세요.",
      progressPraise:
        "잘하고 있어요. 이제 남은 것 중에서 가장 큰 정육면체를 위에 올려보세요.",
      successChip: "크기 순서가 맞아요",
      errorTooEarly: "이보다 더 큰 정육면체를 먼저 놓아볼까요?",
      errorOther: "조금 더 작은 정육면체의 차례예요.",
      completeTitle: "탑을 완성했어요",
      completeBody:
        "열 개의 정육면체를 가장 큰 것부터 차곡차곡 쌓아 올렸어요. 손끝으로 크기의 차이를 느끼며 스스로 찾아낸 순서예요. 그 고요한 집중의 순간이 아이를 자라게 합니다.",
    },
  },
  {
    slug: "brown-stair",
    name: "갈색계단",
    area: "감각영역",
    age: "3–6세",
    eyebrow: "감각영역 · 3–6세",
    pieceCount: 10,
    concept: "두께와 차원의 감각",
    dataLabel: "10 조각 · 두께 순서",
    metaDescription:
      "몬테소리 갈색계단을 3D로 직접 만들어보는 체험. 가장 두꺼운 기둥부터 나란히 놓으며 두께의 미세한 차이를 눈과 손끝으로 익힙니다.",
    copy: {
      start: "가장 두꺼운 기둥부터 찾아 바닥에 나란히 놓아보세요.",
      progressPraise:
        "잘하고 있어요. 남은 것 중 가장 두꺼운 기둥을 옆에 이어 놓아보세요.",
      successChip: "두께 순서가 맞아요",
      errorTooEarly: "더 두꺼운 기둥을 먼저 놓아볼까요?",
      errorOther: "조금 더 얇은 기둥 차례예요.",
      completeTitle: "계단을 완성했어요",
      completeBody:
        "열 개의 기둥을 두께 순서대로 나란히 놓아 넓은 계단을 완성했어요. 두께의 작은 차이를 눈과 손끝으로 하나하나 가늠하며 스스로 만들어낸 그 집중의 시간이 아이를 자라게 합니다.",
    },
  },
  {
    slug: "number-rods",
    name: "숫자막대",
    area: "수영역",
    age: "4–6세",
    eyebrow: "수영역 · 4–6세",
    pieceCount: 10,
    concept: "길이와 수량의 연결",
    dataLabel: "10 조각 · 길이 순서",
    metaDescription:
      "몬테소리 숫자막대를 3D로 직접 배열해보는 체험. 가장 긴 막대부터 왼쪽 끝을 맞춰 놓으며 '수'가 곧 길이이자 양임을 손으로 익힙니다.",
    copy: {
      start:
        "가장 긴 막대를 찾아 매트 아래쪽에 가지런히 놓아보세요. 빨강과 파랑 칸이 모두 열 칸인 막대예요.",
      progressPraise:
        "잘하고 있어요. 방금 놓은 막대보다 딱 한 칸 짧은 막대를 찾아, 왼쪽 끝을 맞춰 바로 위에 놓아보세요. 칸을 세어 보면 금방 찾을 수 있어요.",
      successChip: "딱 한 칸 짧아요",
      errorTooEarly:
        "그 막대는 조금 뒤에 놓을 거예요. 남은 것 중에서 가장 긴 막대를 먼저 찾아볼까요?",
      errorOther: "아직 이 자리는 아니에요. 왼쪽 끝을 맞추고 한 칸씩 짧아지게 놓아볼까요?",
      completeTitle: "계단이 완성됐어요",
      completeBody:
        "한 칸씩 짧아지는 열 개의 막대로 곧은 계단을 만들었어요. 왼쪽 끝을 맞추고 칸을 하나씩 세는 동안, 아이는 '수'가 곧 길이이고 양이라는 것을 손으로 느낍니다. 스스로 순서를 찾아낸 그 고요한 집중이 아이를 자라게 합니다.",
    },
  },
]

export const getMaterial = (slug: string): MaterialMeta | undefined =>
  MATERIALS.find((m) => m.slug === slug)
