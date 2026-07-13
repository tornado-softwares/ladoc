import type { data_frontmatter, page_frontmatter } from "@/markdown";

export type Data = {
  id: string;
  type:"data"
  frontmatter:data_frontmatter
};

export type Page = {
  id: string;
  type:"page"
   file: string;
  frontmatter:page_frontmatter
  path: string;
  index?: boolean;
  data?: boolean;
};

export type Category = {
  id: string;
  type:"category"
  children: TreeObject[];
};

export type TreeObject = Page | Category | Data;
