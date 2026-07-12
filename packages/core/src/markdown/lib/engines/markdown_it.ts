import type { parser } from '@/markdown/types/engine';
import MarkdownIt from 'markdown-it';
import { markdown_it_anchors_plugin } from '../plugins/markdown-it-anchors-plugin';

export const markdown_it: parser = async (content: string) => {
  const md = MarkdownIt();
  md.use(markdown_it_anchors_plugin)
  return md.render(content);
};
