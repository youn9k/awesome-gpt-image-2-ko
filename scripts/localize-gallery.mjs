import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const docs = [
  resolve(root, 'docs/gallery-part-1.md'),
  resolve(root, 'docs/gallery-part-2.md'),
];
const translations = (await readFile(resolve(root, 'data/case-title-ko.txt'), 'utf8'))
  .trim()
  .split(/\r?\n/)
  .map((title) => title.trim());

const siteData = JSON.parse(
  await readFile(resolve(root, 'data/cases.json'), 'utf8'),
);
const caseTitles = new Map(siteData.cases.map((item) => [item.id, item.title]));
const uniqueSourceTitles = [...new Set(caseTitles.values())].sort((left, right) =>
  left.localeCompare(right, 'ko-KR'),
);
if (uniqueSourceTitles.length !== translations.length) {
  throw new Error(
    `Expected ${uniqueSourceTitles.length} translated titles, received ${translations.length}.`,
  );
}

const titleMap = new Map(
  uniqueSourceTitles.map((title, index) => [title, translations[index]]),
);

function localizeCaseDocument(markdown) {
  let currentTitle = null;
  const lines = markdown.split(/\r?\n/);
  const localized = lines.map((line) => {
    const heading = line.match(/^### (?:例|사례) (\d+)(?:：|: )(.*)$/);
    if (heading) {
      const sourceTitle = caseTitles.get(Number(heading[1]));
      currentTitle = titleMap.get(sourceTitle);
      if (!currentTitle) throw new Error(`Missing Korean title for case ${heading[1]}.`);
      return `### 사례 ${heading[1]}: ${currentTitle}`;
    }

    if (currentTitle && /^!\[[^\]]*\]\(/.test(line)) {
      return line.replace(/^!\[[^\]]*\]/, `![${currentTitle}]`);
    }

    return line
      .replace('返回 README 首页', 'README 홈으로 돌아가기')
      .replace('画廊总览', '갤러리 개요')
      .replace('上一册：', '이전 권: ')
      .replace('例 1-165', '사례 1–165')
      .replace('下一册：例 166-476', '다음 권: 사례 166–544')
      .replace('下一册：', '다음 권: ')
      .replace('## 🖼️ 魔法画廊 (Gallery)', '## 🖼️ 매직 갤러리')
      .replace('## 🖼️ 魔法画廊 (Part 2)', '## 🖼️ 매직 갤러리 — Part 2')
      .replace('**来源：**', '**출처:**')
      .replace('**提示词：**', '**프롬프트:**')
      .replaceAll('小红书号', '샤오홍슈(小红书) 계정')
      .replaceAll('苍何原创实测', '창허(苍何) 오리지널 실험')
      .replaceAll('未提供', '제공되지 않음')
      .replaceAll('（公众号文章《我逆向了 329 条 GPT-Image2 提示词模板，全部开源！》）', '（공식 계정 글 《GPT-Image2 프롬프트 템플릿 329개를 역설계해 모두 오픈소스로 공개했습니다!》）')
      .replaceAll('**补充：** 该“异质类 OC”案例线索由倒放老师发现。', '**추가 정보:** “이질적 OC” 사례의 제보는 다오팡 선생님(倒放老师)이 발견했습니다.')
      .replace(/\*\*补充：\*\* 近 24 小时 X 社区案例，原帖发布于 (.+)（北京时间）。/, '**추가 정보:** 최근 24시간 X 커뮤니티 사례이며, 원문은 $1(베이징 시간)에 게시되었습니다.')
      .replace(/\[提示词回复 (\d+)\]/g, '[프롬프트 답글 $1]')
      .replaceAll('[补发提示词]', '[추가 프롬프트]');
  });
  return localized.join('\n');
}

function localizeIndex(markdown) {
  return markdown
    .replace(/(?:例|사례) (\d+)(?:：|: )([^\]\n]+)/g, (full, id) => {
      const translated = titleMap.get(caseTitles.get(Number(id)));
      return translated ? `사례 ${id}: ${translated}` : full;
    })
    .replace(/\[(?:例|사례) (\d+)(?:：|: )?\]\(([^)]+)\)/g, (full, id, href) => {
      const translated = titleMap.get(caseTitles.get(Number(id)));
      return translated ? `[사례 ${id}: ${translated}](${href})` : full;
    })
    .replace('## 🖼️ 魔法画廊总览', '## 🖼️ 매직 갤러리 개요')
    .replace('完整画廊已按 GitHub 渲染体积拆成两册，避免页面被截断；当前总案例数为 544。', '전체 갤러리는 GitHub 렌더링 용량 제한으로 두 권으로 나누었습니다. 페이지가 잘리지 않도록 했으며, 현재 사례 수는 541개입니다.')
    .replace('[返回 README 首页]', '[README 홈으로 돌아가기]')
    .replace('[Part 1：例 1-165]', '[Part 1: 사례 1–165]')
    .replace('[Part 2：例 166-544]', '[Part 2: 사례 166–544]')
    .replace('[工业级提示词模板与防坑指南]', '[산업용 프롬프트 템플릿과 실수 방지 가이드]')
    .replace('[声明、Star 趋势图与公众号]', '[고지, Star 추이와 공식 계정]')
    .replace('## 推荐入口', '## 추천 입구')
    .replace('## 分册说明', '## 권별 안내')
    .replace('## 分类概览', '## 분류 개요')
    .replace('## 分类案例入口', '## 분류별 사례 입구')
    .replace('`gallery-part-1.md`：例 1-165，覆盖信息图、界面、海报、摄影、插画等基础主流类型。', '`gallery-part-1.md`: 사례 1–165 — 인포그래픽, 인터페이스, 포스터, 사진, 일러스트 등 주요 기본 유형을 다룹니다.')
    .replace('`gallery-part-2.md`：例 166-544，包含更多品牌、卡牌、直播截图、国风、商业视觉、作者新增实测与社区案例。', '`gallery-part-2.md`: 사례 166–544 — 브랜드, 카드, 라이브 화면, 중국풍, 상업 비주얼, 새 실험 및 커뮤니티 사례를 더 담았습니다.')
    .replaceAll('UI与界面', 'UI 및 인터페이스')
    .replaceAll('图表与信息可视化', '차트 및 정보 시각화')
    .replaceAll('海报与排版', '포스터 및 레이아웃')
    .replaceAll('商品与电商', '상품 및 전자상거래')
    .replaceAll('品牌与标志', '브랜드 및 로고')
    .replaceAll('建筑与空间', '건축 및 공간')
    .replaceAll('摄影与写实', '사진 및 사실적 표현')
    .replaceAll('插画与艺术', '일러스트 및 예술')
    .replaceAll('人物与角色', '인물 및 캐릭터')
    .replaceAll('场景与叙事', '장면 및 서사')
    .replaceAll('历史与古风题材', '역사 및 고풍 소재')
    .replaceAll('文档与出版物', '문서 및 출판물')
    .replaceAll('其他应用场景', '기타 활용 장면')
    .replaceAll(' cases', '개 사례')
    .replaceAll('：', ':');
}

for (const file of docs) {
  await writeFile(file, localizeCaseDocument(await readFile(file, 'utf8')), 'utf8');
}

const galleryIndex = resolve(root, 'docs/gallery.md');
await writeFile(galleryIndex, localizeIndex(await readFile(galleryIndex, 'utf8')), 'utf8');
