import type {
  page_frontmatter,
  parser_output,
  toc,
} from '@ladoc/core/markdown';

declare global {
  type _page_frontmatter = page_frontmatter;
  type _parser_output = parser_output;
  type _toc = toc;
}

export {};

// Weird workaround :/
