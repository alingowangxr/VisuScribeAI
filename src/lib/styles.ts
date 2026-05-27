import { BodyStructure, StyleInfo } from './types'

export const STYLE_ANCHORS: Record<string, string> = {
  handdrawn_knowledge_card:
    '整體風格像高質量中文知識博主的手繪知識圖解系統：暖白紙感背景，黑灰細線手繪，低飽和淺色塊，中文手寫字，自然成熟，剋制精緻，留白充足，輕商業內容資產感。不要做成 PPT，不要課程課件，不要科技海報，不要 3D，不要可愛兒童插畫，不要複雜信息圖，不要密集小字，不要高飽和顏色，不要英文亂碼，不要水印。',
  oriental_editorial_illustration:
    '整體風格為典籍山水風：暖白宣紙質感背景，低飽和藍金配色，石青、金色、米白、墨灰為主，畫面像高端文化雜誌或圖書封面。主體使用巨大文化隱喻物，例如打開的古籍、卷軸、山河、地圖、書頁、河流。加入少量微縮人物，人物像行走在典籍和山水之間。整體詩意、剋制、留白充足，有歷史感、文化感、東方美學和高級出版物質感。',
  study_note_card:
    '整體風格為學習筆記風：米白紙張背景，中間是一張帶輕微陰影的筆記紙卡片，周圍有膠帶、回形針、便籤、貼紙等學習手賬元素。使用低飽和淺紫、淺黃、奶油白、深綠色配色。標題醒目，正文分區清晰，搭配少量手繪學習圖標和簡筆插畫。整體像精心整理的學習筆記、小紅書知識卡片或高質量學習手賬。',
  pastel_learning_pyramid:
    '整體風格為粉彩金字塔風：白色或米白紙張紋理背景，主體是柔和粉彩筆刷繪製的分層金字塔、階梯或漏斗。每層使用低飽和粉色、橙色、黃色、薄荷綠、淺藍、淺紫等色塊。文字像手寫筆記，搭配虛線、箭頭、百分比、小標籤。整體輕鬆、清楚、學習感強，像手繪學習方法海報。',
  childlike_cultural_infographic:
    '整體風格為童趣科普風：白色紙張背景，黑色手繪邊框，水彩手繪插畫，線條自然、有童趣。畫面包含多個文化物件、可愛人物、虛線箭頭、標籤說明和氣泡旁白。配色溫和，像少兒文化科普海報、兒童繪本知識頁或課堂小報。文字清楚但不要過密，整體活潑、有趣、易懂。',
  frosted_glass_editorial:
    '整體風格為磨砂情緒風：畫面像隔著一層半透明磨砂玻璃觀看人物、身體局部或情緒化物體，主體輪廓被柔和模糊，只露出局部陰影、形狀與深色輪廓。背景為低飽和冷灰、灰綠、霧白或淺藍色，大量留白，構圖極簡。文字採用現代極簡排版。整體像藝術節、音樂節、設計展或高級品牌海報，安靜、神秘、剋制、疏離。',
  translucent_object_editorial:
    '整體風格為透明物件風：低飽和米灰、淺灰綠或霧白背景，大量留白，中心放置一個由半透明玻璃、磨砂塑料、亞克力或柔軟充氣材質構成的抽象物件。物件內部可以有被磨砂遮擋的柔和彩色塊，邊緣有細膩高光、折射、陰影與真實材質感。文字使用現代無襯線排版，剋制、乾淨、像高端設計工作室作品集或設計展海報。',
  glassmorphism_gradient_blob:
    '整體風格為玻璃氣泡風：淺灰白背景，主體是半透明液態玻璃 blob，有柔和的橙色、粉色、藍色、青色漸變光暈，邊緣有折射、高光與柔和陰影。文字與玻璃形體形成前後穿插，部分文字被磨砂玻璃模糊遮擋，部分文字清晰浮在前景。整體現代、輕盈、未來感、設計感強。',
  embossed_typography_poster:
    '整體風格為紙雕字體風：文字本身作為主視覺，使用同色系紙張浮雕、凹刻、壓痕、挖空和柔和陰影來呈現立體感。背景是白色、淺灰、米色或牛皮紙質感，整體接近單色，極簡、大量留白、安靜、高級，像藝術書封、設計海報或品牌口號頁。',
  acrylic_dimensional_type:
    '整體風格為亞克力字風：標題文字被設計成真實可觸摸的 3D 字母物件，材質包括透明亞克力、半透明彩色塑料、線框金屬、磨砂玻璃或紙質。背景為乾淨白色或淺灰攝影棚，光線柔和，字母投下自然陰影。整體年輕、現代、輕盈、有品牌設計感。',
  dark_neon_search_ui:
    '整體風格為霓虹搜索風：純黑深空背景，彩色霓虹光帶或光環在畫面中穿梭，帶有細膩顆粒噪點與柔和輝光。前景是一個半透明磨砂質感的搜索框、輸入框或膠囊按鈕，文字極少，像 AI 搜索產品的啟動界面。可以加入一個極簡白色小角色。神秘、現代、輕未來感。',
  black_void_glowing_hands:
    '整體風格為黑場肢體風：純黑背景，大量留黑，畫面中只有幾隻手、手臂或身體局部從黑暗中浮現，邊緣有柔和白色輪廓光，主體部分漸隱到黑暗裡。構圖極簡但有強烈心理隱喻。文字極少，像藝術展海報或心理主題封面。',
  soft_neumorphism_ui:
    '整體風格為柔光界面風：淺灰白、淡藍灰或霧白背景，UI 控件像從背景中柔和凸起或凹陷，帶有細膩軟陰影、內陰影和環境光。主體可以是搜索框、圓形控制器、滑桿、卡片或數字面板。整體乾淨、輕科技、柔和、安靜。',
  minimal_line_shadow_brand:
    '整體風格為線性品牌風：淺灰白或淡藍灰背景，大量留白，主體由極細黑灰線條構成一個巨大的數字、符號、字母或幾何形。主體帶有半透明長陰影、輕微折射和淡淡彩色光點。排版極簡，像高端科技品牌發佈會、手機新品海報或設計品牌主視覺。',
  white_mono_texture_editorial:
    '整體風格為白色肌理風：畫面幾乎只使用白色、淺灰和黑色，主體是白色材質痕跡，例如厚塗刷痕、紙張摺痕、壓痕、浮起邊緣、光影切面或微妙紋理。大量留白，文字排版像高端編輯網頁、藝術書頁或設計作品集封面。',
  minimal_architecture_portfolio:
    '整體風格為建築線稿風：白色或淺灰紙張背景，大量留白，使用極細黑色線條、水平基準線、虛線路徑、微型人物剪影和少量文字排版。畫面像建築設計作品集封面、空間敘事圖或設計學院 portfolio。整體冷靜、剋制、理性，有路徑感和空間感。',
  minimal_healing_metaphor_comic:
    '整體風格為極簡治癒隱喻漫畫風：暖白紙張紋理背景，大量留白，黑色手繪線條，線條自然略帶抖動。畫面中有一個小小的圓臉小孩，黑色短髮，穿黃色連帽衫，臉頰有淺粉色腮紅。用極少的道具表達情緒隱喻。畫面安靜、溫柔、治癒。',
  retro_minimal_poster_illustration:
    '整體風格為復古海報風：米白舊紙背景，輕微復古紙張紋理，大面積純色塊構成主體，常用鈷藍、芥末黃、米白、少量黑色。人物和物件高度幾何化、簡化，像中世紀現代海報、復古書封、絲網印刷或版畫插畫。',
  editorial_balloon_collage:
    '整體風格為氣球拼貼風：白色紙張背景，大量留白，主體由幾個半透明彩色圓片組成，像氣球、光片或抽象希望符號。圓片顏色帶透明疊加和投影。下方加入灰黑色細線素描元素，用細線連接到圓片。文字採用粗體黑色編輯排版。',
  transparent_architectural_type:
    '整體風格為透明字境風：淺灰或霧白背景，畫面中心是一個巨大的數字、字母或漢字，像透明玻璃、水晶或亞克力建築。字體內部有云霧、天空、山體、光線、微型人物或空間場景，邊緣有清晰的玻璃折射和細白線輪廓。',
  paper_cut_profile_silhouette:
    '整體風格為紙雕剪影風：白色或淺色紙張背景，主體是一個單色紙雕剪影，通常是人物側臉、頭像、動物或象徵物。剪影內部嵌入行業相關元素，例如橋樑、城市、工具、道路或系統結構。剪影有紙張厚度、切割邊緣和真實投影。',
  torn_paper_note_minimal:
    '整體風格為撕紙便籤風：大面積米色或暖灰紙張背景，中心或偏下放一小片白色撕裂紙條，邊緣不規則，有真實紙張纖維和柔和投影。紙條上只寫一個詞或一句非常短的話。構圖極簡、大量留白、安靜、私密。',
  fluffy_soft_typography:
    '整體風格為毛絨字體風：文字本身是主視覺，字體由柔軟的毛絨、毛巾布、羊羔絨、絨線或蓬鬆纖維構成，邊緣有細密絨毛，觸感柔軟。背景為白色、奶油色或淺灰色，光線柔和。整體溫暖、治癒、可愛、輕鬆。',
  cloud_typography_cover:
    '整體風格為雲朵字體風：藍天或青藍漸變天空背景，標題文字由真實蓬鬆的白雲組成，雲朵邊緣柔軟、自然、立體，有陽光照射和雲影。畫面開闊、明亮、向上，帶有希望、成長、療愈和新開始的感覺。',
  foam_bubble_typography:
    '整體風格為泡沫字體風：藍色溼潤瓷磚背景，表面有水滴、泡泡、凝結水珠。標題文字一部分是醒目的扁平粗體字，一部分是由白色清潔泡沫、海綿或肥皂泡組成的立體字，邊緣有泡孔和溼潤質感。',
  embroidered_patch_brand:
    '整體風格為刺繡徽章風：背景是柔軟織物、帆布、棉布或牛仔布，主體由皮革貼片、刺繡布標、縫線和補丁組成。標題或標誌像縫在布料上的徽章，有真實皮革紋理、針腳、邊緣包邊、輕微陰影和手工質感。',
  luxury_gold_typography:
    '整體風格為金屬奢華風：淺米色、象牙白或暖灰背景，標題使用金色、香檳金或銀色立體 serif 字體，具有金屬反射、高光、斜面、柔和投影和高級光澤。整體像高端品牌、節日慶典或奢華海報。',
  miniature_map_life_scene:
    '整體風格為微縮地圖風：背景是淺色地圖、城市平面圖或地鐵路線圖，帶柔和景深。畫面中放置幾個微縮人物，像小模型一樣站在不同地點，形成過去與現在的對話。配色柔和，常用淺藍、米白、灰藍。',
  miniature_checklist_scene:
    '整體風格為微縮清單風：背景是一張巨大清單、計劃表或任務表。幾個微縮人物像小模型一樣在紙面上工作、打勾、搬運目標或完成任務。畫面採用斜俯視角，景深柔和，整體像執行力或習慣養成主題的廣告海報。',
  fabric_micro_scene_ad:
    '整體風格為布料微縮風：背景是真實織物、襯衫、皮革或服裝局部。主題文字像刺繡、印花或補丁一樣出現。幾個微縮人物像模型工人一樣在文字周圍工作、縫製、修補。畫面有真實攝影感、淺景深和品牌廣告質感。',
  giant_letter_lifestyle_scene:
    '整體風格為巨字生活風：純色攝影棚背景，中心是巨大的立體白色字母或中文文字結構，每個字母像一個可進入的小空間。人物在字母中學習、閱讀、互動，形成溫暖的生活場景。光線柔和，陰影真實。',
  oriental_floral_minimal_editorial:
    '整體風格為花藝留白風：淺色紙張或牆面肌理背景，大面積留白，畫面中使用紅色花瓣、花枝、圓月、女性側臉或優雅剪影作為核心意象。色彩剋制，以象牙白、灰綠、紅色和淡粉為主。構圖安靜、詩意、精緻。',
  zen_ink_philosophy_poster:
    '整體風格為禪意水墨風：米白宣紙質感背景，大面積留白，黑色水墨筆觸作為主體，搭配一個紅色圓日。可以有極小的人物剪影、行者、松樹、山石。整體安靜、剋制、東方、內省、有修行感。',
  editorial_line_character:
    '整體風格為編輯線稿風：現代編輯設計語言，黑白極簡線稿人物，乾淨扁平幾何比例，簡單臉部。把主題轉譯成日常城市生活場景，雜誌式大標題、大量留白。柔和色塊只用於背景、包裝、UI 面板或分區塊。',
}

export const STYLE_NAMES: Record<string, string> = {
  handdrawn_knowledge_card: '手繪知識風',
  oriental_editorial_illustration: '典籍山水風',
  study_note_card: '學習筆記風',
  pastel_learning_pyramid: '粉彩金字塔風',
  childlike_cultural_infographic: '童趣科普風',
  frosted_glass_editorial: '磨砂情緒風',
  translucent_object_editorial: '透明物件風',
  glassmorphism_gradient_blob: '玻璃氣泡風',
  embossed_typography_poster: '紙雕字體風',
  acrylic_dimensional_type: '亞克力字風',
  dark_neon_search_ui: '霓虹搜索風',
  black_void_glowing_hands: '黑場肢體風',
  soft_neumorphism_ui: '柔光界面風',
  minimal_line_shadow_brand: '線性品牌風',
  white_mono_texture_editorial: '白色肌理風',
  minimal_architecture_portfolio: '建築線稿風',
  minimal_healing_metaphor_comic: '治癒漫畫風',
  retro_minimal_poster_illustration: '復古海報風',
  editorial_balloon_collage: '氣球拼貼風',
  transparent_architectural_type: '透明字境風',
  paper_cut_profile_silhouette: '紙雕剪影風',
  torn_paper_note_minimal: '撕紙便籤風',
  fluffy_soft_typography: '毛絨字體風',
  cloud_typography_cover: '雲朵字體風',
  foam_bubble_typography: '泡沫字體風',
  embroidered_patch_brand: '刺繡徽章風',
  luxury_gold_typography: '金屬奢華風',
  miniature_map_life_scene: '微縮地圖風',
  miniature_checklist_scene: '微縮清單風',
  fabric_micro_scene_ad: '布料微縮風',
  giant_letter_lifestyle_scene: '巨字生活風',
  oriental_floral_minimal_editorial: '花藝留白風',
  zen_ink_philosophy_poster: '禪意水墨風',
  editorial_line_character: '編輯線稿風',
}

export const STYLE_GROUPS = [
  {
    name: '知識圖解類',
    ids: ['handdrawn_knowledge_card', 'study_note_card', 'pastel_learning_pyramid', 'childlike_cultural_infographic']
  },
  {
    name: '東方 / 人文 / 情緒插畫類',
    ids: ['oriental_editorial_illustration', 'minimal_healing_metaphor_comic', 'black_void_glowing_hands', 'oriental_floral_minimal_editorial', 'zen_ink_philosophy_poster']
  },
  {
    name: '極簡設計 / 材質海報類',
    ids: ['frosted_glass_editorial', 'translucent_object_editorial', 'glassmorphism_gradient_blob', 'soft_neumorphism_ui', 'minimal_line_shadow_brand', 'white_mono_texture_editorial', 'minimal_architecture_portfolio', 'editorial_line_character']
  },
  {
    name: '字體材質類',
    ids: ['acrylic_dimensional_type', 'embossed_typography_poster', 'transparent_architectural_type', 'fluffy_soft_typography', 'cloud_typography_cover', 'foam_bubble_typography', 'luxury_gold_typography']
  },
  {
    name: '拼貼 / 紙張 / 手工材質類',
    ids: ['retro_minimal_poster_illustration', 'editorial_balloon_collage', 'paper_cut_profile_silhouette', 'torn_paper_note_minimal', 'embroidered_patch_brand']
  },
  {
    name: '微縮場景 / 品牌廣告類',
    ids: ['miniature_map_life_scene', 'miniature_checklist_scene', 'fabric_micro_scene_ad', 'giant_letter_lifestyle_scene']
  }
]

export const BODY_STRUCTURES: BodyStructure[] = [
  '閉環機制圖',
  '橫向流程圖',
  '分類樹圖',
  '左右對比圖',
  '結構類比圖',
  '風險路徑圖',
  '光譜選擇圖',
  '隨附場景圖',
  '學習筆記卡片',
  '分層金字塔',
  '兒童文化科普圖',
]

export const STYLE_IMAGES: Record<string, string> = {
  handdrawn_knowledge_card: '01-handdrawn-knowledge-card.jpg',
  oriental_editorial_illustration: '02-oriental-editorial-illustration.jpg',
  study_note_card: '03-study-note-card.jpg',
  pastel_learning_pyramid: '04-pastel-learning-pyramid.jpg',
  childlike_cultural_infographic: '05-childlike-cultural-infographic.jpg',
  frosted_glass_editorial: '06-frosted-glass-editorial.jpg',
  translucent_object_editorial: '07-translucent-object-editorial.jpg',
  glassmorphism_gradient_blob: '08-glassmorphism-gradient-blob.jpg',
  embossed_typography_poster: '09-embossed-typography-poster.jpg',
  acrylic_dimensional_type: '10-acrylic-dimensional-type.jpg',
  dark_neon_search_ui: '11-dark-neon-search-ui.jpg',
  black_void_glowing_hands: '12-black-void-glowing-hands.jpg',
  soft_neumorphism_ui: '13-soft-neumorphism-ui.jpg',
  minimal_line_shadow_brand: '14-minimal-line-shadow-brand.jpg',
  white_mono_texture_editorial: '15-white-mono-texture-editorial.jpg',
  minimal_architecture_portfolio: '16-minimal-architecture-portfolio.jpg',
  minimal_healing_metaphor_comic: '17-minimal-healing-metaphor-comic.jpg',
  retro_minimal_poster_illustration:
    '18-retro-minimal-poster-illustration.jpg',
  editorial_balloon_collage: '19-editorial-balloon-collage.jpg',
  transparent_architectural_type: '20-transparent-architectural-type.jpg',
  paper_cut_profile_silhouette: '21-paper-cut-profile-silhouette.jpg',
  torn_paper_note_minimal: '22-torn-paper-note-minimal.jpg',
  fluffy_soft_typography: '23-fluffy-soft-typography.jpg',
  cloud_typography_cover: '24-cloud-typography-cover.jpg',
  foam_bubble_typography: '25-foam-bubble-typography.jpg',
  embroidered_patch_brand: '26-embroidered-patch-brand.jpg',
  luxury_gold_typography: '27-luxury-gold-typography.jpg',
  miniature_map_life_scene: '28-miniature-map-life-scene.jpg',
  miniature_checklist_scene: '29-miniature-checklist-scene.jpg',
  fabric_micro_scene_ad: '30-fabric-micro-scene-ad.jpg',
  giant_letter_lifestyle_scene: '31-giant-letter-lifestyle-scene.jpg',
  oriental_floral_minimal_editorial:
    '32-oriental-floral-minimal-editorial.jpg',
  zen_ink_philosophy_poster: '33-zen-ink-philosophy-poster.jpg',
  editorial_line_character: '34-editorial-line-character.jpg',
}

export const STYLES: StyleInfo[] = Object.keys(STYLE_NAMES).map((id) => ({
  style_id: id,
  style_name: STYLE_NAMES[id],
  best_for: [], // Could be populated if needed
}))

export function getAutoMatchStyle(content: string): string {
  // Enhanced auto-match based on SKILL.md
  if (content.match(/正文配圖|方法論|流程|對比|知識系統/)) return 'handdrawn_knowledge_card'
  if (content.match(/文化|歷史|人文|哲學|東方智慧|古籍|文明/)) return 'oriental_editorial_illustration'
  if (content.match(/學習方法|筆記整理|複習|考試|效率技巧/)) return 'study_note_card'
  if (content.match(/學習金字塔|層級模型|能力進階|成長路徑|主動學習/)) return 'pastel_learning_pyramid'
  if (content.match(/兒童教育|傳統文化科普|器物拆解|博物館/)) return 'childlike_cultural_infographic'
  if (content.match(/孤獨|情緒|心理|音樂|藝術展|安靜|疏離/)) return 'frosted_glass_editorial'
  if (content.match(/設計|作品集|品牌|營銷|工具|系統|工作室/)) return 'translucent_object_editorial'
  if (content.match(/AI|未來感|趨勢|創意展覽|抽象概念/)) return 'glassmorphism_gradient_blob'
  if (content.match(/深度思考|認知|策略|極簡口號|品牌宣言/)) return 'embossed_typography_poster'
  if (content.match(/單個關鍵詞|欄目名|品牌詞|實驗/)) return 'acrylic_dimensional_type'
  if (content.match(/AI 搜索|探索|信息檢索|發現/)) return 'dark_neon_search_ui'
  if (content.match(/產品界面|搜索框|控制器|效率工具/)) return 'soft_neumorphism_ui'
  if (content.match(/新品發佈|數字主題|發佈會|極簡科技/)) return 'minimal_line_shadow_brand'
  if (content.match(/建築|空間敘事|人生路徑/)) return 'minimal_architecture_portfolio'
  if (content.match(/情緒療愈|內耗|親密關係|自我照顧|內在小孩/)) return 'minimal_healing_metaphor_comic'
  if (content.match(/極簡主義|生活方式|個人手冊|創作宣言/)) return 'retro_minimal_poster_illustration'
  if (content.match(/團隊協作|共同成長|組織文化|未來願景/)) return 'editorial_balloon_collage'
  if (content.match(/宏大階段|系統升級|空間隱喻/)) return 'transparent_architectural_type'
  if (content.match(/職業人物|行業精神|工程建築|人物專訪/)) return 'paper_cut_profile_silhouette'
  if (content.match(/信念提醒|每日一句|極簡語錄|心理暗示/)) return 'torn_paper_note_minimal'
  if (content.match(/好運|發財|治癒|可愛|祝福/)) return 'fluffy_soft_typography'
  if (content.match(/希望|成長|新開始|復原力|療愈/)) return 'cloud_typography_cover'
  if (content.match(/清潔|煥新|重啟|夢想變大/)) return 'foam_bubble_typography'
  if (content.match(/品牌徽章|社群身份|學院風/)) return 'embroidered_patch_brand'
  if (content.match(/高端|奢華|節日|儀式感|慶典/)) return 'luxury_gold_typography'
  if (content.match(/城市遷移|過去與現在/)) return 'miniature_map_life_scene'
  if (content.match(/任務清單|執行力|打卡|目標拆解/)) return 'miniature_checklist_scene'
  if (content.match(/匠心|勞動節|手工|製造業/)) return 'fabric_micro_scene_ad'
  if (content.match(/字母空間|系列廣告/)) return 'giant_letter_lifestyle_scene'
  if (content.match(/女性|母親節|思念|花瓣|節氣/)) return 'oriental_floral_minimal_editorial'
  if (content.match(/哲學|修行|自律|覺察/)) return 'zen_ink_philosophy_poster'
  if (content.match(/黑白線稿|編輯插畫|角色系統/)) return 'editorial_line_character'
  
  return 'handdrawn_knowledge_card'
}
