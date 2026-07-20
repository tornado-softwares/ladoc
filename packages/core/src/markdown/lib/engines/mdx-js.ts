import type { parser } from '@/markdown/types/engine';
import { compile } from '@mdx-js/mdx';
import { remark_anchors_plugin } from '@/markdown/lib/plugins/remark/anchors';
import { rehype_mermaid_plugin } from '@/markdown/lib/plugins/rehype/mermaid';
import { rehype_shiki_plugin } from '@/markdown/lib/plugins/rehype/shiki';
import { remark_gfm_plugin } from '@/markdown/lib/plugins/remark/gfm';
import { remark_math_plugin } from '@/markdown/lib/plugins/remark/math';
import { rehype_katex_plugin } from '@/markdown/lib/plugins/rehype/katex';

export const mdx_js: parser = async (content: string) => {
  const compiled = await compile(content, {
    outputFormat: 'function-body',
    remarkPlugins: [[remark_anchors_plugin], [remark_gfm_plugin], [remark_math_plugin]],
    rehypePlugins: [[rehype_mermaid_plugin], [rehype_shiki_plugin], [rehype_katex_plugin]],
  });
  return { type: 'module', code: String(compiled) };
};
