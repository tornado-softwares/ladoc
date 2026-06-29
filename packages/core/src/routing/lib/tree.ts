import type { Category, Content, Page } from '../types/routing';
import type { File, Object } from '../types/structure';
import { parse_segments } from './utils/segments';
import { explore } from './utils/explore';
import { naming } from './utils/constants';

const object_to_page = (object: Object, level: number = 0, parent_layout: boolean = false, base_level = true): Page[] => {
  if (object.type == 'file') {
    const is_index = object.name == naming.index;
    const route: Content = {
      id: object.name,
      file: object.path,
      path: parse_segments(object.id, 1),
    };
    if (is_index && parent_layout) {
      route.index = true;
    }
    return [route];
  } else {
    let children: Page[] = [];
    for (const child of object.children) {
      if (base_level) {
        children = [...children, ...object_to_page(child, level, true, false)];
      } else {
        children = [...children, ...object_to_page(child, level + 1, true, false)];
      }
    }
    const route: Category = {
      id: object.name,
      children,
    };
    return [route];
  }
};

export const get_page_tree = (path: string) => {
  const tree = explore({
    path: path,
    extensions: ['.mdx'],
  });
  if (tree == undefined) throw new Error(`Directory ${path} does not exist.`);
  if (tree.type == 'file') throw new Error(`Directory ${path} is pointing to a file.`);
  if (tree.children.length == 0) throw new Error(`Directory ${path} does not contain any routes.`);
  return object_to_page(tree);
};

export const get_pages = (tree: Page[]): Content[] =>
  tree.flatMap((page) => ('file' in page ? [page] : page.children ? get_pages(page.children) : []));

/*


-> FOLDER1
  -> INDEX.MDX  : "/FOLDER1"
  -> BLABLA.MDX : "/FOLDER1/BLABLA"
  -> FOLDER2
    -> XXXX.MDX : "/FOLDER1/FOLDER2/XXXX"
*/
