import { getCollection } from 'astro:content';
export const site = { name: '大学手记', author: 'vilcg', description: '记录日常，整理所学，把想法慢慢做出来。' };
// 所有站内地址都带上 base，兼容 GitHub Pages 的项目子路径。
export const url = (path = '') => `${import.meta.env.BASE_URL.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
export const formatDate = (date: Date) => new Intl.DateTimeFormat('zh-CN', {
  year: 'numeric', month: '2-digit', day: '2-digit', timeZone: 'Asia/Shanghai',
}).format(date).replaceAll('/', '.');
export const getPosts = async () => (await getCollection('posts', ({ data }) => !data.draft))
  .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
