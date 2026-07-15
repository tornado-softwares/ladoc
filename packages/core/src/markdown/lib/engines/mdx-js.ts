import type { parser } from '@/markdown/types/engine';
import { compile } from '@mdx-js/mdx';
import { remark_anchors_plugin } from '../plugins/remark-anchors-plugin';
import { rehype_shiki_plugin } from '../plugins/rehype-shiki-plugin';

export const mdx_js: parser = async (content: string) => {
  const compiled = await compile(content, {
    outputFormat: "function-body",
    remarkPlugins: [[remark_anchors_plugin]],
    rehypePlugins:[[rehype_shiki_plugin]]
  })
  return { type:"module", code : String(compiled) }
};
