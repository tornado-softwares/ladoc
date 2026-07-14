import { get_configuration } from '@/configuration';
import type { engines, parser } from '../types/engine';
import { dummy } from './engines/dummy';
import { markdown_it } from './engines/markdown-it';
import { marked } from './engines/marked';
import { bun } from './engines/bun';
import { mdx_js } from './engines/mdx-js';

export const markdown_engines: engines = {
  bun: bun,
  ladoc: dummy,
  'markdown-it': markdown_it,
  marked: marked,
  'mdx-js': mdx_js,
};

export const get_markdown_html: parser = async (content: string) => {
  const configuration = await get_configuration();
  const start = Date.now();
  const html = markdown_engines[configuration.markdown.engine](content);
  const end = Date.now();
  configuration.logger.debug('parsed with', configuration.markdown.engine, 'in', end - start, 'ms');
  return html;
};
