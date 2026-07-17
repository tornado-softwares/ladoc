import type { parser } from '@/markdown/types/engine';
import { Marked } from 'marked';
import { marked_anchors_plugin } from '@/markdown/lib/plugins/marked/anchors';
import { marked_shiki_plugin } from '@/markdown/lib/plugins/marked/shiki';
import { marked_mermaid_plugin } from '@/markdown/lib/plugins/marked/mermaid';

const _marked = new Marked(marked_anchors_plugin, marked_mermaid_plugin, marked_shiki_plugin);

export const marked: parser = async (content: string) => {
  return { type: 'html', html: await _marked.parse(content) };
};
