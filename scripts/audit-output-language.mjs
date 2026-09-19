import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const files = ['docs/gallery-part-1.md', 'docs/gallery-part-2.md'];
const signal = /中文|汉字|简体|Chinese(?:\s+(?:text|characters|labels?|title|copy|typography|language|output))?/i;

for (const relativeFile of files) {
  const lines = (await readFile(resolve(root, relativeFile), 'utf8')).split(/\r?\n/);
  let caseId = null;
  let inCodeBlock = false;

  lines.forEach((line, index) => {
    const heading = line.match(/^### 사례 (\d+):/);
    if (heading) caseId = Number(heading[1]);
    if (line.startsWith('```')) {
      inCodeBlock = !inCodeBlock;
      return;
    }
    if (inCodeBlock && signal.test(line)) {
      process.stdout.write(`${relativeFile}:${index + 1} case ${caseId}: ${line.trim()}\n`);
    }
  });
}
