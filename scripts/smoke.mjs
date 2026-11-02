import { readdir, readFile, access } from 'node:fs/promises';
import { join, resolve, extname } from 'node:path';
const root = resolve('dist');
async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  return (await Promise.all(entries.map(e => e.isDirectory() ? walk(join(dir, e.name)) : join(dir, e.name)))).flat();
}
const pages = (await walk(root)).filter(f => extname(f) === '.html');
if (pages.length !== 7) throw new Error(`预期 7 个页面，实际 ${pages.length}`);
let checked = 0;
for (const file of pages) {
  const html = await readFile(file, 'utf8');
  if (!/<html[^>]*lang="zh-CN"/.test(html) || !/<h1[ >]/.test(html)) throw new Error(`缺少语言或主标题：${file}`);
  for (const [, ref] of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    if (ref.startsWith('#') || /^(https?:|data:|mailto:)/.test(ref)) continue;
    if (!ref.startsWith('/web_self/')) throw new Error(`地址未包含项目子路径：${ref}`);
    const pathname = decodeURIComponent(ref.split(/[?#]/)[0]).slice('/web_self/'.length);
    const target = resolve(root, pathname);
    if (!target.startsWith(root)) throw new Error('链接超出产物目录');
    await access(ref.split(/[?#]/)[0].endsWith('/') ? join(target, 'index.html') : target);
    checked++;
  }
}
console.log(`通过：${pages.length} 个 HTML 页面，${checked} 个内部链接/资源目标存在。`);
