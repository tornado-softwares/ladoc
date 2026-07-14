import type { parser } from '@/markdown/types/engine';
import { Marked } from 'marked';
import { marked_anchors_plugin } from '@/markdown/lib/plugins/marked-anchors';

const _marked = new Marked(
  marked_anchors_plugin,
);

export const marked: parser = async (content: string) => {
  return {type:"html", html:await _marked.parse(content)}
};
