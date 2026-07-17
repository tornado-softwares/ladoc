import type { parser } from '@/markdown/types/engine';
import MarkdownItAsync from 'markdown-it-async';
import { markdown_it_anchors_plugin } from '@/markdown/lib/plugins/markdown-it/anchors';
import { markdown_it_shiki_plugin } from '@/markdown/lib/plugins/markdown-it/shiki';
import { markdown_it_mermaid_plugin } from '@/markdown/lib/plugins/markdown-it/mermaid';

export const markdown_it: parser = async (content: string) => {
  const _markdown_it = MarkdownItAsync().use(markdown_it_anchors_plugin).use(markdown_it_mermaid_plugin).use(markdown_it_shiki_plugin);
  return { type: 'html', html: await _markdown_it.renderAsync(content) };
};
