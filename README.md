![](ChatGPT%20Image%202026%E5%B9%B45%E6%9C%8829%E6%97%A5%20%E4%B8%8B%E5%8D%8806_59_02.png)

# VisuScribe AI - 讓你的內容「一眼被看懂」

VisuScribe AI 是一個將長篇文章、選題或知識點，自動拆解為一套精美且風格統一的視覺資產（封面圖 + 正文圖）的 AI 生產力工具。

## ✨ 核心特性

![](<ChatGPT Image 2026年5月29日 下午07_01_12.png>)

- **🚀 雙引擎渲染架構**：
  - **AI Engine (GPT-Image-2)**：生成富有想像力的手繪、材質與藝術氛圍圖。
  - **Layout Engine (Guizang Style)**：基於 HTML/CSS 的專業平面設計排版，解決 AI 寫錯字問題。
- **🎨 Guizang 專業設計系統**：
  - **Editorial Magazine (雜誌風)**：人文感十足的思源宋體排版，適合深度文章。
  - **Swiss International (瑞士風)**：嚴謹網格與數據驅動的現代排版，適合產品發佈。
- **⚡ 實時所見即所得**：在編輯器中修改文字，Layout 佈局秒級更新，無需等待生成。
- **📸 漸進式串流與導出優化**：
  - **即時串流渲染 (Progressive Parsing)**：AI 文章拆解支援即時串流解析，卡片邊生成邊顯示，無須等待完整回應。
  - **專業列印排版 (PDF Print Stylesheet)**：內置 `@media print` 專屬樣式，完美支援「列印為 PDF」一鍵分頁高清導出。
  - **高清導出**：支援 2x 分辨率的 PNG 下載，專為小紅書 (3:4) 與微信 (21:9) 優化。

## 🛠️ 技術棧

- **框架**: [Next.js 16 (App Router)](https://nextjs.org/)
- **字體**: [Noto Serif SC (思源宋體)](https://fonts.google.com/noto/specimen/Noto+Serif+SC)
- **排版**: Tailwind CSS + Guizang Layout Recipes
- **AI 模型**: OpenAI GPT-Image-2 (DALL-E 3 優化版)
- **導出**: html-to-image (2x Retina Rendering)

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

啟動後，請造訪 <http://localhost:3000> 即可開始使用。

### 4. 驗證

```bash
npm run lint
npm run build
```

## 🖼️ 生圖引擎

| Provider | 模型 | 用途 | 需要環境變數 |
| --- | --- | --- | --- |
| GPT Image 2 | `gpt-image-2` | 預設生圖引擎 | `OPENAI_API_KEY` |
| Nano Banana Pro | `gemini-3-pro-image-preview` | Google 備用生圖引擎 | `GEMINI_API_KEY` |
| Mock Mode | Placeholder | 無 key 或本地 UI 測試 | 無 |

目前不會在 GPT Image 2 失敗時自動切到 Nano Banana Pro；使用者需要在編輯器右上角手動選擇引擎，避免跨供應商產生不可預期成本。

## ✨ 核心功能

- **🧠 AI 文章拆解**：輸入文章內容，AI 自動規劃 1 張封面（21:9）與 N 張正文配圖（16:9）。支援漸進式串流解析，卡片邊生成邊填充，顯著優化載入體驗。
- **🎨 39 套專業風格**：支援「手繪知識風」、「典籍山水風」、「具象標注風」、「人群造字風」等 39 套內置風格。
- **⚡ 批次生圖佇列**：一鍵生成整套視覺資產，頂部導覽列帶有即時進度條追蹤。
- **🌓 A/B 對比模式**：全屏對比兩套不同風格的 Prompt 渲染效果，輔助視覺決策。
- **🌐 多語言支援**：完整支持繁體中文與 English 介面切換。
- **💾 本地草稿存檔**：編輯進度自動保存於瀏覽器，意外關閉後可隨時恢復。
- **🧹 一鍵清除重置**：支援在編輯器中一鍵清除本地快取草稿並重置編輯器回預設狀態（支援中英雙語）。
- **🚀 生成效能與視覺優化**：
  - AI 生圖自動在前端底層轉為輕量級 Blob 物件網址，徹底避免生成大量圖片時瀏覽器記憶體洩漏與卡死崩潰的問題。
  - 全站 100% 採用 Next.js `Image` 元件封裝，徹底解決傳統 `<img>` 標籤的 LCP 與累積佈局偏移（CLS）問題，完美相容 ESLint 規範。
- **🔗 URL 持久化與安全防護**：支援透過 URL 分享完整的規劃方案，實現跨裝置協作。內建 URL 參數長度自動裁剪與智慧降級演算法，防止因超長內文同步導致網頁 HTTP 414 URI Too Long 錯誤。
- **🔌 插件化引擎**：支援在 GPT Image 2、Nano Banana Pro 與 Mock 引擎間自由切換。
- **🛡️ 專案健壯度**：全站通過 ESLint/TypeScript 嚴格模式編譯，零 Error 與零 Warning。

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

## 🤝 鳴謝與致敬

本專案在開發與設計過程中，深刻借鑑與吸收了以下優秀開源專案的核心思想與美術排版精髓，特此致敬：

1. [**cc2image**](https://github.com/izscc/cc2image)：本專案在 UI 編輯器工作流、多卡片正文配圖規劃思路上，吸收了 `cc2image` 創新的產品工作流哲學，為使用者提供連貫且高效率的視覺資產生成體驗。
2. [**guizang-social-card-skill**](https://github.com/op7418/guizang-social-card-skill)：本專案所採用極富人文氣息的「歸藏排版配方與佈局架構」（包括雜誌 Editorial 與瑞士 Swiss 風格），在 CSS 網格設計、字體排版佈局與美術設計規範上，深度借鑑了該專案的精緻視覺體系與設計規則。

---

© 2026 VisuScribe AI Project. 讓你的內容「一眼被看懂」。

