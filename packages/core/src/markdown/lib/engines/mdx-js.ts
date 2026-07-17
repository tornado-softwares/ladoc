import type { parser } from '@/markdown/types/engine';
import { compile } from '@mdx-js/mdx';
import { remark_anchors_plugin } from '@/markdown/lib/plugins/remark/anchors';
import { rehype_mermaid_plugin } from '@/markdown/lib/plugins/rehype/mermaid';
import { rehype_shiki_plugin } from '@/markdown/lib/plugins/rehype/shiki';
import remarkGfm from 'remark-gfm';

export const mdx_js: parser = async (content: string) => {
  const compiled = await compile(content, {
    outputFormat: 'function-body',
    remarkPlugins: [[remark_anchors_plugin], [remarkGfm]],
    rehypePlugins: [[rehype_mermaid_plugin], [rehype_shiki_plugin]],
  });
  return { type: 'module', code: String(compiled) };
};
