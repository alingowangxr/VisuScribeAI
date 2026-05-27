<!-- BEGIN:nextjs-agent-rules -->

# Next.js: ALWAYS read local docs before coding

This project uses Next.js `16.2.6`. Do not rely on training-data-era Next.js behavior.
Before changing routing, rendering, data fetching, caching, route handlers, metadata,
images, fonts, config, or environment-variable behavior, read the relevant guide in:

`node_modules/next/dist/docs/`

Common docs for this repo:

- `01-app/01-getting-started/05-server-and-client-components.md`
- `01-app/01-getting-started/15-route-handlers.md`
- `01-app/02-guides/environment-variables.md`
- `01-app/02-guides/ai-agents.md`

Heed deprecation notices and version-specific conventions.

<!-- END:nextjs-agent-rules -->

# VisuScribe AI Agent Guide

## Project Snapshot

VisuScribe AI turns an article or topic into a visual content plan: one cover image
plus multiple body images, with prompts, style presets, export formats, and optional
real image generation.

Installed stack is the source of truth:

- Next.js `16.2.6` App Router under `src/app`
- React `19.2.4`
- TypeScript strict mode with `@/*` mapped to `src/*`
- Tailwind CSS 4, shadcn/ui config in `components.json`, lucide icons
- Vercel AI SDK with OpenAI for text planning, plus a direct DALL-E image endpoint
- `next-themes`, custom context i18n, browser localStorage persistence

Note: `README.md` may lag behind the actual installed version. Prefer `package.json`
and `package-lock.json` when versions disagree.

## Commands

- Install: `npm install`
- Dev server: `npm run dev`
- Production build: `npm run build`
- Start built app: `npm run start`
- Lint: `npm run lint`

Run `npm run lint` after code changes. Run `npm run build` when touching Next config,
route handlers, server/client boundaries, generated types, or anything that can fail
only during production compilation.

## Environment

- Keep `.env*` files out of git.
- `.env.local` belongs at the repository root, not under `src`.
- `OPENAI_API_KEY` is server-only. Do not expose it with `NEXT_PUBLIC_`.
- Browser-visible configuration must use `NEXT_PUBLIC_` intentionally and should not
  contain secrets.
- If `OPENAI_API_KEY` is absent, image generation falls back to the mock provider in
  `src/lib/providers/image-gen.ts`.

## App Structure

- `src/app/page.tsx`: landing page.
- `src/app/editor/page.tsx`: main client editor workflow.
- `src/app/export/page.tsx`: URL-driven markdown/JSON export view.
- `src/app/gallery/page.tsx`: gallery/style preview.
- `src/app/api/breakdown/route.ts`: streams structured article-to-plan output.
- `src/app/api/generate/route.ts`: creates a generated image URL through a provider.
- `src/app/api/regenerate-image/route.ts`: regenerates one cover/body spec.
- `src/components/ui/*`: shadcn/ui primitives. Preserve their conventions.
- `src/components/editor/*`: editor-specific card, selector, prompt preview, compare UI.
- `src/hooks/*`: client hooks for AI calls, generation, persistence, and URL sync.
- `src/lib/types.ts`: shared domain types. Keep schemas in route handlers aligned with it.
- `src/lib/styles.ts`: style catalog and anchors. Changes here affect selection and prompt rendering.
- `src/lib/renderer.ts`: converts cover/body specs into image prompts.
- `src/lib/export-utils.ts`: markdown and JSON export generation.
- `src/lib/i18n.ts`: translation keys used by `I18nProvider`.

## Server And Client Boundaries

- App Router pages/layouts are Server Components by default.
- Add `'use client'` only when a component needs state, effects, browser APIs, event
  handlers, custom client hooks, localStorage, window, or third-party client behavior.
- Keep client boundaries as narrow as practical; a `'use client'` file pulls its imports
  into the client graph.
- Do not import server-only modules that read secrets into Client Components.
- Context providers must be Client Components and should be rendered as deep as practical.
- Props crossing from Server Components to Client Components must be serializable.

Current client-heavy areas include `src/app/editor/page.tsx`, `src/app/export/page.tsx`,
`src/app/gallery/page.tsx`, context providers, editor components, and hooks.

## Route Handlers And AI Calls

- Route handlers live only under `src/app/**/route.ts`.
- Use Web `Request`/`Response` APIs or Next's documented extensions.
- Validate request bodies before calling AI providers.
- Keep secrets and provider calls inside route handlers or server-only helpers.
- Return useful non-2xx responses for user-fixable errors and avoid leaking raw secrets.
- If changing the AI response shape, update all of these together:
  - Zod schema in the route handler
  - `src/lib/types.ts`
  - editor card fields
  - `src/lib/renderer.ts`
  - `src/lib/export-utils.ts`
- `breakdown` uses `streamObject(...).toTextStreamResponse()` and the client currently
  collects the full stream text before `JSON.parse`. Do not assume real-time partial UI
  updates exist unless you implement stream parsing end to end.

## State, Persistence, And URLs

- Editor state is persisted in browser localStorage with `cc2image_*` keys.
- Editor/export sharing serializes article and plan data into query parameters.
- Be careful with large plans or generated image URLs in query strings.
- Avoid reading `window`, `navigator`, `localStorage`, or `URL.createObjectURL` outside
  Client Components/effects/handlers.
- Preserve restore precedence: URL data should win over local draft restoration.

## Styling And UI

- Use Tailwind CSS 4 classes and CSS variables from `src/app/globals.css`.
- Follow the existing shadcn/ui and `components.json` aliases:
  - components: `@/components`
  - ui: `@/components/ui`
  - lib: `@/lib`
  - hooks: `@/hooks`
- Preserve dark/light theme support through `next-themes`.
- Keep Traditional Chinese UX copy coherent; add matching English keys when using i18n.
- Prefer existing UI primitives before adding new dependencies.

## Code Style

- TypeScript strict mode is enabled. Avoid `any` unless narrowing unknown provider errors
  is not practical in the local change.
- Formatting follows `.prettierrc`: no semicolons, single quotes, trailing commas `es5`,
  2-space indentation.
- Prefer small pure helpers in `src/lib` for shared logic.
- Keep domain terms consistent: `CoverSpec`, `BodySpec`, `ImagePlan`, `style_id`,
  `bottomSentence`, `generatedUrl`.
- Avoid changing generated/build output such as `.next`.

## Verification Checklist

Before finishing a meaningful change:

- Run `npm run lint`.
- Run `npm run build` for Next/runtime boundary or API/schema changes.
- Manually smoke-test affected flows when feasible:
  - `/editor` article breakdown
  - mock provider image generation
  - generated plan editing
  - `/export` markdown/JSON output
  - theme and language toggles

Use the `mock` provider for local UI verification when no OpenAI key is available.
