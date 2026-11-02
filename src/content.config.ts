import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';
const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(), description: z.string(), date: z.coerce.date(),
    category: z.enum(['学习笔记', '生活随记', '建站记录']),
    tags: z.array(z.string()).default([]), draft: z.boolean().default(false),
    sample: z.boolean().default(true),
  }),
});
export const collections = { posts };
