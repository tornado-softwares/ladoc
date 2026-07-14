import Shiki from '@shikijs/markdown-it'
import type MarkdownIt from "markdown-it";
import { shiki_theme } from '../shiki/theme';
import { shiki_transformers } from '../shiki/transformers';

let shiki_plugin_promise: ReturnType<typeof Shiki> | null = null;

const get_shiki_plugin = () => {
  if (!shiki_plugin_promise) {
    shiki_plugin_promise = Shiki({
      theme: shiki_theme,
      transformers: shiki_transformers,
    });
  }
  return shiki_plugin_promise;
};

export const markdown_it_shiki_plugin = async (md: MarkdownIt) => {
  const shiki = await get_shiki_plugin();
  md.use(shiki);
};
