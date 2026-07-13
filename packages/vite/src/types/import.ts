import type { page_frontmatter, parser_output, toc } from '@ladoc/core/markdown';
import type { TreeObject} from '@ladoc/core/routing';

declare global {
  type Markdown = {
    toc: toc;
    frontmatter: page_frontmatter;
    engine_output: parser_output;
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

  // @ts-expect-error
  module 'virtual:ladoc:tree' {
    const content: TreeObject[];
    export default content;
  }
}
