import type { parser } from '@/markdown/types/engine';
import MarkdownIt from 'markdown-it';

export const markdown_it: parser = async (content: string) => {
  const md = MarkdownIt();
  return md.render(content);
};
