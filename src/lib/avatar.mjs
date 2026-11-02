import { existsSync } from 'node:fs';
// 构建时检查原图是否到位；缺少原文件时明确显示占位，避免破图。
export const avatarAvailable = existsSync(new URL('../../public/images/avatar.webp', import.meta.url));
