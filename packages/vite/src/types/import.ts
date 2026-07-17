declare global {
  type Markdown = {
    toc: _toc;
    frontmatter: _page_frontmatter;
    engine_output: _parser_output;
  };
  type MarkdownModule = { default: Markdown };
  type LazyMarkdown = () => Promise<MarkdownModule>;
  type Pages = Record<string, Record<string, LazyMarkdown>> & { default: Record<string, LazyMarkdown> };
}

// @ts-expect-error
declare  module 'virtual:ladoc:markdown:*' {
  const content: Markdown;
  export default content;
}

// @ts-expect-error
declare module 'virtual:ladoc:pages' {
  const content: Pages;
  export default content;
}
export {};
