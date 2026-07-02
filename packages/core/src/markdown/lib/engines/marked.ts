import type { parser } from '@/markdown/types/engine';
import { marked as _marked } from 'marked';

export const marked: parser = async (content: string) => {
  return _marked.parse(content);
};
