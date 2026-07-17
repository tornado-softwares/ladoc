import type { MarkedExtension } from 'marked';
import { codeToHtml, type BundledLanguage, type ShikiTransformer } from 'shiki';
import { shiki_theme } from '../../shiki/theme';
import { shiki_transformers } from '../../shiki/transformers';

export const marked_shiki_plugin: MarkedExtension = {
  async: true,
  async walkTokens(token) {
    if (token.type !== 'code') return undefined;
    const [lang = 'text', ...props] = token.lang?.split(' ') ?? [];
    if (lang == 'mermaid') return undefined;
    const { text } = token;
    const html = await codeToHtml(text, {
      lang: (lang || 'text') as BundledLanguage,
      theme: shiki_theme,
      transformers: shiki_transformers,
      meta: {
        __raw: props.join(' '),
      },
    });
    Object.assign(token, {
      type: 'html',
      block: true,
      text: `${html}\n`,
    });
  },
};
