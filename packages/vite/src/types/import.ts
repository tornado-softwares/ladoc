declare type Markdown = {
  frontmatter: any;
  html: string;
};
declare type MarkdownModule = { default: Markdown };
declare type LazyMarkdown = () => Promise<MarkdownModule>;
declare type Pages = Record<string, Record<string, LazyMarkdown>> & { default: Record<string, LazyMarkdown> };

// @ts-expect-error
declare module 'virtual:ladoc:markdown:*' {
  const content: Markdown;
  export default content;
}

// @ts-expect-error
declare module 'virtual:ladoc:pages' {
  const content: Pages;
  export default content;
}
