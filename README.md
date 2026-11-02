# 大学手记 · Astro 博客初版

Astro 博客源码现已同步到 `main` 和 `blog-v1`。项目保留根目录原有的 `index.html`；Astro 首页由 `src/pages/index.astro` 生成。仓库没有自动部署工作流，发布前需配置 Pages 构建与部署。示例文章与构思项目均有标记，发布前请替换或删除。

[查看新版桌面布局](docs/avatar-layout-desktop.png) · [查看新版手机布局](docs/avatar-layout-mobile.png)

[阅读简明使用手册](docs/使用手册.md)

新版为单栏布局。首页与关于页共用头像组件；当前头像位于 `public/images/avatar.webp`，桌面为 112px、手机为 88px，并使用圆形裁切。

## 获取代码

可通过 GitHub 的 **Code → Download ZIP** 下载并解压，使用 VS Code 打开解压后的目录。也可以克隆主分支：

```bash
git clone --branch main --single-branch https://github.com/vilcg/web_self.git
cd web_self
```

## 启动和验证

需要 Node.js >=22.23.4（当前 24.19.0）、npm >=9.6.5。

本地预览运行 `npm run dev -- --host 127.0.0.1 --port 5173`，然后打开 `http://127.0.0.1:5173/web_self/`。如果 Windows 对默认端口报 `EACCES`，可像上面这样指定其他未保留端口。


## 为什么用这套技术

| 选择 | 适合的地方 | 取舍 |
| --- | --- | --- |
| 纯 HTML/CSS | 理解原理、很少的页面 | 每篇文章都要重复页面结构 |
| Astro + Markdown（本项目） | 内容为主、静态托管、共享组件 | 写作后需要构建；初次需学习模板和集合 |
| React SPA | 大量交互、复杂前端状态 | 本博客暂不需要相应复杂度 |
| WordPress 等 CMS | 可视化编辑、多人发布 | 通常需要额外托管和后端维护 |

Astro 的 `.astro` 文件上半部分 `---` 内是构建时逻辑，下半部分是 HTML 模板。页面默认没有客户端运行时。文章分类筛选是唯一自定义浏览器脚本；禁用 JavaScript 仍可阅读全部文章。

## 目录与数据流

- `astro.config.mjs`：静态输出、站点地址与 `/web_self` 子路径。此配置不会自动部署。
- `src/layouts/Base.astro`：公共 head、导航、页脚和跳到正文入口。
- `src/pages/`：文件路径决定 URL，`index.astro` 是首页。
- `src/pages/posts/[id].astro`：构建时 `getStaticPaths()` 遍历文章，为每篇生成页面；`render()` 把 Markdown 转成正文与目录。
- `src/content.config.ts`：用 schema 检查文章字段。
- `src/content/posts/*.md`：可以专注编辑的文章内容。
- `src/lib/site.ts`：子路径地址、日期格式与文章排序；`draft: true` 不进入列表或输出。
- `src/components/PostList.astro`：首页和文章页复用的列表。
- `src/styles/global.css`：统一颜色、排版、移动布局和焦点样式。
- `src/components/Avatar.astro`：首页和关于页共享头像，缺少原文件时明确显示占位。
- `src/lib/avatar.mjs`：构建时检查原始头像文件是否存在，不生成或替换用户图片。
- `public/`：本地原创 SVG 插画与图标，不依赖外部图片或字体服务。
- `scripts/smoke.mjs`、`tests/`：产物链接与浏览器检查。

内容流：Markdown → 集合校验 → 按日期排序 → 模板 → `dist/` 静态文件。

## 发布新文章

在 `src/content/posts/` 下新建 `my-first-post.md`：

```markdown
---
title: 我的第一篇真实手记
description: 用一句话说明这篇文章的内容。
date: 2026-11-02
category: 生活随记
tags: [大学, 日常]
sample: false
draft: false
---
## 今天想记录的事

在这里写正文。
```

正文直接用 Markdown 写。需要展示代码时，用三个反引号包住代码，并在开头注明语言：

````markdown
## 一段 JavaScript 示例

```js
const greet = (name) => `你好，${name}！`;
console.log(greet('世界'));
```
````

分类目前支持「学习笔记」「生活随记」「建站记录」。文件名用简单英文与连字符，作为 URL 的一部分。用 `draft: true` 暂存草稿。正文使用 Markdown 的标题、列表、代码块即可；站内链接应包含 `/web_self/`，构建后的 `smoke` 会检查目标是否存在。

项目卡片在 `src/pages/projects/index.astro` 修改；个人介绍在 `src/pages/about.astro`。全站名称和作者在 `src/lib/site.ts`，页脚等可见作者信息也应一并检查。

## 分阶段计划

1. **本次初版**：静态页面、Markdown 内容集合、响应式布局、分类筛选、目录、构建和预览验证。
2. **真实内容**：替换示例文章与个人介绍，加入实际项目链接，按真实使用反馈调整分类与排版。
3. **部署**：仓库目前没有自动部署工作流。要发布 Astro 网站，需要配置 GitHub Pages 工作流，构建后发布 `dist/`；之后推送到 `main` 可自动构建与部署。
4. **按需完善**：内容足够多时考虑 RSS、搜索和标签页；有明确需求后再考虑评论。暂不引入数据库、登录和付费服务。

## 仓库检查记录

2026-11-02 只读检查远程 `vilcg/web_self`：main 为 `8a0d7ad3c544be44461fb368a815370fa0e62af5`，仅有 README.md 和包含标题、介绍的 index.html；未发现包清单、测试或 GitHub Actions。原本地检出在 `work` 分支、初始提交 `8fa5e9c`。初版最初制作于独立目录，随后经授权迁入 `blog-v1` 分支。现有线上网站因云网络策略返回 403，未将该结果判断为网站故障。

初版最初迁入 `blog-v1`；2026-11-02 已快进同步到 `main`。保留原有根目录 `index.html`，Astro 使用 `src/pages/index.astro` 生成首页。仓库中没有自动部署工作流；GitHub Pages 后台来源设置尚未核实。

## 本次验证结果

- `npm run check`：0 errors、0 warnings、0 hints。
- `npm run build`：生成 7 个静态页面。
- `npm run smoke`：69 个站内链接与资源目标存在（单栏改版后），所有页面有中文语言声明与主标题。
- `CHROMIUM_PATH=/usr/bin/chromium npx playwright test`：桌面和手机共 6 项测试通过；覆盖导航、正文、目录跳转、分类切换、HTTP 200 以及横向溢出。
- 手工查看桌面和手机首页截图，保存在 `docs/`。
- 当前云环境中 Astro 会识别代理环境并自动后台启动预览；浏览器测试使用 `--ignore-lock` 在独立端口启动前台服务器，避免与手动预览冲突。测试结束会关闭自己的服务器。
- 初版迁入时曾仅推送到 `blog-v1`；2026-11-02 已同步到 `main`。尚未配置自动部署。
