# 大学手记 · Astro 博客初版

博客初版保存在独立开发分支 `blog-v1`，未合并到 `main`，未配置或执行部署。示例文章与构思项目均有标记，发布前请替换或删除。

[查看新版桌面布局](docs/avatar-layout-desktop.png) · [查看新版手机布局](docs/avatar-layout-mobile.png)

新版为单栏布局。**正式头像尚待原文件**：对话中的图片可见，但本次执行环境未收到可读取的 `blog-avatar.webp` 文件，因此目前使用明确的 `v.` 占位。不能将当前截图视为头像替换完成。

将原始 WebP 文件原样放到 `public/images/avatar.webp` 后，重启开发服务器或重新构建，首页和关于页会使用该头像。桌面为 112px、手机为 88px；`border-radius: 50%` 控制圆形，`object-fit: cover` 保持比例。实际面部显示效果需在原图到位后验证。

## 获取代码

在 GitHub 上切换到 `blog-v1` 分支后，可通过 **Code → Download ZIP** 下载并解压，使用 VS Code 打开解压后的目录。也可以克隆指定分支：

```bash
git clone --branch blog-v1 --single-branch https://github.com/vilcg/web_self.git
cd web_self
```

## 启动和验证

需要 Node.js >=22.23.4（当前 24.19.0）、npm >=9.6.5。



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

分类目前支持「学习笔记」「生活随记」「建站记录」。文件名用简单英文与连字符，作为 URL 的一部分。用 `draft: true` 暂存草稿。正文使用 Markdown 的标题、列表、代码块即可；站内链接应包含 `/web_self/`，构建后的 `smoke` 会检查目标是否存在。

项目卡片在 `src/pages/projects/index.astro` 修改；个人介绍在 `src/pages/about.astro`。全站名称和作者在 `src/lib/site.ts`，页脚等可见作者信息也应一并检查。

## 分阶段计划

1. **本次初版**：静态页面、Markdown 内容集合、响应式布局、分类筛选、目录、构建和预览验证。
2. **真实内容**：替换示例文章与个人介绍，加入实际项目链接，按真实使用反馈调整分类与排版。
3. **确认后迁移**：审核 `blog-v1` 分支差异，确认现有 Pages 来源与构建方式，再配置部署流程。不应直接把原型复制到 main 或上传 dist 覆盖线上内容。
4. **按需完善**：内容足够多时考虑 RSS、搜索和标签页；有明确需求后再考虑评论。暂不引入数据库、登录和付费服务。

## 仓库检查记录

2026-11-02 只读检查远程 `vilcg/web_self`：main 为 `8a0d7ad3c544be44461fb368a815370fa0e62af5`，仅有 README.md 和包含标题、介绍的 index.html；未发现包清单、测试或 GitHub Actions。原本地检出在 `work` 分支、初始提交 `8fa5e9c`。初版最初制作于独立目录，随后经授权迁入 `blog-v1` 分支。现有线上网站因云网络策略返回 403，未将该结果判断为网站故障。

初版已迁入开发分支；保留原有根目录 `index.html`，Astro 使用 `src/pages/index.astro` 生成首页。此分支没有自动部署工作流。后续需要确认现有 Pages 来源后，再单独讨论部署，不能直接合并到 `main`。

## 本次验证结果

- `npm run check`：0 errors、0 warnings、0 hints。
- `npm run build`：生成 7 个静态页面。
- `npm run smoke`：69 个站内链接与资源目标存在（单栏改版后），所有页面有中文语言声明与主标题。
- `CHROMIUM_PATH=/usr/bin/chromium npx playwright test`：桌面和手机共 6 项测试通过；覆盖导航、正文、目录跳转、分类切换、HTTP 200 以及横向溢出。
- 手工查看桌面和手机首页截图，保存在 `docs/`。
- 当前云环境中 Astro 会识别代理环境并自动后台启动预览；浏览器测试使用 `--ignore-lock` 在独立端口启动前台服务器，避免与手动预览冲突。测试结束会关闭自己的服务器。
- 本次交付仅提交并推送到 `blog-v1`；未修改远程 `main`，未执行部署。
