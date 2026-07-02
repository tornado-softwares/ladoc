import { get_configuration } from '@/configuration';
import type { engines, parser } from '../types/engine';
import { dummy } from './engines/dummy';
import { markdown_it } from './engines/markdown_it';
import { marked } from './engines/marked';
import { bun } from './engines/bun';

export const markdown_engines: engines = {
  bun: bun,
  ladoc: dummy,
  'markdown-it': markdown_it,
  marked: marked,
  'mdx-bundler': dummy,
};

export const get_markdown_html: parser = async (content: string) => {
  const configuration = await get_configuration();
  return markdown_engines[configuration.markdown.engine](content);
};
