import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const files = [
  'docs/gallery-part-1.md',
  'docs/gallery-part-2.md',
  'docs/templates.md'
];
const han = /[\u3400-\u9fff]/u;
const outputSignal = /(?:\b(?:title|subtitle|headline|label|labels|text|copy|caption|tag|badge|button|name|names|slogan|logo|sign|inscription|calligraphy|typography|written|writing|quote|quote|ui|menu|tab|page|table|calendar|stamp|signature|poster|card|interface|screen)\b|标题|副标题|文字|文本|文案|标签|标注|注释|名称|名字|台词|说明|字体|字样|题字|署名|按钮|页面|菜单|名牌|印章|书法|海报|卡片|界面|屏幕)/i;
const renderedTarget = /(?:["“《][^"”》\n]*[\u3400-\u9fff]|\b(?:title|subtitle|headline|label|labels|text|copy|caption|tag|badge|button|name|names|slogan|logo|sign|inscription|calligraphy|typography|written|writing|quote|ui|menu|tab|stamp|signature)\b[^\n]*[\u3400-\u9fff]|(?:标题|副标题|文字|文本|文案|标签|标注|注释|名称|名字|台词|字样|题字|署名|按钮|菜单|名牌|印章|书法)[：:][^\n]*[\u3400-\u9fff]|(?:中文|简体|汉字|Chinese\s+(?:text|characters|labels?|title|copy|typography|language|output)))/i;
const structuredRenderedTarget = /(?:"(?:title|subtitle|headline|label|labels|text|copy|caption|tag|badge|button|name|names|slogan|logo|sign|inscription|calligraphy|typography|signature)"\s*:\s*[^\n]*[\u3400-\u9fff]|(?:中文|简体|汉字|Chinese\s+(?:text|characters|labels?|title|copy|typography|language|output)))/i;
const numericArgs = process.argv.slice(2).filter((value) => /^\d+$/.test(value));
const rangeStart = Number(numericArgs[0] || 0);
const rangeEnd = Number(numericArgs[1] || Number.POSITIVE_INFINITY);
const includeTemplates = process.argv.includes('--templates');
const candidatesOnly = process.argv.includes('--candidates');
const japanese = /[\u3040-\u30ff]/u;

if (candidatesOnly) {
  const candidates = new Set();
  for (const relativeFile of files.slice(0, 2)) {
    const lines = (await readFile(resolve(root, relativeFile), 'utf8')).split(/\r?\n/);
    let caseId = null;
    let inCodeBlock = false;
    let block = [];

    for (const line of lines) {
      const heading = line.match(/^### 사례 (\d+):/);
      if (heading) caseId = Number(heading[1]);
      if (!line.startsWith('```')) {
        if (inCodeBlock) block.push(line);
        continue;
      }
      if (inCodeBlock) {
        const text = block.join('\n');
        if (caseId >= rangeStart
          && caseId <= rangeEnd
          && han.test(text)
          && !japanese.test(text)
          && (process.argv.includes('--structured') ? structuredRenderedTarget : renderedTarget).test(text)) {
          candidates.add(caseId);
        }
        block = [];
      }
      inCodeBlock = !inCodeBlock;
    }
  }
  process.stdout.write(`${[...candidates].sort((a, b) => a - b).join(', ')}\n`);
  process.exit(0);
}

for (const relativeFile of files) {
  const lines = (await readFile(resolve(root, relativeFile), 'utf8')).split(/\r?\n/);
  let caseId = relativeFile === 'docs/templates.md' ? 'template' : null;
  let inCodeBlock = false;

  lines.forEach((line, index) => {
    const heading = line.match(/^### 사례 (\d+):/);
    if (heading) caseId = Number(heading[1]);
    if (line.startsWith('```')) {
      inCodeBlock = !inCodeBlock;
      return;
    }
    if (inCodeBlock
      && ((caseId === 'template' && includeTemplates) || (caseId >= rangeStart && caseId <= rangeEnd))
      && han.test(line)
      && outputSignal.test(line)) {
      process.stdout.write(`${relativeFile}:${index + 1} case ${caseId}: ${line.trim()}\n`);
    }
  });
}
