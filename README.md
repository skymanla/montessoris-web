# montessoris.net

몬테소리 교육 정보, 블로그, 24시간 AI 육아 상담 위젯을 제공하는 한국어 정적 웹사이트입니다.

## Tech Stack

- Next.js 16 App Router
- React 19
- Tailwind CSS
- MDX blog posts with `gray-matter`
- Static export via `next.config.mjs`

## Scripts

```bash
npm run dev
npm run lint
npm run build
```

`npm run build`는 `output: "export"` 설정에 따라 정적 산출물을 `out/`에 생성합니다.

## Project Structure

- `src/app`: App Router routes, metadata, sitemap, robots
- `src/features`: page-level feature components
- `src/components`: shared layout and UI components
- `src/lib`: site config, dictionaries, metadata helpers, structured data, post loading
- `src/posts`: MDX blog content
- `public`: static assets and `ads.txt`

## Content

블로그 글은 `src/posts/*.mdx`에 추가합니다. 각 글에는 아래 frontmatter가 필요합니다.

```mdx
---
title: "글 제목"
date: "2026-06-10"
description: "검색 결과와 목록에 표시될 설명"
---
```

빌드 시 `src/lib/posts.ts`가 frontmatter를 검증하고, `/blog/[slug]/` 정적 페이지와 sitemap 항목을 생성합니다.

## Counseling API

상담 위젯은 브라우저에서 외부 API를 직접 호출합니다.

API base URL 우선순위:

1. `NEXT_PUBLIC_API_BASE_URL`
2. 로컬 접속 시 `http://localhost:8080`
3. 운영 기본값 `https://ai-api.trigger.kr`

관련 파일:

- `src/features/counsel/counselConfig.ts`
- `src/features/counsel/chatApi.ts`
- `src/features/counsel/chatStorage.ts`
- `src/features/counsel/useChatSession.ts`

## SEO and Analytics

- 공통 사이트 정보: `src/lib/site.ts`
- 페이지 메타데이터 헬퍼: `src/lib/metadata.ts`
- JSON-LD: `src/lib/structured-data.ts`
- sitemap: `src/app/sitemap.ts`
- robots: `src/app/robots.ts`
- RSS: `src/app/rss.xml/route.ts`
- Google AdSense/GTM: `src/app/layout.tsx`

## Deployment

`main` 브랜치 push 시 `.github/workflows/deploy.yml`이 SSH로 배포 서버의 forced command를 호출합니다. 실제 배포 스크립트는 서버의 `/usr/local/bin/deploy-montessoris` 쪽에서 관리됩니다.

## Notes

- 현재 사이트는 한국어 단일 로케일입니다.
- `/contact` 페이지는 남아 있지만 푸터에서는 노출하지 않습니다.
- 정적 export 사이트라 서버 API Route에 의존하지 않습니다.
