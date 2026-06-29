declare type Markdown = string;
declare type Pages = Record<string, () => Promise<Markdown>>;

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
