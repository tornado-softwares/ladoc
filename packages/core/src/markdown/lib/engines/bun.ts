import type { parser } from '@/markdown/types/engine';

export const bun: parser = async (input: string) => {
  return Bun.markdown.html(input, { headings: { ids: true } });
};
