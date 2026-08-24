import type { PageBlock } from '@/types';

export function parseContent(block: PageBlock | undefined): any {
  if (!block?.content) return null;
  try { return JSON.parse(block.content); } catch { return null; }
}
