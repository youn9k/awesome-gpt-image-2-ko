> [README 홈으로 돌아가기](../README.md) | [전체 갤러리 개요](./gallery.md) | [고지와 공식 계정](./disclaimer.md)

<a name="section-templates"></a>

## 🧩 산업용 프롬프트 템플릿과 실수 방지 가이드

> 안녕하세요. 바로 꺼내 써도 되도록 393개 사례를 깊이 분석해 21가지 **산업용 프롬프트 템플릿**으로 추렸습니다.
> 규칙을 정리하는 일은 만만치 않았지만, 결과적으로 아주 실용적입니다. 각 템플릿에는 “실수 방지 가이드”가 함께 있으니 복사해서 빈칸만 채우면 됩니다.

<a name="tpl-ui"></a>

### UI 및 인터페이스

**기본 템플릿**

```text
为[产品类型]生成一张[平台，如 iOS/Android/Web]界面图。
核心功能：[功能点A]、[功能点B]、[功能点C]。
视觉风格：[极简/科技/拟物]，主色[颜色]，强调色[颜色]。
布局：[顶部导航/双栏/卡片流]，信息层级清晰，留白充足。
输出：高保真UI截图，文字清晰可读，比例[9:16/16:9]。
```

**JSON 고급 템플릿(Agent 호출 권장)**

```json
{
  "type": "UI Screenshot",
  "platform": "iOS",
  "product": "Fitness App",
  "layout": "Card-based feed with bottom tab bar",
  "style": {
    "theme": "Dark Mode",
    "primary_color": "Neon Green",
    "typography": "Clean sans-serif"
  },
  "content": {
    "header": "Today's Activity",
    "cards": [
      {"title": "Running", "data": "5.2 km", "button": "Start"},
      {"title": "Calories", "data": "340 kcal"}
    ]
  },
  "constraints": "High fidelity, readable text, 9:16 aspect ratio"
}
```

**스크린샷 생성 템플릿**

```text
生成一张[平台，如 X/抖音/小红书/微信朋友圈]内容截图，[深色/浅色]模式。
整体比例：[9:16 / 3:4 / 1:1]，手机截图风格。

核心内容：
- 账号信息：[头像描述 / 用户名 / 认证标识]
- 正文内容：[具体文本内容，지정한 한국어를 포함]
- 互动数据：[点赞/评论/转发/收藏数量]

界面元素：
- 顶部：[状态栏/导航栏/搜索栏]
- 底部：[操作栏/Tab栏/输入框]
- 附加：[浮窗/弹幕/礼物特效/购物车卡片]

约束：텍스트는 지정한 한국어를 정확하게 표시해야 합니다，禁止乱码和占位文本，比例固定。
输出：高仿社交平台截图，文字清晰可读。
```

**라이브 방송 인터페이스 템플릿**

```text
生成一张[平台，如抖音/快手/B站]直播界面截图。
主播：[人物描述/名称]，姿态：[坐姿/站立/动作]，服装：[服装描述]。
背景：[直播间背景描述]，灯光：[暖色/冷色/混合]。

UI叠加层：
- 顶部：主播头像 + 关注按钮 + 在线人数 + 排名/热值
- 左下：弹幕/评论列表（[N]条，内容示例）
- 右下或中部：商品卡片 / 礼物特效 / PK进度条
- 底部：输入框 + 功能图标（分享/点赞/礼物/购物车）

风格：[写实直播截图/高保真UI/暗黑系/粉嫩系]，比例 9:16。
约束：文字清晰可读，弹幕内容合理，界面元素不遮挡主播面部。
输出：高仿直播截图画面。
```
**실수 방지 가이드**

- **모호한 지시는 피하세요**: “플랫폼 + 비율 + 레이아웃”을 명확히 지정해야 모델이 제멋대로 배치하지 않습니다.
- **텍스트를 강제 고정하세요**: “텍스트는 반드시 읽을 수 있고 지정된 한국어를 표시해야 한다”고 요구해 깨진 버튼 글자와 무의미한 문자를 막습니다.
- **스크린샷은 플랫폼 특징을 구분하세요**: X(Twitter)는 파란 인증 배지와 리포스트·인용 구분, 더우인(Douyin)은 음악 디스크·좋아요 애니메이션, 샤오홍슈(小红书)는 2열 폭포형 피드가 특징입니다. 생성 전에 플랫폼을 지정하지 않으면 모델이 섞을 수 있습니다.
- **라이브 인터페이스는 장면부터 정하세요**: 판매 라이브와 공연 라이브는 UI가 크게 다릅니다. 판매형은 오른쪽 위에 상품 목록이 있고, 공연형은 댓글 상호작용 비중이 큽니다. 라이브 유형을 먼저 고정한 뒤 세부 사항을 채우세요.
- **특수 화면은 비율을 고정하세요**: 차량용 화면·스마트 홈 같은 특수 화면은 21:9 등 고정 비율이 있습니다. 맨 앞에 적지 않으면 모델이 기본 휴대폰 9:16으로 생성할 수 있습니다.

<a name="tpl-infographic"></a>

### 차트 및 정보 시각화

**기본 템플릿**

```text
生成[主题：明确、具体，避免宽泛。例如：“老年人日常健康管理指南”而非“健康”]信息图，目标读者为[人群:细化人群特征，如年龄段、职业、兴趣等]。
结构：标题区 + [3-5]个模块（每模块含图标、短标题、1-2句说明,模块间逻辑：可用箭头、颜色区分或连接线提示信息流或关系等适当的方式）。
图表类型：[流程图/对比图/关系图/时间线]。
风格：[专业报告/科普插画/儿童教育等]，主色[颜色]，背景[浅色/深色]。
输出：信息层级清晰、可读性高的한국어 인포그래픽。
```

**JSON 고급 템플릿(Agent 호출 권장)**

```json
{
  "type": "Infographic",
  "topic": "Urban Metabolism",
  "audience": "General Public",
  "structure": {
    "title_area": "城市生命系统图谱",
    "layout": "Isometric cutaway, 12 numbered panels",
    "modules": [
      {"title": "能源", "icon": "lightning", "text": "Power flows"},
      {"title": "水循环", "icon": "water_drop", "text": "Water flows"}
    ]
  },
  "style": {
    "aesthetic": "Scientific atlas",
    "colors": "Low saturation, color-coded flows",
    "background": "Light paper texture"
  },
  "constraints": "No cyberpunk, no gibberish text, strict structural layout"
}
```

**스케일 축소 과학 인포그래픽 템플릿**

```text
为[主题]生成一张科学尺度缩放信息图。
结构：6-8 个圆形或六边形框，按从微观到宏观的尺度递进排列。
每个框包含：尺度名称、3-5 个词的洞察、测量单位或放大倍率，以及该尺度下的高细节 3D 渲染。
用细线连接各尺度，避免重复层级。标题使用“[主题]：AT EVERY SCALE”或“ZOOM: THE WORLD OF [主题]”。
风格：科学编辑信息图、精准微距光、清晰层级、文字短而可读。
约束：不要通用放大镜图标，不要把所有尺度画成同一大小，不要塞长段正文。
```

**실수 방지 가이드**

- **모듈 수를 통제하세요**: “모듈 수”와 “차트 유형”을 강제 지정하면 화면 혼잡과 정보 과잉을 크게 줄일 수 있습니다.
- **카피는 절제하세요**: 차트 장면에서는 짧은 문장을 우선하고 긴 본문을 화면에 넣지 마세요. 모델은 조판 전문가가 아닙니다.

<a name="tpl-poster"></a>

### 포스터 및 레이아웃

**기본 템플릿**

```text
设计一张[活动/产品/电影]海报，主题为[主题词]。
主视觉：[主体元素]，标题文案：[标题]，副标题：[副标题]。
版式：[居中/左对齐/对角构图]，风格：[复古/未来/极简]。
色彩：[主色 + 辅色]，氛围：[情绪关键词]。
输出：可用于社媒传播的高分辨率海报。
```

**스포츠 상업 캠페인 템플릿**

```text
设计一张[运动项目/健身品类]商业 Campaign 海报。
主体：[运动员/模特/产品道具]，姿态：[坐姿/冲刺/挥拍/力量动作]。
核心道具：[球拍/哑铃/球鞋/球衣]，以夸张比例或对角构图成为视觉锚点。
版式：[单张强主视觉/三联画/数据涂鸦海报]。
大字标题："[主标题]"，辅助文案："[短句/数据/精神口号]"。
视觉风格：高端运动品牌广告，强光影，反光地面，干净构图，品牌化配色[主色+辅助色]。
约束：主体清晰，文字可读，色调统一，不要杂乱拼贴，不要生成错误运动器材。
输出：1:1 或 4:5，适合社媒传播的运动商业视觉。
```

**개념 서체 포스터 템플릿**

```text
Create ONE finished premium conceptual typography poster for the exact title:

"[标题/词语/短句]"

Single poster only. No moodboard, grid, presentation board, mockup, captions, prompt text, process sheet, or sample labels.

The title must be the dominant visual structure of the poster: huge, readable, powerful, and spelled exactly. Do not translate, shorten, replace, or misspell it. Do not add other large readable text.

Silently interpret the title's meaning, mood, cultural aura, symbolic associations, psychological tension, and visual rhythm. Turn that interpretation into one strong visual metaphor.

Typography is the hero. Design custom-looking letterforms whose weight, width, contrast, spacing, rhythm, distortion, negative space, edge quality, and ink texture express the temperament of the title. The type should feel intentionally designed, not like a default font.

If the title refers to a widely known person, make a large editorial portrait or half-body figure a major visual presence, occupying roughly 40%-70% of the composition. The figure should interact with the typography: overlapping the letters, emerging from them, being framed by them, casting shadows on them, breaking through them, or being partially hidden behind them.

For abstract or non-person titles, use a human figure, landscape, object, or atmospheric setting only when it strengthens the meaning. It must interact with the typography and deepen the concept, not decorate it.

Use a restrained 4-6 color system matched to the theme: dominant background color, primary typography color, figure / landscape tone, emotional accent color, muted support color, and subtle paper / ink texture tone.

Composition style: high-end editorial poster, museum-quality graphic design, dramatic scale, strong hierarchy, few elements, intelligent whitespace, bold flat color areas, sharp cropping, silkscreen / lithograph / risograph grain, paper fibers, subtle ink imperfections, refined visual tension.

Avoid generic word art, glossy 3D lettering, random icons, stock-photo realism, cluttered collage, excessive grunge, tourist clichés, official logos, copied slogans, copied campaign aesthetics, unrelated text, and misspelled typography.
```

**다양한 스타일의 서명 선택 포스터 템플릿**

> 출처 참고: [signature-image-prompts-gpt-image-2.md](https://github.com/zaizhi-1112/ai-image-extension-playbook/blob/main/signature-image-prompts-gpt-image-2.md) / [@liyue_ai](https://x.com/liyue_ai)

```text
你是一个高端签名设计系统 + 风格人格视觉系统。

输入：
姓名：[姓名/昵称]

任务：
基于姓名自动生成一张 9:16 竖版「多风格签名选择海报」。
目标是把姓名转译成 6 种具有笔势、气质和力量感的签名方案。

隐藏分析：
1. 分析姓名字形：疏密、横竖比例、重心、连笔空间、草写空间。
2. 推断气质：清冷、张扬、克制、商业、文艺、松弛、锋利、高级。
3. 为每个签名先设定书写行为：起笔、连笔、节奏、结构变形、收笔。

版式：
- 纯白或极浅灰渐变背景，留白不少于 40%
- 顶部大标题：[姓名] · 签名风格选择
- 副标题：不同笔势，不同气场
- 中部使用 2 列 × 3 行卡片网格
- 底部小字：选一个，作为你的专属签名。

卡片规范：
- 每张卡片统一尺寸、统一间距、整体对齐
- 轻微圆角 8-16px
- 极细描边或无边框
- 极轻阴影
- 纯白微差、极浅灰、宣纸或磨砂质感
- 视觉目标接近高级杂志排版，避免强 UI 感

6 种签名：
1. 极简理性：接近品牌签名，笔画克制，留白清晰
2. 狂放张力：强连笔，速度感强，尾笔拉伸
3. 松弛随性：手写感明显，自然舒展，亲和轻松
4. 东方行草：飞白、墨感、节奏起伏明显
5. 锋利结构：几何切角，断裂感，冷静克制
6. 实验风格：部分不可读，结构重塑，先锋个性

每张卡片必须包含：
- 编号
- 风格名称
- 大尺寸签名
- 一句短气质说明
- 一个极轻微点缀色

光影与质感：
高级棚拍光、柔光环境、细腻阴影、干净空气感。
整体以黑、灰、白为主，点缀色克制。

禁止项：
不要字体拼贴，不要普通书法字，不要颜色杂乱，不要签名太小，不要排版松散，不要缺乏笔势，不要模板拼接感。
```

**단일 서명 추출 템플릿**

```text
从输入图中的[位置/编号/风格名]签名里，提取该签名的核心笔势，生成一张纯签名图。

要求：
- 只保留签名主体，不生成海报卡片、标题、副标题或说明文字
- 保留原签名的起笔、连笔、结构倾斜、飞白和收笔节奏
- 背景为纯白或极浅米白
- 签名居中，尺寸充足，边缘留白干净
- 墨色为深黑或墨黑，带自然笔锋、轻微墨痕和真实手写压力变化
- 输出适合继续临摹、收藏或二次设计的高清纯签名图

避免：
不要新增多种签名，不要变成字体展示，不要加边框，不要加装饰元素，不要弱化原有笔势。
```

**서명 연습 분해도 템플릿**

```text
基于输入的[签名图/签名风格]，生成一张签名练习拆解图。

目标：
帮助用户用黑笔在纸上练好这个签名，拆解每一笔的书写路径、顺序、力度和节奏。

画面结构：
- 竖版教学图或横版练习板
- 顶部放最终签名小样
- 中部用 8-12 个步骤拆解关键笔画
- 每个步骤展示当前笔画、运动方向箭头、起笔点、停顿点、收笔点
- 下方展示完整连写路径和 3-5 行练习建议

拆解要求：
- 每一笔都要对应签名主体中的真实笔势
- 标出快写、慢写、重压、轻提、转折、回钩、飞白、长甩尾
- 展示从基础骨架到完整签名的渐进过程
- 说明字间连接逻辑和整体重心变化

视觉风格：
白纸背景、黑色手写线条、红色或蓝色教学箭头、清晰编号、练习册质感。

避免：
不要只给成品图，不要省略关键笔画，不要把步骤画成随机涂鸦，不要生成无关书法字帖。

```

**한국어판: 개념 서체 포스터 템플릿**

```text
为以下标题生成一张完成度极高的高级概念字体海报，只需要一张。

标题：「[标题/词语/短句]」

只需要一张海报。不要 moodboard、不要网格排版、不要展示板、不要样机、不要说明文字、不要过程稿、不要样张标签。

标题必须是海报的主视觉结构：巨大、可读、有力量、拼写完全正确。不要翻译、缩短、替换或拼错标题。不要添加其他大段可读文字。

深入理解标题的含义、情绪、文化氛围、符号关联、心理张力和视觉节奏。把这种理解转化成一个强有力的视觉隐喻。

字体是主角。设计定制的字形，其字重、字宽、对比度、间距、节奏、变形、负空间、边缘质感和墨迹纹理必须表达标题的气质。字体应该看起来经过精心设计，而不是一个默认字体。

如果标题指向一个广为人知的人物，让一个大型编辑肖像或半身人物成为主要的视觉存在，占据构图的 40%-70%。人物必须与字体互动：重叠字母、从字母中浮现、被字母框住、在字母上投下阴影、打破字母、或部分隐藏在字母后面。

对于抽象或非人物标题，只有当人像、风景、物体或氛围场景能强化意义时才使用。它必须与字体互动并深化概念，而不是装饰它。

使用受限制的 4-6 色调色板来匹配主题：主背景色、主字体色、人物/风景色调、情感强调色、柔和辅助色、微妙的纸张/墨迹纹理色。

构图风格：高端编辑海报、博物馆级平面设计、戏剧性尺度、强层级、少元素、聪明留白、大胆平色区域、锐利裁切、丝网/平版/孔版印刷颗粒、纸纤维、微妙油墨瑕疵、精炼视觉张力。

避免：通用字效、光泽 3D 字体、随机图标、素材库写实、杂乱拼贴、过度脏旧、旅游明信片陈词滥调、官方标志、抄袭标语、抄袭 Campaign 美学、无关文字和拼写错误的字体。

```

**수묵 이중 노출 인물 포스터 템플릿**

```text
生成一张[人物/角色/品牌主理人/运动员]的水墨双重曝光人物海报。
画幅：9:16 竖版，高级电影海报构图。
主体结构：
- 上半区：放大的人物头部、面部轮廓或半身剪影，形成最强识别锚点。
- 中下区：同一人物的全身或半身主体，姿态为[站姿/动作姿态/凝视镜头]。
- 剪影内部：融合[关键场景]、[象征物]、[叙事片段]、[环境纹理]，形成双重曝光叙事。
视觉连接：用云雾、水墨扩散、飞白边缘、负空间和柔和明暗过渡，把上方剪影、内部拼贴和下方主体连成一条从上到下的视觉动线。
风格：东方水墨美学 + 写实电影感，克制、高级、留白充足，层次丰富但不杂乱。
文字：可加入[标题/姓名/短句]，必须少量、可读、像海报题签而不是信息图说明。
约束：不要硬拼贴，不要把背景塞满，不要廉价武侠特效，不要复制真实海报版式，不要让剪影和主体互相抢焦点。
输出：海报级完成图，主体清晰，水墨边缘自然，叙事元素与人物身份强相关。
```

**자연 과학 대중화 포스터 템플릿**

```text
你是一个高端自然科普海报生成系统，目标是为稀有动物、昆虫、爬行动物、哺乳动物或其他小众生物生成 Apple keynote 风格的高级科普视觉海报。

整体视觉方向：
生成一张 9:16 竖版高级科普海报，画面采用极简、纯白、干净、现代、Apple 式产品发布海报语言。背景应为纯白或极浅灰白渐变，保持大量留白。整体设计应具备高级感、克制感、视觉冲击力和科学展示感。

核心设计原则：
1. 主体动物必须被极度放大，成为画面最强视觉中心。
2. 主体应具有强烈立体感、真实质感、高清细节和柔和棚拍光影。
3. 海报信息要少而准，避免拥挤。
4. 不使用传统信息图的卡片、圆角框、复杂底纹、淡黄色纸张质感或装饰性边框。
5. 底部信息区只使用四列极简 icon + 标题 + 短说明，通过细竖线分隔。
6. 文字排版要像高端发布会视觉，标题巨大，副标题克制，正文小而清晰。
7. 风格关键词：Apple-inspired, premium editorial, pure white background, hero subject, clean typography, minimal infographic, high-end science poster.

画面结构：
顶部左侧为标题区：
한국어 큰 제목: {한국어 종 이름}
한국어 부제목: {매력적인 종의 특징을 담은 한 줄}
细短横线
英文名：{英文物种名}
分布信息：主要分布：{分布区域}

中部与下中部为主体视觉：
초고해상도·사실적이며 입체감이 강한 {한국어 종 이름}을 생성합니다.
主体应占据画面 50% 到 70% 的视觉面积。
主体姿态应具有展示性、力量感或识别度。
保持白色背景，不添加复杂自然环境。
可以保留少量必要承托物，例如树枝、岩石、雪地、沙土或木皮，但必须简洁。
主体要有真实阴影，使其像高级产品摄影一样立在画面中。

底部信息区：
用四个极简信息栏目展示科普信息。
每个栏目包含：
一个细线 icon
一个彩色小标题
一段 1 到 3 行短文字
栏目之间用极细浅灰竖线分隔。
不使用卡片框，不使用圆角背景，不使用大面积色块。

四个信息栏目：
栏目 1：
标题：{重点特征1标题}
说明：{重点特征1短说明}

栏目 2：
标题：{重点特征2标题}
说明：{重点特征2短说明}

栏目 3：
标题：{重点特征3标题}
说明：{重点特征3短说明}

栏目 4：
标题：{重点特征4标题}
说明：{重点特征4短说明}

底部总结句：
在最底部居中放置一句灰色小字总结：
{一句高级、克制、有记忆点的科普总结}

字体与排版：
한국어 제목은 크고 검정색의 고급스럽고 안정적이며 힘 있는 글꼴을 사용합니다.
副标题使用灰色，中等字号，字距略宽。
英文名使用小号灰色，简洁现代。
본문은 명확하고 현대적인 한국어 글꼴을 사용해 가독성을 유지합니다.
所有文字必须留有足够呼吸感。

色彩规范：
背景：纯白、极浅灰、轻微柔光渐变。
主标题：黑色或深石墨色。
副标题与正文：中性灰。
底部四个信息标题可使用低饱和强调色：
暖棕、冷蓝、松石绿、紫色、橙色。
颜色只用于 icon 和小标题，不要大面积铺色。

图像质量：
2K 高清质感，细节清晰，主体锐利，光影真实。
主体纹理必须可信，例如毛发、鳞片、甲壳、皮肤褶皱、羽毛或斑纹。
避免变形、错误肢体、错误解剖结构、模糊主体、低质贴图、塑料感、卡通感。

禁止项：
不要使用淡黄色旧纸背景。
不要使用复杂信息图网格。
不要使用圆角卡片。
不要使用厚边框。
不要使用大面积装饰图形。
不要添加无关 logo。
不要添加多余小字。
不要让主体太小。
不要让文字压住主体。
不要让底部信息区过度拥挤。
不要出现儿童科普风、卡通风、低端展板风。

最终输出：
生成一张 9:16 竖版、高级、干净、强视觉冲击的 Apple 风自然科普海报。
```

**JSON 고급 템플릿(Agent 호출 권장)**

```json
{
  "type": "Movie Poster",
  "theme": "Interstellar Journey",
  "typography": {
    "headline": "BEYOND STARS",
    "subheading": "A New Era Begins",
    "layout": "Centered, bold cinematic font, bottom heavy"
  },
  "visuals": {
    "subject": "Silhouette of an astronaut looking at a glowing nebula",
    "style": "Cinematic lighting, high contrast, dramatic shadows",
    "color_palette": "Deep space blue, glowing orange accents"
  },
  "vibe": "Epic, mysterious, vast"
}
```

**실수 방지 가이드**

- **대충 지시하지 마세요**: “주요 비주얼이 정확히 무엇인지” 써야 합니다. “포스터를 만들어 줘” 한 줄만으로 뛰어난 결과를 기대하지 마세요.
- **카피를 하드코딩하세요**: 주제목과 부제목을 정확히 지정하지 않으면 모델이 의미 없는 문구를 마음대로 추가할 수 있습니다.
- **스포츠 포스터는 구조부터 정하세요**: 스포츠 캠페인은 지저분한 콜라주가 되기 쉽습니다. “단일 주요 비주얼 / 3연작 / 데이터 그래피티”를 먼저 고정한 뒤 피사체와 카피를 작성하세요.
- **소품을 구도의 뼈대로 쓰세요**: 라켓, 덤벨, 운동화 같은 소품은 각도·비율·위치를 지정하세요. 그렇지 않으면 모델이 평범한 배경 장식으로 그리기 쉽습니다.
- **서체 포스터는 제목부터 고정하세요**: 개념 서체 포스터에는 “제목의 철자가 완전히 정확하고 주요 비주얼이 되어야 한다”고 명시해야 합니다. 그렇지 않으면 예쁘지만 읽을 수 없는 글자 효과가 됩니다.
- **이미지가 글자와 상호작용해야 합니다**: 인물·물체·장면은 글자에 끼어들거나 가리거나 관통하거나 받쳐야 합니다. 옆에 놓기만 하면 장식 소재처럼 보입니다.
- **무드보드화를 막으세요**: “single poster only”를 명확히 요구해 다안 전시 보드, 과정 시안, 샘플 콜라주 생성을 방지하세요.
- **피사체를 확대하세요**: 자연 과학 포스터에서는 동물 피사체를 화면의 50%~70%를 차지할 만큼 크게 하여 가장 강한 시각 중심이 되게 하세요.
- **정보는 절제하세요**: “적지만 정확하게” 원칙을 지키고, 하단 정보 영역에는 4열 미니멀 레이아웃만 사용해 혼잡을 막으세요.
- **스타일을 통일하세요**: 순백 배경, 깔끔한 레이아웃, 부드러운 스튜디오 조명을 사용해 Apple식 미니멀 스타일을 지키고, 전통 인포그래픽의 카드·둥근 테두리 요소는 피하세요.

<a name="tpl-product"></a>

### 상품 및 전자상거래

**기본 템플릿**

```text
生成[商品名]电商主图，卖点为[卖点1]、[卖点2]。
场景：[纯色棚拍/生活方式场景]，镜头：[特写/半身/全景]。
材质细节：[材质关键词]，灯光：[柔光/侧光/轮廓光]。
附加元素：[价格角标/卖点icon/促销文案]。
输出：电商平台可直接使用的商品展示图。
```

**개인화 뷰티 추천 보고서 템플릿**

```text
你是一个专业美妆顾问 + 人脸分析系统 + 品牌视觉设计系统。
目标：基于[用户自拍]与[口红品牌]，生成一张具有“分析 + 推荐 + 试色 + 场景建议”的竖版口红推荐报告信息图。

输入参数：
用户图像：[用户自拍]
品牌：[Dior / YSL / Armani / Chanel / TF / 其他品牌]
风格偏好（可选）：[通勤 / 温柔 / 气场 / 氛围感 / 显白优先]
推荐数量：[3-5]

分析层：
- 判断肤色：冷 / 暖 / 中性（含明度）
- 判断气质：清冷 / 温柔 / 明艳 / 干净 / 成熟
- 判断唇部基础：唇色深浅、唇形、适合浓淡
- 输出一句总结：「更适合 [色系] + [饱和度] + [质地] 的口红方向」

推荐层：
从[品牌]中筛选[3-5]个差异化色号，每个色号包含：
- 色号名称
- 色系标签
- 上脸效果
- 推荐场景

品牌视觉层：
根据[品牌]自动生成视觉调性，只用少量品牌强调色做标题、细线、小 icon 和局部点缀。
示例：YSL 黑金强对比，Dior 法式柔光灰白，Armani 低饱和雾面，Chanel 极简黑白，TF 深色电影感。

版式结构：
左上：用户输入图 + 肤色分析
右上：一句分析结论
中部：3-5 个同一张脸的唇色试色矩阵，每列一个色号
底部：有判断力的个人建议

视觉要求：
高端美妆编辑视觉，结构化信息可视化排版，真实皮肤质感，唇色精准，统一光影，9:16 竖版，8K。
```

**JSON 고급 템플릿(Agent 호출 권장)**

```json
{
  "type": "E-commerce Hero Image",
  "product": {
    "name": "Noise Cancelling Headphones",
    "material": "Matte black finish with metallic accents",
    "angle": "3/4 profile, floating slightly"
  },
  "setting": {
    "background": "Minimalist studio setup, soft gray gradient",
    "lighting": "Softbox overhead, sharp rim light on edges"
  },
  "copywriting": {
    "badges": ["NEW", "$299"],
    "slogan": "Silence the World"
  },
  "constraints": "Commercial photography quality, hyper-realistic textures"
}
```

**실수 방지 가이드**

- **소재와 조명이 핵심입니다**: “무광 질감” 같은 소재와 “림 라이트” 같은 조명 키워드를 함께 지정하세요. 상품 이미지에 조명이 없으면 저가 제품처럼 보입니다.
- **프로모션을 화면 가득 넣지 마세요**: “신제품 출시” 같은 핵심 문구 1~2개만 두세요. 글자가 많으면 화면이 망가집니다.
- **분석 후 생성하세요**: 뷰티 추천은 색상 번호를 바로 배치하게 하지 말고, 먼저 피부 톤·분위기·입술 특성을 분석하게 한 뒤 색상 추천으로 연결하세요.
- **브랜드는 포인트로만 쓰세요**: 브랜드 분위기는 가는 선, 강조색, 서체의 분위기, 조명에 반영하세요. 로고나 큰 색면으로 화면을 덮지 마세요.
- **테스트 색상 격자는 같은 얼굴로 고정하세요**: “같은 얼굴, 입술 색만 변경”이라고 명시하지 않으면 모델이 색상마다 다른 사람을 그릴 수 있습니다.

<a name="tpl-brand"></a>

### 브랜드 및 로고

**기본 템플릿**

```text
为[品牌名]设计品牌视觉方案。
品牌关键词：[关键词1]、[关键词2]、[关键词3]。
包含：Logo方向[几何/字标/图形]、辅助图形、主辅色、应用示意。
风格：[现代/高级/亲和]，行业：[行业]，受众：[受众]。
输出：统一风格的品牌识别视觉图。
```

**완전한 브랜드 아이덴티티 패키지 템플릿**

```text
你是顶级品牌代理创意总监，目标是为[业务/产品]交付一套覆盖 Logo、配色、字体、语调和应用触点的完整品牌身份系统。

输入信息：
业务名称：[业务名]
业务描述：[一句话说明]
行业：[行业]
目标受众：[详细描述]
竞争对手：[3-5个]
品牌个性：[5个关键词]
希望触发的感受：[信任 / 兴奋 / 奢华 / 亲近 / 力量 / 其他]
喜欢的视觉身份：[3个参考]
讨厌的视觉身份：[3个反例]
设计预算：[免费 / 付费]

请输出：
1. 品牌战略基础：品牌原型、核心承诺、定位、差异化和唯一关键词。
2. Logo 概念：生成 3-5 个完全不同的 Logo 方向，每个方向说明核心视觉理念、形状语言、象征意义、字体方向、第一眼情绪和适用触点。
3. 配色系统：主色、辅助色、强调色、中性色、HEX 代码、心理学解释、使用规则和禁用搭配。
4. 字体系统：标题字体、正文字体、强调字体、字号层级、字距、行高和免费替代方案。
5. 应用触点：名片、App 图标、网站首页、社媒模板、广告牌或包装上的应用效果。
6. 品牌规则：3 条永远不要打破的核心品牌规则。

输出形式：
结构化品牌手册，任何设计师、开发者或 AI 工具都能在 10 分钟内理解并复用。
```

**브랜드 접점 시스템 비주얼 보드 템플릿**

```text
为[品牌名]生成一张高端品牌触点系统视觉板，不是单张海报，而是一套完整品牌应用展示。

品牌定位：[行业/生活方式/产品品类]
核心气质：[关键词1]、[关键词2]、[关键词3]
主视觉场景：[核心产品/服务/体验]，放在[材质表面/空间场景]中，使用[光线]和[镜头]呈现。

触点系统必须包含：
- 主产品 hero shot
- 包装盒 / 手提袋 / 杯子 / 标签 / 贴纸 / 封签等品牌物料
- 菜单卡 / 价目表 / 小型排版样张
- 生活方式场景或用户使用片段
- 配色、字体、图形语言在不同触点上的统一应用

设计语言：
[现代极简/日式留白/奢华编辑/科技品牌]，主色[颜色]，辅助色[颜色]，大量留白，细腻材质，真实阴影，微小文字清晰可读。

构图要求：
像顶级设计机构提案页，所有触点整齐但不死板，主视觉最突出，辅助物料层级清楚，整体有品牌系统感和可落地感。

约束：
不要只生成一个 logo；不要把所有物料挤成杂乱拼贴；不要使用随机乱码文字；不要让包装、菜单、贴纸彼此风格割裂。
```

**브랜드 봉투형 제품 광고 템플릿**

```text
输入：[产品图]、[品牌身份]、[输出格式]

PHASE 1 / ANCHOR：用 2 行描述[品牌身份]，包括调色板、材质、光影和情绪。
PHASE 2 / INJECT：把[产品]放入这个品牌世界中，产品要服从品牌气质和环境语言。
PHASE 3 / FORMAT：指定[输出格式]，例如 hero 图、方形广告、竖版 story 或电商头图。
PHASE 4 / SIGNATURE：加入[品牌元素]，例如颗粒、阴影、叠加纹理、包装符号或图形边框。

变量：
[品牌身份] / [产品] / [输出格式] / [品牌元素]

目标：同一品牌下替换不同产品时，视觉世界保持一致，广告图仍然有明确主角和商业质感。
```

**브랜드 페르소나 만화 인포그래픽 템플릿**

```text
基于上传的[Logo/品牌视觉]，生成一张 4:5 竖版漫画信息图：“What This Brand Feels Like”。
目标：把品牌变成一个可感知的人格角色，并解释它如何说话、行动、销售、回应竞争和处理批评。
核心规则：所有颜色、服装、姿态、语气和图形元素都来自 Logo 与品牌关键词。
主视觉：一个品牌人格化角色，服装、表情和姿态体现[品牌气质]。
周围结构：6-8 个漫画小分镜，每格包含短标题、动作、气泡或内心独白。
辅助模块：Voice tone、Energy level、Social behavior、Communication style、DO / DON'T。
风格：漫画 + 编辑信息图，表达强但保持高级，文字短而有力，画面层级丰富。
约束：不要通用营销词，不要空白区域，不要把品牌人格画成随机角色。
```

**JSON 고급 템플릿(Agent 호출 권장)**

```json
{
  "type": "Brand Identity Design",
  "brand": {
    "name": "Nova Dynamics",
    "industry": "AI Technology",
    "keywords": ["Innovative", "Minimalist", "Trustworthy"]
  },
  "deliverables": [
    "Logo mark (geometric fusion of a neural network node and a star)",
    "Color palette (Electric Blue and Pure White)",
    "Business card mockup"
  ],
  "style": "Modern corporate, flat vector, high contrast",
  "constraints": "No gradients, scalable vector style, clean white background for logo"
}
```

**실수 방지 가이드**

- **덜어내세요**: 브랜드 키워드를 먼저 정의한 뒤 시각 결과를 요구하면 더 일관됩니다. 불을 뿜는 용과 번개 같은 요소를 한꺼번에 넣으면 로고가 아니라 일러스트가 됩니다.
- **배경을 강제하세요**: 후처리 누끼를 쉽게 하려면 “순백 배경(Pure White Background)”을 명시하세요.
- **브랜드 전략 후 로고를 만드세요**: 대상 고객, 경쟁사, 감정 목표가 없으면 로고는 예쁜 도형에 그치고 왜 브랜드에 맞는지 설명할 수 없습니다.
- **로고는 적용 장면을 봐야 합니다**: 명함, 앱 아이콘, 웹사이트, 옥외 광고 등 접점을 함께 보게 하면 축소 시 가독성이나 가로·세로 비율 문제를 빠르게 찾을 수 있습니다.
- **브랜드 가이드에는 금지 규칙을 쓰세요**: 색과 글꼴 외에도 “어떻게 쓰면 안 되는지”를 적어야 이후 확장에서 일관성을 잃지 않습니다.

<a name="tpl-architecture"></a>

### 건축 및 공간

**기본 템플릿**

```text
生成[空间类型]设计效果图，功能定位为[用途]。
风格：[现代简约/工业/新中式]，材质：[木/石/金属/玻璃]。
空间结构：[开敞/分区]，动线：[主通道说明]。
光线：[自然采光/人工照明方案]，时间：[白天/夜景]。
输出：写实建筑空间渲染图。
```

**JSON 고급 템플릿(Agent 호출 권장)**

```json
{
  "type": "Architectural Visualization",
  "space": {
    "type": "Modern Cabin Interior",
    "function": "Living room",
    "materials": "Exposed concrete, large floor-to-ceiling glass, warm timber accents"
  },
  "environment": "Nestled in a dense, snowy pine forest visible through the glass",
  "camera": {
    "angle": "Eye-level perspective, wide-angle lens",
    "lighting": "Golden hour, warm interior lights glowing, cool blue ambient light outside"
  },
  "render_quality": "Unreal Engine 5 style, hyper-realistic, 8k resolution, ray tracing"
}
```

**실수 방지 가이드**

- **시점을 통제하세요**: 건축 이미지는 원근 왜곡이 가장 흔한 실패 원인입니다. “Eye-level perspective(눈높이 시점)”를 쓰면 억제할 수 있습니다.
- **냉온 대비를 활용하세요**: 실외의 차가운 빛(파랑·회색)과 실내의 따뜻한 빛(노랑·주황)을 맞추면 공간의 고급스러움을 높일 수 있습니다.

<a name="tpl-photo"></a>

### 사진 및 사실적 표현

**기본 템플릿**

```text
拍摄主题：[人物/物品/街景]，场景为[地点]。
摄影参数风格：[35mm/85mm]，[浅景深/深景深]，[纪实/电影感]。
光线：[自然光/夜景霓虹/逆光]，情绪：[情绪词]。
细节要求：[肤质/材质/颗粒感]。
输出：高写实摄影风格图像。
```

**JSON 고급 템플릿(Agent 호출 권장)**

```json
{
  "type": "Hyper-realistic Photography",
  "subject": {
    "description": "A weary 30-year-old barista wiping a coffee cup",
    "details": "Subtle sweat on forehead, detailed skin pores, wearing a denim apron"
  },
  "setting": "Dimly lit vintage cafe, rain visible through the window behind",
  "camera_specs": {
    "gear": "Shot on Sony A7R IV, 50mm lens",
    "aperture": "f/1.4 (shallow depth of field, background completely blurred)",
    "lighting": "Cinematic lighting, neon sign reflecting on wet window, soft rim light on subject's hair"
  },
  "film_aesthetic": "Kodak Portra 400 emulation, subtle film grain"
}
```

**거리의 우연한 순간 사실 사진 템플릿**

```text
生成一张竖版手机纪实照片，主题是[意外事件/日常瞬间]发生在[街头/室外地点]。
主体：[物品/人物动作/现场痕迹]，必须呈现真实的材质状态，例如[液体扩散/冰块散落/纸张褶皱/灰尘颗粒]。
环境：[地面材质/墙面/街景元素]，保留自然杂乱和生活痕迹。
光线：[正午强光/阴天散射光/夜间路灯]，阴影要符合真实方向，可加入[人物影子/路牌影子/树影]。
镜头：手持手机视角，略微俯拍或低角度，构图自然，像随手拍到的现场。
画面质感：raw unedited photo look，自然色彩，真实纹理，高细节。
负面约束：不要插画、动漫、CGI、棚拍光、过度干净、过度构图、假液体、漂浮物、品牌文字、水印、海报设计感。
输出：一张可信的日常纪实摄影图。
```

**실수 방지 가이드**

- **결점을 조금 넣으세요**: AI가 그린 인물은 지나치게 완벽하면 가짜처럼 보입니다. “피부 결(skin pores)”, “주근깨”, “약한 필름 그레인(film grain)”을 넣으면 사실감이 높아집니다.
- **매개변수로 말하세요**: “얕은 심도” 대신 `f/1.4`, “반신 사진” 대신 `50mm`를 쓰면 모델이 더 잘 이해합니다.
- **불완전함을 구체적으로 쓰세요**: “거친 석재 벽돌, 흩어진 얼음, 자연스러운 그림자, 약한 핸드헬드 감각”처럼 쓰는 편이 “사실적”이라고만 쓰는 것보다 안정적입니다.

<a name="tpl-illustration"></a>

### 일러스트 및 예술

**기본 템플릿**

```text
创作[题材]插画，主角为[角色/主体]。
画风：[日漫/水彩/扁平/厚涂]，线条：[细腻/粗犷]。
配色：[配色方案]，背景：[简洁/复杂场景]。
构图：[近景/中景/远景]，重点表现[细节]。
输出：可用于封面或社媒发布的高质量插画。
```

**JSON 고급 템플릿(Agent 호출 권장)**

```json
{
  "type": "Artistic Illustration",
  "art_style": "Studio Ghibli inspired anime style",
  "scene": {
    "description": "A giant flying whale carrying a small cozy village on its back",
    "details": "Windmills turning, tiny people looking over the edge, fluffy white clouds"
  },
  "palette": "Vibrant sky blue, lush greens, soft pastel accents",
  "technique": "Cel shading, detailed background art, soft glowing magical aura",
  "mood": "Whimsical, adventurous, nostalgic"
}
```

**실수 방지 가이드**

- **붓터치를 고정하세요**: “두꺼운 채색”, “수채화 번짐” 같은 붓터치를 제한하지 않으면 영혼 없는 AI 기본 플라스틱풍이 나올 수 있습니다.
- **거장 이름은 신중히 쓰세요**: 거장 이름을 적으면 대표작의 구도를 그대로 따라 하기 쉽습니다. 직접 이름을 쓰기보다 “반 고흐의 회전하는 별빛 붓터치”처럼 특징을 추출해 쓰세요.

<a name="tpl-character"></a>

### 인물 및 캐릭터

**기본 템플릿**

```text
设计[角色身份]角色设定图。
外观：[年龄/发型/服饰/配件]，性格：[关键词]。
姿态：[站姿/动态动作]，表情：[情绪]。
世界观：[时代/阵营/职业]，标志性元素：[元素]。
输出：角色主视图 + 风格统一的人设图。
```

**동작 분해 참고표 템플릿**

```text
生成一张[角色/人物]动作分解参考表。
风格：[黑白线稿/3D 灰阶/漫画分镜/教学图]，背景纯净，技术参考图气质。
版式：4×4 网格，共 16 个等尺寸面板，细线分隔，每格左上角编号 1-16。
角色一致性：所有面板使用同一角色，保持脸型、服装、比例和发型一致。
每格结构：
- 顶部：动作标题
- 中央：完整身体动作姿态
- 底部：3-4 行动作说明
- 叠加：方向箭头、旋转箭头或运动轨迹线
动作序列：[从基础站姿到结束动作的完整步骤]
约束：不要复杂背景，不要新增角色，不要彩色干扰，不要改变角色身份。
输出：清晰可读、可用于动画/舞蹈/游戏动作参考的角色动作表。
```

**참고 이미지를 3D 컬렉터블 토이로 바꾸는 템플릿**

```text
将输入照片转换为高端 3D 收藏玩具形象。
身份保持：保留原始人物/角色的脸部身份、主要发型、表情气质和服装识别点。
造型比例：大头设计，五官轻微夸张，身体比例玩具化，但整体仍保持高级设计感。
材质：哑光 vinyl / resin / collectible figure finish，皮肤和服饰材质要有细节。
灯光与背景：柔和棚拍光，干净背景，[黑色/白色/品牌色]，主体居中，轮廓清晰。
质感：超清锐度，真实材质反射，8K render，premium designer toy aesthetic。
约束：不要改变身份，不要廉价塑料感，不要多角色，不要复杂背景，不要文字水印。
输出：一张完整的高端收藏玩具渲染图。
```

**JSON 고급 템플릿(Agent 호출 권장)**

```json
{
  "type": "Character Concept Art",
  "character": {
    "identity": "Cybernetic Bounty Hunter",
    "appearance": "Short silver hair, glowing red synthetic left eye, athletic build",
    "attire": "Tactical trench coat with neon piping, holding a plasma rifle"
  },
  "pose": "Dynamic action stance, looking over shoulder with a smirk",
  "environment": "Rainy neon-lit alleyway background (blurred)",
  "style": "Concept art, sharp linework, vibrant cyberpunk palette"
}
```

**실수 방지 가이드**

- **얼굴 요소를 분해하세요**: “아주 아름다운 여성”이라고만 쓰면 모델은 미적 기준을 모릅니다. “복숭아꽃 눈매, 높은 콧대, 자연스러운 눈썹”처럼 나누어 쓰세요.
- **의상 소재를 쓰세요**: “실크”, “기능성 방풍 원단”처럼 의상 소재를 명확히 쓰면 캐릭터가 훨씬 입체적으로 보입니다.
- **동작표는 격자를 고정하세요**: 동작 분해도에는 패널 수, 번호, 각 칸의 구조를 명확히 해야 모델이 단계를 지저분한 안내 그림 하나로 뭉개지 않습니다.
- **토이화해도 정체성 앵커를 유지하세요**: 얼굴형, 헤어스타일, 의상 식별점을 먼저 고정한 뒤 큰 머리 비율과 소재를 쓰면 다른 사람으로 바뀔 가능성을 줄입니다.
- **캐릭터 일관성을 앞에 두세요**: 동작 시퀀스가 길수록 얼굴과 의상이 바뀌기 쉽습니다. “같은 캐릭터, 같은 의상, 같은 비율”을 동작 목록 앞에 쓰세요.

<a name="tpl-scene"></a>

### 장면 및 서사

**기본 템플릿**

```text
生成[故事主题]场景图，发生在[时间+地点]。
主事件：[事件描述]，主角：[角色]，冲突点：[冲突]。
镜头语言：[广角建立镜头/中景叙事/特写]。
氛围：[紧张/温暖/悬疑]，色调：[冷/暖/高反差]。
输出：具备叙事张力的场景概念图。
```

**JSON 고급 템플릿(Agent 호출 권장)**

```json
{
  "type": "Narrative Scene",
  "story_context": "The exact moment an ancient seal breaks",
  "environment": "Crumbling stone temple overgrown with glowing blue vines",
  "action": "A young explorer dropping their torch as a massive beam of light shoots into the sky",
  "atmosphere": {
    "mood": "Awe-inspiring, terrifying",
    "lighting": "Blinding central light casting long dramatic shadows"
  },
  "camera": "Low angle shot, emphasizing the scale of the light beam"
}
```

**실수 방지 가이드**

- **“동사”를 넣으세요**: 서사 이미지는 풍경 엽서가 되는 것을 가장 조심해야 합니다. “무너지고 있는 중”, “방금 횃불을 켬” 같은 사건을 써서 장면을 움직이게 하세요.
- **카메라 언어를 쓰세요**: “Low angle shot(로우 앵글)” 또는 “Dutch angle(기울어진 앵글)”로 극적 긴장감을 높이세요.

<a name="tpl-history"></a>

### 역사 및 고풍 소재

**기본 템플릿**

```text
生成[朝代/古风设定]题材画面，主题为[主题]。
人物：[身份/服饰/器物]，场景：[宫廷/市井/山水]。
美术风格：[工笔/写意/影视写实]，色调：[色调]。
文化细节：[纹样/礼制/建筑要素]。
输出：历史氛围准确的古风题材图。
```

**JSON 고급 템플릿(Agent 호출 권장)**

```json
{
  "type": "Historical/Oriental Scene",
  "setting": "Tang Dynasty Capital City at Night",
  "subject": {
    "identity": "Noblewoman",
    "clothing": "Traditional Ruqun (襦裙) with elaborate floral embroidery",
    "action": "Holding a glowing silk lantern, looking at fireworks"
  },
  "style": "Cinematic realism combined with subtle traditional ink wash (水墨) textures",
  "details": "Accurate Tang architecture, bustling crowd in background",
  "constraints": "No modern elements, historically accurate clothing structure"
}
```

**실수 방지 가이드**

- **시대 혼합을 막으세요**: 당·송·명처럼 왕조를 명시하지 않으면 모델이 당나라 궁전에서 기모노를 입고 청나라 부채를 든 인물을 그릴 수 있습니다.
- **현대 요소를 금지하세요**: “No modern elements”를 꼭 넣어 고풍 인물의 손에 현대 음료가 생기는 일을 막으세요.

<a name="tpl-document"></a>

### 문서 및 출판물

**기본 템플릿**

```text
制作[文档类型，如菜单/杂志内页/报纸版式]。
版面结构：[栏数/页边距/标题层级]。
内容模块：[封面区/正文区/图表区/脚注]。
字体风格：[衬线/无衬线]，配色：[配色方案]。
输出：可读性强、版式规范的出版物视觉稿。
```

**JSON 고급 템플릿(Agent 호출 권장)**

```json
{
  "type": "Editorial Layout",
  "document": "Fashion Magazine Double-page Spread",
  "grid": "3-column grid, wide margins",
  "content": {
    "left_page": "Full-bleed high-fashion photograph of a model in a red dress",
    "right_page": {
      "headline": "THE RED RENAISSANCE",
      "body_text": "(Simulated text blocks)",
      "pull_quote": "\"Color is power.\""
    }
  },
  "typography": "Elegant serif for headlines, clean sans-serif for body",
  "palette": "Monochrome with stark red accents"
}
```

**기업 브로슈어 시스템 템플릿**

> 출처 참고: [@MrLarus](https://x.com/MrLarus/status/2056974720893939950)

```text
请生成一套企业级商用画册视觉方案，主题为【品牌名称】的【行业 / 产品 / 解决方案】宣传画册。

整体风格：高端、专业、具有强视觉冲击力；避免传统 Word 排版感和普通 PPT 感。采用【深色科技美学 / 白色极简商务 / 高端工业风 / 艺术化品牌画册】风格。

画册内容包括：
1、封面与封底
2、企业介绍与品牌理念
3、核心产品与技术优势
4、应用场景与解决方案
5、客户案例与合作方式
6、全册系统预览图

要求：
版式要有设计感，图片、标题、数据、图标、留白和层级关系清晰；保持整套画册统一的品牌视觉系统；重点体现真实商业物料的完成度，避免简单文字排版。
```

**실수 방지 가이드**

- **구조가 우선입니다**: 스타일 단어를 쌓는 것보다 “열 수(columns)”와 “여백(margins)”을 명확히 하는 일이 중요합니다.
- **전체 본문은 포기하세요**: 모델이 오탈자 없는 긴 본문을 한 페이지에 조판하길 기대하지 마세요. “Simulated text blocks”로 본문을 채우게 하고 큰 제목만 고정하세요.
- **시스템 미리보기를 넣으세요**: 기업 브로슈어 작업에는 표지, 내지, 사례 페이지, 연락처 페이지의 일관성을 검증할 전체 미리보기 한 장을 추가하는 것이 좋습니다.

<a name="tpl-other"></a>

### 기타 활용 장면

**기본 템플릿**

```text
任务目标：[你要生成的内容类型]。
输入约束：主体[主体]，场景[场景]，风格[风格]，色彩[配色]。
质量约束：清晰度[高清/4K]，比例[比例]，构图[构图方式]。
输出约束：用于[用途]，需突出[核心信息]。
请输出一版主方案 + 一版备选方案。
```

**개념 제품 R&D 분해 보드 템플릿**

```text
为[产品/家具/装置]生成一张完整的概念产品研发拆解板，而不是单张成品渲染图。

核心概念：
把[灵感来源，如揉皱纸团/贝壳/折纸/机械结构]转译成[产品类型]。
设计哲学：[一句话说明功能与情绪，例如“把受控混乱转化为高舒适度座椅”]。

画面结构：
中心：高质量 hero render，展示最终产品的主要形态、材质和比例。
左侧：观察与形态分析，包含灵感图、轮廓提取、结构线、折痕/纹理/受力方向标注。
中部：形态迭代过程，展示从原始形态到产品外壳的 3-5 个演化步骤。
下方：人体工学或使用场景验证，包含尺寸、角度、使用姿态和关键功能说明。
右侧：结构集成与材料方案，展示内部骨架、外壳、软垫/面料/连接件等分层拆解。
底部：最终材质、表面纹理、颜色方案和关键规格表。

视觉风格：
工业设计提案板，干净白底或浅灰背景，技术图纸 + 产品摄影混合风格，细线标注，清晰标题，真实阴影，材质细节可见。

约束：
不要只画一个漂亮产品；必须展示分析、迭代、人体工学、结构、材料和规格。
不要让文字挤满画面；每个阶段只保留短标题和关键标签。
产品外形应保留[灵感来源]的识别特征，但必须看起来可制造、可使用。
```

**JSON 고급 템플릿(Agent 호출 권장)**

```json
{
  "type": "Custom Generation",
  "objective": "Generate [Specific content]",
  "inputs": {
    "subject": "[Main subject details]",
    "scene": "[Background and context]",
    "style": "[Artistic/Visual style]",
    "palette": "[Color scheme]"
  },
  "quality_constraints": {
    "resolution": "8k, hyper-detailed",
    "aspect_ratio": "[e.g., 16:9]",
    "composition": "[e.g., Rule of thirds]"
  },
  "output_requirements": {
    "usage": "[Intended use case]",
    "focus": "[Key element to highlight]"
  }
}
```

**실수 방지 가이드**

- **먼저 용도를 말하세요**: 처음에 “작업 목표와 용도”를 써서 모델이 전체 맥락을 잡게 한 다음 시각 세부 사항을 쓰세요.
- **A/B 테스트**: 일반 장면에서는 프롬프트에 “주안 1개 + 대안 1개를 한 번에 생성”하라고 써 두면 바로 좋은 안을 고르기 편합니다.

***
