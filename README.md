![](ChatGPT%20Image%202026%E5%B9%B45%E6%9C%8829%E6%97%A5%20%E4%B8%8B%E5%8D%8806_59_02.png)

# VisuScribe AI

把長篇文章、選題或知識點，拆解成一套可編輯、可導出、可分享的視覺內容規劃。

VisuScribe AI 會把輸入內容整理成：

- 1 張封面圖
- 多張正文圖
- 每張圖對應的提示詞與結構化欄位
- 可導出的 Markdown / JSON
- 可選的真實圖片生成結果

## 主要能力

- `AI Breakdown`：將文章拆成封面與正文圖規劃
- `Prompt Rendering`：把規劃轉成可直接用的圖片提示詞
- `Style Catalog`：內建多套風格，可在編輯器切換
- `Real Image Generation`：支援 OpenAI GPT Image 2、Nano Banana Pro、Mock
- `URL Sharing`：可透過 URL 分享文章與規劃
- `Export`：輸出 Markdown、JSON，或視覺畫廊
- `Auto Save`：瀏覽器本地草稿保存與還原

## 技術棧

- Next.js 16.2.6 App Router
- React 19
- TypeScript strict mode
- Tailwind CSS 4
- shadcn/ui
- Vercel AI SDK + OpenAI
- next-themes
- Zod

## 專案結構

- `src/app/page.tsx`：首頁
- `src/app/editor/page.tsx`：主要編輯器
- `src/app/export/page.tsx`：導出頁
- `src/app/gallery/page.tsx`：風格預覽頁
- `src/app/api/breakdown/route.ts`：文章拆解 API
- `src/app/api/generate/route.ts`：圖片生成 API
- `src/app/api/regenerate-image/route.ts`：單卡重新規劃 API
- `src/lib/types.ts`：共享型別
- `src/lib/renderer.ts`：提示詞渲染
- `src/lib/export-utils.ts`：導出工具
- `src/lib/styles.ts`：風格與錨點

## 環境變數

在專案根目錄建立 `.env.local`：

```bash
OPENAI_API_KEY=your_openai_api_key_here
GEMINI_API_KEY=your_gemini_api_key_here
```

- `OPENAI_API_KEY`：用於文章拆解與 GPT Image 2 生圖
- `GEMINI_API_KEY`：選用 Nano Banana Pro 時需要
- 沒有 `OPENAI_API_KEY` 時，生圖會自動回退到 `mock`

## 快速開始

安裝相依：

```bash
npm install
```

啟動開發伺服器：

```bash
npm run dev
```

打開：

```text
http://localhost:3000
```

驗證：

```bash
npm run lint
npm run build
```

## 生圖引擎

| Provider | 值 | 說明 |
| --- | --- | --- |
| GPT Image 2 | `gpt-image-2` | 預設生圖引擎 |
| Nano Banana Pro | `nano-banana-pro` | Google 生圖引擎 |
| Mock | `mock` | 本機測試與無 key fallback |

## 使用流程

1. 在編輯器輸入文章內容，或貼上 URL。
2. 選擇風格、正文數量與生圖引擎。
3. 點擊 `AI Breakdown` 讓系統生成封面與正文規劃。
4. 手動微調每張卡片的欄位。
5. 選擇單張或批次生成真實圖片。
6. 前往 `Export` 下載 Markdown / JSON，或進入視覺畫廊導出 PNG。

## 目前行為

- `breakdown` 會以串流方式回傳結構化 JSON，前端會逐步嘗試解析。
- `plan_json` 與 `article` 會透過 URL 與本地草稿同步。
- `generatedUrl` 若是 `data:` 或 `blob:`，只會在本機暫存，不會被持久化成巨型字串。
- `Export` 頁面會優先讀取 URL 傳入的規劃資料。

## 驗證狀態

最近已完成：

- `npm run lint`
- `npm run build`
- 本機 `/editor`、`/export` 與三個 API route 的 smoke test

## 備註

- `.env.local` 請放在專案根目錄，不要放在 `src/` 下。
- `OPENAI_API_KEY` 只應在 server 端使用，不要加上 `NEXT_PUBLIC_`。
- 若要改 AI 回傳欄位，記得同步更新 route schema、`src/lib/types.ts`、renderer 與 export 工具。

