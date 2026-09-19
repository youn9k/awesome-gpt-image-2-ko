# GPT-Image2 Style Library Reference

Generated from `data/style-library.json`. Use this file as the detailed index for choosing GPT-Image2 prompt templates, visual styles, categories, and scene tags.

## Selection Rules

- Match explicit product types to template categories first, such as product, poster, UI, infographic, brand, photography, character, or document.
- Match visual words to style tags next, such as realistic, 3D, illustration, classical, brand, poster, or UI.
- Match context words to scene tags next, such as commerce, education, social, food, travel, story, history, tech, or creative.
- If a request is vague, offer 2-3 strong template directions and ask the user to choose before writing the final prompt.
- Final output should include the selected template name, a copyable GPT-Image2 prompt, and concise constraints for text, aspect ratio, layout, and negative details.

## Template Index

### UI Screenshot System / UI 스크린샷 시스템

- ID: `ui-screenshot-system`
- Category: UI & Interfaces
- Styles: UI
- Scenes: Tech, Social
- Tags: UI, Dashboard, Screenshot
- Cover: `/images/case17.jpg`
- Template source: https://github.com/freestylefly/awesome-gpt-image-2/blob/main/docs/templates.md#tpl-ui
- Example cases: case 17, case 2, case 4

Use when:
- EN: Use for app screens, dashboards, social screenshots, and live interface mockups.
- KO: 앱 화면, 대시보드, 소셜 스크린샷, 실시간 인터페이스 목업에 사용합니다.

Guidance:
  - Lock platform, aspect ratio, layout hierarchy, and exact visible text.
  - Specify UI chrome such as status bars, tabs, action rows, or comment layers.
  - 플랫폼, 비율, 레이아웃 위계, 화면 텍스트를 고정하세요.
  - 상태 표시줄, 탭, 작업 행, 댓글 레이어 같은 UI 크롬을 명시하세요.

Pitfalls:
  - Avoid vague platform names and generic app mockups.
  - Constrain text readability and platform-specific details.
  - 모호한 플랫폼 이름과 일반적인 앱 목업을 피하세요.
  - 텍스트 가독성과 플랫폼별 세부 사항을 제약하세요.

### Infographic Engine / 인포그래픽 엔진

- ID: `infographic-engine`
- Category: Charts & Infographics
- Styles: Infographic, Charts
- Scenes: Education, Tech
- Tags: Infographic, Chart, Education
- Cover: `/images/case334.png`
- Template source: https://github.com/freestylefly/awesome-gpt-image-2/blob/main/docs/templates.md#tpl-infographic
- Example cases: case 334, case 1, case 8

Use when:
- EN: Use for explainer graphics, technical diagrams, timelines, and knowledge cards.
- KO: 설명 그래픽, 기술 다이어그램, 타임라인, 지식 카드에 사용합니다.

Guidance:
  - Define 3-5 modules, information flow, visual hierarchy, and short labels.
  - Use color groups, arrows, icons, and clean spacing to reduce clutter.
  - 3~5개의 모듈, 정보 흐름, 시각 위계, 짧은 레이블을 정의하세요.
  - 색상 그룹, 화살표, 아이콘, 여백으로 복잡도를 제어하세요.

Pitfalls:
  - Avoid long paragraphs inside the image.
  - Limit module count before adding visual detail.
  - 이미지 안에 긴 문단을 넣지 마세요.
  - 시각적 세부 요소를 추가하기 전에 모듈 수를 제한하세요.

### Scientific Scale Diagram / 과학적 크기 비교 다이어그램

- ID: `scientific-scale-diagram`
- Category: Charts & Infographics
- Styles: Infographic, Charts, Realistic
- Scenes: Education, Tech
- Tags: Infographic, Chart, Education
- Cover: `/images/case341.jpg`
- Template source: https://github.com/freestylefly/awesome-gpt-image-2/blob/main/docs/templates.md#tpl-infographic
- Example cases: case 341

Use when:
- EN: Use when the topic needs micro-to-macro scale comparison and labeled detail windows.
- KO: 미시에서 거시까지의 크기 변화를 보여줘야 하는 과학 주제에 사용합니다.

Guidance:
  - Use 6-8 scale frames and keep each label short.
  - Show units, magnification, and distinct scale detail.
  - 6~8개의 크기 프레임을 사용하고 각 레이블은 짧게 유지하세요.
  - 단위, 배율, 각 크기별 고유한 세부 사항을 보여 주세요.

Pitfalls:
  - Avoid making every scale frame visually identical.
  - Avoid generic magnifying glass icon layouts.
  - 모든 크기 프레임을 똑같이 보이게 만들지 마세요.
  - 일반적인 돋보기 아이콘 레이아웃을 피하세요.

### Poster Layout System / 포스터 레이아웃 시스템

- ID: `poster-layout-system`
- Category: Posters & Typography
- Styles: Poster
- Scenes: Commerce, Social
- Tags: Poster, Typography, Campaign
- Cover: `/images/case345.jpg`
- Template source: https://github.com/freestylefly/awesome-gpt-image-2/blob/main/docs/templates.md#tpl-poster
- Example cases: case 345, case 5, case 10

Use when:
- EN: Use for event posters, movie posters, covers, and social campaign visuals.
- KO: 행사 포스터, 영화 포스터, 표지, 소셜 캠페인 비주얼에 사용합니다.

Guidance:
  - Lock subject, headline, layout, palette, and aspect ratio.
  - Make the title hierarchy and primary visual clear.
  - 주제, 헤드라인, 레이아웃, 색상 팔레트, 종횡비를 고정하세요.
  - 제목 위계와 핵심 비주얼이 뚜렷하게 보이게 하세요.

Pitfalls:
  - Avoid mixed moodboards or process sheets when asking for one finished poster.
  - Constrain extra text and decorative symbols.
  - 완성 포스터를 요청할 때는 무드보드나 작업 과정 시트를 피하세요.
  - 불필요한 텍스트와 장식 기호를 제약하세요.

### Sports Campaign Poster / 스포츠 캠페인 포스터

- ID: `sports-campaign-poster`
- Category: Posters & Typography
- Styles: Poster, Realistic
- Scenes: Commerce, Fashion
- Tags: Poster, Campaign, Typography
- Cover: `/images/case350.jpg`
- Template source: https://github.com/freestylefly/awesome-gpt-image-2/blob/main/docs/templates.md#tpl-poster
- Example cases: case 350, case 3

Use when:
- EN: Use for sports brand campaigns, athlete posters, and product-led sport visuals.
- KO: 스포츠 브랜드 캠페인, 선수 포스터, 제품 중심 스포츠 비주얼에 사용합니다.

Guidance:
  - Define sport, athlete pose, hero prop, title, and brand palette.
  - Use dramatic light, clean composition, and readable data overlays.
  - 스포츠 종목, 선수 포즈, 핵심 소품, 제목, 브랜드 색상을 정의하세요.
  - 드라마틱한 조명, 깔끔한 구성, 읽기 쉬운 데이터 오버레이를 사용하세요.

Pitfalls:
  - Avoid wrong equipment and noisy collage.
  - Keep the athlete and hero prop visually dominant.
  - 잘못된 장비와 산만한 콜라주를 피하세요.
  - 선수와 핵심 소품이 시각적으로 우세하게 하세요.

### Conceptual Typography Poster / 콘셉추얼 타이포그래피 포스터

- ID: `conceptual-typography-poster`
- Category: Posters & Typography
- Styles: Poster
- Scenes: Creative, Social
- Tags: Typography, Poster, Style
- Cover: `/images/case355.jpg`
- Template source: https://github.com/freestylefly/awesome-gpt-image-2/blob/main/docs/templates.md#tpl-poster
- Example cases: case 355

Use when:
- EN: Use when the exact title must become the main visual structure.
- KO: 정확한 제목이 주된 시각 구조가 되어야 하는 포스터에 사용합니다.

Guidance:
  - Make typography the hero and spell the title exactly.
  - Tie human figures, objects, or landscapes to the title meaning.
  - 타이포그래피를 주인공으로 두고 제목 철자를 정확히 유지하세요.
  - 인물, 사물, 풍경은 제목의 의미를 뒷받침해야 합니다.

Pitfalls:
  - Avoid default word art, unrelated icons, and misspelled title text.
  - Limit the color system to a restrained palette.
  - 기본 워드아트, 관련 없는 아이콘, 오탈자를 피하세요.
  - 절제된 색상 팔레트로 제한하세요.

### Ink Double Exposure Poster / 수묵 이중 노출 포스터

- ID: `ink-double-exposure-poster`
- Category: Posters & Typography
- Styles: Poster, Illustration, Classical
- Scenes: Story, History
- Tags: Poster, Classical, Style
- Cover: `/images/case359.jpg`
- Template source: https://github.com/freestylefly/awesome-gpt-image-2/blob/main/docs/templates.md#tpl-poster
- Example cases: case 359

Use when:
- EN: Use for poetic portrait posters, ink atmospheres, and layered cultural visuals.
- KO: 시적인 인물 포스터, 수묵 분위기, 문화 주제 비주얼에 사용합니다.

Guidance:
  - Blend portrait silhouette, ink texture, atmosphere, and negative space.
  - Keep composition quiet, premium, and readable.
  - 인물 실루엣, 수묵 질감, 분위기, 여백을 조합하세요.
  - 절제되고 고급스러우며 읽기 쉬운 구성을 유지하세요.

Pitfalls:
  - Avoid cheap fantasy collage and overloaded scenery.
  - Use subtle text or no text unless required.
  - 저렴해 보이는 판타지 콜라주와 과도한 풍경 쌓기를 피하세요.
  - 필요하지 않다면 텍스트를 최소화하세요.

### Nature Science Poster / 자연 과학 포스터

- ID: `nature-science-poster`
- Category: Posters & Typography
- Styles: Poster, Infographic
- Scenes: Education
- Tags: Poster, Education, Style
- Cover: `/images/case339.jpg`
- Template source: https://github.com/freestylefly/awesome-gpt-image-2/blob/main/docs/templates.md#tpl-poster
- Example cases: case 339

Use when:
- EN: Use for natural subjects that need a premium, clean science poster feel.
- KO: 고급스럽고 깔끔한 과학 포스터 느낌이 필요한 자연 주제에 사용합니다.

Guidance:
  - Use a clear subject, minimal copy, soft shadows, and disciplined whitespace.
  - Keep the scientific label short and visible.
  - 명확한 주제, 적은 카피, 부드러운 그림자, 충분한 여백을 사용하세요.
  - 과학 레이블은 짧고 잘 보이게 하세요.

Pitfalls:
  - Avoid heavy advertising language.
  - Avoid dense encyclopedia blocks.
  - 광고 문구가 지나치게 강해지지 않도록 하세요.
  - 빽빽한 백과사전식 본문을 피하세요.

### Product Commerce Visual / 제품 커머스 비주얼

- ID: `product-commerce-visual`
- Category: Products & E-commerce
- Styles: Product, Realistic
- Scenes: Commerce, Food
- Tags: Product, Commerce, Packaging
- Cover: `/images/case373.jpg`
- Template source: https://github.com/freestylefly/awesome-gpt-image-2/blob/main/docs/templates.md#tpl-product
- Example cases: case 373, case 358

Use when:
- EN: Use for product hero shots, packaging visuals, detail pages, and sales layouts.
- KO: 제품 히어로 사진, 패키징 비주얼, 상세 페이지, 판매 레이아웃에 사용합니다.

Guidance:
  - Define product, selling points, material, scene, lighting, and layout blocks.
  - Separate hero product, benefit labels, and supporting props.
  - 제품, 판매 포인트, 재질, 장면, 조명, 레이아웃 블록을 정의하세요.
  - 주요 제품, 혜택 레이블, 보조 소품을 구분하세요.

Pitfalls:
  - Avoid random props that weaken product recognition.
  - Constrain packaging text and claim wording.
  - 제품 인지도를 약화시키는 무작위 소품을 피하세요.
  - 패키지 텍스트와 판매 문구를 제약하세요.

### Personalized Beauty Report / 개인화 뷰티 리포트

- ID: `personalized-beauty-report`
- Category: Products & E-commerce
- Styles: Product, UI
- Scenes: Commerce, Fashion
- Tags: Product, Layout, Style
- Cover: `/images/case353.jpg`
- Template source: https://github.com/freestylefly/awesome-gpt-image-2/blob/main/docs/templates.md#tpl-product
- Example cases: case 353

Use when:
- EN: Use for beauty recommendations, skin reports, shopping assistants, and lifestyle product cards.
- KO: 뷰티 추천, 피부 리포트, 쇼핑 도우미, 라이프스타일 제품 카드에 사용합니다.

Guidance:
  - Use a report-like hierarchy with diagnosis, recommendation, and product cards.
  - Keep product images, labels, and ratings aligned.
  - 진단, 추천, 제품 카드로 된 리포트 위계를 사용하세요.
  - 제품 이미지, 레이블, 평점을 정렬하세요.

Pitfalls:
  - Avoid medical claims and unreadable dense notes.
  - Keep recommendation logic simple.
  - 의학적 주장과 읽기 어려운 작은 글자를 피하세요.
  - 추천 논리를 명확하게 유지하세요.

### Brand Identity Package / 브랜드 아이덴티티 패키지

- ID: `brand-identity-package`
- Category: Brand & Logos
- Styles: Brand
- Scenes: Commerce
- Tags: Brand, Logo, Identity
- Cover: `/images/case354.jpg`
- Template source: https://github.com/freestylefly/awesome-gpt-image-2/blob/main/docs/templates.md#tpl-brand
- Example cases: case 354

Use when:
- EN: Use for logo systems, brand boards, visual identity kits, and application mockups.
- KO: 로고 시스템, 브랜드 보드, 비주얼 아이덴티티 키트, 적용 목업에 사용합니다.

Guidance:
  - Define brand name, positioning, palette, typography, logo usage, and touchpoints.
  - Ask for a coherent board with aligned applications.
  - 브랜드명, 포지셔닝, 팔레트, 타이포그래피, 로고 사용법, 접점을 정의하세요.
  - 적용 예시가 정렬된 일관된 보드를 요청하세요.

Pitfalls:
  - Avoid unrelated logo variants and inconsistent palettes.
  - Keep brand text accurate.
  - 관련 없는 로고 변형과 일관성 없는 팔레트를 피하세요.
  - 브랜드 텍스트를 정확하게 유지하세요.

### Brand Touchpoint Board / 브랜드 접점 보드

- ID: `brand-touchpoint-board`
- Category: Brand & Logos
- Styles: Brand, Product
- Scenes: Commerce, Social
- Tags: Brand, Identity, Campaign
- Cover: `/images/case362.jpg`
- Template source: https://github.com/freestylefly/awesome-gpt-image-2/blob/main/docs/templates.md#tpl-brand
- Example cases: case 362

Use when:
- EN: Use for multi-touchpoint campaign boards and brand rollout previews.
- KO: 다중 접점 캠페인 보드와 브랜드 적용 미리보기에 사용합니다.

Guidance:
  - Specify touchpoint list, shared visual rules, and mockup arrangement.
  - Use one palette and one typography logic across all panels.
  - 접점 목록, 공통 시각 규칙, 목업 배열을 지정하세요.
  - 모든 패널에서 하나의 팔레트와 타이포그래피 논리를 공유하세요.

Pitfalls:
  - Avoid mixing many unrelated campaign styles.
  - Limit touchpoints if readability drops.
  - 관련 없는 여러 캠페인 스타일을 섞지 마세요.
  - 가독성이 떨어지면 접점 수를 줄이세요.

### Architecture & Space / 건축과 공간

- ID: `architecture-space`
- Category: Architecture & Spaces
- Styles: Architecture
- Scenes: Travel, Commerce
- Tags: Architecture, Interior, Map
- Cover: `/images/case331.png`
- Template source: https://github.com/freestylefly/awesome-gpt-image-2/blob/main/docs/templates.md#tpl-architecture
- Example cases: case 331, case 11

Use when:
- EN: Use for interiors, architecture renders, city maps, spatial plans, and environment concepts.
- KO: 실내, 건축 렌더링, 도시 지도, 공간 계획, 환경 콘셉트에 사용합니다.

Guidance:
  - Define viewpoint, scale, material, lighting, and spatial function.
  - For maps, specify landmarks, labels, border decoration, and visual accuracy level.
  - 시점, 크기, 재질, 조명, 공간 기능을 정의하세요.
  - 지도에는 랜드마크, 레이블, 테두리 장식, 정확도 수준을 지정하세요.

Pitfalls:
  - Avoid impossible perspectives unless the output is conceptual.
  - Lock map label language and relative placement.
  - 콘셉트 출력이 아니라면 불가능한 원근법을 피하세요.
  - 지도 레이블의 언어와 상대 위치를 고정하세요.

### Realistic Photography / 사실적 사진

- ID: `realistic-photography`
- Category: Photography & Realism
- Styles: Photography, Realistic
- Scenes: Fashion, Commerce
- Tags: Photography, Realistic, Lens
- Cover: `/images/case377.jpg`
- Template source: https://github.com/freestylefly/awesome-gpt-image-2/blob/main/docs/templates.md#tpl-photo
- Example cases: case 377

Use when:
- EN: Use for portraits, street photos, product photography, and cinematic realism.
- KO: 인물 사진, 거리 사진, 제품 사진, 영화 같은 사실적 표현에 사용합니다.

Guidance:
  - Specify camera distance, lens, light source, texture, background, and motion.
  - Use believable imperfections for documentary realism.
  - 카메라 거리, 렌즈, 광원, 질감, 배경, 움직임을 지정하세요.
  - 다큐멘터리 사실성을 위해 그럴듯한 작은 결함을 사용하세요.

Pitfalls:
  - Avoid over-polished plastic skin unless commercial beauty is required.
  - Add negative constraints for hands, text, and anatomy when needed.
  - 상업 뷰티가 아니라면 과도하게 매끈한 플라스틱 피부를 피하세요.
  - 필요할 때는 손, 텍스트, 해부 구조에 대한 네거티브 제약을 추가하세요.

### Street Accident Moment / 거리의 우연한 순간 사진

- ID: `street-accident-moment`
- Category: Photography & Realism
- Styles: Photography, Realistic
- Scenes: Travel, Social
- Tags: Photography, Realistic, Scene
- Cover: `/images/case376.jpg`
- Template source: https://github.com/freestylefly/awesome-gpt-image-2/blob/main/docs/templates.md#tpl-photo
- Example cases: case 376

Use when:
- EN: Use for candid street moments, accidental spills, documentary phone shots, and fast action.
- KO: 자연스러운 거리 순간, 우연한 쏟음, 휴대폰 다큐멘터리 사진, 빠른 동작에 사용합니다.

Guidance:
  - Describe the exact moment, camera height, motion blur, and street context.
  - Add negative constraints for staged poses and fake ad lighting.
  - 정확한 순간, 카메라 높이, 움직임 흐림, 거리 맥락을 설명하세요.
  - 연출된 포즈와 광고 스튜디오 조명을 피하는 제약을 추가하세요.

Pitfalls:
  - Avoid too-clean compositions.
  - Keep the event plausible and grounded.
  - 구성이 지나치게 깨끗해지지 않도록 하세요.
  - 사건이 그럴듯하고 현실감 있게 보이게 하세요.

### Illustration & Art Style / 일러스트레이션과 예술 스타일

- ID: `illustration-art-style`
- Category: Illustration & Art
- Styles: Illustration
- Scenes: Story, Creative
- Tags: Illustration, Art, Style
- Cover: `/images/case346.jpg`
- Template source: https://github.com/freestylefly/awesome-gpt-image-2/blob/main/docs/templates.md#tpl-illustration
- Example cases: case 346, case 6

Use when:
- EN: Use for anime, watercolor, ink, decorative art, and style experiments.
- KO: 애니메이션, 수채화, 수묵, 장식 예술, 스타일 실험에 사용합니다.

Guidance:
  - Define composition, subject, palette, brush material, mood, and rendering depth.
  - For reference images, state what must be preserved.
  - 구성, 주제, 팔레트, 붓 재질, 분위기, 렌더링 완성도를 정의하세요.
  - 참조 이미지를 쓸 때는 유지할 특성을 명시하세요.

Pitfalls:
  - Avoid style-only prompts without composition.
  - Lock character identity when using references.
  - 구성 없이 스타일만 적는 프롬프트를 피하세요.
  - 참조 이미지를 쓸 때 캐릭터 정체성을 고정하세요.

### Character Design Sheet / 캐릭터 디자인 시트

- ID: `character-design-sheet`
- Category: Characters & People
- Styles: Character, Illustration
- Scenes: Story
- Tags: Character, Pose, Style
- Cover: `/images/case347.jpg`
- Template source: https://github.com/freestylefly/awesome-gpt-image-2/blob/main/docs/templates.md#tpl-character
- Example cases: case 347

Use when:
- EN: Use for character sheets, pose grids, action breakdowns, and identity references.
- KO: 캐릭터 시트, 포즈 그리드, 동작 분석, 정체성 참조에 사용합니다.

Guidance:
  - Define identity anchors, outfit, proportions, pose count, and sheet layout.
  - Keep face, hairstyle, and costume details consistent.
  - 정체성 앵커, 의상, 비율, 포즈 수, 시트 레이아웃을 정의하세요.
  - 얼굴, 헤어스타일, 의상 세부 정보를 일관되게 유지하세요.

Pitfalls:
  - Avoid changing costume details between poses.
  - Limit pose count if the sheet becomes crowded.
  - 포즈별로 의상 세부 정보가 바뀌는 것을 피하세요.
  - 시트가 혼잡해지면 포즈 수를 줄이세요.

### 3D Collectible Toy / 3D 컬렉터블 토이

- ID: `3d-collectible-toy`
- Category: Characters & People
- Styles: 3D, Character
- Scenes: Commerce, Creative
- Tags: Character, 3D, Style
- Cover: `/images/case378.jpg`
- Template source: https://github.com/freestylefly/awesome-gpt-image-2/blob/main/docs/templates.md#tpl-character
- Example cases: case 378

Use when:
- EN: Use for premium collectible figures, avatar toys, blind-box characters, and 3D display renders.
- KO: 프리미엄 컬렉터블 피규어, 아바타 토이, 블라인드 박스 캐릭터, 3D 전시 렌더에 사용합니다.

Guidance:
  - Preserve face and outfit anchors from the reference.
  - Specify material, packaging, base, lighting, and collectible scale.
  - 참조 이미지의 얼굴과 의상 앵커를 유지하세요.
  - 재질, 패키징, 받침, 조명, 컬렉터블 비율을 지정하세요.

Pitfalls:
  - Avoid generic toy bodies without identity details.
  - Keep packaging text minimal and accurate.
  - 정체성 세부 사항이 없는 일반적인 장난감 몸체를 피하세요.
  - 패키지 텍스트는 적고 정확하게 유지하세요.

### Scene Storytelling / 장면 스토리텔링

- ID: `scene-storytelling`
- Category: Scenes & Storytelling
- Styles: Scenes, Illustration
- Scenes: Story, Social
- Tags: Scene, Story, Storyboard
- Cover: `/images/case330.png`
- Template source: https://github.com/freestylefly/awesome-gpt-image-2/blob/main/docs/templates.md#tpl-scene
- Example cases: case 330

Use when:
- EN: Use for storyboards, worldbuilding, live scenes, and emotional narrative frames.
- KO: 스토리보드, 세계관, 라이브 장면, 감정 서사 프레임에 사용합니다.

Guidance:
  - Define who, where, when, conflict, emotion, and camera framing.
  - Use scene details to support narrative rather than decoration.
  - 누가, 어디서, 언제, 갈등, 감정, 카메라 프레이밍을 정의하세요.
  - 장면 세부 요소는 장식이 아니라 서사를 지원하게 하세요.

Pitfalls:
  - Avoid generic fantasy backgrounds.
  - Keep narrative cues visible in the frame.
  - 일반적인 판타지 배경을 피하세요.
  - 프레임 안에서 서사 단서가 보이게 하세요.

### History & Classical Themes / 역사와 고전 주제

- ID: `history-classical-themes`
- Category: History & Classical Themes
- Styles: History, Classical, Illustration
- Scenes: History, Story
- Tags: History, Classical, Scroll
- Cover: `/images/case375.jpg`
- Template source: https://github.com/freestylefly/awesome-gpt-image-2/blob/main/docs/templates.md#tpl-history
- Example cases: case 375, case 338

Use when:
- EN: Use for ancient Chinese themes, scrolls, dynasty clothing, poetry visuals, and historical scenes.
- KO: 중국 고전 주제, 두루마리, 왕조 의상, 시 비주얼, 역사 장면에 사용합니다.

Guidance:
  - Specify dynasty, clothing system, object references, layout format, and cultural mood.
  - Use scroll, album page, or poster format deliberately.
  - 왕조, 의상 체계, 소품 참조, 레이아웃 형식, 문화적 분위기를 지정하세요.
  - 두루마리, 화첩 페이지, 포스터 형식을 의도적으로 선택하세요.

Pitfalls:
  - Avoid mixing dynasties when historical accuracy matters.
  - Constrain random modern props.
  - 역사적 정확성이 중요하다면 왕조를 섞지 마세요.
  - 무작위 현대 소품을 제약하세요.

### Document & Publishing / 문서와 출판

- ID: `document-publishing`
- Category: Documents & Publishing
- Styles: Documents, Infographic
- Scenes: Education, Tech
- Tags: Document, Publishing, Layout
- Cover: `/images/case360.jpg`
- Template source: https://github.com/freestylefly/awesome-gpt-image-2/blob/main/docs/templates.md#tpl-document
- Example cases: case 360

Use when:
- EN: Use for white papers, manuals, encyclopedic plates, report pages, and publication systems.
- KO: 백서, 매뉴얼, 백과 도판, 보고서 페이지, 출판 시스템에 사용합니다.

Guidance:
  - Define page size, columns, table of contents, figure system, and typography hierarchy.
  - Use readable headings, tables, labels, and page rhythm.
  - 페이지 크기, 열, 목차, 도표 체계, 타이포그래피 위계를 정의하세요.
  - 읽기 쉬운 제목, 표, 레이블, 페이지 리듬을 사용하세요.

Pitfalls:
  - Avoid tiny dense text.
  - Keep charts and captions aligned to the page grid.
  - 작고 빽빽한 텍스트를 피하세요.
  - 차트와 캡션을 페이지 그리드에 맞추세요.

### Concept Product Breakdown / 콘셉트 제품 분해

- ID: `concept-product-breakdown`
- Category: Other Use Cases
- Styles: Other Use Cases, Product
- Scenes: Creative, Tech
- Tags: Creative, R&D, Special
- Cover: `/images/case370.jpg`
- Template source: https://github.com/freestylefly/awesome-gpt-image-2/blob/main/docs/templates.md#tpl-other
- Example cases: case 370, case 361

Use when:
- EN: Use for experimental prompt tasks, R&D boards, exploded diagrams, and unusual visual systems.
- KO: 실험적 프롬프트 작업, 연구·개발 보드, 분해 다이어그램, 독특한 시각 시스템에 사용합니다.

Guidance:
  - Define the artifact type, components, labels, material logic, and final presentation format.
  - Use clear callouts and a controlled technical style.
  - 결과물 유형, 구성 요소, 레이블, 재질 논리, 최종 표현 형식을 정의하세요.
  - 명확한 콜아웃과 절제된 기술 스타일을 사용하세요.

Pitfalls:
  - Avoid unspecified mixed tasks.
  - Keep labels short and component relationships visible.
  - 정의되지 않은 혼합 작업을 피하세요.
  - 레이블은 짧게 하고 구성 요소 관계를 명확히 보이게 하세요.

## Categories

- UI & Interfaces: UI와 인터페이스 | Apps, websites, dashboards, social screenshots, and product interfaces.
- Charts & Infographics: 차트와 인포그래픽 | Infographics, knowledge maps, technical explainers, and structured diagrams.
- Posters & Typography: 포스터와 타이포그래피 | Event posters, covers, type-driven visuals, and strong layout compositions.
- Products & E-commerce: 제품과 이커머스 | Product shots, detail pages, packaging, selling points, and ads.
- Brand & Logos: 브랜드와 로고 | Logos, identity systems, brand touchpoints, and campaign visuals.
- Architecture & Spaces: 건축과 공간 | Architecture renders, interiors, city maps, and spatial concepts.
- Photography & Realism: 사진과 사실성 | Portraits, phone photography, film texture, and commercial photography.
- Illustration & Art: 일러스트레이션과 예술 | Illustration, art styles, material experiments, and decorative images.
- Characters & People: 인물과 캐릭터 | Character design, pose references, cards, and 3D toys.
- Scenes & Storytelling: 장면과 스토리텔링 | Storyboards, narrative scenes, livestream frames, and worldbuilding.
- History & Classical Themes: 역사와 고전 주제 | Classical scrolls, historical figures, traditional themes, and poetry visuals.
- Documents & Publishing: 문서와 출판 | White papers, manuals, encyclopedic plates, and publishing layouts.
- Other Use Cases: 기타 활용 사례 | Creative experiments, special tasks, mixed workflows, and practical cases.

## Styles

- 3D: 3D | Keywords: 3d, toy, render, 玩具
- Architecture: 건축 | Keywords: None
- Brand: 브랜드 | Keywords: brand, logo, identity, 品牌, 标志
- Character: 캐릭터 | Keywords: character, avatar, pose, 角色, 人物
- Characters: 인물 | Keywords: None
- Charts: 차트 | Keywords: None
- Classical: 고전 | Keywords: classical, dynasty, history, 古风, 历史
- Documents: 문서 | Keywords: None
- History: 역사 | Keywords: None
- Illustration: 일러스트레이션 | Keywords: illustration, painting, watercolor, 插画, 绘画
- Infographic: 인포그래픽 | Keywords: infographic, diagram, 信息图, 图解
- Other Use Cases: 기타 활용 사례 | Keywords: None
- Photography: 사진 | Keywords: None
- Poster: 포스터 | Keywords: poster, cover, typography, 海报, 封面
- Product: 제품 | Keywords: product, packaging, 商品, 包装
- Products: 제품 | Keywords: None
- Realistic: 사실적 | Keywords: photo, realistic, camera, 写真, 写实
- Scenes: 장면 | Keywords: None
- UI: UI | Keywords: ui, interface, dashboard, 界面, 截图

## Scenes

- Creative: 창의 | Keywords: None
- Tech: 기술 | Keywords: ai, rag, tech, data, 技术, 数据
- Commerce: 커머스 | Keywords: product, brand, ad, campaign, 商品, 商业, 广告
- Education: 교육 | Keywords: guide, atlas, science, learning, 学习, 科普
- Social: 소셜 | Keywords: social, x , wechat, 朋友圈, 社媒
- Fashion: 패션 | Keywords: fashion, clothing, portrait, 服饰, 写真
- Food: 음식과 음료 | Keywords: food, drink, coffee, tea, 餐厅, 咖啡, 茶
- Travel: 여행 | Keywords: city, map, street, 城市, 地图, 街头
- Story: 이야기 | Keywords: story, scene, world, 故事, 场景
- History: 역사 | Keywords: history, dynasty, ancient, 历史, 古希腊, 唐

