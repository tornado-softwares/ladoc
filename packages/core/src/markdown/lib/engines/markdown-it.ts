import type { parser } from '@/markdown/types/engine';
import MarkdownIt from 'markdown-it';
import { markdown_it_anchors_plugin } from '../plugins/markdown-it-anchors-plugin';
import { markdown_it_shiki_plugin } from '../plugins/markdown-it-shiki-plugin';


export const markdown_it: parser = async (content: string) => {
  const _markdown_it = MarkdownIt()
    .use(markdown_it_anchors_plugin)
  // .use(markdown_it_highlight_plugin)

  await markdown_it_shiki_plugin(_markdown_it)

  return { type: "html", html: _markdown_it.render(content) }
};
