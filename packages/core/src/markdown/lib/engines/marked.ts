import type { parser } from '@/markdown/types/engine';
import { marked as _marked } from 'marked';
import { marked_anchors_plugin } from '@/markdown/lib/plugins/marked-anchors';

export const marked: parser = async (content: string) => {
  return _marked.use(marked_anchors_plugin).parse(content);
};
