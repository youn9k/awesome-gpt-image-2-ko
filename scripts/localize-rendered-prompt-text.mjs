import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const galleryFiles = ['docs/gallery-part-1.md', 'docs/gallery-part-2.md'];
const templateFiles = ['docs/templates.md'];
const files = [...galleryFiles, ...templateFiles];
// These prompts use the original language itself as the subject matter. Case 245 is an
// unqualified seal example and remains untouched as well.
const preserveSourceLanguage = new Set([13, 232, 245, 275, 300, 303, 337, 338]);
const KOREAN_OUTPUT_CONSTRAINT = '이미지에 표시되는 제목, 레이블, 주석, UI 텍스트와 기타 읽을 수 있는 문구는 모두 명확한 한국어로 작성합니다.';
const koreanOutputConstraintCases = new Set([
  1, 9, 11, 14, 15, 18, 21, 22, 23, 51, 64, 65, 66, 67, 68, 69,
  70, 71, 72, 73, 131, 132, 133, 149, 152, 153, 156, 158, 159, 163,
  164, 165, 279, 304
]);

const caseSpecificReplacements = new Map([
  [1, [
    ['城市生命系统图谱 / Urban Metabolism Atlas', '도시 생명 시스템 지도 / Urban Metabolism Atlas'],
    ['bilingual CN/EN: 能源/水循环/交通/数据/垃圾/建筑/公共服务/ 物流/气候韧性/生态/地质/治理看板', 'bilingual KO/EN: 에너지/물 순환/교통/데이터/폐기물/건축/공공 서비스/물류/기후 회복력/생태/지질/거버넌스 대시보드']
  ]],
  [9, [
    ['小印章“北京”', '작은 인장 “베이징”']
  ]],
  [14, [
    ['《番茄炒蛋：国民灵魂料理》', '《토마토 달걀볶음: 국민 소울푸드》'],
    ['“厨师推荐”', '“셰프 추천”'],
    ['[ 摄影师的厨房日记 · 2025 ]', '[ 요리사의 주방 일기 · 2025 ]']
  ]],
  [15, [
    ['趁年轻，激爽才够味！', '젊을 때, 짜릿하게 즐기자!']
  ]],
  [18, [
    ['{argument name="city name" default="成都"} {argument name="map title" default="吃货暴走地图"}', '{argument name="city name" default="청두"} {argument name="map title" default="미식가 도보 탐방 지도"}'],
    ['["人民公园", "文殊院", "IFS", "339电视塔", "宽窄巷子", "东郊记忆"]', '["인민공원", "원수원", "IFS", "339 TV 타워", "관자이샹쯔", "둥자오 메모리"]'],
    ['"图例"', '"범례"'],
    ['["美食地点", "地标景点", "公园绿地", "河流湖泊", "主要道路"]', '["미식 장소", "랜드마크", "공원과 녹지", "강과 호수", "주요 도로"]'],
    ['温馨提示：吃辣需谨慎，肠胃要保护~', '안내: 매운 음식은 주의하고 위장을 보호하세요~']
  ]],
  [21, [
    ['55.6万本场点赞', '이번 방송 좋아요 55.6만'],
    ['关注', '팔로우'],
    ['68.7万', '68.7만'],
    ['更多直播 >', '더 많은 라이브 >'],
    ['礼物展馆 0/24', '선물 전시관 0/24'],
    ['经典', '인기'],
    ['科技爱好者', '기술 애호가'],
    ['送小心心', '하트를 보냄'],
    ['星辰大海', '별과 바다'],
    ['送火箭', '로켓을 보냄'],
    ['宇宙漫游者 加入了直播间', '우주 여행자가 라이브 방송에 입장했습니다'],
    ['特斯拉Model 2什么时候出？', '테슬라 모델 2는 언제 나오나요?'],
    ['SpaceX今年能上火星吗？', 'SpaceX는 올해 화성에 갈 수 있나요?'],
    ['Neuralink进展如何？', 'Neuralink 진행 상황은 어떤가요?'],
    ['第一次来你的直播，超激动！', '처음 라이브에 왔는데 정말 설레요!'],
    ['讲讲AI吧，会取代人类吗？', 'AI 이야기를 들려주세요. 인간을 대체할까요?'],
    ['热卖 x 1888', '인기 판매 x 1888'],
    ['特斯拉Cybertruck 电动皮卡', '테슬라 사이버트럭 전기 픽업트럭'],
    ['抢', '구매'],
    ['说点什么...', '메시지를 입력하세요...']
  ]],
  [22, [
    ['武術会', '무술회']
  ]],
  [23, [
    ['人类演化', '인류의 진화'],
    ['["L0: 单细胞生命", "L1: 多细胞生物", "L2: 动物界", "L3: 脊索动物", "L4: 上陆革命", "L5: 哺乳纲", "L6: 人科演化", "L7: 智人纪元"]', '["L0: 단세포 생명", "L1: 다세포 생물", "L2: 동물계", "L3: 척삭동물", "L4: 육상 진출", "L5: 포유류", "L6: 인류 진화", "L7: 호모 사피엔스 시대"]'],
    ['获得的功能 / 失去的功能', '획득한 기능 / 잃은 기능'],
    ['演化关键里程碑', '진화의 핵심 이정표']
  ]],
  [51, [
    ['一周穿搭指南', '일주일 코디 가이드'],
    ['温柔 | 靓丽 | 优雅', '부드러움 | 화사함 | 우아함'],
    ['Tips: 根据天气与场合灵活调整，配饰是提升整体造型的关键；保持自信与舒适，才是穿搭的最终目的。', '팁: 날씨와 상황에 맞게 유연하게 조정하세요. 액세서리는 전체 스타일을 완성하는 핵심이며, 자신감과 편안함이 코디의 최종 목표입니다.']
  ]],
  [65, [
    ['儒釋道·根本區別', '유교·불교·도교의 핵심 차이']
  ]],
  [66, [
    ['一件女装诞生的因果链 THE CAUSAL CHAIN OF A WOMEN\'S GARMENT', '여성 의류가 탄생하는 인과 사슬 THE CAUSAL CHAIN OF A WOMEN\'S GARMENT'],
    ['从纤维，到版型，到上身 FROM FIBER TO FIT', '섬유에서 패턴, 착용까지 FROM FIBER TO FIT'],
    ['一件成衣，因无数判断而存在 A garment exists because of countless decisions.', '한 벌의 의류는 수많은 판단으로 존재합니다. A garment exists because of countless decisions.']
  ]],
  [73, [
    ['{argument name="korean city name" default="上海"}城市系统剖面', '{argument name="korean city name" default="서울"} 도시 시스템 단면']
  ]],
  [279, [
    ['东方美学', '동양 미학']
  ]],
  [304, [
    ['东方美学', '동양 미학']
  ]]
]);

const replacements = [
  ['图片中文本准确显示', '이미지 속 텍스트가 정확하게 표시됩니다'],
  ['包含指定中文', '지정한 한국어를 포함'],
  ['文字必须准确显示指定的中文', '텍스트는 지정한 한국어를 정확하게 표시해야 합니다'],
  ['简体中文台词', '한국어 대사'],
  ['简体한국어 대사', '한국어 대사'],
  ['简体한국어', '한국어'],
  ['中文标题字', '한국어 제목 글자'],
  ['中文书法字体', '한국어 서예 글꼴'],
  ['中文名称', '한국어 명칭'],
  ['中文健身信息图', '한국어 피트니스 인포그래픽'],
  ['中文引线标注', '한국어 연결선 주석'],
  ['中文"[주제 한국어]演进史"', '한국어 "[주제 한국어] 발전사"'],
  ['Chinese "[Theme Chinese] Evolution History"', 'Korean "[Theme Korean] Evolution History"'],
  ['文字与标注（硬性要求：必须为清晰中文）', '텍스트 및 주석(필수: 명확한 한국어)'],
  ['标准한국어 텍스트：其余所有说明文字、大量清晰한국어 손글씨 주석、模块内容及注解均使用清晰可辨的简体汉字，不得出现乱码或无法识别符号，优先保证文字可读性。', '표준 한국어 텍스트: 나머지 모든 설명, 명확한 손글씨 주석, 모듈 내용 및 해설도 식별 가능한 한국어로 작성하고 깨진 문자나 식별할 수 없는 기호를 사용하지 않으며 가독성을 우선합니다.'],
  ['All text must use Chinese, be clear and readable, no garbled characters, no English.', 'All text must use Korean, be clear and readable, with no garbled characters or English.'],
  ['中文知识解析', '한국어 지식 해설'],
  ['Chinese knowledge analysis', 'Korean knowledge analysis'],
  ['“{constellation_name}解剖图谱”', '“{constellation_name} 해부 도감”'],
  ['【射手座 / Sagittarius】', '【궁수자리 / Sagittarius】'],
  ['{argument name="chinese city name" default="上海"}城市系统剖面', '{argument name="korean city name" default="서울"} 도시 시스템 단면'],
  ['chinese city name', 'korean city name'],
  ['Chinese city name', 'Korean city name'],
  ['brand chinese name', 'brand Korean name'],
  ['Theme Chinese', 'Theme Korean'],
  ['Chinese main title', 'Korean main title'],
  ['Chinese lead lines', 'Korean leader lines'],
  ['Chinese disassembly infographic', 'Korean disassembly infographic'],
  ['complete Chinese infographic', 'complete Korean infographic'],
  ['英文/中文教科书', '영문/한국어 교과서'],
  ['简体汉字', '한국어'],
  ['所有文字必须为简体中文', '모든 텍스트는 한국어여야 하며'],
  ['所有文字使用中文', '모든 텍스트는 한국어를 사용하고'],
  ['文字以中文为主', '텍스트는 한국어를 중심으로 사용하고'],
  ['中文文字必须清晰、准确、易读', '한국어 텍스트는 명확하고 정확하며 읽기 쉬워야 하고'],
  ['中文必须清晰可读', '한국어는 명확하고 읽을 수 있어야 하며'],
  ['中文文字必须清晰可读', '한국어 텍스트는 명확하고 읽을 수 있어야 하며'],
  ['中文大标题', '한국어 큰 제목'],
  ['中文主标题', '한국어 주제목'],
  ['中文副标题', '한국어 부제목'],
  ['中文标题', '한국어 제목'],
  ['中文名字', '한국어 이름'],
  ['中文名', '한국어 이름'],
  ['中文文本', '한국어 텍스트'],
  ['中文文字', '한국어 텍스트'],
  ['中文文案', '한국어 카피'],
  ['中文广告语', '한국어 광고 문구'],
  ['中文标注', '한국어 주석'],
  ['中文注释', '한국어 주석'],
  ['中文标签', '한국어 레이블'],
  ['中文台词', '한국어 대사'],
  ['中文书法', '한국어 서예'],
  ['中文字体', '한국어 글꼴'],
  ['中文信息图', '한국어 인포그래픽'],
  ['中文拆解信息图', '한국어 분해 인포그래픽'],
  ['中文手写注释', '한국어 손글씨 주석'],
  ['中文解释', '한국어 설명'],
  ['中文内容', '한국어 콘텐츠'],
  ['中文物种名', '한국어 종 이름'],
  ['主题中文', '주제 한국어'],
  ['简体中文', '한국어'],
  ['清晰中文手写注释', '명확한 한국어 손글씨 주석'],
  ['Clear Chinese', 'Clear Korean'],
  ['CLEAR Chinese', 'CLEAR Korean'],
  ['Standard Chinese Text', 'Standard Korean Text'],
  ['Chinese calligraphy', 'Korean calligraphy'],
  ['Chinese Calligraphy', 'Korean Calligraphy'],
  ['Traditional Chinese characters', 'Korean characters'],
  ['Chinese characters', 'Korean characters'],
  ['Chinese text', 'Korean text'],
  ['Chinese Text', 'Korean Text'],
  ['Chinese labels', 'Korean labels'],
  ['Chinese label', 'Korean label'],
  ['Chinese annotations', 'Korean annotations'],
  ['Chinese annotation', 'Korean annotation'],
  ['Chinese explanation', 'Korean explanation'],
  ['Chinese title', 'Korean title'],
  ['Chinese subtitle', 'Korean subtitle'],
  ['Chinese name', 'Korean name'],
  ['Chinese typography', 'Korean typography'],
  ['Chinese language', 'Korean language'],
  ['Simplified Chinese', 'Korean'],
  ['bilingual Chinese and English', 'bilingual Korean and English'],
  ['Chinese and English titles', 'Korean and English titles'],
  ['Chinese/English', 'Korean/English'],
];

// Some source prompts embed the output-language phrase inside a Chinese or
// English sentence.  Clean the full instruction afterwards so the generated
// prompt remains readable instead of becoming a mixed-script fragment.
const cleanupReplacements = [
  ['正文的한국어 콘텐츠：', '본문 한국어 콘텐츠:'],
  ['的한국어 인포그래픽风格', '의 한국어 인포그래픽 스타일'],
  ['单页한국어 인포그래픽', '단일 페이지 한국어 인포그래픽'],
  ['在真实的印刷영문/한국어 교과서或试卷页面上，', '실제 인쇄된 영문/한국어 교과서 또는 시험지 페이지 위에,'],
  ['한국어 서예字体', '한국어 서예 글꼴'],
  ['所有文字使用中文', '모든 텍스트는 한국어를 사용하고'],
  ['모든 텍스트는 한국어를 사용하고，清晰易读，不要乱码，不要英文', '모든 텍스트는 한국어를 사용하고, 명확하고 읽기 쉬워야 하며, 깨진 문자나 영어를 사용하지 않습니다'],
  ['“博物馆图鉴式한국어 분해 인포그래픽”', '“박물관 도감형 한국어 분해 인포그래픽”'],
  ['顶部：한국어 주제목 + 副标题 + 导语', '상단: 한국어 주제목 + 부제목 + 도입문'],
  ['左侧：结构拆解区，한국어 연결线注释关键部件，并配局部特写', '왼쪽: 구조 분해 영역에 핵심 부품을 한국어 연결선 주석으로 표시하고 부분 확대를 함께 배치합니다'],
  ['完整한국어 인포그래픽形式', '완전한 한국어 인포그래픽 형식'],
  ['모든 텍스트는 한국어여야 하며，清晰、规整、可读，不要乱码、错字、英文或拼音。', '모든 텍스트는 한국어여야 하며, 명확하고 정돈되어 읽기 쉬워야 합니다. 깨진 문자, 오타, 영어 또는 병음을 사용하지 마세요.'],
  ['设计师对于设计的한국어 텍스트解读', '디자이너의 디자인 한국어 텍스트 해석'],
  ['한국어 부제목：{一句有吸引力的物种定位}', '한국어 부제목: {매력적인 종의 특징을 담은 한 줄}'],
  ['한국어 제목使用大号黑色、高级、稳重、有力量感的字体。', '한국어 제목은 크고 검정색의 고급스럽고 안정적이며 힘 있는 글꼴을 사용합니다.'],
  ['正文使用清晰现代한국어 글꼴，保持可读。', '본문은 명확하고 현대적인 한국어 글꼴을 사용해 가독성을 유지합니다.'],
  ['한국어 제목字', '한국어 제목 글자'],
  ['한국어 인포그래픽设计师', '한국어 인포그래픽 디자이너'],
  ['한국어는 명확하고 읽을 수 있어야 하며，标题大气，正文简短准确。不要乱码、伪文字、错别字、文字重叠或裁切。', '한국어는 명확하고 읽을 수 있어야 하며 제목은 인상적이고 본문은 짧고 정확해야 합니다. 깨진 문자, 가짜 문자, 오타, 텍스트 겹침 또는 잘림을 사용하지 마세요.'],
  ['한국어 광고 문구建议：', '한국어 광고 문구 제안:'],
  ['한국어 주제목：黑色丝袜 / 吊带袜单款展示', '한국어 주제목: 검은 스타킹 / 가터스타킹 단일 스타일 전시'],
  ['每个站点用简短한국어 레이블和短说明表达。', '각 지점은 짧은 한국어 레이블과 간단한 설명으로 표현합니다.'],
  ['텍스트는 한국어를 중심으로 사용하고，使用短标题、短标签、简短说明。不要生成大段复杂文字。信息框应像儿童科普书中的导览牌、知识卡片或小贴士。文字要尽量清晰、简洁、可读。', '텍스트는 한국어를 중심으로 사용하고 짧은 제목, 짧은 레이블, 간단한 설명을 사용합니다. 길고 복잡한 문단은 만들지 마세요. 정보 상자는 어린이 과학책의 안내판, 지식 카드 또는 팁처럼 구성하고 텍스트는 최대한 명확하고 간결하며 읽기 쉽게 만듭니다.'],
  ['한국어 큰 제목：{한국어 종 이름}', '한국어 큰 제목: {한국어 종 이름}'],
  ['한국어 부제목：{一句有吸引力的物种定位}', '한국어 부제목: {매력적인 종의 특징을 담은 한 줄}'],
  ['生成一个超高清、真实、具有强烈立体感的 {한국어 종 이름}。', '초고해상도·사실적이며 입체감이 강한 {한국어 종 이름}을 생성합니다.'],
  ['copied text, Korean text, existing brand names', 'copied text, unwanted text, existing brand names'],
  ['handwritten notes (大量清晰한국어 손글씨 주석)', 'handwritten notes (with abundant clear Korean handwritten annotations)'],
  ['Korean characters (한국어)', 'Korean text'],
  ['(书法体)', '(Korean calligraphic type)'],
  ['[e.g., "大王乌贼"]', '[e.g., "대왕오징어"]'],
];

function localizeDocument(markdown) {
  let activeCase = null;
  let inCodeBlock = false;
  let hasKoreanOutputConstraint = false;
  const changedCases = new Set();
  let changedLines = 0;
  const localized = markdown.split(/\r?\n/).map((line) => {
    const heading = line.match(/^### 사례 (\d+):/);
    if (heading) activeCase = Number(heading[1]);
    if (line.startsWith('```')) {
      if (inCodeBlock
        && koreanOutputConstraintCases.has(activeCase)
        && !hasKoreanOutputConstraint) {
        changedLines += 1;
        changedCases.add(activeCase);
        inCodeBlock = !inCodeBlock;
        return `${KOREAN_OUTPUT_CONSTRAINT}\n${line}`;
      }
      inCodeBlock = !inCodeBlock;
      hasKoreanOutputConstraint = false;
      return line;
    }
    if (!inCodeBlock || preserveSourceLanguage.has(activeCase)) return line;

    let localizedLine = line;
    for (const [from, to] of replacements) localizedLine = localizedLine.replaceAll(from, to);
    for (const [from, to] of caseSpecificReplacements.get(activeCase) || []) {
      localizedLine = localizedLine.replaceAll(from, to);
    }
    for (const [from, to] of cleanupReplacements) localizedLine = localizedLine.replaceAll(from, to);
    if (localizedLine.includes(KOREAN_OUTPUT_CONSTRAINT)) hasKoreanOutputConstraint = true;
    if (localizedLine !== line) {
      changedLines += 1;
      if (activeCase !== null) changedCases.add(activeCase);
    }
    return localizedLine;
  });
  return { markdown: localized.join('\n'), changedCases, changedLines };
}

const changedCases = new Set();
let changedTemplateLines = 0;
for (const relativeFile of files) {
  const path = resolve(root, relativeFile);
  const result = localizeDocument(await readFile(path, 'utf8'));
  await writeFile(path, result.markdown, 'utf8');
  if (templateFiles.includes(relativeFile)) {
    changedTemplateLines += result.changedLines;
  } else {
    for (const id of result.changedCases) changedCases.add(id);
  }
}

process.stdout.write(`Updated rendered-language instructions in ${changedCases.size} gallery cases: ${[...changedCases].sort((a, b) => a - b).join(', ')}\n`);
process.stdout.write(`Updated ${changedTemplateLines} template output-language instruction lines.\n`);
