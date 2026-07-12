import type { frontmatter, toc } from '@ladoc/core/markdown';

declare global {
  type Markdown = {
    toc: toc;
    frontmatter: frontmatter;
    html: string;
  };
  type MarkdownModule = { default: Markdown };
  type LazyMarkdown = () => Promise<MarkdownModule>;
  type Pages = Record<string, Record<string, LazyMarkdown>> & { default: Record<string, LazyMarkdown> };

  // @ts-expect-error
  module 'virtual:ladoc:markdown:*' {
    const content: Markdown;
    export default content;
  }

  // @ts-expect-error
  module 'virtual:ladoc:pages' {
    const content: Pages;
    export default content;
  }
}
