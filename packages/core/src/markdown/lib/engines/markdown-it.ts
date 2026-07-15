import type { parser } from '@/markdown/types/engine';
import MarkdownItAsync from 'markdown-it-async';
import { markdown_it_anchors_plugin } from '../plugins/markdown-it-anchors-plugin';
import { markdown_it_shiki_plugin } from '../plugins/markdown-it-shiki-plugin';

export const markdown_it: parser = async (content: string) => {
  const _markdown_it = MarkdownItAsync()
    .use(markdown_it_anchors_plugin)
    .use(markdown_it_shiki_plugin)
  return { type: "html", html: await _markdown_it.renderAsync(content) }
};
