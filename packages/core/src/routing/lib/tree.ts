import type { Category, TreeObject, Page, Data } from '../types/routing';
import type { File, Object } from '../types/structure';
import { parse_segments } from './utils/segments';
import { explore } from './utils/explore';
import { naming } from './utils/constants';
import  fs  from 'fs';
import { data_frontmatter_schema, extract_frontmatter, page_frontmatter_schema } from '@/markdown';

const object_to_page = (object: Object, level: number = 0, parent_is_category: boolean = false, base_level = true): TreeObject[] => {
  if (object.type == 'file') {
    const is_data = object.name == naming.data;
    if (is_data) {
      const content = fs.readFileSync(object.path, 'utf-8');
      const { frontmatter } = extract_frontmatter(content, data_frontmatter_schema);
      const route: Data = {
        id: object.name,
        type:"data",
        frontmatter,
      };
      return [route];
    } else {
      const is_index = object.name == naming.index;
      const content = fs.readFileSync(object.path, 'utf-8');
      const { frontmatter } = extract_frontmatter(content, page_frontmatter_schema);
      const route: Page = {
        id: object.name,
        type: "page",
        file:object.path,
        frontmatter,
        path: parse_segments(object.id, 1),
      };
      if (is_index && parent_is_category) {
        route.index = true;
      }
      return [route];
    }

  } else {
    let children: TreeObject[] = [];
    for (const child of object.children) {
      if (base_level) {
        children = [...children, ...object_to_page(child, level, true, false)];
      } else {
        children = [...children, ...object_to_page(child, level + 1, true, false)];
      }
    }
    const route: Category = {
      id: object.name,
      type: "category",
      children,
    };
    return [route];
  }
};

export const get_tree = (path: string): TreeObject[] => {
  const tree = explore({
    path: path,
    extensions: ['.mdx'],
  });
  if (tree == undefined) throw new Error(`Directory ${path} does not exist.`);
  if (tree.type == 'file') throw new Error(`Directory ${path} is pointing to a file.`);
  if (tree.children.length == 0) throw new Error(`Directory ${path} does not contain any routes.`);
  return object_to_page(tree);
};

export const get_tree_pages = (tree: TreeObject[]): Page[] =>
  tree.flatMap((page) => (page.type == "page" ? [page] : page.type == "category" ? get_tree_pages(page.children) : []));
