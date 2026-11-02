import { test, expect } from '@playwright/test';

test('导航、文章详情与目录可以使用', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('./');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('留下痕迹');
  await page.getByRole('navigation', { name: '主导航' }).getByRole('link', { name: '文章', exact: true }).click();
  await expect(page.locator('.post-row:visible')).toHaveCount(3);
  await page.getByRole('link', { name: '从一个网页开始，搭建自己的数字花园', exact: true }).click();
  await expect(page.locator('.prose')).toContainText('为什么选择 Astro');
  await page.getByRole('navigation', { name: '文章目录' }).getByRole('link', { name: '为什么选择 Astro', exact: true }).click();
  await expect(page).toHaveURL(/#.+/);
  await page.getByRole('navigation', { name: '主导航' }).getByRole('link', { name: '项目', exact: true }).click();
  await expect(page.getByRole('heading', { name: '大学个人博客', exact: true })).toBeVisible();
  await page.getByRole('navigation', { name: '主导航' }).getByRole('link', { name: '关于', exact: true }).click();
  await expect(page.getByRole('heading', { level: 1 })).toContainText('vilcg');
  expect(errors).toEqual([]);
});

test('分类筛选可以切换并恢复', async ({ page }) => {
  await page.goto('posts/');
  await page.getByRole('button', { name: '学习笔记', exact: true }).click();
  await expect(page.locator('.post-row:visible')).toHaveCount(1);
  await expect(page.locator('.post-row:visible')).toContainText('学习 JavaScript');
  await expect(page.getByRole('button', { name: '学习笔记', exact: true })).toHaveAttribute('aria-pressed', 'true');
  await page.getByRole('button', { name: '生活随记', exact: true }).click();
  await expect(page.locator('.post-row:visible')).toHaveCount(1);
  await expect(page.locator('.post-row:visible')).toContainText('平凡的一天');
  await page.getByRole('button', { name: '全部', exact: true }).click();
  await expect(page.locator('.post-row:visible')).toHaveCount(3);
});

test('所有页面没有横向溢出，截图保存', async ({ page }, testInfo) => {
  for (const path of ['', 'posts/', 'projects/', 'about/', 'posts/building-this-blog/']) {
    const response = await page.goto(path || './');
    expect(response?.status()).toBe(200);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    if (!path) await page.screenshot({ path: testInfo.outputPath('home.png'), fullPage: true });
  }
});
