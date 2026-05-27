# VisuScribe AI - 讓你的內容「一眼被看懂」

VisuScribe AI 是一個將長篇文章、選題或知識點，自動拆解為一套精美且風格統一的視覺資產（封面圖 + 正文圖）的 AI 生產力工具。

## 🚀 快速開始

### 1. 環境設定

在根目錄下建立 `.env.local` 檔案，並填入你的 API Key：

```bash
OPENAI_API_KEY=your_openai_api_key_here
GEMINI_API_KEY=your_gemini_api_key_here
```

`OPENAI_API_KEY` 是主要必填，用於文章拆解、圖片規劃與 GPT Image 2 生圖。`GEMINI_API_KEY` 是選填，用於 Google Nano Banana Pro 備用生圖引擎。

如果沒有設定 `OPENAI_API_KEY`，生圖會自動回退到 Mock placeholder 圖片；如果選擇 Nano Banana Pro 但沒有設定 `GEMINI_API_KEY`，API 會回傳缺少 key 的錯誤。

### 2. 安裝相依

```bash
npm install
```

### 3. 啟動開發伺服器

```bash
npm run dev
```

啟動後，請造訪 [http://localhost:3000](http://localhost:3000) 即可開始使用。

### 4. 驗證

```bash
npm run lint
npm run build
```

## 🖼️ 生圖引擎

| Provider        | 模型                         | 用途                  | 需要環境變數     |
| --------------- | ---------------------------- | --------------------- | ---------------- |
| GPT Image 2     | `gpt-image-2`                | 預設生圖引擎          | `OPENAI_API_KEY` |
| Nano Banana Pro | `gemini-3-pro-image-preview` | Google 備用生圖引擎   | `GEMINI_API_KEY` |
| Mock Mode       | Placeholder                  | 無 key 或本地 UI 測試 | 無               |

目前不會在 GPT Image 2 失敗時自動切到 Nano Banana Pro；使用者需要在編輯器右上角手動選擇引擎，避免跨供應商產生不可預期成本。

## ✨ 核心功能

- **🧠 AI 文章拆解**：輸入文章內容，AI 自動規劃 1 張封面（21:9）與 N 張正文配圖（16:9）。
- **🎨 34 套專業風格**：支援「手繪知識風」、「典籍山水風」、「磨砂情緒風」等 34 套內置風格。
- **⚡ 批次生圖佇列**：一鍵生成整套視覺資產，頂部導覽列帶有即時進度條追蹤。
- **🌓 A/B 對比模式**：全屏對比兩套不同風格的 Prompt 渲染效果，輔助視覺決策。
- **🌐 多語言支援**：完整支持繁體中文與 English 介面切換。
- **💾 本地草稿存檔**：編輯進度自動保存於瀏覽器，意外關閉後可隨時恢復。
- **🔗 URL 持久化**：支援透過 URL 分享完整的規劃方案，實現跨裝置協作。
- **🔌 插件化引擎**：支援在 GPT Image 2、Nano Banana Pro 與 Mock 引擎間自由切換。

## 🛠️ 技術棧

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS 4 + shadcn/ui
- **AI SDK**: Vercel AI SDK (OpenAI gpt-4o / gpt-image-2) + Gemini API (Nano Banana Pro)
- **Theme**: next-themes (Support Dark/Light mode)
- **i18n**: Custom Context-based i18n implementation
- **Validation**: Zod schemas

## 📁 目錄結構

- `src/app/`：頁面路由 (Editor, Export, Gallery) 與 API 接口 (Breakdown, Generate)。
- `src/components/`：可複用的 UI 元件與專業編輯器組件 (CompareMode, StyleSelector)。
- `src/hooks/`：核心邏輯封裝 (useBreakdown, useGenerate, usePersistence)。
- `src/lib/`：風格定義、Prompt 渲染引擎、導出工具與多語言辭典。

---

© 2026 VisuScribe AI Project. 讓你的內容「一眼被看懂」。
